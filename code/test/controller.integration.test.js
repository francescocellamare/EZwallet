import request from 'supertest';
import { app } from '../app';
import { User } from '../models/User';
import { categories, transactions } from '../models/model';
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {  

  const dbName = "test";
  const url = `${process.env.MONGO_URI}/${dbName}`;

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
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

    let test_tokens = [
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.jiYB0SnMggwGL4q-2BfybxPuvU8MGvGonUNx3BZNmho",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMiIsImVtYWlsIjoidXNlcjJAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.vcyvbioE0-iiQxVasIGSAhJwRdwgT6wxYQvoe4eMAqQ",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMyIsImVtYWlsIjoidXNlcjNAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IkFkbWluIn0.GG5693N9mnBd9tODTOSB6wedJLwBEFtdMHe-8HqryHU",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyNCIsImVtYWlsIjoidXNlcjRAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.C40TvT7lc_ufN8xwz5HKZ1XcT2DcwAtrOoZ4t-K19Pc",   // user 4 (regular), not added to the database
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyNSIsImVtYWlsIjoidXNlcjVAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IkFkbWluIn0.U4oQH-vpYdwHqQEJxSOJR1ycSmTcA9reP6Lpfpwynw4"       // user 5 (admin), not added to the database
    ]

    let test_users = [
        {username : "user1", email : "user1@test.com", password : "dummyPassword", refreshToken : test_tokens[0], role : "Regular"},
        {username : "user2", email : "user2@test.com", password : "dummyPassword", refreshToken : test_tokens[1], role : "Regular"},
        {username : "user3", email : "user3@test.com", password : "dummyPassword", refreshToken : test_tokens[2], role : "Admin" }
    ]

    let test_categories = [
        {type : "cat1", color : "blue"},
        {type : "cat2", color : "red"},
        {type : "cat3", color : "green"},
    ]

    let test_transactions = [
        {username : "user1", amount : 1131, type : "cat1"},
        {username : "user1", amount :  100, type : "cat1"},
        {username : "user1", amount :  402, type : "cat2"},
        {username : "user1", amount :  933, type : "cat3"},
        {username : "user2", amount :  643, type : "cat2"},
        {username : "user2", amount :  124, type : "cat2"},
        {username : "user2", amount :  632, type : "cat3"},
        {username : "user2", amount :  123, type : "cat3"},
        {username : "user3", amount :  552, type : "cat1"},
        {username : "user3", amount :  612, type : "cat1"},
        {username : "user3", amount :  231, type : "cat2"},
        {username : "user3", amount :   12, type : "cat3"},
        {username : "user3", amount :   53, type : "cat3"},
    ]

    beforeEach(async() => {
        jest.clearAllMocks();        
        // insert test data
        await User.insertMany(test_users)
        await categories.insertMany(test_categories)
        await transactions.insertMany(test_transactions)
    })    

    afterEach(async() => {
        // clear all users, categories, and transactions
        await User.deleteMany();
        await categories.deleteMany();
        await transactions.deleteMany();
    })

    test("Should return an error indicating that the User is not Atuthorized (not logged in, or the requested user doesn't match authorized user)", async () => {      
        const response = await request(app)
            .get("/api/users/user1/transactions/category/cat1")                        
            .send({
                username : "user1",
                type : "cat1"
        })
                        
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized");
    });

    test("Should return an error indicating that the User is not Atuthorized (not logged in, or not an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/users/user1/category/cat1")                        
            .send({
                username : "user1",
                type : "cat1"
        })
                        
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized");
    });

    // test("Should return an error indicating that the user specified by params does not exist (authorized as a regular user)", async () => {      
    //     const response = await request(app)
    //         .get("/api/users/user4/transactions/category/cat1")                        
    //         .set("Cookie", `accessToken=${test_tokens[3]};refreshToken=${test_tokens[3]}`)
    //         .send({
    //             username : "user4",
    //             type : "cat1"
    //     })
                        
    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toBe("User does not exist");
    // });

    // test("Should return an error indicating that the user specified by params does not exist (authorized as an admin)", async () => {      
    //     const response = await request(app)
    //         .get("/api/users/user4/transactions/category/cat1")                        
    //         .set("Cookie", `accessToken=${test_tokens[3]};refreshToken=${test_tokens[3]}`)
    //         .send({
    //             username : "user4",
    //             type : "cat1"
    //     })
                        
    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toBe("User does not exist");
    // });
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
