import request from 'supertest';
import { app } from '../app';
import { categories, transactions } from '../models/model';
import { Group } from '../models/User';
import { getTransactionsByGroupByCategory } from '../controllers/controller';

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
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("getTransactionsByUser", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("getTransactionsByUserByCategory", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("getTransactionsByGroup", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

describe("getTransactionsByGroupByCategory", () => { 
    test.failing('group name is an empty string, error 401 should be returned', async () => {
        const response = await request(app).get("/api/groups//transactions/category/Investmet")
        response.toThrow('group or category does not exist')
    });

    test.failing('group name does not exists, error 401 should be returned', async () => {
        const mockReq = {}
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(Group, "findOne").mockResolvedValue(res.status(401).json({ message: "group or category does not exist" }))
        const response = await getTransactionsByGroupByCategory(mockReq, mockRes)
        expect(Group.findOne).toHaveBeenCalled()
        expect(mockRes.status).toHaveBeenCalledWith(401)
        response.toThrow('group or category does not exist')
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
