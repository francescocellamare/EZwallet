import { categories, transactions } from '../models/model';
import * as utils from '../controllers/utils';
import { Group, User } from '../models/User';
import mongoose from "mongoose";
import { getTransactionsByGroupByCategory, deleteTransaction, deleteTransactions, getTransactionsByGroup , getTransactionsByUserByCategory, getTransactionsByUser, getAllTransactions } from '../controllers/controller';
import { response } from 'express';

jest.mock('../models/model');

beforeEach(() => {
  categories.find.mockClear();
  categories.prototype.save.mockClear();
  transactions.find.mockClear();
  transactions.deleteOne.mockClear();
  transactions.aggregate.mockClear();
  transactions.prototype.save.mockClear();
});

describe("createCategory", () => { 
    test('dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("updateCategory", () => { 
    test('dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("deleteCategory", () => { 
    test('dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("getCategories", () => { 
    test('dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("createTransaction", () => { 
    test('dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("getAllTransactions", () => { 
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('T1: get all transactions by all users but there are none -> should return an empty array', async () => {
        const mockReq = {}
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const emptyDb = []
        jest.spyOn(transactions, 'aggregate').mockReturnValue(Promise.resolve(emptyDb))

        await getAllTransactions(mockReq, mockRes)

        expect(mockRes.json.mock.calls[0][0]).toEqual([])
        expect(mockRes.json.mock.calls[0][0]).toHaveLength(0)
    });

    test('T2: get all transactions by all users and there is at least one transaction -> should return a proper array of object', async () => {
        const mockReq = {}
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const expectedValue = [
            {
                "username": "user1",
                "type": "investment",
                "amount": 150,
                "date": "01/01/2023",
                "categories_info": {
                    "type": 'bills',
                    "color": '#111111'
                }
            },
            {
                "username": "user2",
                "type": "bills",
                "amount": 350,
                "date": "01/01/2023",
                "categories_info": {
                    "type": 'bills',
                    "color": '#222222'
                }
            },
            {
                "username": "user2",
                "type": "investment",
                "amount": 250,
                "date": "01/01/2023",
                "categories_info": {
                    "type": 'bills',
                    "color": '#222222'
                }
            }
        ]
        jest.spyOn(transactions, 'aggregate').mockReturnValue(Promise.resolve(expectedValue))
        await getAllTransactions(mockReq, mockRes)

        expect(transactions.aggregate).toHaveBeenCalledTimes(1)
        expect(mockRes.json).toBeDefined()
        expect(mockRes.json.mock.calls[0][0]).toHaveLength(3)
        
        expect(mockRes.json.mock.calls[0][0][0]).toHaveProperty('username')
        expect(mockRes.json.mock.calls[0][0][0]).toHaveProperty('type')
        expect(mockRes.json.mock.calls[0][0][0]).toHaveProperty('amount')
        expect(mockRes.json.mock.calls[0][0][0]).toHaveProperty('date')
        expect(mockRes.json.mock.calls[0][0][0]).toHaveProperty('color')

        expect(mockRes.json).toHaveBeenCalledWith([
            {
                "username": "user1",
                "type": "investment",
                "amount": 150,
                "date": "01/01/2023",
                "color": "#111111"
            },
            {
                "username": "user2",
                "type": "bills",
                "amount": 350,
                "date": "01/01/2023",
                "color": "#222222"
            },
            {
                "username": "user2",
                "type": "investment",
                "amount": 250,
                "date": "01/01/2023",
                "color": "#222222"
            }
        ])
    })

    test('T3: transactions.aggregate() throws an error', async () => {
        const mockReq = {}
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.spyOn(transactions, 'aggregate').mockImplementationOnce( () => {
            const err = new Error('transactions aggregate error');
            throw err 
        })
        await getAllTransactions(mockReq, mockRes)
        expect(mockRes.status).toHaveBeenCalledWith(500)
    })
})

describe("getTransactionsByUser", () => { 
    
    let req;
    let res;

    beforeEach(() => {

        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            }
        }

        // mock response
        res = {
            locals : {
                refreshedTokenMessage : "dummy message"
            },
            status : jest.fn().mockReturnThis(),
            json : jest.fn()
        }
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })
    
    test("Should return an error indicating that the user is not authorized", async () => {

        // called by user
        req.url = `/users/${req.params.username}/transactions`;

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : false,
            cause : "dummy error"
        });

        // call function under test
        await getTransactionsByUser(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that the user is not authorized or not an admin", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : false,
            cause : "dummy error"
        });

        // call function under test
        await getTransactionsByUser(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that the user specified by params does not exist (authorized as an admin)", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(0);

        // call function under test
        await getTransactionsByUser(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "User does not exist"
        });
    });

    test("Should return a list of transactions (authorized as an admin)", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([
            {username : "dummy_user_1", type : "testCategory", date : "test-date", amount : 0, category : [{color : "blue"}]},
            {username : "dummy_user_1", type : "testCategory", date : "test-date", amount : 1, category : [{color : "red"}]},
        ]);

        await getTransactionsByUser(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalledWith([
            {$match : {}},
            {$lookup : {from: "categories", localField: "type", foreignField: "type", as: "category"}}, 
            {$project : {_id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, "category.color" : 1}}
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [
                {username : "dummy_user_1", color : "blue", type : "testCategory", amount : 0, date : "test-date"},
                {username : "dummy_user_1", color : "red", type : "testCategory", amount : 1, date : "test-date"}
            ],
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an empty list (authorized as an admin)", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([]);

        await getTransactionsByUser(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalledWith([
            {$match : {}},
            {$lookup : {from: "categories", localField: "type", foreignField: "type", as: "category"}}, 
            {$project : {_id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, "category.color" : 1}}
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [],
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an error indicating that the user specified by params does not exist (authorized as a user)", async () => {

        // called by user
        req.url = `/users/${req.params.username}/transactions`;

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(utils, "handleAmountFilterParams").mockReturnValue({
            amount : {dummyOp : "dummyVal"}
        });            
        jest.spyOn(utils, "handleDateFilterParams").mockReturnValue({
            date : {dummyOp : "dummyVal"}
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(0);

        // call function under test
        await getTransactionsByUser(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(utils.handleDateFilterParams).toHaveBeenCalled();
        expect(utils.handleAmountFilterParams).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "User does not exist"
        });
    });

    test("Should return a list of transactions (authorized as a user)", async () => {

        // called by user
        req.url = `/users/${req.params.username}/transactions`;

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([
            {username : "dummy_user_1", type : "testCategory", date : "test-date", amount : 0, category : [{color : "blue"}]},
            {username : "dummy_user_1", type : "testCategory", date : "test-date", amount : 1, category : [{color : "red"}]},
        ]);

        await getTransactionsByUser(req, res);        

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalledWith([
            {$match : {$and : [{amount : {dummyOp : "dummyVal"}},{date : {dummyOp : "dummyVal"}}]}},
            {$lookup : {from: "categories", localField: "type", foreignField: "type", as: "category"}}, 
            {$project : {_id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, "category.color" : 1}}
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [
                {username : "dummy_user_1", color : "blue", type : "testCategory", amount : 0, date : "test-date"},
                {username : "dummy_user_1", color : "red", type : "testCategory", amount : 1, date : "test-date"}
            ],
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an empty list (authorized as a user)", async () => {

        // called by user
        req.url = `/users/${req.params.username}/transactions`;

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([]);

        await getTransactionsByUser(req, res);        

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalledWith([
            {$match : {$and : [{amount : {dummyOp : "dummyVal"}},{date : {dummyOp : "dummyVal"}}]}},
            {$lookup : {from: "categories", localField: "type", foreignField: "type", as: "category"}}, 
            {$project : {_id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, "category.color" : 1}}
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [],
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an error caused by an exception (authorized as an admin)", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockImplementation(() => {
            throw new Error('dummy exception');
          });

        // call function under test
        await getTransactionsByUser(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy exception"
        });
    });

})

describe("getTransactionsByUserByCategory", () => { 

    let req;
    let res;

    beforeEach(() => {

        // mock request
        req = {
            params : {
                username : "dummy_user_1",
                category : "testCategory"
            }
        }

        // mock response
        res = {
            locals : {
                refreshedTokenMessage : "dummy message"
            },
            status : jest.fn().mockReturnThis(),
            json : jest.fn()
        }
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test("Should return an error indicating that the user is not authorized", async () => {

        // called by user
        req.url = `/users/${req.params.username}/transactions`;

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : false,
            cause : "dummy error"
        });

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that the user is not authorized or not an admin", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : false,
            cause : "dummy error"
        });

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that the user specified by params does not exist (auth type doesn't matter)", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(0);

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "User does not exist"
        });
    });

    test("Should return an error indicating that the category specified by params does not exist (auth type doesn't matter)", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(categories, "countDocuments").mockResolvedValue(0);

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(categories.countDocuments).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "Category does not exist"
        });
    });

    test("Should return a list of transactions (auth type doesn't matter)", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(categories, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([
            {username : "dummy_user_1", type : "testCategory", date : "test-date", amount : 0, category : [{color : "red"}]},
            {username : "dummy_user_1", type : "testCategory", date : "test-date", amount : 1, category : [{color : "red"}]},
        ]);

        await getTransactionsByUserByCategory(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(categories.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalledWith([
            {$match : {type : "testCategory"}},
            {$lookup : {from: "categories", localField: "type", foreignField: "type", as: "category"}},
            {$project : {_id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, category : 1}}
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [
                {username : "dummy_user_1", color : "red", type : "testCategory", amount : 0, date : "test-date"},
                {username : "dummy_user_1", color : "red", type : "testCategory", amount : 1, date : "test-date"}
            ],
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an empty list (auth type doesn't matter)", async () => {

        // called by admin
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(categories, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([]);

        await getTransactionsByUserByCategory(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(categories.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalledWith([
            {$match : {type : "testCategory"}},
            {$lookup : {from: "categories", localField: "type", foreignField: "type", as: "category"}},
            {$project : {_id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, category : 1}}
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [],
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an error caused by an exception (auth type doesn't matter)", async () => {

        // called by user
        req.url = `/users/${req.params.username}/transactions`;

        jest.spyOn(utils, "verifyAuthUser").mockImplementation(() => {
            throw new Error('dummy exception');
        });

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy exception"
        });
    });
})

describe("getTransactionsByGroup", () => { 

    let req;
    let res;

    beforeEach(() => {

        // mock request
        req = {
            params : {
                username : "dummy_user_1",
                category : "testCategory"
            }
        }

        // mock response
        res = {
            locals : {
                refreshedTokenMessage : "dummy message"
            },
            status : jest.fn().mockReturnThis(),
            json : jest.fn()
        }
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test("Should return an error indicating that the user is not authorized or not and admin", async () => {

        // called by an admin
        req.url = `/transactions/groups/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : false,
            cause : "dummy error"
        });

        // call function under test
        await getTransactionsByGroup(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that the user is not authorized or not a member of the group", async () => {

        // called by group member
        req.url = `/transactions/users/`;

        jest.spyOn(utils, "verifyAuthGroup").mockResolvedValue({
            authorized : false,
            cause : "dummy error"
        });

        // call function under test
        await getTransactionsByGroup(req, res);

        expect(utils.verifyAuthGroup).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that the group specified in the request params does not exist (authorization does not matter)", async () => {

        // called by an admin (does not matter, functionality for both auth types is the same)
        req.url = `/transactions/groups/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        jest.spyOn(Group, "findOne").mockResolvedValue(null)

        // call function under test
        await getTransactionsByGroup(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(Group.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "Group does not exist"
        });
    });

    
    test("Should return a list of transactions (authorization does not matter)", async () => {
        
        // called by an admin (does not matter, functionality for both auth types is the same)
        req.url = `/transactions/groups/`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });        
        
        jest.spyOn(Group, "findOne").mockResolvedValue({
            name : "dummy_name",
            members : ["dummy_member_1", "dummy_member_2"]
        })
        
        jest.spyOn(transactions, "aggregate").mockResolvedValue([
            {username : "dummy_member_1", type : "testCategory", date : "test-date", amount : 0, category : [{color : "red"}]},
            {username : "dummy_member_2", type : "testCategory", date : "test-date", amount : 1, category : [{color : "red"}]},
        ]);
        
        // call function under test
        await getTransactionsByGroup(req, res);
        
        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(Group.findOne).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalledWith([
            {$match : {username : {$in : ["dummy_member_1", "dummy_member_2"]}}},
            {$lookup : {from: "categories", localField: "type", foreignField: "type", as: "category"}},
            {$project : {_id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, category : 1}}
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [
                {username : "dummy_member_1", color : "red", type : "testCategory", amount : 0, date : "test-date"},
                {username : "dummy_member_2", color : "red", type : "testCategory", amount : 1, date : "test-date"}
            ],
            refreshedTokenMessage : "dummy message"
        });
    });
    
    test("Should return an empty list (authorization does not matter)", async () => {
    
        // called by an admin (does not matter, functionality for both auth types is the same)
        req.url = `/transactions/groups/`;
    
        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });        
    
        jest.spyOn(Group, "findOne").mockResolvedValue({
            name : "dummy_name",
            members : ["dummy_member_1", "dummy_member_2"]
        })
    
        jest.spyOn(transactions, "aggregate").mockResolvedValue([]);
    
        // call function under test
        await getTransactionsByGroup(req, res);
    
        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(Group.findOne).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalledWith([
            {$match : {username : {$in : ["dummy_member_1", "dummy_member_2"]}}},
            {$lookup : {from: "categories", localField: "type", foreignField: "type", as: "category"}},
            {$project : {_id: 0, username : 1, type : 1, amount : 1, date : 1, color : 1, category : 1}}
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [],
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an error caused by an exception (auth type doesn't matter)", async () => {

        // called by an admin (does not matter, functionality for both auth types is the same)
        req.url = `/transactions/groups/`;
    
        jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(() => {
            throw new Error('dummy exception');
        });

        // call function under test
        await getTransactionsByGroup(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy exception"
        });
    });
})

describe("getTransactionsByGroupByCategory", () => { 
    let req;
    let res;

    beforeEach(() => {

        // mock request
        req = {
            params : {
                name : "dummy_group",
                category : "dummy_category"
            }
        }

        // mock response
        res = {
            locals : {
                refreshedTokenMessage : "dummy message"
            },
            status : jest.fn().mockReturnThis(),
            json : jest.fn()
        }
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test("Should return an error indicating that the user is not authorized", async () => {
        
        // called by user
        req.url = `/transactions/groups/${req.params.name}/category/${req.params.name}`;

        jest.spyOn(utils, "verifyAuthGroup").mockResolvedValue({
            authorized : false,
            cause : "dummy error"
        });

        await getTransactionsByGroupByCategory(req, res);
        
        expect(utils.verifyAuthGroup).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that the user is not authorized", async () => {
        
        // called by group
        req.url = `/groups/${req.params.name}/transactions/category/${req.params.name}`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : false,
            cause : "dummy error"
        });

        await getTransactionsByGroupByCategory(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that the group does not exist (auth type doesn't matter)", async () => {
        
        // called by group (doesn't matter as both auth types have the same functionality)
        req.url = `/groups/${req.params.name}/transactions/category/${req.params.name}`;

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        // jest.spyOn(Group, "findOne").mockReturnValue({
        //     name : req.params.name,
        //     members : ["dummy_user_1", "dummy_user_2"]
        // });
            
        jest.spyOn(Group, "findOne").mockResolvedValue(null);

        await getTransactionsByGroupByCategory(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(Group.findOne).toHaveBeenCalled();
        // expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "group does not exist"
        });
    });
})

describe("deleteTransaction", () => { 
    let req;
    let res;

    beforeEach(() => {
        // mock response
        res = {
            locals : {
                refreshedTokenMessage : "dummy message"
            },
            status : jest.fn().mockReturnThis(),
            json : jest.fn()
        }
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test("Should return an error indicating that the user is not authorized", async () => {
        
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                id : "dummy_id"
            }
        }

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : false,
            cause : "dummy error"
        });

        // call function under test
        await deleteTransaction(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that not all attributes in body are present", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {}
        }

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        // call function under test
        await deleteTransaction(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "body does not contain all the necessary attributes"
        });
    });

    test("Should return an error indicating that the user was not found", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                id : "dummy_id"
            }
        }

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        jest.spyOn(User, "findOne").mockResolvedValue(null);

        // call function under test
        await deleteTransaction(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "user not found"
        });
    });

    test("Should return an error indicating that the transaction was not found", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                id : "dummy_id"
            }
        }

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        jest.spyOn(User, "findOne").mockResolvedValue({
            username : "dummy_user",
            email : "dummy_user@test.com",
            password : "dummy_hash",
            role : "dummy_role",
            refreshToken : "dummy_token"
        });

        jest.spyOn(transactions, "findOne").mockResolvedValue(null)

        // call function under test
        await deleteTransaction(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalled();
        expect(transactions.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "transaction not found"
        });
    });

    test("Should return an error indicating that the transaction does not exist (failed to delete it)", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                id : "dummy_id"
            }
        }

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        jest.spyOn(User, "findOne").mockResolvedValue({
            username : "dummy_user",
            email : "dummy_user@test.com",
            password : "dummy_hash",
            role : "dummy_role",
            refreshToken : "dummy_token"
        });

        jest.spyOn(transactions, "findOne").mockResolvedValue({
            username : "dummy_user",
            type : "dummy_category",
            data : "dummy_date",
            amount : 0
        })

        jest.spyOn(mongoose.Types, "ObjectId").mockReturnValue(
            {}
        )

        jest.spyOn(transactions, "deleteOne").mockResolvedValue({
            deletedCount : 0
        })

        // call function under test
        await deleteTransaction(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalled();
        expect(transactions.findOne).toHaveBeenCalled();
        expect(transactions.deleteOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "transaction does not exist"
        });
    });

    test("Should return a message indicating that the transaction was deleted", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                id : "dummy_id"
            }
        }

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        jest.spyOn(User, "findOne").mockResolvedValue({
            username : "dummy_user",
            email : "dummy_user@test.com",
            password : "dummy_hash",
            role : "dummy_role",
            refreshToken : "dummy_token"
        });

        jest.spyOn(transactions, "findOne").mockResolvedValue({
            username : "dummy_user",
            type : "dummy_category",
            data : "dummy_date",
            amount : 0
        })

        jest.spyOn(mongoose.Types, "ObjectId").mockReturnValue(
            {}
        )

        jest.spyOn(transactions, "deleteOne").mockResolvedValue({
            deletedCount : 1
        })

        // call function under test
        await deleteTransaction(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalled();
        expect(transactions.findOne).toHaveBeenCalled();
        expect(transactions.deleteOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : {
                message : "Transaction deleted"
            },
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an error caused by an exception", async () => {

        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                id : "dummy_id" 
            }
        }

        jest.spyOn(utils, "verifyAuthUser").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        jest.spyOn(User, "findOne").mockImplementation(() => {
            throw new Error('dummy exception');
        });

        // call function under test
        await deleteTransaction(req, res);

        expect(utils.verifyAuthUser).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy exception"
        });
    });
})

describe("deleteTransactions", () => { 

    let req;
    let res;

    beforeEach(() => {
        // mock response
        res = {
            locals : {
                refreshedTokenMessage : "dummy message"
            },
            status : jest.fn().mockReturnThis(),
            json : jest.fn()
        }
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test("Should return an error indicating that the user is not authorized", async () => {
        
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                id : "dummy_id"
            }
        }

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : false,
            cause : "dummy error"
        });

        // call function under test
        await deleteTransactions(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy error"
        });
    });

    test("Should return an error indicating that not all attributes in body are present", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {}
        }

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });

        // call function under test
        await deleteTransactions(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "body does not contain all the necessary attributes"
        });
    });

    test("Should return an error indicating that the IDs are not valid", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                _ids : ["", "dummy_id_2"]
            }
        }

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });        

        // call function under test
        await deleteTransactions(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "input _ids are not valid"
        });
    });

    test("Should return an error indicating that some of the IDs are not found", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                _ids : ["dummy_id_1", "dummy_id_2", "dummy_id_3"]
            }
        }

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });  
        
        jest.spyOn(transactions, "find").mockResolvedValue([{_id : "dummy_id_1"}]);        

        // call function under test
        await deleteTransactions(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();        
        expect(transactions.find).toHaveBeenCalled(); 
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "the following transactions don't exist : dummy_id_2,dummy_id_3"
        });
    });


    test("Should return an error indicating that all of the IDs are not found", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                _ids : ["dummy_id_1", "dummy_id_2", "dummy_id_3"]
            }
        }

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });  
        
        jest.spyOn(transactions, "find").mockResolvedValue([]);        

        // call function under test
        await deleteTransactions(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();        
        expect(transactions.find).toHaveBeenCalled(); 
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error : "the following transactions don't exist : dummy_id_1,dummy_id_2,dummy_id_3"
        });
    });

    test("Should return a message indicating that the transactions were deleted", async () => {
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                _ids : ["dummy_id_1", "dummy_id_2", "dummy_id_3"]
            }
        }

        jest.spyOn(utils, "verifyAuthAdmin").mockReturnValue({
            authorized : true,
            cause : "authorized"
        });  
        
        jest.spyOn(transactions, "find").mockResolvedValue([
            {_id : "dummy_id_1"},
            {_id : "dummy_id_2"},
            {_id : "dummy_id_3"}
        ]);        

        jest.spyOn(transactions, "deleteMany").mockResolvedValue({
            deletedCount : 3
        });        

        // call function under test
        await deleteTransactions(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();        
        expect(transactions.find).toHaveBeenCalled(); 
        expect(transactions.deleteMany).toHaveBeenCalledWith({
            _id : {$in : ["dummy_id_1", "dummy_id_2", "dummy_id_3"]}
        }); 
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : {
                message : "Transactions deleted"
            },
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an error caused by an exception", async () => {
        
        // mock request
        req = {
            params : {
                username : "dummy_user_1",                
            },
            body : {
                id : "dummy_id"
            }
        }

        jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(() => {
            throw new Error('dummy exception');
        });

        // call function under test
        await deleteTransactions(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error : "dummy exception"
        });
    });
})
