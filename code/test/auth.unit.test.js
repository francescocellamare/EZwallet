import request from 'supertest';
import { app } from '../app';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { json, response } from 'express';
import { logout, register, registerAdmin, login } from '../controllers/auth';
const bcrypt = require("bcryptjs")

jest.mock("bcryptjs")
jest.mock("jsonwebtoken");
jest.mock('../models/User.js');

describe('register', () => {
    
    let mockReq;
    let mockResp;

beforeEach(()=>{
        mockReq = {
            body:{
            username: 'user',
            email: 'test@example.com',
            password: '123'
            }

        };


    
    mockResp = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const existingUser = {
        email: 'test@example.com',

    }

    
    
 });

 afterEach(()=>{
    jest.clearAllMocks();
 })





test("T1: register user  -> return 200 and message: user added succesfully", async () => {
     jest.spyOn(User, "findOne").mockImplementation(()=>null) //no user is found with same username or/and password
     jest.spyOn(bcrypt, "hash").mockImplementation(()=>"hashedPassowrd")
     jest.spyOn(User, "create").mockImplementation(()=>({username:'test', email:'test@example.com', password:'hashedPassword'}))

    await register(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(200);
    // Get the argument passed to the json method
    const jsonResponse = mockResp.json.mock.calls[0][0];
    

    // Check the value of data.message
    expect(jsonResponse.data.message).toBe('user added succesfully');



    });

test("T2: user already exist -> return 400 and message: you are already registered ", async () =>{
        jest.spyOn(User, "findOne").mockImplementation(()=>({username:'user', email:"test@example.com"}))
        await register(mockReq, mockResp);
        
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];
        
    // Check the value of data.message
        expect(jsonResponse.error).toBe('you are already registered');
    })


test("T3: invalid email -> return 400 and message: invalid email ", async () =>{
        let mockReqInvalidEmail;
        mockReqInvalidEmail = {
            body:{
                username: 'user',
                email: 'invalidEmail',
                password: '123'
            }

        }
        jest.spyOn(User, "findOne").mockImplementation(()=>null)
        await register(mockReqInvalidEmail, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];

        // Check the value of data.message
        expect(jsonResponse.error).toBe('invalid email');
    })
test("T4: missing fields -> return 400 and message: some fields are missing ", async () =>{
        let mockReqIncomplete;
        mockReqIncomplete = {
            body:{
                username: 'user',
                email: 'test@example.com'
            }

        }
        jest.spyOn(User, "findOne").mockImplementation(()=>null);
        await register(mockReqIncomplete, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];
        // Check the value of data.message
        expect(jsonResponse.error).toBe('some fields are missing');
    })
test("T5: field with empty string -> return 400 and message: empty fields are not allowed ", async () =>{
        let mockReqIncomplete;
        mockReqIncomplete = {
            body:{
                username: 'user',
                email: 'test@example.com',
                password: ''
            }

        }
        jest.spyOn(User, "findOne").mockImplementation(()=>null);
        await register(mockReqIncomplete, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];
        // Check the value of data.message
        expect(jsonResponse.error).toBe('empty fields are not allowed');
    })

    test("T6:Network error -> return 500 and error message", async()=>{
        const errorMsg = '[Error: Database connection error]';
        jest.spyOn(User, "findOne").mockRejectedValue(new Error(errorMsg));
        
        await register(mockReq, mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(500);
        expect(mockResp.json).toHaveBeenCalledWith({
            error: errorMsg
        })
    })


});



describe("registerAdmin", () => { 
    let mockReq;
    let mockResp;

    beforeEach(()=>{
        mockReq = {
            body:{
            username: 'user',
            email: 'test@example.com',
            password: '123'
            }

        };



        mockResp = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

    
    
 });

 afterEach(()=>{
    jest.clearAllMocks();
 })





    test("T1: register admin -> return 200 and message: admin added succesfully ", async () => {
     jest.spyOn(User, "findOne").mockImplementation(()=>null) //no user is found with same username or/and password
     jest.spyOn(bcrypt, "hash").mockImplementation(()=>"hashedPassowrd")
     jest.spyOn(User, "create").mockImplementation(()=>({username:'test', email:'test@example.com', password:'hashedPassword', role:"Admin"}))

    await registerAdmin(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(200);
    // Get the argument passed to the json method
    const jsonResponse = mockResp.json.mock.calls[0][0];

    // Check the value of data.message
    expect(jsonResponse.data.message).toBe('admin added succesfully');



    });

    test("T2: admin exists -> return 400 and message: you are already registered ", async () =>{
        jest.spyOn(User, "findOne").mockImplementation(()=>({username:'user', email:"test@example.com"}))
        await registerAdmin(mockReq, mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
         const jsonResponse = mockResp.json.mock.calls[0][0];

        // Check the value of data.message
        expect(jsonResponse.error).toBe('you are already registered');

    });


    test("T3: invalid email -> return 400 and message: invalid email ", async () =>{
        let mockReqInvalidEmail;
        mockReqInvalidEmail = {
            body:{
                username: 'user',
                email: 'invalidEmail',
                password: '123'
            }

        }
        jest.spyOn(User, "findOne").mockImplementation(()=>null)
        await registerAdmin(mockReqInvalidEmail, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];

        // Check the value of data.message
        expect(jsonResponse.error).toBe('invalid email');
    })
    test("T4: missing fields -> return 400 and message: some fields are missing ", async () =>{
        let mockReqIncomplete;
        mockReqIncomplete = {
            body:{
                username: 'user',
                email: 'test@example.com'
            }

        }
        jest.spyOn(User, "findOne").mockImplementation(()=>null);
        await registerAdmin(mockReqIncomplete, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];
        // Check the value of data.message
        expect(jsonResponse.error).toBe('some fields are missing');
    })

    test("T5: field with empty string -> return 400 and message: empty fields are not allowed ", async () =>{
        let mockReqIncomplete;
        mockReqIncomplete = {
            body:{
                username: 'user',
                email: 'test@example.com',
                password: ''
            }

        }
        jest.spyOn(User, "findOne").mockImplementation(()=>null);
        await registerAdmin(mockReqIncomplete, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];
        // Check the value of data.message
        expect(jsonResponse.error).toBe('empty fields are not allowed');
    })

    test("T6:Network error -> return 500 and error message", async()=>{
        const errorMsg = '[Database connection error]';
        jest.spyOn(User, "findOne").mockRejectedValue(new Error(errorMsg));
        
        await registerAdmin(mockReq, mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(500);
        expect(mockResp.json).toHaveBeenCalledWith({
            error: errorMsg
        })
    })


});

describe('login', () => { 
    let mockReq;
    let mockResp;
    let existingUser;

beforeEach(()=>{
    mockReq = {
        body: {
            email: 'test@example.com',
            password: '123'
        },

        cookies: {}
    };

   

    mockResp = {
        status: jest.fn(()=> mockResp),
        json: jest.fn(),
        cookie: jest.fn().mockReturnThis(),
    };

     existingUser = {
        email: 'test@example.com',
        password: 'hashed_password',
        id: 'user_id',
        username: 'user',
        refreshToken: 'exampleRefreshToken'
    }
});

afterEach(()=>{
    jest.clearAllMocks();
 });

    test('T1: log in user -> return access and refresh tokens and status = 200', async () => {
        let findOneMock;
        findOneMock = jest.spyOn(User, "findOne");
        findOneMock.mockResolvedValue({
            existingUser: existingUser,
            save: jest.fn().mockResolvedValue({})
        });
        bcrypt.compare.mockResolvedValue(true);
        jest.spyOn(jwt, 'sign').mockReturnValueOnce('exampleAccessToken');
        jest.spyOn(jwt, 'sign').mockReturnValueOnce('exampleRefreshToken')
        
        
     // jest.replaceProperty(save)
      await login(mockReq, mockResp)

      expect(mockResp.cookie).toHaveBeenCalledWith('accessToken', 'exampleAccessToken', { httpOnly: true, domain: "localhost", path: "/api", maxAge: 60 * 60 * 1000, sameSite: "none", secure: true })
      expect(mockResp.cookie).toHaveBeenCalledWith('refreshToken', 'exampleRefreshToken', { httpOnly: true, domain: "localhost", path: '/api', maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true })
      expect(mockResp.status).toHaveBeenCalledWith(200);
      const jsonResp = mockResp.json.mock.calls[0][0];
      expect(jsonResp.data.accessToken).toBe('exampleAccessToken');
      expect(jsonResp.data.refreshToken).toBe('exampleRefreshToken');
       })


    test('T2: user does not exist -> return 400 and message: please you need to register', async ()=>{
        jest.spyOn(User, "findOne").mockImplementation(()=>null) //user does not exist
        await login(mockReq, mockResp)
        expect(mockResp.status).toHaveBeenCalledWith(400);
        expect(mockResp.json.mock.calls[0][0].error).toBe('please you need to register')

    })

    test('T3: wrong password -> return 400 and message: wrong credentials', async()=>{
        let findOneMock;
        findOneMock = jest.spyOn(User, "findOne");
        findOneMock.mockResolvedValue({
            existingUser: existingUser,
            save: jest.fn().mockResolvedValue({})
        });
        bcrypt.compare.mockResolvedValue(false);
        await login(mockReq, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        expect(mockResp.json.mock.calls[0][0].error).toBe('wrong credentials')
        
    })



    test("T4: invalid email -> return 400 and message: invalid email ", async () =>{
        let mockReqInvalidEmail;
        mockReqInvalidEmail = {
            body:{
                email: 'invalidEmail',
                password: '123'
            }

        }
        let findOneMock;
        findOneMock = jest.spyOn(User, "findOne");
        findOneMock.mockResolvedValue({
            existingUser: existingUser,
            save: jest.fn().mockResolvedValue({})
        });
        await login(mockReqInvalidEmail, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];

        // Check the value of data.message
        expect(jsonResponse.error).toBe('invalid email');
    })
    test("T5: missing fields -> return 400 and message: some fields are missing ", async () =>{
        let mockReqIncomplete;
        mockReqIncomplete = {
            body:{
                
                email: 'test@example.com'
            }

        }
        let findOneMock;
        findOneMock = jest.spyOn(User, "findOne");
        findOneMock.mockResolvedValue({
            existingUser: existingUser,
            save: jest.fn().mockResolvedValue({})
        });
        await login(mockReqIncomplete, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];
        // Check the value of data.message
        expect(jsonResponse.error).toBe('some fields are missing');
    })

    test("T6: field with empty string -> return 400 and message: empty fields are not allowed ", async () =>{
        let mockReqIncomplete;
        mockReqIncomplete = {
            body:{
                email: 'test@example.com',
                password: ''
            }

        }
        let findOneMock;
        findOneMock = jest.spyOn(User, "findOne");
        findOneMock.mockResolvedValue({
            existingUser: existingUser,
            save: jest.fn().mockResolvedValue({})
        });
        await login(mockReqIncomplete, mockResp);
        expect(mockResp.status).toHaveBeenCalledWith(400);
        // Get the argument passed to the json method
        const jsonResponse = mockResp.json.mock.calls[0][0];
        // Check the value of data.message
        expect(jsonResponse.error).toBe('empty fields are not allowed');
    })

    test("T7:Network error -> return 500 and error message", async()=>{
        const errorMsg = '[Error: Database connection error]';
        jest.spyOn(User, "findOne").mockRejectedValue(new Error(errorMsg));
        
        await login(mockReq, mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(500);
        expect(mockResp.json).toHaveBeenCalledWith({
            error: errorMsg
        })
    })
    


       
    });


describe('logout', () => { 
    let mockReq;
    let mockResp;

    beforeEach(()=>{
        mockReq = {
            body:{
                username: 'user',
                email: 'test@example.com',
                password: '123',
            },
            cookies: {accessToken: 'exampleAccessToken', refreshToken: 'exampleRefreshToken'}
        };
        mockResp = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnThis()
        };

    });
    afterEach(()=>{
        jest.clearAllMocks();
    })



    test('T1:log out the user -> return 200 and message: logged out', async()=>{
        let findOneMock;
        findOneMock = jest.spyOn(User, "findOne");
        findOneMock.mockResolvedValue({
            refreshToken: "exampleRefreshToken",
            save: jest.fn().mockResolvedValue({})
        });
        await logout(mockReq, mockResp);
        expect(mockResp.cookie).toHaveBeenCalledWith('accessToken', '', {httpOnly:true, path:'/api', maxAge: 0, sameSite: 'none', secure: true });
        expect(mockResp.cookie).toHaveBeenCalledWith('refreshToken', "", { httpOnly: true, path: '/api', maxAge: 0, sameSite: 'none', secure: true })
        expect(mockResp.status).toHaveBeenCalledWith(200);
        expect((mockResp.json.mock.calls[0][0].data.message)).toBe("logged out")
    })


    test('T2: no refreshToken -> return 400 and message: user not found', async () => {

        mockReq = {
            body:{
                username: 'user',
                email: 'test@example.com',
                password: '123',
            },
            cookies:{ accessToken: '', refreshToken: ''}
        };

        await logout(mockReq, mockResp)
        expect(mockResp.status).toHaveBeenCalledWith(400);

        const jsonResponse = mockResp.json.mock.calls[0][0];
        expect((jsonResponse.error)).toBe("user not found")
        

    });
    
    test('T3: user not found -> return 400 and message: user not found ', async() =>{
        jest.spyOn(User, "findOne").mockImplementation(()=>null);
        await logout(mockReq, mockResp);
        
        expect(mockResp.status).toHaveBeenCalledWith(400);
        expect((mockResp.json.mock.calls[0][0].error)).toBe("user not found")
    })

    test("T4:Network error -> return 500 and error message", async()=>{
        const errorMsg = '[Error: Database connection error]';
        jest.spyOn(User, "findOne").mockRejectedValue(new Error(errorMsg));
        
        await logout(mockReq, mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(500);
        expect(mockResp.json).toHaveBeenCalledWith({
            error: errorMsg
        })
    })

});

