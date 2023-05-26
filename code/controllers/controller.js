import { categories, transactions } from "../models/model.js";
import { Group, User } from "../models/User.js";
import { handleDateFilterParams, handleAmountFilterParams, verifyAuth, verifyAuthUser, verifyAuthGroup, verifyAuthAdmin } from "./utils.js";

import mongoose from "mongoose";
import { createAPIobj } from "./utils.js";
/**
 * Create a new category
  - Request Body Content: An object having attributes `type` and `color`
  - Response `data` Content: An object having attributes `type` and `color`
 */
export const createCategory = (req, res) => {
    try {
        // const cookie = req.cookies
        // if (!cookie.accessToken) {
        //     return res.status(401).json({ message: "Unauthorized" }) // unauthorized
        // }
        const { type, color } = req.body;
        const new_categories = new categories({ type, color });
        new_categories.save()
            .then(data => res.json(data))
            .catch(err => { throw err })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Edit a category's type or color
  - Request Parameters: A string equal to the `type` of the category that must be edited
    - Example: `api/categories/food`
  - Request Body Content: An object having attributes `type` and `color` equal to the new values to assign to the category
    - Example: `{type: "Food", color: "yellow"}`
  - Response `data` Content: An object with parameter `message` that confirms successful editing and a parameter `count` that is equal to the count of transactions whose category was changed with the new type
    - Example: `res.status(200).json({data: {message: "Category edited successfully", count: 2}, refreshedTokenMessage: res.locals.refreshedTokenMessage})`
  - In case any of the following errors apply then the category is not updated, and transactions are not changed
  - Returns a 400 error if the request body does not contain all the necessary attributes
  - Returns a 400 error if at least one of the parameters in the request body is an empty string
  - Returns a 400 error if the type of category passed as a route parameter does not represent a category in the database
  - Returns a 400 error if the type of category passed in the request body as the new type represents an already existing category in the database
  - Returns a 401 error if called by an authenticated user who is not an admin (authType = Admin)
*/
export const updateCategory = async (req, res) => {
    try {

        // authentication
        const {authorized, cause} = await verifyAuthAdmin(req, res);
        if(!authorized) return res.status(401).json({error: cause})

        const {type} = req.params;
        const {type : newType, color : newColor} = req.body; 

        //
        // input validation
        //

        // check if all attributes are provided and not empty
        if(!newColor || newColor === "") return res.status(400).json({ error : "New color was empty or not provided" });
        if(!newType  || newType  === "") return res.status(400).json({ error : "New type was empty or not provided" });
        
        // check that the new type is not in use 
        if(newType !== type){            
            const result = await categories.countDocuments({
                type : newType
            });
        
            if(result >= 1){
                return res.status(400).json({
                    error : "New type is already in use"
                });
            }   
        }
        
        // // check if new value stayed the same
        // if(newType == type && newColor == color){
        //     return res.status(400).json({
        //         data : {
        //             message : ""                    
        //         },
        //         message : res.locals.message
        //     })
        // }

        // // check if color is valid
        // if(!/^#[a-fA-F0-9]{6}$/.test(newColor)){
        //     return res.status(400).json({
        //         data : {
        //             message : "color should be a hexadecimal string"                    
        //         },
        //         message : res.locals.message
        //     })
        // }

        // update category
        const result = await categories.updateOne(
            {
                type : type
            },
            {
                type : newType,
                color : newColor
            }
        )
        
        if(result.modifiedCount === 0){
            // category does not exist
            return res.status(400).json({
                error : "Selected category does not exist"
            })
        }

        // if type changed, update transactions to the new type 
        let modifiedCount = 0;
        if(newType !== type){
            const result = await transactions.updateMany(
                {
                    type : type
                },
                {
                    type : newType
                }
            )                        

            modifiedCount = result.modifiedCount;
        }

        return res.status(200).json({
            data : {
                message : "Succesfully update category",
                count : modifiedCount
            },
            refreshedTokenMessage: res.locals.refreshedTokenMessage
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Delete a category
- Request Parameters: None
- Request Body Content: An array of strings that lists the `types` of the categories to be deleted
    - Example: `{types: ["health"]}`
- Response `data` Content: An object with an attribute `message` that confirms successful deletion and an attribute `count` that specifies the number of transactions that have had their category type changed
    - Example: `res.status(200).json({data: {message: "Categories deleted", count: 1}, refreshedTokenMessage: res.locals.refreshedTokenMessage})`
- Given N = categories in the database and T = categories to delete:
    - If N > T then all transactions with a category to delete must have their category set to the oldest category that is not in T
    - If N = T then the oldest created category cannot be deleted and all transactions must have their category set to that category
- In case any of the following errors apply then no category is deleted
- Returns a 400 error if the request body does not contain all the necessary attributes
- Returns a 400 error if called when there is only one category in the database
- Returns a 400 error if at least one of the types in the array is an empty string
- Returns a 400 error if at least one of the types in the array does not represent a category in the database
- Returns a 401 error if called by an authenticated user who is not an admin (authType = Admin)
*/
export const deleteCategory = async (req, res) => {
    try {

        // authentication
        const {authorized, cause} = await verifyAuthAdmin(req, res);
        if(!authorized) return res.status(401).json({error: cause})

        const {types} = req.body;

        // check if all required fields were provided
        if(!types) return res.status(400).json({ error : "List of categories' types to deleted was not provided" });
        
        // check for empty strings
        for (let type of types){
            if(type === "") return res.status(400).json({ error : "The list of categories can't have empty entries" });
        }

        // check if the database has at least one category
        let T = await categories.countDocuments();
        if(T <= 1) return res.status(400).json({ error : "Cannot delete categories, there should be at least one category" });
        
        // check if all categories to be deleted exist in the database 
        let toBeDeleted = await categories.find({
            type : {
                $in : types
            }
        }).select({
            type : 1,            
            _id : 0    
        }).sort({
            createdAt : -1
        });

        toBeDeleted = toBeDeleted.map(category => category.type);
        const notFound = types.filter(type => !toBeDeleted.includes(type));
        
        if(notFound.length !== 0){            
            res.status(400).json({ error : `the following categories don't exist : ${notFound.join(', ')}` });
        }
        
        // number of categories to be deleted
        const N = types.length;
        let newType;

        if( N === T){
            // delete all categories except the oldest one   
            // types are sorted based on their creation date, so the oldest 
            // category is the first element of the types array         
            newType = toBeDeleted[0];
            toBeDeleted = toBeDeleted.slice(1);
        } else {
            // find oldest category
            let oldest = await categories.findOne({
                type : {
                    $nin : toBeDeleted
                }
            }).select({
                type : 1,            
                _id : 0    
            }).sort({
                createdAt : -1
            });

            newType = oldest.type;
        }
           
        // delete categories
        let result = await categories.deleteMany({
            type : {
                $in : toBeDeleted
            }
        })        

        // update transactions that belong to deleted categories
        result = await transactions.updateMany(
            {
                type : {
                    $in : toBeDeleted
                }
            },
            {
                type : newType
            }
        )
        
        return res.status(200).json({
            data : {
                message : "successfully deleted categories",
                count : result.modifiedCount
            },
            refreshedTokenMessage: res.locals.refreshedTokenMessage
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


/**
 * Return all the categories
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `type` and `color`
  - Optional behavior:
    - empty array is returned if there are no categories
 */
export const getCategories = async (req, res) => {
    try {
        // const cookie = req.cookies
        // if (!cookie.accessToken) {
        //     return res.status(401).json({ message: "Unauthorized" }) // unauthorized
        // }
        let data = await categories.find({})

        let filter = data.map(v => Object.assign({}, { type: v.type, color: v.color }))

        return res.json(filter)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Create a new transaction made by a specific user
  - Request Body Content: An object having attributes `username`, `type` and `amount`
  - Response `data` Content: An object having attributes `username`, `type`, `amount` and `date`
  - Optional behavior:
    - error 401 is returned if the username or the type of category does not exist
 */
export const createTransaction = async (req, res) => {
    try {
        // const cookie = req.cookies
        // if (!cookie.accessToken) {
        //     return res.status(401).json({ message: "Unauthorized" }) // unauthorized
        // }
        const { username, amount, type } = req.body;
        const new_transactions = new transactions({ username, amount, type });
        new_transactions.save()
            .then(data => res.json(data))
            .catch(err => { throw err })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Return all transactions made by all users
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `type`, `amount`, `date` and `color`
  - Optional behavior:
    - empty array must be returned if there are no transactions
 */
export const getAllTransactions = async (req, res) => {
    try {
        // const cookie = req.cookies
        // if (!cookie.accessToken) {
        //     return res.status(401).json({ message: "Unauthorized" }) // unauthorized
        // }
        transactions.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            { $unwind: "$categories_info" }
        ]).then((result) => {
            let data = result.map(v => Object.assign({}, { /*_id: v._id,*/ username: v.username, amount: v.amount, type: v.type, color: v.categories_info.color, date: v.date }))
            res.json(data);
        }).catch(error => { throw (error) })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Return all transactions made by a specific user
  - Request Parameters: A string equal to the `username` of the involved user
    - Example: `/api/users/Mario/transactions` (user route)
    - Example: `/api/transactions/users/Mario` (admin route)
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `type`, `amount`, `date` and `color`
    - Example: `res.status(200).json({data: [{username: "Mario", amount: 100, type: "food", date: "2023-05-19T00:00:00", color: "red"}, {username: "Mario", amount: 70, type: "health", date: "2023-05-19T10:00:00", color: "green"} ] refreshedTokenMessage: res.locals.refreshedTokenMessage})`
  - Returns a 400 error if the username passed as a route parameter does not represent a user in the database
  - Returns a 401 error if called by an authenticated user who is not the same user as the one in the route (authType = User) if the route is `/api/users/:username/transactions`
  - Returns a 401 error if called by an authenticated user who is not an admin (authType = Admin) if the route is `/api/transactions/users/:username`
  - Can be filtered by date and amount if the necessary query parameters are present and if the route is `/api/users/:username/transactions`
*/
export const getTransactionsByUser = async (req, res) => {
    try {
        //Distinction between route accessed by Admins or Regular users for functions that can be called by both
        //and different behaviors and access rights
        let filters;      
        if (req.url.indexOf("/transactions/users/") >= 0) {
            // admin authentication
            const {authorized, cause} = await verifyAuthAdmin(req, res);
            if(!authorized) return res.status(401).json({error: cause})

            filters = {};                        
        } else {
            // regular user authentication            
            const {authorized, cause} = await verifyAuthUser(req, res);            
            if(!authorized) return res.status(401).json({error: cause})

            const amountFilter = handleAmountFilterParams(req);
            const dateFilter = handleDateFilterParams(req);

            filters = {$and : []}

            filters["$and"].push(amountFilter);
            filters["$and"].push(dateFilter);
        }                  

        const {username} = req.params;

        // check if username passed in params represents a user in the database
        let result = await User.countDocuments({username});
        if(result !== 1){
            return res.status(400).json({ error : "User does not exist"});
        }
            
        const projection = {
            _id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, "category.color" : 1
        }

        result = await transactions.aggregate(
            [{
                $match : filters
            },{
                $lookup : {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "category"
                }
            },
            {
                $project : projection
            }]
        );        

        result = result.map(transaction => {
            return {
            color : transaction.category[0].color,
            username : transaction.username,
            type : transaction.type,
            amount : transaction.amount,
            date : transaction.date}
        });

        res.status(200).json({
            data : result,
            refreshedTokenMessage: res.locals.refreshedTokenMessage
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Return all transactions made by a specific user filtered by a specific category
    - The behavior defined below applies only for the specified route
    - Request Parameters: A string equal to the `username` of the involved user, a string equal to the requested `category`
      - Example: `/api/users/Mario/transactions/category/food` (user route)
      - Example: `/api/transactions/users/Mario/category/food` (admin route)
    - Request Body Content: None
    - Response `data` Content: An array of objects, each one having attributes `username`, `type`, `amount`, `date` and `color`, filtered so that `type` is the same for all objects
      - Example: `res.status(200).json({data: [{username: "Mario", amount: 100, type: "food", date: "2023-05-19T00:00:00", color: "red"} ] refreshedTokenMessage: res.locals.refreshedTokenMessage})`
    - Returns a 400 error if the username passed as a route parameter does not represent a user in the database
    - Returns a 400 error if the category passed as a route parameter does not represent a category in the database
    - Returns a 401 error if called by an authenticated user who is not the same user as the one in the route (authType = User) if the route is `/api/users/:username/transactions/category/:category`
    - Returns a 401 error if called by an authenticated user who is not an admin (authType = Admin) if the route is `/api/transactions/users/:username/category/:category`
*/
export const getTransactionsByUserByCategory = async (req, res) => {
    try {  
        
        if (req.url.indexOf("/transactions/users/") >= 0) {
            // admin authentication
            const {authorized, cause} = await verifyAuthAdmin(req, res);
            if(!authorized) return res.status(401).json({error: cause})                       
        } else {
            // regular user authentication
            const {authorized, cause} = await verifyAuthUser(req, res);
            if(!authorized) return res.status(401).json({error: cause})
        }       

        const {username, category : type} = req.params;

        // check if username passed in params represents a user in the database
        let result = await User.countDocuments({username});
        if(result !== 1){
            return res.status(400).json({ error : "User does not exist" });
        }

        // check if category passed in params represents a category in the database
        result = await categories.countDocuments({type});
        if(result !== 1){
            return res.status(400).json({ error : "Category does not exist" })
        }

        const projection = {
            _id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, category : 1
        }

        result = await transactions.aggregate(
            [
                {
                    $match : {
                        type
                    }    
                },
                {
                    $lookup : {
                        from: "categories",
                        localField: "type",
                        foreignField: "type",
                        as: "category"
                    }
                },
                {
                    $project : projection
                }
            ]
        );

        result = result.map(transaction => {
            return {
            color : transaction.category[0].color,
            username : transaction.username,
            type : transaction.type,
            amount : transaction.amount,
            date : transaction.date}
        });

        res.status(200).json({
            data : result,
            refreshedTokenMessage: res.locals.refreshedTokenMessage
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Return all transactions made by members of a specific group
  - Request Parameters: A string equal to the `name` of the requested group, a string equal to the requested `category`
    - Example: `/api/groups/Family/transactions/category/food` (user route)
    - Example: `/api/transactions/groups/Family/category/food` (admin route)
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `type`, `amount`, `date` and `color`, filtered so that `type` is the same for all objects.
    - Example: `res.status(200).json({data: [{username: "Mario", amount: 100, type: "food", date: "2023-05-19T00:00:00", color: "red"}, {username: "Luigi", amount: 20, type: "food", date: "2023-05-19T10:00:00", color: "red"} ] refreshedTokenMessage: res.locals.refreshedTokenMessage})`
  - Returns a 400 error if the group name passed as a route parameter does not represent a group in the database
  - Returns a 400 error if the category passed as a route parameter does not represent a category in the database
  - Returns a 401 error if called by an authenticated user who is not part of the group (authType = Group) if the route is `/api/groups/:name/transactions/category/:category`
  - Returns a 401 error if called by an authenticated user who is not an admin (authType = Admin) if the route is `/api/transactions/groups/:name/category/:category`
*/ 
export const getTransactionsByGroup = async (req, res) => {
    try {

        if (req.url.indexOf("/transactions/groups/") >= 0) {
            // admin authentication
            const {authorized, cause} = await verifyAuthAdmin(req, res);
            if(!authorized) return res.status(401).json({error: cause})                       
        } else {
            // regular user authentication
            const {authorized, cause} = await verifyAuthGroup(req, res);
            if(!authorized) return res.status(401).json({error: cause})
        }   

        // check if group exists
        const {name} = req.params;  

        let result = await Group.findOne({name});        
        if(!result){
            return res.status(401).json({ error : "Group does not exist" })
        }

        const { members } = result;

        // get transactions
        const projection = {
            _id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, category : 1
        }

        result = await transactions.aggregate(
            [
                {
                    $match : {
                        username : {
                            $in : members
                        }
                    }    
                },
                {
                    $lookup : {
                        from: "categories",
                        localField: "type",
                        foreignField: "type",
                        as: "category"
                    }
                },
                {
                    $project : projection
                }
            ]
        );

        result = result.map(transaction => {
            return {
            color : transaction.category[0].color,
            username : transaction.username,
            type : transaction.type,
            amount : transaction.amount,
            date : transaction.date}
        });

        res.status(200).json({
            data : result,
            refreshedTokenMessage: res.locals.refreshedTokenMessage
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Return all transactions made by members of a specific group filtered by a specific category
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `type`, `amount`, `date` and `color`, filtered so that `type` is the same for all objects.
  - Optional behavior:
    - error 401 is returned if the group or the category does not exist
    - empty array must be returned if there are no transactions made by the group with the specified category
 */
export const getTransactionsByGroupByCategory = async (req, res) => {

    function Query(username, type, amount, date, color) {
        this.username = username
        this.type = type
        this.amount = amount
        this.date = date
        this.color = color
    }

    try {
        /**
         * MongoDB equivalent to the query 
         * 
         * SELECT USERNAME, TYPE, AMOUNT, DATE, COLOR
         * FROM TRANSACTION, USER, GROUP, CATEGORIES
         * WHERE USER.USERNAME = TRANSACTION.USERNAME AND
         * USER.USERNAME = GROUP.USERNAME AND
         * GROUP.NAME = $GROUPNAME AND 
         * TRANSACTION.TYPE = CATEGORIES.TYPE AND
         * CATEGORIES.TYPE = $CATEGORYTYPE
         * 
         *  */      

        const groupName = req.params.name
        const categoryType = req.params.category

        let members = await Group.findOne({ name: groupName })
        .select('members')
        .populate('members.user')

        if(!members) {
            return res.status(400).json({ message: "group or category does not exist" })
        }

        members = members.members.map( item => item.user.username)

        // checking privileges
        const regexp = new RegExp('/transactions/groups/(.*)/category/(.*)')
        
        const userAuthInfo = await verifyAuthUser(req, res)
        const adminAuthInfo = await verifyAuthAdmin(req, res)
        const groupAuthInfo = await verifyAuthGroup(req, res, groupName)

        // TODO: try with unregistered user
        if ( !req.path.match(regexp) ) { // user path
            if ( !userAuthInfo.authorized ) {
                return res.status(401).json({ message: userAuthInfo.cause })
            }
            if ( !adminAuthInfo.authorized && !groupAuthInfo.authorized) {
                return res.status(401).json({ message: groupAuthInfo.cause })
            }
            if ( !userAuthInfo.authorized && !adminAuthInfo.authorized) {
                return res.status(401).json({ message: 'unauthorized' })
            }
        } else {    //admin path
            if ( !adminAuthInfo.authorized ) {
                return res.status(401).json({ message: adminAuthInfo.cause })
            }
        }

        const query = await transactions.aggregate([
            {
                $match: {
                "username": {$in: members}
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            { $match: {type: categoryType}},
            { $unwind: "$categories_info" }
        ])
        .then( result => {            
            result = result.map( item => new Query(item.username, item.type, item.amount, item.date, item.categories_info.color))
            res.json( createAPIobj(result, res) )
        })
        .catch( err => {
            throw err
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Delete a transaction made by a specific user
  - Request Body Content: The `_id` of the transaction to be deleted
  - Response `data` Content: A string indicating successful deletion of the transaction
  - Optional behavior:
    - error 401 is returned if the user or the transaction does not exist
    TODO
        - check if the error is correct
 
   */
export const deleteTransaction = async (req, res) => {
    try {
        const cookie = req.cookies
        let onlyMine = undefined
        const userAuthInfo = await verifyAuthUser(req, res)
        const adminAuthInfo = await verifyAuthAdmin(req, res)  
        if( !userAuthInfo.authorized ) {
            return res.status(401).json({ message: userAuthInfo.cause })
        }
        if( userAuthInfo.authorized && !adminAuthInfo.authorized) {
            if((await User.findOne({refreshToken: cookie.refreshToken}, {_id: 0, username: 1})).username != req.params.username) {
                return res.status(401).json({ message: 'unauthorized' })
                // TOBE checked with the new requirements
            }
        }
        if ( !(await User.countDocuments( {username: req.params.username})) )
            return res.status(400).json({ message: "user does not exist" })     

        const query = { _id: mongoose.Types.ObjectId(req.body.id), username: req.params.username }
        const data = await transactions.deleteOne(query);
        // const data = await transactions.countDocuments(query);
        /*
            TODO        
            eventually adding another error according to new requirements
            if I can not delete the transaction by id because it is not mine
            this error is catched by next check now
        */
        if ( data.deletedCount === 0 )
            return res.status(400).json({ message: "transaction does not exist" })

        res.json(createAPIobj('deleted', res));
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/**
 * Delete multiple transactions identified by their ids
  - Request Body Content: An array of strings that lists the `_ids` of the transactions to be deleted
  - Response `data` Content: A message confirming successful deletion
  - Optional behavior:
    - error 401 is returned if at least one of the `_ids` does not have a corresponding transaction. Transactions that have an id are not deleted in this case
 */
export const deleteTransactions = async (req, res) => {
    try {
        const userAuthInfo = await verifyAuthUser(req, res)
        const adminAuthInfo = await verifyAuthAdmin(req, res)

        if(!userAuthInfo.authorized) {
            return res.status(401).json({ message: userAuthInfo.cause })
        }
        if(!adminAuthInfo.authorized) {
            return res.status(401).json({ message: adminAuthInfo.cause })
        }

        const {_id} = req.body
        for(let id of _id) {
            if(!await transactions.countDocuments({_id: id})) {
                return res.status(400).json({ message: `${id} id does not exist` })
            }
        }
        const res = await transactions.deleteMany( {_id: {$in: _id} } )
        console.log(res)
        
        res.json(createAPIobj('deleted', res))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
