import request from 'supertest';
import { app } from '../app';
import { User, Group } from '../models/User';
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
//   await mongoose.connection.db.dropDatabase();
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
    const admin = {
        username : 'admin',
        email: 'admin@example.com',
        password: '123',
        role: 'Admin'
    };

    let refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2MTQ0NTYsImV4cCI6MTcxNzE1MDQ1NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpZCI6IjEyMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4ifQ.klwHb1h3VKeSDk6QtF8eJX6OWf6qvpa-zvZ4iy8W6aM'
    let accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2MTQ0NTYsImV4cCI6MTcxNzE1MDQ1NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpZCI6IjEyMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4ifQ.klwHb1h3VKeSDk6QtF8eJX6OWf6qvpa-zvZ4iy8W6aM'
    
  

    beforeEach( async () => {
        const transactionsList = [
            {
                username: 'user1',
                type: 'investment',
                amount: 200,
                date: new Date('1995-12-17T03:24:00')
                
            },
            {
                username: 'user2',
                type: 'investment',
                amount: 500,
                date: new Date('1995-12-17T03:24:00')
            },
            {
                username: 'user3',
                type: 'bills',
                amount: 1000,
                date: new Date('1995-12-17T03:24:00')
            }
        ]

        const categoriesList = [
            {
                type: 'investment',
                color: '#FFFFFF'
            },
            {
                type: 'bills',
                color: '#FFFFFF'
            }
        ]
        await transactions.deleteMany({})
        await categories.deleteMany({})
        await transactions.create(transactionsList)
        await categories.create(categoriesList)
    })

    test('T1: admin is correctly authenticated and obtains the transactions', async () => {
        const response = await request(app)
            .get("/api/transactions")
            .set("Cookie", `refreshToken=${refreshToken};  accessToken=${accessToken}`)

        const expectedData = [
            {
                username: 'user1',
                type: 'investment',
                amount: 200,
                color: '#FFFFFF',
                date: new Date('1995-12-17T03:24:00').toISOString()
            },
            {
                username: 'user2',
                type: 'investment',
                amount: 500,
                color: '#FFFFFF',
                date: new Date('1995-12-17T03:24:00').toISOString()
            },
            {
                username: 'user3',
                type: 'bills',
                amount: 1000,
                color: '#FFFFFF',
                date: new Date('1995-12-17T03:24:00').toISOString()
            }
        ]
        
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expectedData)
    });

    test('T2: admin is correctly authenticated and obtains empty list of transactions', async () => {
        await transactions.deleteMany({})
        const response = await request(app)
            .get("/api/transactions")
            .set("Cookie", `refreshToken=${refreshToken};  accessToken=${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0)
    });

    test('T3: admin is not correctly authenticated', async () => {
        refreshToken = 'thisIsAFakeRefreshToken'
        const response = await request(app)
            .get("/api/transactions")
            .set("Cookie", `refreshToken=${refreshToken};  accessToken=${accessToken}`)
        expect(response.status).toBe(401)
        expect(response.body.error).toBeDefined()
    });
})

describe("getTransactionsByUser", () => { 

    let test_tokens = [
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.jiYB0SnMggwGL4q-2BfybxPuvU8MGvGonUNx3BZNmho",   // user 1 (regular)
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMiIsImVtYWlsIjoidXNlcjJAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.vcyvbioE0-iiQxVasIGSAhJwRdwgT6wxYQvoe4eMAqQ",   // user 2 (regular)
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMyIsImVtYWlsIjoidXNlcjNAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IkFkbWluIn0.GG5693N9mnBd9tODTOSB6wedJLwBEFtdMHe-8HqryHU",      // user 3 (admin)
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
        {username : "user1", amount : 1131, type : "cat1", date : new Date(2023, 2, 14)},
        {username : "user1", amount :  100, type : "cat1", date : new Date(2023, 3, 23)},
        {username : "user1", amount :  402, type : "cat2", date : new Date(2023, 2, 27)},
        {username : "user1", amount :  933, type : "cat3", date : new Date(2023, 2, 12)},
        {username : "user2", amount :  643, type : "cat2", date : new Date(2023, 2,  8, 10)},
        {username : "user2", amount :  124, type : "cat2", date : new Date(2023, 1,  5)},
        {username : "user2", amount :  632, type : "cat3", date : new Date(2023, 5, 14)},
        {username : "user2", amount :  123, type : "cat3", date : new Date(2023, 2, 20)},
        {username : "user3", amount :  552, type : "cat1", date : new Date(2023, 3, 18)},
        {username : "user3", amount :  612, type : "cat1", date : new Date(2023, 3,  1)},
        {username : "user3", amount :  231, type : "cat2", date : new Date(2023, 3,  6)},
        {username : "user3", amount :   12, type : "cat3", date : new Date(2023, 2, 26)},
        {username : "user3", amount :   53, type : "cat3", date : new Date(2023, 2, 26)},
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
            .get("/api/users/user1/transactions")                        
                        
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized");
    });
    
    test("Should return an error indicating that the user specified by params does not exist (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user4/transactions")                        
            .set("Cookie", `accessToken=${test_tokens[3]};refreshToken=${test_tokens[3]}`)
                        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("User does not exist");
    });
    
    test("Should return an error indicating that the User is not Atuthorized (not logged in, or not an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/users/user1")                        
                        
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized");
    });

    test("Should return an error indicating that the user specified by params does not exist (authorized as an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/users/user5")   
            .set("Cookie", `accessToken=${test_tokens[4]};refreshToken=${test_tokens[4]}`)

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("User does not exist");
    });

    test("Should return a list of transactions (authorized as an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/users/user2")   
            .set("Cookie", `accessToken=${test_tokens[2]};refreshToken=${test_tokens[2]}`)

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([
            {username : "user2", color : "red", type : "cat2", amount :  643, date : (new Date(2023, 2,  8, 10)).toISOString()},
            {username : "user2", color : "red", type : "cat2", amount :  124, date : (new Date(2023, 1,  5)).toISOString()},
            {username : "user2", color : "green", type : "cat3", amount :  632, date : (new Date(2023, 5, 14)).toISOString()},
            {username : "user2", color : "green", type : "cat3", amount :  123, date : (new Date(2023, 2, 20)).toISOString()},
        ]);
    });

    test("Should return a list of transactions of date after 2023-02-08 (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user2/transactions?from=2023-02-08")                        
            .set("Cookie", `accessToken=${test_tokens[1]};refreshToken=${test_tokens[1]}`)
                        
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([
            {username : "user2", amount :  643, color : "red", type : "cat2", date : (new Date(2023, 2,  8, 10)).toISOString()},            
            {username : "user2", amount :  632, color : "green", type : "cat3", date : (new Date(2023, 5, 14)).toISOString()},
            {username : "user2", amount :  123, color : "green", type : "cat3", date : (new Date(2023, 2, 20)).toISOString()}
        ])
    });

    test("Should return a list of transactions of date before 2023-04-01 (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user2/transactions?upTo=2023-04-01")                        
            .set("Cookie", `accessToken=${test_tokens[1]};refreshToken=${test_tokens[1]}`)
                        
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([     
            {username : "user2", amount :  643, color : "red", type : "cat2", date : (new Date(2023, 2,  8, 10)).toISOString()},
            {username : "user2", amount :  124, color : "red", type : "cat2", date : (new Date(2023, 1,  5)).toISOString()},            
            {username : "user2", amount :  123, color : "green", type : "cat3", date : (new Date(2023, 2, 20)).toISOString()}
        ])
    });

    test("Should return a list of transactions of date between 2023-02-08 and 2023-04-01  (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user2/transactions?from=2023-02-08&upTo=2023-04-01")                        
            .set("Cookie", `accessToken=${test_tokens[1]};refreshToken=${test_tokens[1]}`)
                        
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([
            {username : "user2", amount :  643, color : "red",   type : "cat2", date : (new Date(2023, 2,  8, 10)).toISOString()},            
            {username : "user2", amount :  123, color : "green", type : "cat3", date : (new Date(2023, 2, 20)).toISOString()}
        ])
    });

    test("Should return a list of transactions of amount more than 300  (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user2/transactions?min=300")                        
            .set("Cookie", `accessToken=${test_tokens[1]};refreshToken=${test_tokens[1]}`)
                        
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([
            {username : "user2", amount :  643, color : "red", type : "cat2", date : (new Date(2023, 2,  8, 10)).toISOString()},            
            {username : "user2", amount :  632, color : "green",type : "cat3", date : (new Date(2023, 5, 14)).toISOString()},            
        ])
    });

    test("Should return a list of transactions of amount less than 300  (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user2/transactions?max=300")                        
            .set("Cookie", `accessToken=${test_tokens[1]};refreshToken=${test_tokens[1]}`)
                        
        expect(response.status).toBe(200);        
        expect(response.body.data).toStrictEqual([              
            {username : "user2", amount :  124, color : "red", type : "cat2", date : (new Date(2023, 1,  5)).toISOString()},            
            {username : "user2", amount :  123, color : "green", type : "cat3", date : (new Date(2023, 2, 20)).toISOString()},          
        ])
    });

    test("Should return a list of transactions of amount between 100 and 500 (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user1/transactions?max=500&min=100")                        
            .set("Cookie", `accessToken=${test_tokens[0]};refreshToken=${test_tokens[0]}`)
                        
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([                          
            {username : "user1", amount :  100, color : "blue", type : "cat1", date : (new Date(2023, 3, 23)).toISOString()},
            {username : "user1", amount :  402, color : "red", type : "cat2", date : (new Date(2023, 2, 27)).toISOString()},            
        ])
    });

    test("Should return a list of transactions of amount between 100 and 500 and date between 2023-01-01 and 2023-03-01 (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user1/transactions?max=500&min=100&upTo=2023-04-01&from=2023-01-01")                        
            .set("Cookie", `accessToken=${test_tokens[0]};refreshToken=${test_tokens[0]}`)                           

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([                                      
            {username : "user1", amount :  402, color : "red", type : "cat2", date : (new Date(2023, 2, 27)).toISOString()},            
        ])
    });

    test("Should return a list of transactions of date = 2023-03-26 (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user3/transactions?date=2023-03-26")                        
            .set("Cookie", `accessToken=${test_tokens[2]};refreshToken=${test_tokens[2]}`)                           

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([                                                  
            {username : "user3", amount :   12, color : "green", type : "cat3", date : (new Date(2023, 2, 26)).toISOString()},
            {username : "user3", amount :   53, color : "green", type : "cat3", date : (new Date(2023, 2, 26)).toISOString()},
        ])
    });

    test("Should return a list of transactions of date = 2023-03-26 and amount between 10 and 20 (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user3/transactions?date=2023-03-26&min=10&max=20")                        
            .set("Cookie", `accessToken=${test_tokens[2]};refreshToken=${test_tokens[2]}`)                           

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([                                                  
            {username : "user3", amount :   12, color : "green", type : "cat3", date : (new Date(2023, 2, 26)).toISOString()}            
        ])
    });
})

describe("getTransactionsByUserByCategory", () => { 

    let test_tokens = [
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.jiYB0SnMggwGL4q-2BfybxPuvU8MGvGonUNx3BZNmho",   // user 1 (regular)
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMiIsImVtYWlsIjoidXNlcjJAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.vcyvbioE0-iiQxVasIGSAhJwRdwgT6wxYQvoe4eMAqQ",   // user 2 (regular)
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMyIsImVtYWlsIjoidXNlcjNAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IkFkbWluIn0.GG5693N9mnBd9tODTOSB6wedJLwBEFtdMHe-8HqryHU",      // user 3 (admin)
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
        {username : "user1", amount : 1131, type : "cat1", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user1", amount :  100, type : "cat1", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user1", amount :  402, type : "cat2", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user1", amount :  933, type : "cat3", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user2", amount :  643, type : "cat2", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user2", amount :  124, type : "cat2", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user2", amount :  632, type : "cat3", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user2", amount :  123, type : "cat3", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user3", amount :  552, type : "cat1", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user3", amount :  612, type : "cat1", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user3", amount :  231, type : "cat2", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user3", amount :   12, type : "cat3", date : new Date(2023, 2, 2, 10, 10)},
        {username : "user3", amount :   53, type : "cat3", date : new Date(2023, 2, 2, 10, 10)},
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

    test("Should return an error indicating that the user specified by params does not exist (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user4/transactions/category/cat1")                        
            .set("Cookie", `accessToken=${test_tokens[3]};refreshToken=${test_tokens[3]}`)
            .send({
                username : "user4",
                type : "cat1"
        })
                        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("User does not exist");
    });

    test("Should return an error indicating that the user specified by params does not exist (authorized as an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/users/user5/category/cat1")                            
            .set("Cookie", `accessToken=${test_tokens[4]};refreshToken=${test_tokens[4]}`)
            .send({
                username : "user5",
                type : "cat1"
        })
                        
        // expect(response.status).toBe(400);
        expect(response.body.error).toBe("User does not exist");
    });

    test("Should return an error indicating that the category specified by params does not exist (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user1/transactions/category/catx")                        
            .set("Cookie", `accessToken=${test_tokens[0]};refreshToken=${test_tokens[0]}`)
            .send({
                username : "user1",
                type : "cat1"
        })
                        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Category does not exist");
    });

    test("Should return an error indicating that the category specified by params does not exist (authorized as an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/users/user1/category/catx")                             
            .set("Cookie", `accessToken=${test_tokens[2]};refreshToken=${test_tokens[2]}`)
            .send({
                username : "user1",
                type : "cat1"
        })
                        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Category does not exist");
    });

    test("Should return an empty list of transactions (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user2/transactions/category/cat1")                        
            .set("Cookie", `accessToken=${test_tokens[1]};refreshToken=${test_tokens[1]}`)
            .send({
                username : "user2",
                type : "cat1"
        })        
                        
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([]);
    });

    test("Should return an empty list of transactions (authorized as an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/users/user2/category/cat1")                                                        
            .set("Cookie", `accessToken=${test_tokens[2]};refreshToken=${test_tokens[2]}`)
            .send({
                username : "user2",
                type : "cat1"
        })
                        
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([]);
    });

    test("Should return a list of transactions (authorized as a regular user)", async () => {      
        const response = await request(app)
            .get("/api/users/user1/transactions/category/cat1")                        
            .set("Cookie", `accessToken=${test_tokens[0]};refreshToken=${test_tokens[0]}`)
            .send({
                username : "user1",
                type : "cat1"
        })        
                        
        expect(response.status).toBe(200);        
        expect(response.body.data).toStrictEqual([
            {username : "user1", amount : 1131, type : "cat1", color : "blue", date : (new Date(2023, 2, 2, 10, 10)).toISOString()},
            {username : "user1", amount :  100, type : "cat1", color : "blue", date : (new Date(2023, 2, 2, 10, 10)).toISOString()}
        ]);
    });

    test("Should return a list of transactions (authorized as an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/users/user1/category/cat1")                                                        
            .set("Cookie", `accessToken=${test_tokens[2]};refreshToken=${test_tokens[2]}`)
            .send({
                username : "user1",
                type : "cat1"
        })
                
        expect(response.status).toBe(200);        
        expect(response.body.data).toStrictEqual([
            {username : "user1", amount : 1131, type : "cat1", color : "blue", date : (new Date(2023, 2, 2, 10, 10)).toISOString()},
            {username : "user1", amount :  100, type : "cat1", color : "blue", date : (new Date(2023, 2, 2, 10, 10)).toISOString()}
        ]);
    });
})

describe("getTransactionsByGroup", () => {     
    let test_tokens = [
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.jiYB0SnMggwGL4q-2BfybxPuvU8MGvGonUNx3BZNmho",   // user 1 (regular)
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMiIsImVtYWlsIjoidXNlcjJAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.vcyvbioE0-iiQxVasIGSAhJwRdwgT6wxYQvoe4eMAqQ",   // user 2 (regular)
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyMyIsImVtYWlsIjoidXNlcjNAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IkFkbWluIn0.GG5693N9mnBd9tODTOSB6wedJLwBEFtdMHe-8HqryHU",      // user 3 (admin)
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyNCIsImVtYWlsIjoidXNlcjRAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IlJlZ3VsYXIifQ.C40TvT7lc_ufN8xwz5HKZ1XcT2DcwAtrOoZ4t-K19Pc",   // user 4 (regular), not added to the database
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODU1NTY4NzksImV4cCI6MTcxNzA5Mjg4MCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJ1c2VyNSIsImVtYWlsIjoidXNlcjVAdGVzdC5jb20iLCJpZCI6ImR1bW15X2lkIiwicm9sZSI6IkFkbWluIn0.U4oQH-vpYdwHqQEJxSOJR1ycSmTcA9reP6Lpfpwynw4"       // user 5 (admin), not added to the database
    ]

    let test_users = [
        {username : "user1", email : "user1@test.com", password : "dummyPassword", refreshToken : test_tokens[0], role : "Regular"},
        {username : "user2", email : "user2@test.com", password : "dummyPassword", refreshToken : test_tokens[1], role : "Regular"},
        {username : "user3", email : "user3@test.com", password : "dummyPassword", refreshToken : test_tokens[2], role : "Admin" }
    ]

    let test_groups = [
        {name : "group1", members : [
            {username : "user1", email : "user1@test.com"},
            {username : "user2", email : "user2@test.com"}
        ]}
    ]

    let test_categories = [
        {type : "cat1", color : "blue"},
        {type : "cat2", color : "red"},
        {type : "cat3", color : "green"},
    ]

    let test_transactions = [
        {username : "user1", amount : 1131, type : "cat1", date : new Date(2023, 2, 14)},
        {username : "user1", amount :  100, type : "cat1", date : new Date(2023, 3, 23)},
        {username : "user1", amount :  402, type : "cat2", date : new Date(2023, 2, 27)},
        {username : "user1", amount :  933, type : "cat3", date : new Date(2023, 2, 12)},
        {username : "user2", amount :  643, type : "cat2", date : new Date(2023, 2,  8)},
        {username : "user2", amount :  124, type : "cat2", date : new Date(2023, 1,  5)},
        {username : "user2", amount :  632, type : "cat3", date : new Date(2023, 5, 14)},
        {username : "user2", amount :  123, type : "cat3", date : new Date(2023, 2, 20)},
        {username : "user3", amount :  552, type : "cat1", date : new Date(2023, 3, 18)},
        {username : "user3", amount :  612, type : "cat1", date : new Date(2023, 3,  1)},
        {username : "user3", amount :  231, type : "cat2", date : new Date(2023, 3,  6)},
        {username : "user3", amount :   12, type : "cat3", date : new Date(2023, 2, 26)},
        {username : "user3", amount :   53, type : "cat3", date : new Date(2023, 2, 26)},
    ]

    beforeEach(async() => {
        jest.clearAllMocks();        
        // insert test data
        await User.insertMany(test_users)
        await Group.insertMany(test_groups)
        await categories.insertMany(test_categories)
        await transactions.insertMany(test_transactions)
    })    

    afterEach(async() => {
        // clear all users, categories, and transactions
        await User.deleteMany();
        await Group.deleteMany();
        await categories.deleteMany();
        await transactions.deleteMany();
    })

    test("Should return an error indicating that the User is not Atuthorized (not logged in)", async () => {      
        const response = await request(app)
            .get("/api/groups/group1/transactions")                                    
                        
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized");
    });

    test("Should return an error indicating that the User is not Atuthorized (not member of the group specified in params)", async () => {      
        const response = await request(app)
        .get("/api/groups/group1/transactions")                                    
        .set("Cookie", `accessToken=${test_tokens[2]};refreshToken=${test_tokens[2]}`)
                        
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("User is not part of the group");
    });

    test("Should return an error indicating that the User is not Atuthorized (not an admin)", async () => {      
        const response = await request(app)
            .get("/api/transactions/groups/group1")                                    
                        
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized");
    });

    test("Should return am error indicating that group does not exist (authorized as an admin)", async () => {      
        const response = await request(app)
        .get("/api/transactions/groups/group2")                                        
        .set("Cookie", `accessToken=${test_tokens[2]};refreshToken=${test_tokens[2]}`)                                            

        expect(response.status).toBe(400);
        expect(response.body.error).toStrictEqual("Group does not exist")
    });    

    test("Should return a list of transactions (auth type doesn't matter)", async () => {      
        const response = await request(app)
        .get("/api/groups/group1/transactions")                                    
        .set("Cookie", `accessToken=${test_tokens[0]};refreshToken=${test_tokens[0]}`)                                    

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual([
            {username : "user1", amount : 1131, color : "blue", type : "cat1", date : (new Date(2023, 2, 14)).toISOString()},
            {username : "user1", amount :  100, color : "blue", type : "cat1", date : (new Date(2023, 3, 23)).toISOString()},
            {username : "user1", amount :  402, color : "red", type : "cat2", date : (new Date(2023, 2, 27)).toISOString()},
            {username : "user1", amount :  933, color : "green", type : "cat3", date : (new Date(2023, 2, 12)).toISOString()},
            {username : "user2", amount :  643, color : "red", type : "cat2", date : (new Date(2023, 2,  8)).toISOString()},
            {username : "user2", amount :  124, color : "red", type : "cat2", date : (new Date(2023, 1,  5)).toISOString()},
            {username : "user2", amount :  632, color : "green", type : "cat3", date : (new Date(2023, 5, 14)).toISOString()},
            {username : "user2", amount :  123, color : "green", type : "cat3", date : (new Date(2023, 2, 20)).toISOString()}
        ])
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
