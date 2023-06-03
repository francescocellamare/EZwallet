import request from 'supertest';
import { app } from '../app';
import { User, Group } from '../models/User.js';
import { transactions, categories } from '../models/model';
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';
import { response } from 'express';
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
    };

    let hashedPassowrd = await bcrypt.hash(user.password, 12);
    const newUser = await User.create({
      username : user.username,
      email :user.email,
      password: hashedPassowrd,
      refreshToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU1MjAxNTQsImV4cCI6MTcxNzA1NjE1NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMSIsInVzZXJuYW1lIjoidXNlciIsInJvbGUiOiJSZWd1bGFyIn0.J5FWQPm8QihGHKu6AON-TJkCFgNPSO9Tv6l5wYEunpo"

    })
    const resp = await request(app)
    .get(`/api/users/${newUser.username}`)
    .set("Cookie", `refreshToken=${newUser.refreshToken}; accessToken=${newUser.refreshToken}`);

         
    expect(resp.status).toBe(200);
    
      
  
    })


    test("T2: authorized admin sending the request -> return 200", async () => {
    
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
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2NTIwMzEsImV4cCI6MTcxNzE4ODAzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IkFkbWluIn0.dF27-aMmsV_xjseUC_2TanfvfcW58QgWPbqMyCgLuKM'
     await request(app)
        .get(`/api/users/${user.username}`)
        .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
        .then((response) => {
          expect(response.status).toBe(200)
         
        })
        
      })

      
    test("T3: unauthorized user sending the request -> return 401 and error message", async () => {
    
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
      //This token is generatd for a != regular user
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2NTIwMzEsImV4cCI6MTcxNzE4ODAzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdDJAZXhhbXBsZS5jb20iLCJpZCI6IjEyMyIsInVzZXJuYW1lIjoidXNlcjIxMiIsInJvbGUiOiJSZWd1bGFyIn0.hhSLd5DMmjLC3J6nvcT-Tr_vneJm31n2tB4f_MhfU0g'
     await request(app)
        .get(`/api/users/${user.username}`)
        .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
        .then((response) => {
          expect(response.status).toBe(401)
          expect(response.body.error).toBe('not authorized');
         
        })
        
      })
      
    test("T4: user requested is not in db -> return 400 and error message", async () => {
    
      const user = {
      username : 'user123',
      email: 'test@example.com',
      password: '123' 
    }
      //This token is generatd for a != regular user
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2NTIwMzEsImV4cCI6MTcxNzE4ODAzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IkFkbWluIn0.dF27-aMmsV_xjseUC_2TanfvfcW58QgWPbqMyCgLuKM'
     await request(app)
        .get(`/api/users/${user.username}`)
        .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
        .then((response) => {
          expect(response.status).toBe(400)
          expect(response.body.error).toBe('user not found');
         
        })
        




    
      })









    })


describe("createGroup", () => { 

   
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test("T1: create group -> return 200", async () => {
    
    const user = {
      username : 'user',
      email: 'test@example.com',
      password: '123'
    };

    let hashedPassowrd = await bcrypt.hash(user.password, 12);
    const newUser = await User.create({
      username : user.username,
      email :user.email,
      password: hashedPassowrd,
      refreshToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU1MjAxNTQsImV4cCI6MTcxNzA1NjE1NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMSIsInVzZXJuYW1lIjoidXNlciIsInJvbGUiOiJSZWd1bGFyIn0.J5FWQPm8QihGHKu6AON-TJkCFgNPSO9Tv6l5wYEunpo"

    })
    const resp = await request(app)
    .get(`/api/users/${newUser.username}`)
    .set("Cookie", `refreshToken=${newUser.refreshToken}; accessToken=${newUser.refreshToken}`);

         
    expect(resp.status).toBe(200);


})
})


describe("getGroups", () => {

  beforeEach(async () => {
    await Group.deleteMany({})
  })

  test("T1: at least one group exists -> return 200 and list of groups", async () => {
    
    const newGroup =  await Group.create({
      name: 'My Group',
      members: [
        {
          email: 'example1@example.com'
        },
        {
          email: 'example2@example.com'
        }
      ]
    });
  
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2MTQ0NTYsImV4cCI6MTcxNzE1MDQ1NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpZCI6IjEyMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4ifQ.klwHb1h3VKeSDk6QtF8eJX6OWf6qvpa-zvZ4iy8W6aM'
   await request(app)
      .get("/api/groups")
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.data).toHaveLength(1)
      })
      
  })
  test("T2: unauthorized user -> return 401 and error message", async () => {
    //This token is generatd with role = Regular
    const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU2NTIwMzEsImV4cCI6MTcxNzE4ODAzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IlJlZ3VsYXIifQ.7H1LKiSf56TPwJ6b5lCFb0uwafvAVRrqW6SUy7_xB5k'
   await request(app)
      .get("/api/groups")
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(401)
        expect(response.body.error).toEqual('User does not have admin role')
      })
      
  })




 })

describe("getGroup", () => { 
  beforeEach(async () => {
    await Group.deleteMany({})
  })

  test("T1: admin requesting to get group that exists -> return 200 and group", async () => {
    
    const newGroup =  await Group.create({
      name: 'My Group',
      members: [
        {
          email: 'example1@example.com'
        },
        {
          email: 'example2@example.com'
        }
      ]
    });
  
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ0ZXN0Iiwicm9sZSI6IkFkbWluIn0.bRz8FJBF5x8z7djJdoqWS0TeoGmagOrNPqbYNRsA9so'
   await request(app)
      .get(`/api/groups/${newGroup.name}`)
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(200)

      })
      
  })

  test("T2: user is in the group -> return 200 and group", async () => {
    
    const newGroup =  await Group.create({
      name: 'My Group',
      members: [
        {
          email: 'example1@example.com'
        },
        {
          email: 'example2@example.com'
        }
      ]
    });
  
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTFAZXhhbXBsZS5jb20iLCJpZCI6IjEyMyIsInVzZXJuYW1lIjoidGVzdCIsInJvbGUiOiJSZWd1bGFyIn0.8tD3AaXtaMfsLJN6EJdC3tsCLqP3daKw6M3nwqmGaAw'
   await request(app)
      .get(`/api/groups/${newGroup.name}`)
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(200)

      })
      
  })

  test("T3: unautharized user requesting to get group that exists -> return 401 and error message", async () => {
    
    const newGroup =  await Group.create({
      name: 'My Group',
      members: [
        {
          email: 'example1@example.com'
        },
        {
          email: 'example2@example.com'
        }
      ]
    });
  
    //This token is generatd with role = Regular and user not in the group
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiUmVndWxhciJ9.wFR8XRAaD9_eijI2IxmTEMs6qHQmpCQTmFvlp9PrSRI'
   await request(app)
      .get(`/api/groups/${newGroup.name}`)
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .then((response) => {
        expect(response.status).toBe(401)
        expect(response.body.error).toBe('authenticated user who is neither part of the group nor an admin')

      })
    })
  


  test("T4: group does not exist -> return 400 and error message", async () => {    
       //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
       await request(app)
          .get(`/api/groups/Family`)
          .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
          .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body.error).toBe("group does not exist")
    
          })



      
  })



})

describe("addToGroup", () => {

 })

describe("removeFromGroup", () => { 
})

describe("deleteUser", () => {

  //create a group with only one user
  //check if group is deleted after the user was deleted
  beforeEach(async () => {
    await User.deleteMany({})
    await Group.deleteMany({})
  })

  test("T1: user belong to a group and he is the only user in the group -> return 200", async () => {
   

    const user = {
      username : 'user1',
      email: 'test1@example.com',
      password: '123' 
    }

    let hashedPassowrd = await bcrypt.hash(user.password, 12);
    const newUser = await User.create({
      username : user.username,
      email :user.email,
      password: hashedPassowrd
    })
    
    const newGroup =  await Group.create({
      name: 'My Group',
      members: [
        {
          email: 'test1@example.com'
        }
        
      ]
    });

    const requestBody ={
      email: newUser.email
    }
  
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
   
      const response = await request(app)
      .delete("/api/users")
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .send(requestBody)
      await expect(response.status).toBe(200)
      const group = await Group.find({name: newGroup.name});
      expect(group.length).toBe(0);
      })
      

      test("T1: user belong to a group and he is not the only user in the group -> return 200", async () => {
   
        const user = {
          username : 'user1',
          email: 'test1@example.com',
          password: '123' 
        }
    
        let hashedPassowrd = await bcrypt.hash(user.password, 12);
        const newUser = await User.create({
          username : user.username,
          email :user.email,
          password: hashedPassowrd
        })
        
        const newGroup =  await Group.create({
          name: 'My Group',
          members: [
            {
              email: 'test1@example.com'
            },
            {
              email: 'test2@example.com'
            }
            
          ]
        });
    
        const requestBody ={
          email: newUser.email
        }
      
        //This token is generatd with role = admin
         const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
       
          const response = await request(app)
          .delete("/api/users")
          .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
          .send(requestBody)
          await expect(response.status).toBe(200)
          const group = await Group.find({name: newGroup.name});
          expect(group.length).toBe(1);
          })
          
    
          test("T2: does not pass an email -> return 400 and error message", async () => {
   
            const user = {
              username : 'user1',
              email: 'test1@example.com',
              password: '123' 
            }
        
            let hashedPassowrd = await bcrypt.hash(user.password, 12);
            const newUser = await User.create({
              username : user.username,
              email :user.email,
              password: hashedPassowrd
            })
            
            const newGroup =  await Group.create({
              name: 'My Group',
              members: [
                {
                  email: 'test1@example.com'
                },
                {
                  email: 'test2@example.com'
                }
                
              ]
            });
        
            const requestBody ={
             
            }
          
            //This token is generatd with role = admin
             const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
           
              const response = await request(app)
              .delete("/api/users")
              .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
              .send(requestBody)
              await expect(response.status).toBe(400)
              await expect(response.body.error).toBe("The request body does not contain all the necessary attributes")
              })
             
              



  
test("T3: email is an empty string -> return 400 and error message", async () => {
   
                const user = {
                  username : 'user2',
                  email: 'test2@example.com',
                  password: '123' 
                }
            
                let hashedPassowrd = await bcrypt.hash(user.password, 12);
                const newUser = await User.create({
                  username : user.username,
                  email :user.email,
                  password: hashedPassowrd
                })
                
                const newGroup =  await Group.create({
                  name: 'My Group',
                  members: [
                    {
                      email: 'test1@example.com'
                    },
                    {
                      email: 'test2@example.com'
                    }
                    
                  ]
                });
            
                const requestBody ={
                 email: ''
                }
              
                //This token is generatd with role = admin
                 const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
               
                  const response = await request(app)
                  .delete("/api/users")
                  .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
                  .send(requestBody)
                  await expect(response.status).toBe(400)
                  await expect(response.body.error).toBe("The email passed is an empty string")
                  })

test("T4: requested email is not in the db -> return 400 and error message", async () => {
   
                    const user = {
                      username : 'user1',
                      email: 'test1@example.com',
                      password: '123' 
                    }
                
                    let hashedPassowrd = await bcrypt.hash(user.password, 12);
                    const newUser = await User.create({
                      username : user.username,
                      email :user.email,
                      password: hashedPassowrd
                    })
                    
                    const newGroup =  await Group.create({
                      name: 'My Group',
                      members: [
                        {
                          email: 'test1@example.com'
                        },
                        {
                          email: 'test2@example.com'
                        }
                        
                      ]
                    });
                
                    const requestBody ={
                     email: 'notauser@example.com'
                    }
                  
                    //This token is generatd with role = admin
                     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
                   
                      const response = await request(app)
                      .delete("/api/users")
                      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
                      .send(requestBody)
                      await expect(response.status).toBe(400)
                      await expect(response.body.error).toBe("The email does not represent a user in the database")
                      })
                     
 test("T5: not email format -> return 400 and error message", async () => {
   
                        const user = {
                          username : 'user1',
                          email: 'test1@example.com',
                          password: '123' 
                        }
                    
                        let hashedPassowrd = await bcrypt.hash(user.password, 12);
                        const newUser = await User.create({
                          username : user.username,
                          email :user.email,
                          password: hashedPassowrd
                        })
                        
                        const newGroup =  await Group.create({
                          name: 'My Group',
                          members: [
                            {
                              email: 'test1@example.com'
                            },
                            {
                              email: 'test2@example.com'
                            }
                            
                          ]
                        });
                    
                        const requestBody ={
                         email: 'examplecom'
                        }
                      
                        //This token is generatd with role = admin
                         const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
                       
                          const response = await request(app)
                          .delete("/api/users")
                          .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
                          .send(requestBody)
                          await expect(response.status).toBe(400)
                          await expect(response.body.error).toBe("The email is not in a valid format")
                          })
                                              
        
                          
                          
                          test("T6: unauthorized user -> return 401 and error message", async () => {
                            
                            
                            const user = {
                              username : 'user1',
                              email: 'test1@example.com',
                              password: '123' 
                            }
                            
                            let hashedPassowrd = await bcrypt.hash(user.password, 12);
                            const newUser = await User.create({
    username : user.username,
    email :user.email,
    password: hashedPassowrd
  })
  
  const newGroup =  await Group.create({
    name: 'My Group',
    members: [
      {
        email: 'test1@example.com'
      },
      {
        email: 'test2@example.com'
      }
      
    ]
  });
  
  const requestBody ={
    email: 'test1@example.com'
  }
  
  //This token is generatd with role = admin
  const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IlJlZ3VsYXIifQ.5iKurIZWuOdCE6pFn6-Yf2BL3apLRdqImbpEAaD72Ok'
  
  const response = await request(app)
  .delete("/api/users")
  .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
  .send(requestBody)
  await expect(response.status).toBe(401)
  await expect(response.body.error).toBe("User does not have admin role")
})


})  

 

describe("deleteGroup", () => {//create a group with only one user
  //check if group is deleted after the user was deleted
  beforeEach(async () => {
    await User.deleteMany({})
    await Group.deleteMany({})
  })

  test("T1:authorized user -> return 200", async () => {
   

    const user = {
      username : 'user1',
      email: 'test1@example.com',
      password: '123' 
    }

    let hashedPassowrd = await bcrypt.hash(user.password, 12);
    const newUser = await User.create({
      username : user.username,
      email :user.email,
      password: hashedPassowrd
    })
    
    const newGroup =  await Group.create({
      name: 'My Group',
      members: [
        {
          email: 'test1@example.com'
        }
        
      ]
    });

    const requestBody ={
      name: newGroup.name
    }
  
    //This token is generatd with role = admin
     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
   
      const response = await request(app)
      .delete(`/api/groups`)
      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
      .send(requestBody)
      await expect(response.status).toBe(200)
      const group = await Group.find({name: newGroup.name});
      expect(group.length).toBe(0);
    //I NEED A WAY TO WRITE THIS
       await expect(response.body.data.message).toBe("Group deleted successfully")
      })
      

      test("T2: body does not contain all necessary attributes -> return 200", async () => {
   
        const user = {
          username : 'user1',
          email: 'test1@example.com',
          password: '123' 
        }
    
        let hashedPassowrd = await bcrypt.hash(user.password, 12);
        const newUser = await User.create({
          username : user.username,
          email :user.email,
          password: hashedPassowrd
        })
        
        const newGroup =  await Group.create({
          name: 'My Group',
          members: [
            {
              email: 'test1@example.com'
            },
            {
              email: 'test2@example.com'
            }
            
          ]
        });
    
        const requestBody ={
         
        }
      
        //This token is generatd with role = admin
         const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
       
          const response = await request(app)
          .delete("/api/groups")
          .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
          .send(requestBody)
          await expect(response.status).toBe(400)
          await expect(response.body.error).toBe("The request body does not contain all the necessary attributes")
       
          })
          
    
          test("T3: name is an empty string -> return 400 and error message", async () => {
   
            const user = {
              username : 'user1',
              email: 'test1@example.com',
              password: '123' 
            }
        
            let hashedPassowrd = await bcrypt.hash(user.password, 12);
            const newUser = await User.create({
              username : user.username,
              email :user.email,
              password: hashedPassowrd
            })
            
            const newGroup =  await Group.create({
              name: 'My Group',
              members: [
                {
                  email: 'test1@example.com'
                },
                {
                  email: 'test2@example.com'
                }
                
              ]
            });
        
            const requestBody ={
             name: ''
            }
          
            //This token is generatd with role = admin
             const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
           
              const response = await request(app)
              .delete("/api/groups")
              .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
              .send(requestBody)
              await expect(response.status).toBe(400)
              await expect(response.body.error).toBe("The name passed is an empty string")
              })
             
              



  
test("T4: not a group in the db-> return 400 and error message", async () => {
   
                const user = {
                  username : 'user2',
                  email: 'test2@example.com',
                  password: '123' 
                }
            
                let hashedPassowrd = await bcrypt.hash(user.password, 12);
                const newUser = await User.create({
                  username : user.username,
                  email :user.email,
                  password: hashedPassowrd
                })
                
                const newGroup =  await Group.create({
                  name: 'My Group',
                  members: [
                    {
                      email: 'test1@example.com'
                    },
                    {
                      email: 'test2@example.com'
                    }
                    
                  ]
                });
            
                const requestBody ={
                 name: 'doesNotExist'
                }
              
                //This token is generatd with role = admin
                 const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiZXhhbXBsZTMzQGV4YW1wbGUuY29tIiwiaWQiOiIxMjMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiQWRtaW4ifQ.9wJED0kKWyCEUKcZzeCzWNBAgachnMVFrR4cvshwzpo'
               
                  const response = await request(app)
                  .delete("/api/groups")
                  .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
                  .send(requestBody)
                  await expect(response.status).toBe(400)
                  await expect(response.body.error).toBe("The name passed does not represent a group in the database")
                  })

test("T5: unAuthorized user -> return 401 and error message", async () => {
   
                    const user = {
                      username : 'user1',
                      email: 'test1@example.com',
                      password: '123' 
                    }
                
                    let hashedPassowrd = await bcrypt.hash(user.password, 12);
                    const newUser = await User.create({
                      username : user.username,
                      email :user.email,
                      password: hashedPassowrd
                    })
                    
                    const newGroup =  await Group.create({
                      name: 'My Group',
                      members: [
                        {
                          email: 'test1@example.com'
                        },
                        {
                          email: 'test2@example.com'
                        }
                        
                      ]
                    });
                
                    const requestBody ={
                     name: newGroup.name
                    }
                  
                    //This token is generatd with role = admin
                     const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODU3Mzg3ODYsImV4cCI6MTcxNzI3NDc4NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlkIjoiMTIzIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IlJlZ3VsYXIifQ.5iKurIZWuOdCE6pFn6-Yf2BL3apLRdqImbpEAaD72Ok'
                   
                      const response = await request(app)
                      .delete("/api/groups")
                      .set("Cookie", `refreshToken=${refreshToken};  accessToken=${refreshToken}`)
                      .send(requestBody)
                      await expect(response.status).toBe(401)
                      await expect(response.body.error).toBe("User does not have admin role")
                      })
   

})  

 
