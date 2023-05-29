import request from 'supertest';
import { app } from '../app';
import { categories, transactions } from '../models/model';
import * as utils from '../controllers/utils';
import { Group, User } from '../models/User';
import { getTransactionsByUserByCategory, getTransactionsByUser, getAllTransactions } from '../controllers/controller';
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
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("updateCategory", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("deleteCategory", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("getCategories", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("createTransaction", () => { 
    test('Dummy test, change it', () => {
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
                username : "johnDoe",
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

        jest.spyOn(utils, "verifyAuthUser").mockResolvedValue({
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

        jest.spyOn(utils, "verifyAuthAdmin").mockResolvedValue({
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

        jest.spyOn(utils, "verifyAuthAdmin").mockResolvedValue({
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

        jest.spyOn(utils, "verifyAuthAdmin").mockResolvedValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([
            {username : "johnDoe", type : "testCategory", date : "test-date", amount : 0, category : [{color : "blue"}]},
            {username : "johnDoe", type : "testCategory", date : "test-date", amount : 1, category : [{color : "red"}]},
        ]);

        await getTransactionsByUser(req, res);

        expect(utils.verifyAuthAdmin).toHaveBeenCalled();
        expect(User.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [
                {username : "johnDoe", color : "blue", type : "testCategory", amount : 0, date : "test-date"},
                {username : "johnDoe", color : "red", type : "testCategory", amount : 1, date : "test-date"}
            ],
            refreshedTokenMessage : "dummy message"
        });
    });

    test("Should return an error indicating that the user specified by params does not exist (authorized as a user)", async () => {

        // called by user
        req.url = `/users/${req.params.username}/transactions`;

        jest.spyOn(utils, "verifyAuthUser").mockResolvedValue({
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

        jest.spyOn(utils, "verifyAuthUser").mockResolvedValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([
            {username : "johnDoe", type : "testCategory", date : "test-date", amount : 0, category : [{color : "blue"}]},
            {username : "johnDoe", type : "testCategory", date : "test-date", amount : 1, category : [{color : "red"}]},
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
                {username : "johnDoe", color : "blue", type : "testCategory", amount : 0, date : "test-date"},
                {username : "johnDoe", color : "red", type : "testCategory", amount : 1, date : "test-date"}
            ],
            refreshedTokenMessage : "dummy message"
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
                username : "johnDoe",
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

        jest.spyOn(utils, "verifyAuthUser").mockResolvedValue({
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

        jest.spyOn(utils, "verifyAuthAdmin").mockResolvedValue({
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

        jest.spyOn(utils, "verifyAuthAdmin").mockResolvedValue({
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

        jest.spyOn(utils, "verifyAuthAdmin").mockResolvedValue({
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

        jest.spyOn(utils, "verifyAuthAdmin").mockResolvedValue({
            authorized : true,
            cause : "Authorized"
        });

        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(categories, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([
            {username : "johnDoe", type : "testCategory", date : "test-date", amount : 0, category : [{color : "red"}]},
            {username : "johnDoe", type : "testCategory", date : "test-date", amount : 1, category : [{color : "red"}]},
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
                {username : "johnDoe", color : "red", type : "testCategory", amount : 0, date : "test-date"},
                {username : "johnDoe", color : "red", type : "testCategory", amount : 1, date : "test-date"}
            ],
            refreshedTokenMessage : "dummy message"
        });
    });
})

describe("getTransactionsByGroup", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("getTransactionsByGroupByCategory", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("deleteTransaction", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("deleteTransactions", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})
