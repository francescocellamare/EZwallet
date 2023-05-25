
import request from 'supertest';
import { app } from '../app';
import { User } from '../models/User.js';
import  {getUser, getUsers} from '../controllers/users';
/**
 * In order to correctly mock the calls to external modules it is necessary to mock them using the following line.
 * Without this operation, it is not possible to replace the actual implementation of the external functions with the one
 * needed for the test cases.
 * `jest.mock()` must be called for every external module that is called in the functions under test.
 */
jest.mock("../models/User.js")

/**
 * Defines code to be executed before each test case is launched
 * In this case the mock implementation of `User.find()` is cleared, allowing the definition of a new mock implementation.
 * Not doing this `mockClear()` means that test cases may use a mock implementation intended for other test cases.
 */
beforeEach(() => {
  User.find.mockClear()
  //additional `mockClear()` must be placed here

});

describe("getUsers", () => {
  let mockReq, mockResp;
  beforeEach(
    
    ()=>{
      
      mockReq = {};
      mockResp ={
        status: jest.fn(()=>mockResp),
        json: jest.fn(),
      }
    }
  );

  test("T1:no users -> return 200 and empty list", async () => {
    //any time the `User.find()` method is called jest will replace its actual implementation with the one defined below
    jest.spyOn(User, "find").mockImplementation(() => [])
    await getUsers(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(200)
    const jsonResp = mockResp.json.mock.calls[0][0];
    expect(jsonResp.data.users).toEqual([])
  })

  test("T2: at least one user exists -> return 200 and list of retrieved users", async () => {
    const retrievedUsers = [{ username: 'test1', email: 'test1@example.com', password: 'hashedPassword1' }, { username: 'test2', email: 'test2@example.com', password: 'hashedPassword2' }]
    jest.spyOn(User, "find").mockImplementation(() => [...retrievedUsers]);
    
    await getUsers(mockReq, mockResp);
    expect(mockResp.status).toHaveBeenCalledWith(200);
    expect(mockResp.json.mock.calls[0][0].data.users).toEqual(retrievedUsers);
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
      };
      
    }
  )

test('T1: user exists -> return 200 and user info', async ()=>{
  const user ={
    username: 'user',
    email: 'test@example.com',
    role: 'role',
    refreshToken: 'refreshToken'
  }
  jest.spyOn(User, "findOne").mockImplementation(()=>user);

  await getUser(mockReq, mockResp);
  expect(mockResp.status).toHaveBeenCalledWith(200);
  const jsonResp = mockResp.json.mock.call[0][0];
  expect(jsonResp.data.username).toBe('user');
  expect(jsonResp.data.email).toBe('test@example.com');
  expect(jsonResp.data.role).toBe('role');


})

test('T2: user not found -> return 401 and message: user not found', async()=>{
  jest.spyOn(User, "findOne").mockImplementation(()=> null);

  await getUser(mockReq, mockResp);
  expect(mockResp.status).toHaveBeenCalledWith(401);
  expect(mockResp.json.mock.call[0][0].data.message).toBe('User not found')
})

test('T3: different username -> return 401 and message: unauthorized', async ()=>
{ const user ={
  username: 'differentUser',
  email: 'test@example.com',
  role: 'role',
  refreshToken: 'refreshToken'
  
}
jest.spyOn(User, "findOne").mockImplementation(()=> user);
await getUser(mockReq, mockResp);
expect(mockResp.status).toHaveBeenCalledWith(401);
expect(mockResp.json.mock.call[0][0].data.message).toBe('Unauthorized');

})
})

describe("createGroup", () => { })

describe("getGroups", () => { })

describe("getGroup", () => { })

describe("addToGroup", () => { })

describe("removeFromGroup", () => { })

describe("deleteUser", () => { })

describe("deleteGroup", () => { })
