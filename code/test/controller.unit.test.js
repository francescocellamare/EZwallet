import request from 'supertest';
import { app } from '../app';
import { categories, transactions } from '../models/model';
import { Group, User } from '../models/User';
import { getTransactionsByUserByCategory } from '../controllers/controller';

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
})

describe("getTransactionsByUser", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
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
                message : "dummy message"
            },
            status : jest.fn().mockReturnThis(),
            json : jest.fn()
        }
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test("should return an error indicating that the user does not exist", async () => {

        // number of users with the provided email is zero
        jest.spyOn(User, "countDocuments").mockResolvedValue(0);

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(User.countDocuments).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            data : {},
            message : "User does not exist"
        });
    });

    test("should return an error indicating that the catrgory does not exist", async () => {

        // number of users with the provided email is zero
        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(categories, "countDocuments").mockResolvedValue(0);

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(User.countDocuments).toHaveBeenCalled();
        expect(categories.countDocuments).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            data : {},
            message : "Category does not exist"
        });
    });

    test("should return an empty list of transactions", async () => {

        // number of users with the provided email is zero
        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(categories, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([]);

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(User.countDocuments).toHaveBeenCalled();
        expect(categories.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [],
            message : "dummy message"
        });
    });

    test("should return a list of transactions", async () => {

        // number of users with the provided email is zero
        jest.spyOn(User, "countDocuments").mockResolvedValue(1);
        jest.spyOn(categories, "countDocuments").mockResolvedValue(1);
        jest.spyOn(transactions, "aggregate").mockResolvedValue([
            {username : "johnDoe", type : "testCategory", date : "test-date", amount : 0, category : [{color : "blue"}]},
            {username : "johnDoe", type : "testCategory", date : "test-date", amount : 1, category : [{color : "red"}]},
        ]);

        // call function under test
        await getTransactionsByUserByCategory(req, res);

        expect(User.countDocuments).toHaveBeenCalled();
        expect(categories.countDocuments).toHaveBeenCalled();
        expect(transactions.aggregate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data : [
                {username : "johnDoe", color : "blue", type : "testCategory", amount : 0, date : "test-date"},
                {username : "johnDoe", color : "red", type : "testCategory", amount : 1, date : "test-date"}
            ],
            message : "dummy message"
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
