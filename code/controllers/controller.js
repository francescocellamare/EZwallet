import { categories, transactions } from "../models/model.js";
import { Group, User } from "../models/User.js";
import { handleDateFilterParams, handleAmountFilterParams, verifyAuth } from "./utils.js";

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
  - Request Body Content: An object having attributes `type` and `color` equal to the new values to assign to the category
  - Response `data` Content: An object with parameter `message` that confirms successful editing and a parameter `count` that is equal to the count of transactions whose category was changed with the new type
  - Optional behavior:
    - error 401 returned if the specified category does not exist
    - error 401 is returned if new parameters have invalid values
 */
export const updateCategory = async (req, res) => {
    try {

        const {type} = req.params;
        const {type : newType, color : newColor} = req.body; 
        
        // check that the new type is not in use 
        if(newType !== type){            
            const result = await categories.countDocuments({
                type : newType
            });
        
            if(result >= 1){
                return res.status(401).json({
                    data : {},
                    message : "category type is already in use"
                });
            }   
        }
        
        // check if new value stayed the same
        if(newType == type && newColor == color){
            return res.status(400).json({
                data : {
                    message : "please provide new type and color"                    
                },
                message : res.locals.message
            })
        }

        // check if color is valid
        if(!/^#[a-fA-F0-9]{6}$/.test(newColor)){
            return res.status(400).json({
                data : {
                    message : "color should be a hexadecimal string"                    
                },
                message : res.locals.message
            })
        }

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
            return res.status(401).json({
                data : {},
                message : "the specified category does not exist"
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
                message : "succesfully update category",
                count : modifiedCount
            },
            message : res.locals.message
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/**
 * Delete a category
  - Request Body Content: An array of strings that lists the `types` of the categories to be deleted
  - Response `data` Content: An object with parameter `message` that confirms successful deletion and a parameter `count` that is equal to the count of affected transactions (deleting a category sets all transactions with that category to have `investment` as their new category)
  - Optional behavior:
    - error 401 is returned if the specified category does not exist
 */
export const deleteCategory = async (req, res) => {
    try {

        const {types} = req.body;
        
        // check if all specified categories exist
        let result = await categories.find({
            type : {
                $in : types
            }
        }).select({
            type : 1,
            _id : 0    
        });

        result = result.map(category => category.type);
        const notFound = types.filter(type => !result.includes(type));
        
        if(notFound.length !== 0){
            return res.status(401).json({
                data : {},
                message : `operation failed, the following categories don't exist : ${notFound.join(', ')}`
            })
        }

        // delete categories
        result = await categories.deleteMany({
            type : {
                $in : types
            }
        })        

        // update transactions that belong to deleted categories
        result = await transactions.updateMany(
            {
                type : {
                    $in : types
                }
            },
            {
                type : "investment"
            }
        )
        
        return res.status(200).json({
            data : {
                message : "successfully deleted categories",
                count : result.modifiedCount
            },
            message : ""
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
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
        res.status(400).json({ error: error.message })
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
        res.status(400).json({ error: error.message })
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
        /**
         * MongoDB equivalent to the query "SELECT * FROM transactions, categories WHERE transactions.type = categories.type"
         */
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
            let data = result.map(v => Object.assign({}, { _id: v._id, username: v.username, amount: v.amount, type: v.type, color: v.categories_info.color, date: v.date }))
            res.json(data);
        }).catch(error => { throw (error) })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/**
 * Return all transactions made by a specific user
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `type`, `amount`, `date` and `color`
  - Optional behavior:
    - error 401 is returned if the user does not exist
    - empty array is returned if there are no transactions made by the user
    - if there are query parameters and the function has been called by a Regular user then the returned transactions must be filtered according to the query parameters
 */
export const getTransactionsByUser = async (req, res) => {
    try {
        //Distinction between route accessed by Admins or Regular users for functions that can be called by both
        //and different behaviors and access rights
        let filters;        
        if (req.url.indexOf("/transactions/users/") >= 0) {
            // admin
            filters = {};                        
        } else {
            const amountOperations = handleAmountFilterParams(req);
            const dateOperations = handleDateFilterParams(req);

            filters = {
                $and : [...amountOperations, ...dateOperations]
            }       
        }        

        const {username} = req.params;

        // check if user exists
        let result = await User.countDocuments({username});
        if(result !== 1){
            return res.status(401).json({
                body : {},
                message : "User does not exist"
            })
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
            },
            {
                $unwind : "$category"
            }]
        );        

        result = result.map(transaction => {
            return {
            color : transaction.category.color,
            username : transaction.username,
            type : transaction.type,
            amount : transaction.amount,
            date : transaction.date}
        });

        res.status(200).json({
            data : result,
            message : ""
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/**
 * Return all transactions made by a specific user filtered by a specific category
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `type`, `amount`, `date` and `color`, filtered so that `type` is the same for all objects
  - Optional behavior:
    - empty array is returned if there are no transactions made by the user with the specified category
    - error 401 is returned if the user or the category does not exist
 */
export const getTransactionsByUserByCategory = async (req, res) => {
    try {     

        const {username, category : type} = req.params;

        // check if the user exists
        let result = await User.countDocuments({username});
        if(result !== 1){
            return res.status(401).json({
                body : {},
                message : "User does not exist"
            })
        }

        // check if the category exists
        result = await categories.countDocuments({type});
        if(result !== 1){
            return res.status(401).json({
                body : {},
                message : "Category does not exist"
            })
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
            message : ""
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/**
 * Return all transactions made by members of a specific group
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `type`, `amount`, `date` and `color`
  - Optional behavior:
    - error 401 is returned if the group does not exist
    - empty array must be returned if there are no transactions made by the group
 */
export const getTransactionsByGroup = async (req, res) => {
    try {

        // check if group exists
        const {name} = req.params;       
        let result = await Group.findOne({name});        
        if(!result){
            return res.status(401).json({
                body : {},
                message : "Group does not exist"
            })
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
            message : ""
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
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

    /*
        join over username or email ?
    */

    function Query(username, type, amount, date, color) {
        this.username = username
        this.type = type
        this.amount = amount
        this.date = date
        this.color = color
    }

    try {
        requested_username = 'asdasdsa'

        // /transactions/groups/:name/category/:category ADMIN
        // /groups/:name/transactions/category/:category USER


        // Check for Admin functionalities, return null --> USER 
        if ( !String(req.path).match(new RegExp('/transactions/groups/*')) && verifyAuth(req, res, {authType: 'User', username: requested_username})) {
            verifiedUser = 1
        }
        else if (verifyAuth(req, res)){
            verifiedAdmin = 1
        }

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
            return res.status(401).json({ message: "group or category does not exist" })
        }

        members = members.members.map( item => item.user.username)

        // checking user without admin privilegies
        if(verifiedUser && !verifiedAdmin && !members.includes(requested_username)) {
            res.status(401).json({ message: "Unauthorized" });
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
        res.status(400).json({ error: error.message })
    }
}

/**
 * Delete a transaction made by a specific user
  - Request Body Content: The `_id` of the transaction to be deleted
  - Response `data` Content: A string indicating successful deletion of the transaction
  - Optional behavior:
    - error 401 is returned if the user or the transaction does not exist
    TODO
        - user can only delete his own transactions
 
   */
export const deleteTransaction = async (req, res) => {
    try {
        const requested_username = 'asdasd'
        const cookie = req.cookies
        // if (!cookie.accessToken) {
        //     return res.status(401).json({ message: "Unauthorized" }) // unauthorized
        // }
        if (verifyAuth(req, res, {authType: 'User', username: requested_username})) {
            return res.status(401).json({ message: "Unauthorized" }) // unauthorized
        }

        if (!User.find( {username: req.params.username} ).count())
            return res.status(401).json({ message: "user does not exist" })
        if (!transactions.findById(req.body._id).count())
            return res.status(401).json({ message: "transaction does not exist" })
        let data = await transactions.deleteOne({ _id: req.body._id });
        res.json(createAPIobj('deleted', res));
    } catch (error) {
        res.status(400).json({ error: error.message })
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
        if(!verifyAuth(req, res, {authType: 'Admin'})) {
            return res.status(401).json({ message: "Unauthorized" }) // unauthorized
        }
        const {ids} = req.body
        for(id of ids) {
            if(!transactions.findById(id).count()) {
                return res.status(401).json({ message: "{0} id does not exist".format(id) })
            }
        }

        for(id of ids) {
            await transactions.deleteOne({ _id: id });
        }
        res.json(createAPIobj('deleted', res))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
