import request from 'supertest';
import { app } from '../app';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
const bcrypt = require("bcryptjs")
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  const dbName = "testingDatabaseAuth";
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

describe('register', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('T1: register new user -> return 200 and message: user added succesfully', async()=>{
    const newUser = {
      username : 'user',
      email: 'test@example.com',
      password: '123'
    };

    const resp = await request(app)
    .post(`/api/register`)
    .send(newUser);
     

    expect(resp.status).toBe(200);
    expect(resp.body.data.message).toBe('user added succesfully')


  })

    test('T2: one field is empty -> return 200 and error message', async()=>{
    const newUser = {
      username : '',
      email: 'test@example.com',
      password: '123'
    };

    const resp = await request(app)
    .post(`/api/register`)
    .send(newUser);
     

    expect(resp.status).toBe(400);
    expect(resp.body.error).toBe("empty fields are not allowed")


  })

  test('T3: one field is missing -> return 400 and error message', async()=>{
    const newUser = {
      email: 'test@example.com',
      password: '123'
    };

    const resp = await request(app)
    .post(`/api/register`)
    .send(newUser);
     

    expect(resp.status).toBe(400);
    expect(resp.body.error).toBe("some fields are missing")


  })

  
  test('T4: invalid email-> return 400 and error message', async()=>{
    const newUser = {
      username: 'user',
      email: 'testexample.com',
      password: '123'
    };

    const resp = await request(app)
    .post(`/api/register`)
    .send(newUser);
     

    expect(resp.status).toBe(400);
    expect(resp.body.error).toBe("invalid email")


  })

  test('T5: user already in db-> return 400 and error message', async()=>{
    const user = {
      username: 'user',
      email: 'testexample.com',
      password: '123'
    };

    await User.create(user);

    const resp = await request(app)
    .post(`/api/register`)
    .send(user);
     

    expect(resp.status).toBe(400);
    expect(resp.body.error).toBe("you are already registered")


  })



});

describe("registerAdmin", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})

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
