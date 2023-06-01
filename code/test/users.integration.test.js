import request from 'supertest';
import { app } from '../app';
import { User, Group } from '../models/User.js';
import { transactions, categories } from '../models/model';
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';
const bcrypt = require("bcryptjs");

/**
 * Necessary setup in order to create a new database for testing purposes before starting the execution of test cases.
 * Each test suite has its own database in order to avoid different tests accessing the same database at the same time and expecting different data.
 */
dotenv.config();
beforeAll(async () => {
  const dbName = "testingDatabaseUsers";
  const url = `${process.env.MONGO_URI}/${dbName}`;

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

});

/**
 * After all test cases have been executed the database is deleted.
 * This is done so that subsequent executions of the test suite start with an empty database.
 */
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("getUsers", () => {
  /**
   * Database is cleared before each test case, in order to allow insertion of data tailored for each specific test case.
   */
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test("T1: at least one user exists -> return 200 and list of users", async () => {
    
    const user = {
    username : 'user',
    email: 'test@example.com',
    password: '123' 
  }
  let hashedPassowrd = await bcrypt.hash(user.password, 12);
  const newUser = await User.create({
    username : user.username,
    email :user.email,
    password: hashedPassowrd
  })
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2MTQ0NTYsImV4cCI6MTcxNzE1MDQ1NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpZCI6IjEyMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4ifQ.klwHb1h3VKeSDk6QtF8eJX6OWf6qvpa-zvZ4iy8W6aM'
   await request(app)
      .get("/api/users")
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.data).toHaveLength(1)
      })
      
  })

  test("T2: no users -> return 200 and empty list", async () => {
    const admin = {
      username : 'admin',
      email: 'admin@example.com',
      password: '123',
      role: 'Admin'
    };
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2MTQ0NTYsImV4cCI6MTcxNzE1MDQ1NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpZCI6IjEyMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4ifQ.klwHb1h3VKeSDk6QtF8eJX6OWf6qvpa-zvZ4iy8W6aM'
    request(app)
      .get("/api/users")
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.data).toHaveLength(0)
  
      })
      
  })

  test("T3: user is not authorized -> should retrieve 401 and error message", async () => {
   
    //This token is generatd with role = Regular
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2NTIwMzEsImV4cCI6MTcxNzE4ODAzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IlJlZ3VsYXIifQ.7H1LKiSf56TPwJ6b5lCFb0uwafvAVRrqW6SUy7_xB5k'
    request(app)
      .get("/api/users")
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(401)
        expect(response.body.error).toEqual("User does not have admin role")
  
      })
      



    })

})

describe("getUser", () => {
 
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test("T1: authorized user sending the request -> return 200", async () => {
    
    const user = {
    username : 'user',
    email: 'test@example.com',
    password: '123' 
  }
  let hashedPassowrd = await bcrypt.hash(user.password, 12);
  const newUser = await User.create({
    username : user.username,
    email :user.email,
    password: hashedPassowrd
  })
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2NTIwMzEsImV4cCI6MTcxNzE4ODAzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IlJlZ3VsYXIifQ.7H1LKiSf56TPwJ6b5lCFb0uwafvAVRrqW6SUy7_xB5k'
   await request(app)
      .get(`/api/users/${user.username}`)
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(200)
       // expect(response.body.data).toHaveLength(1)
      })
      
  })

  test("T2: no users -> return 200 and empty list", async () => {
    const admin = {
      username : 'admin',
      email: 'admin@example.com',
      password: '123',
      role: 'Admin'
    };
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2MTQ0NTYsImV4cCI6MTcxNzE1MDQ1NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpZCI6IjEyMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4ifQ.klwHb1h3VKeSDk6QtF8eJX6OWf6qvpa-zvZ4iy8W6aM'
    request(app)
      .get("/api/users")
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.data).toHaveLength(0)
  
      })
      
  })

  test("T3: user is not authorized -> should retrieve 401 and error message", async () => {
   
    //This token is generatd with role = Regular
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2NTIwMzEsImV4cCI6MTcxNzE4ODAzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IlJlZ3VsYXIifQ.7H1LKiSf56TPwJ6b5lCFb0uwafvAVRrqW6SUy7_xB5k'
    request(app)
      .get("/api/users")
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(401)
        expect(response.body.error).toEqual("User does not have admin role")
  
      })
      



    })




 })

describe("createGroup", () => { })

describe("getGroups", () => { })

describe("getGroup", () => { })

describe("addToGroup", () => { })

describe("removeFromGroup", () => { })

describe("deleteUser", () => { })

describe("deleteGroup", () => { })
