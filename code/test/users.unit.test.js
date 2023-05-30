
import request from 'supertest';
import { app } from '../app';
import { Group, User } from '../models/User.js';
import * as utils from '../controllers/utils';
import * as users from '../controllers/users'
import jwt from 'jsonwebtoken';
import  {getGroups, getUser, getUsers, createGroup, getGroup} from '../controllers/users';
import { TokenExpiredError } from 'jsonwebtoken';
import { createCategory } from '../controllers/controller';

/**
 * In order to correctly mock the calls to external modules it is necessary to mock them using the following line.
 * Without this operation, it is not possible to replace the actual implementation of the external functions with the one
 * needed for the test cases.
 * `jest.mock()` must be called for every external module that is called in the functions under test.
 */
jest.mock('../models/User.js');

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
    jest.spyOn(User, "find").mockImplementationOnce(()=> {throw new Error('server crash')});

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

// describe("createGroup", () => {

//   let mockReq, mockResp;
  
// beforeEach(
//     ()=>{
//        mockReq = {
//         body:{   
//       name: "test_group", 
//       memberEmails: ["mario.red@email.com", "luigi.red@email.com"]
//        },

//         cookies: {
//           refreshToken: 'refresh_token'
//         }      };

     


//        mockResp ={
//         status: jest.fn(()=>mockResp),
//         json: jest.fn()
//       };
      
//     }
//   )

//   afterEach(()=>{
//     jest.clearAllMocks();
//  })


//  test('T1: not authentified -> return 401' , async () =>{
//   jest.spyOn(utils, "verifyAuthSimple").mockImplementation(()=>(
//     {authorized: false,
//       cause:"Unauthorized"
//     }));
//     await createGroup(mockReq, mockResp);

//     expect(mockResp.status).toHaveBeenCalledWith(401);
//     expect(mockResp.json).toHaveBeenCalledWith({error: 'Unauthorized'});

//  });

//  test('T2: create group -> retun 200', async() => {

//   jest.spyOn(utils, "verifyAuthSimple").mockImplementation(()=>(
//     {authorized: true,
//       cause:"Authorized"
//     }));
//   //  jest.spyOn(User, "findOne").mockResolvedValueOnce({ email: 'test@mail.com' });
//     jest.spyOn(Group, "findOne").mockResolvedValueOnce(null);
//     jest.spyOn(Group, "findOne").mockResolvedValueOnce(null);
//     jest.spyOn(users, "getUserId").mockResolvedValueOnce('userId');
//     jest.spyOn(users, 'isPartOfOtherGroups').mockResolvedValueOnce(false);
//   Group.create.mockResolvedValueOnce({});
//     await createGroup(mockReq, mockResp);

//     expect(mockResp.status).toHaveBeenCalledWith(200);
//     expect(mockResp.json).toHaveBeenCalledWith({
//       data: {
//         group: {
//           name: 'Test Group',
//           members: [
//             { email: 'member1@example.com', user: { _id: 'user-id' } },
//             { email: 'member2@example.com', user: { _id: 'user-id' } }
//           ]
//         },
//         alreadyInGroup: [],
//         membersNotFound: []
//       },
//       refreshedTokenMessage: expect.anything() 
//     })
//   });


//     test('T3: One of the entered users is an empty string', async()=>{
//       mockReq={
//         body:{   
//           name: "test_group", 
//           memberEmails: [" ", "luigi.red@email.com"]
//            },
    
//             cookies: {
//               refreshToken: 'refresh_token'
//             }
    
//       }
//       jest.spyOn(utils, "verifyAuthSimple").mockImplementation(()=>(
//         {authorized: true,
//           cause:"Authorized"
//         }));
//         jest.spyOn(User, "findOne").mockImplementationOnce(()=> {email :'test@MediaList.com'})
//       await createGroup(mockReq, mockResp);
//       expect(mockResp.json).toHaveBeenCalledWith({error: 'email is not valid'});
  
//     })
   



 


//  })

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
    jest.spyOn(Group, "find").mockImplementationOnce(()=> {throw new Error('server crash')});

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
   
    
    jest.spyOn(Group, "findOne").mockImplementationOnce(()=>group_r);
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
   jest.spyOn(Group, "findOne").mockImplementationOnce(()=> null);
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
    jest.spyOn(Group, "findOne").mockImplementationOnce(()=> {throw new Error('server crash')});
  
    await getGroup(mockReq, mockResp);
  
    expect(mockResp.status).toHaveBeenCalledWith(500);
    expect(mockResp.json).toHaveBeenCalledWith({error: 'server crash'});
  })
  

 })

describe("addToGroup", () => { })

describe("removeFromGroup", () => { })

describe("deleteUser", () => { })

describe("deleteGroup", () => { })
