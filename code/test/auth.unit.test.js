
import request from 'supertest';
import { app } from '../app';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { response } from 'express';
import { register, registerAdmin } from '../controllers/auth';
const bcrypt = require("bcryptjs")

jest.mock("bcryptjs")
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

    
    
 });

 afterEach(()=>{
    jest.clearAllMocks();
 })





    test("T1: register \'user'\ -> should create a new user and return 200 ", async () => {
     jest.spyOn(User, "findOne").mockImplementation(()=>null) //no user is found with same username or/and password
     jest.spyOn(bcrypt, "hash").mockImplementation(()=>"hashedPassowrd")
     jest.spyOn(User, "create").mockImplementation(()=>({username:'test', email:'test@example.com', password:'hashedPassword'}))

    await register(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(200);
    expect(mockResp.json).toHaveBeenCalledWith('user added succesfully');



    });

    test("T2: resgister \'user\' -> should return 400 if email and/or username already exist ", async () =>{
        jest.spyOn(User, "findOne").mockImplementation(()=>({username:'user', email:"test@example.com"}))
        await register(mockReq, mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(400);
        expect(mockResp.json).toHaveBeenCalledWith({ message: 'you are already registered' });
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





    test("T1: register \'admin'\ -> should create a new user with role admin and return 200 ", async () => {
     jest.spyOn(User, "findOne").mockImplementation(()=>null) //no user is found with same username or/and password
     jest.spyOn(bcrypt, "hash").mockImplementation(()=>"hashedPassowrd")
     jest.spyOn(User, "create").mockImplementation(()=>({username:'test', email:'test@example.com', password:'hashedPassword', role:"Admin"}))

    await registerAdmin(mockReq, mockResp);

    expect(mockResp.status).toHaveBeenCalledWith(200);
    expect(mockResp.json).toHaveBeenCalledWith('admin added succesfully');



    });

    test("T2: resgister \'admin\' -> should return 400 if email and/or username already exist ", async () =>{
        jest.spyOn(User, "findOne").mockImplementation(()=>({username:'user', email:"test@example.com"}))
        await registerAdmin(mockReq, mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(400);
        expect(mockResp.json).toHaveBeenCalledWith({ message: 'you are already registered' });
    });


});

describe('login', () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
});

describe('logout', () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
});
