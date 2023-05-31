import request from 'supertest';
import { app } from '../app';
import { Group, User } from '../models/User.js';
import { transactions } from '../models/model.js';
import * as utils from '../controllers/utils';
import * as users from '../controllers/users';
import jwt from 'jsonwebtoken';
import  {getGroups, getUser, getUsers, createGroup, getGroup, deleteUser, deleteGroup} from '../controllers/users';
import { TokenExpiredError } from 'jsonwebtoken';
import { createCategory } from '../controllers/controller';

/**
 * In order to correctly mock the calls to external modules it is necessary to mock them using the following line.
 * Without this operation, it is not possible to replace the actual implementation of the external functions with the one
 * needed for the test cases.
 * `jest.mock()` must be called for every external module that is called in the functions under test.
 */
jest.mock('../models/User.js');
jest.mock('../models/model.js');

beforeEach(() => {
  User.find.mockClear();
  User.prototype.save.mockClear();
  transactions.find.mockClear();
  transactions.deleteOne.mockClear();
  transactions.aggregate.mockClear();
  transactions.prototype.save.mockClear();

  jest.clearAllMocks();
});


/**
 * Defines code to be executed before each test case is launched
 * In this case the mock implementation of `User.find()` is cleared, allowing the definition of a new mock implementation.
 * Not doing this `mockClear()` means that test cases may use a mock implementation intended for other test cases.
 */

describe("getUsers", () => {
  let mockReq, mockResp;

  beforeEach(
    
    ()=>{
      
      mockReq = {};
      mockResp ={
        status: jest.fn(()=>mockResp),
        json: jest.fn(),
        locals: {
          refreshTokenMessage : "dummy message"
        }
      }
    }
  );
  afterEach(()=>{
    jest.clearAllMocks();
 })


  test("T1:no users -> return 200 and empty list", async () => {
    //any time the `User.find()` method is called jest will replace its actual implementation with the one defined below
    //sverifyAuthAdmin.mockImplementation(()=>({ authorized: false, cause: "Unauthorized"}))
    
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ));
    jest.spyOn(User, "find").mockImplementation(() => []);
    await getUsers(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(200)
    const jsonResp = mockResp.json.mock.calls[0][0];
    expect(jsonResp.data).toEqual([])

  })

  test("T2: at least one user exists -> return 200 and list of retrieved users", async () => {
    const retrievedUsers = [{ username: 'test1', email: 'test1@example.com', password: 'hashedPassword1' }, { username: 'test2', email: 'test2@example.com', password: 'hashedPassword2' }]
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
    jest.spyOn(User, "find").mockImplementation(() => [...retrievedUsers]);
    
    await getUsers(mockReq, mockResp);
    expect(mockResp.status).toHaveBeenCalledWith(200);
    expect(mockResp.json.mock.calls[0][0].data).toEqual(retrievedUsers);
    expect(mockResp.locals).toEqual({refreshTokenMessage : "dummy message"});
  })

  test("T3:not authentified -> return 401", async () => {
    //any time the `User.find()` method is called jest will replace its actual implementation with the one defined below
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: false,
        cause:"Unauthorized"
      }
    ))  
    await getUsers(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(401);
  })

  test("T4: Network error -> return 500", async () =>{
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ));
    jest.spyOn(User, "find").mockImplementation(()=> {throw new Error('server crash')});

    await getUsers(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(500);
    expect(mockResp.json).toHaveBeenCalledWith({error: 'server crash'});
  })





})

describe("getUser", () => {
  let mockReq, mockResp;
  
beforeEach(
    ()=>{
       mockReq = {
        params: {
          username: 'user',
        },
        cookies: {}
      };
       mockResp ={
        status: jest.fn(()=>mockResp),
        json: jest.fn(),
        locals: {
          refreshTokenMessage: "dummy message"
        }
      };
      
    }
  )

  afterEach(()=>{
    jest.clearAllMocks();
 })


test('T1: user exists -> return 200 and user info', async ()=>{
  const user ={
    username: 'user',
    email: 'test@example.com',
    role: 'role',
    refreshToken: 'refreshToken'
  }
  jest.spyOn(User, "findOne").mockImplementation(()=>user);
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  jest.spyOn(utils, "verifyAuthUser").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  await getUser(mockReq, mockResp);
  expect(mockResp.status).toHaveBeenCalledWith(200);
  const jsonResp = mockResp.json.mock.calls[0][0];
  expect(mockResp.json).toHaveBeenCalledWith({
    data: user,
    refreshTokenMessage: mockResp.locals.refreshTokenMessage,
  });


})

test('T2: user not found -> return 401 and message: user not found', async()=>{
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  jest.spyOn(utils, "verifyAuthUser").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  jest.spyOn(User, "findOne").mockImplementation(()=> null);

  await getUser(mockReq, mockResp);
  expect(mockResp.status).toHaveBeenCalledWith(401);
  expect(mockResp.json.mock.calls[0][0].error).toBe('User not found')
})

test('T3: different username -> return 401 and message: unauthorized', async ()=>
{ const user ={
  username: 'differentUser',
  email: 'test@example.com',
  role: 'role',
  refreshToken: 'refreshToken'
  
}
jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
  {authorized: true,
    cause:"Authorized"
  }
))
jest.spyOn(utils, "verifyAuthUser").mockImplementation(()=>(
  {authorized: true,
    cause:"Authorized"
  }
))
jest.spyOn(User, "findOne").mockImplementation(()=> user);
await getUser(mockReq, mockResp);
expect(mockResp.status).toHaveBeenCalledWith(401);
expect(mockResp.json.mock.calls[0][0].error).toBe('Unauthorized');

})

test('T4: different username -> return 401 and message: unauthorized', async ()=>
{ const user ={
  username: 'differentUser',
  email: 'test@example.com',
  role: 'role',
  refreshToken: 'refreshToken'
  
}


jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
  {authorized: true,
    cause:"Authorized"
  }
))
jest.spyOn(utils, "verifyAuthUser").mockImplementation(()=>(
  {authorized: true,
    cause:"Authorized"
  }
))
jest.spyOn(User, "findOne").mockImplementation(()=> user);
await getUser(mockReq, mockResp);
expect(mockResp.status).toHaveBeenCalledWith(401);
expect(mockResp.json.mock.calls[0][0].error).toBe('Unauthorized');

})

test("T5:not authentified -> return 401", async () => {
  //any time the `User.find()` method is called jest will replace its actual implementation with the one defined below
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: false,
      cause:"Unauthorized"
    }
  ))  
  await getUser(mockReq, mockResp);

  expect(mockResp.status).toHaveBeenCalledWith(401);
})



test("T6: Network error -> return 500", async () =>{
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  jest.spyOn(utils, "verifyAuthUser").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  jest.spyOn(User, "findOne").mockImplementation(()=> {throw new Error('server crash')});

  await getUser(mockReq, mockResp);

  expect(mockResp.status).toHaveBeenCalledWith(500);
  expect(mockResp.json).toHaveBeenCalledWith({error: 'server crash'});
})



})
/*
describe("createGroup", () => {

   let mockReq, mockResp;
  
 beforeEach(
     ()=>{
        mockReq = {
        body:{   
       name: "test_group", 
       memberEmails: ["mario.red@email.com", "luigi.red@email.com"]
              },
       cookies: {
           refreshToken: 'refresh_token'
         }      };

     


        mockResp ={
        status: jest.fn(()=>mockResp),
         json: jest.fn()
       };

       jest.clearAllMocks();
      
     }
   )

   afterEach(()=>{
     jest.clearAllMocks();
 })


  test('T1: not authentified -> return 401' , async () =>{
   jest.spyOn(utils, "verifyAuthSimple").mockImplementation(()=>(
     {authorized: false,
       cause:"Unauthorized"
     }));
     await createGroup(mockReq, mockResp);

     expect(mockResp.status).toHaveBeenCalledWith(401);
     expect(mockResp.json).toHaveBeenCalledWith({error: 'Unauthorized'});

  });

  test('T2: create group -> retun 200', async() => {

   jest.spyOn(utils, "verifyAuthSimple").mockImplementation(()=>(
     {authorized: true,
       cause:"Authorized"
     }));
     jest.spyOn(User, "findOne").mockReturnValueOnce({ email: 'test@mail.com' });
     jest.spyOn(Group, "findOne").mockReturnValueOnce(null);
     jest.spyOn(Group, "findOne").mockReturnValueOnce(null);
     jest.spyOn(User, "findOne").mockImplementationOnce({_id: 'id'});
     jest.spyOn(Group, "findOne").mockImplementationOnce(()=> null);
     Group.create.mockReturnValueOnce({});
     await createGroup(mockReq, mockResp);

     expect(mockResp.status).toHaveBeenCalledWith(200);
     expect(mockResp.json).toHaveBeenCalledWith({
       data: {
         group: {
           name: 'Test Group',
          members: [
             { email: 'member1@example.com', user: { _id: 'user-id' } },
             { email: 'member2@example.com', user: { _id: 'user-id' } }
           ]
         },
         alreadyInGroup: [],
         membersNotFound: []
       },
       refreshedTokenMessage: expect.anything() 
     })
   });


     test('T3: One of the entered users is an empty string', async()=>{
       mockReq={
         body:{   
           name: "test_group", 
           memberEmails: [" ", "luigi.red@email.com"]
            },
    
             cookies: {
               refreshToken: 'refresh_token'
             }
    
       }
       jest.spyOn(utils, "verifyAuthSimple").mockImplementation(()=>(
         {authorized: true,
           cause:"Authorized"
         }));
         jest.spyOn(User, "findOne").mockImplementation(()=> {email :'test@MediaList.com'})
       await createGroup(mockReq, mockResp);
       expect(mockResp.status).toHaveBeenCalledWith(400)
       expect(mockResp.json).toHaveBeenCalledWith({error: 'email is not valid'});
  
     })
   



 


  })
  */

describe("getGroups", () => { 

  let mockReq, mockResp;

  beforeEach(
    
    ()=>{
      
      mockReq = {};
      mockResp ={
        status: jest.fn(()=>mockResp),
        json: jest.fn(),
        locals: {
          refreshedTokenMessage : "dummy message"
        }
      }
    }
  );


  test("T1:no groups -> return 200 and empty list", async () => {
    //any time the `User.find()` method is called jest will replace its actual implementation with the one defined below
    //sverifyAuthAdmin.mockImplementation(()=>({ authorized: false, cause: "Unauthorized"}))
    
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {
        authorized: true,
        cause:"Authorized"
      }
    ));
    jest.spyOn(utils, "verifyAuthGroup").mockImplementation(()=>(
      {
        authorized: true,
        cause:"Authorized"
      }
    ));
    jest.spyOn(User, "find").mockImplementation(() => []);
    await getGroups(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(200)
    const jsonResp = mockResp.json.mock.calls[0][0];
    expect(mockResp.json).toHaveBeenCalledWith({
      data: [],
      refreshedTokenMessage: mockResp.locals.refreshedTokenMessage,
    });
  

  })

  test("T2: at least one group exists -> return 200 and list of retrieved groups", async () => {
    const retrievedGroups = '[{name: "Family", members: [{email: "mario.red@email.com"}, {email: "luigi.red@email.com"}]';
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
    jest.spyOn(utils, "verifyAuthGroup").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
    jest.spyOn(User, "find").mockImplementation(() => retrievedGroups);
    
    await getGroups(mockReq, mockResp);
    expect(mockResp.status).toHaveBeenCalledWith(200);
    expect(mockResp.json).toHaveBeenCalledWith({
      data: retrievedGroups,
      refreshedTokenMessage: mockResp.locals.refreshedTokenMessage,
    });
  
  })

  test("T3:not authentified -> return 401", async () => {
    //any time the `User.find()` method is called jest will replace its actual implementation with the one defined below
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: false,
        cause:"Unauthorized"
      }
    ))  
    jest.spyOn(utils, "verifyAuthGroup").mockImplementation(()=>(
      {authorized: false,
        cause:"Unauthorized"
      }
    ))  
    await getGroups(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(401);
  })

  test("T4: Network error -> return 500", async () =>{
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ));
    jest.spyOn(Group, "find").mockImplementation(()=> {throw new Error('server crash')});

    await getGroups(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(500);
    expect(mockResp.json).toHaveBeenCalledWith({error: 'server crash'});
  })





})

describe("getGroup", () => {
  let mockReq, mockResp;
  beforeEach(
      ()=>{
         mockReq = {
          params: {
            name: 'group',
          },
          cookies: {}
        };
         mockResp ={
          status: jest.fn(()=>mockResp),
          json: jest.fn(),
          locals: {
            refreshedTokenMessage: "dummy message"
          }
        };
       
      }
    )
  
    afterEach(()=>{
      jest.clearAllMocks();
   })

   test('T1: get group -> return 200', async()=>{
    const group_r = 
        {name: "Family", members: [{email: "mario.red@email.com"}, {email: "luigi.red@email.com"}]};
        
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))  
    jest.spyOn(utils, "verifyAuthGroup").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
   
    
    jest.spyOn(Group, "findOne").mockImplementation(()=>group_r);
    await getGroup(mockReq, mockResp);
    expect(mockResp.status).toHaveBeenCalledWith(200);
    expect(mockResp.json).toHaveBeenCalledWith({data: {group:group_r, refreshedTokenMessage: mockResp.locals.refreshedTokenMessage}})

   })

   test('T2: group does not exist -> return 400', async ()=>{
    const group = '{name: "Family", members: [{email: "mario.red@email.com"}, {email: "luigi.red@email.com"}]}'
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))  
    jest.spyOn(utils, "verifyAuthGroup").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
   jest.spyOn(Group, "findOne").mockImplementation(()=> null);
   await getGroup(mockReq, mockResp);
   expect(mockResp.status).toHaveBeenCalledWith(400);
   expect(mockResp.json).toHaveBeenCalledWith({ error: "group does not exist" });


   })

   test('T3: User not authentified -> return 401', async()=>{
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: false,
        cause:"Unauthorized"
      }   ))
    jest.spyOn(utils, "verifyAuthGroup").mockImplementation(()=>(
        {authorized: false,
          cause:"Unauthorized"
        }))
      await getGroup(mockReq, mockResp);
      expect(mockResp.status).toHaveBeenCalledWith(401);
  

   })

   test("T4: Network error -> return 500", async () =>{
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
    jest.spyOn(utils, "verifyAuthGroup").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
    jest.spyOn(Group, "findOne").mockImplementation(()=> {throw new Error('server crash')});
  
    await getGroup(mockReq, mockResp);
  
    expect(mockResp.status).toHaveBeenCalledWith(500);
    expect(mockResp.json).toHaveBeenCalledWith({error: 'server crash'});
  })
  

 })

describe("addToGroup", () => { })

describe("removeFromGroup", () => { })

describe("deleteUser", () => {

  let mockReq, mockResp;
  beforeEach(
      ()=>{
         mockReq = {
          body:{
            email: 'test@example.com'
          },
          cookies: {}
        };
        mockResp ={
          status: jest.fn(()=>mockResp),
          json: jest.fn(),
          locals: {
            refreshedTokenMessage: "dummy message"
          }
        };
        jest.clearAllMocks();
      }
      )
      
      afterEach(()=>{
        jest.clearAllMocks();
      }
      )
      
      test('T1: delete the user -> return 200' , async()=>{
      jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
                {authorized: true,
                  cause:"Authorized"
                }
              ))
            const user = { email: 'user@example.com' };
            jest.spyOn(User, "findOne").mockImplementation(()=>user);
            jest.spyOn(User, "deleteOne").mockImplementation(()=>{deletedCount: 1});
            jest.spyOn(transactions, "deleteMany").mockImplementation(()=>{deletedCount: 2});
            const group = { _id: 'group-id', members: [{ email: 'user@example.com' }] };
            jest.spyOn(Group, "findOne").mockImplementation(()=>group);
            jest.spyOn(Group, "deleteOne").mockImplementation(()=>{});
      
            await deleteUser(mockReq, mockResp);
            expect(mockResp.status).toHaveBeenCalledWith(200);
            expect(mockResp.json).toHaveBeenCalledWith({
              deletedTransactions: 2,
              deletedFromGroup: true,
            });
          });
        
    test('T2: missing field in body -> retunr 400', async()=>{
      
      let mockReq_miss = {
        body: {
          
        }
      }
      jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
        {authorized: true,
        cause:"Authorized"
        }
      ))


      await deleteUser(mockReq_miss, mockResp)
      expect(mockResp.status).toHaveBeenCalledWith(400);
      expect(mockResp.json).toHaveBeenCalledWith({ error: "The request body does not contain all the necessary attributes" });
    })

    
    test('T3: missing values -> retunr 400', async()=>{
      
      let mockReq_empty = {
        body: {
          email: ''
        }
      }
      jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
        {authorized: true,
        cause:"Authorized"
        }
      ))


      await deleteUser(mockReq_empty, mockResp)
      expect(mockResp.status).toHaveBeenCalledWith(400);
      expect(mockResp.json).toHaveBeenCalledWith({ error: "The email passed is an empty string" });
    })

    test('T4: invalid email format -> retunr 400', async()=>{
      
      let mockReq_invalid = {
        body: {
          email: 'email'
        }
      }
      jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
        {authorized: true,
        cause:"Authorized"
        }
      ))


      await deleteUser(mockReq_invalid, mockResp)
      expect(mockResp.status).toHaveBeenCalledWith(400);
      expect(mockResp.json).toHaveBeenCalledWith({ error: "The email is not in a valid format"  });
    })

    test('T5: user does not exist -> retunr 400', async()=>{
      
      let mockReq = {
        body: {
          email: 'test@example.com'
        }
      }
      jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
        {authorized: true,
        cause:"Authorized"
        }
      ))

      jest.spyOn(User,"findOne").mockImplementation(()=> null);

      await deleteUser(mockReq, mockResp)
      expect(mockResp.status).toHaveBeenCalledWith(401);
      expect(mockResp.json).toHaveBeenCalledWith({ error: "The email does not represent a user in the database"  });
    })

    test('T6: the user not authentified -> retunr 400', async()=>{
      
      let mockReq_miss = {
        body: {
          email: 'test@example.com'
          
        }
      }
      jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
        {authorized: false,
        cause:"UnAuthorized"
        }
      ))

      await deleteUser(mockReq, mockResp);
      expect(mockResp.status).toHaveBeenCalledWith(401);




   })
   test("T7: Network error -> return 500", async () =>{
    let mockReq = {
      body: {
        email: 'test@example.com'
        
      }
    }
    jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
    jest.spyOn(utils, "verifyAuthGroup").mockImplementation(()=>(
      {authorized: true,
        cause:"Authorized"
      }
    ))
    jest.spyOn(Group, "findOne").mockImplementation(()=> {throw new Error('server crash')});
  
    await deleteUser(mockReq, mockResp);
  
    expect(mockResp.status).toHaveBeenCalledWith(500);
    expect(mockResp.json).toHaveBeenCalledWith({error: 'server crash'});

    })
});



 

describe("deleteGroup", () => { 
  let mockReq, mockResp;
  beforeEach(
      ()=>{
         mockReq = {
          body:{
            name: 'group'
          },
          cookies: {}
        };
         mockResp ={
          status: jest.fn(()=>mockResp),
          json: jest.fn(),
          locals: {
            refreshedTokenMessage: "dummy message"
          }
        };
       
      }
    )
  
    afterEach(()=>{
      jest.clearAllMocks();
    }
    )

test('T1 : delte group -> return 200', async()=>{
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  const group = {
    name: 'group'
  };
  jest.spyOn(Group, "findOne").mockImplementationOnce(()=>group);
  await deleteGroup(mockReq, mockResp);

  expect(mockResp.status).toHaveBeenCalledWith(200);
  expect(mockResp.json).toHaveBeenCalledWith({data: {message: "Group deleted successfully"}, refreshedTokenMessage: mockResp.locals.refreshedTokenMessage})
})

test('T2: missing fields -> return 400', async() =>{
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  mockReq={
    body:{

    }
  }
  await deleteGroup(mockReq, mockResp);
  expect(mockResp.status).toHaveBeenCalledWith(400);
  expect(mockResp.json).toHaveBeenCalledWith({ error: "The request body does not contain all the necessary attributes" });

})

test('T3: name is an empty string -> return 400', async() =>{
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  mockReq={
    body:{
      name : ''

    }
  }
  await deleteGroup(mockReq, mockResp);
  expect(mockResp.status).toHaveBeenCalledWith(400);
  expect(mockResp.json).toHaveBeenCalledWith({ error: "The name passed is an empty string" });

})
test('T4 : group does not exist -> return 400', async()=>{
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  const group = {
    name: 'group'
  };
  jest.spyOn(Group, "findOne").mockImplementationOnce(()=>null);
  await deleteGroup(mockReq, mockResp);

  expect(mockResp.status).toHaveBeenCalledWith(400);
  expect(mockResp.json).toHaveBeenCalledWith({ error: "The name passed does not represent a group in the database" })
})



test('T5: user is unauthenrified -> return 401', async() =>{
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: false,
      cause:"UnAuthorized"
    }
  ))

  await deleteGroup(mockReq, mockResp);
  expect(mockResp.status).toHaveBeenCalledWith(401);


})

test('T6 : Network error -> return 500', async()=>{
  jest.spyOn(utils, "verifyAuthAdmin").mockImplementation(()=>(
    {authorized: true,
      cause:"Authorized"
    }
  ))
  const group = {
    name: 'group'
  };
  jest.spyOn(Group, "findOne").mockImplementationOnce(()=> {throw new Error('server crash')});
  
  await deleteGroup(mockReq, mockResp);

  expect(mockResp.status).toHaveBeenCalledWith(500);
  expect(mockResp.json).toHaveBeenCalledWith({error: 'server crash'});
})




})
