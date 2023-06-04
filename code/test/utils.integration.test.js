import { handleDateFilterParams, verifyAuth, handleAmountFilterParams, verifyAuthSimple, verifyAuthAdmin, verifyAuthUser, verifyAuthGroup } from '../controllers/utils';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose, { Model } from 'mongoose';
import { User, Group } from '../models/User.js';

describe("verifyAuth", () => { 
    const adminAccessTokenValid = jwt.sign({
        email: "admin@email.com",
        username: "admin",
        role: "Admin",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '1y' })
    
    const testerAccessTokenValid = jwt.sign({
        email: "tester@test.com",
        username: "tester",
        role: "Regular",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '1y' })

    const testerRefreshTokenValid = testerAccessTokenValid
    const adminRefreshTokenValid = adminAccessTokenValid

    const adminAccessTokenExpired = jwt.sign({
        email: "tester@test.com",
        username: "tester",
        role: "Admin",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '0s' })

    let testerAccessTokenExpired = jwt.sign({
        email: "tester@test.com",
        username: "tester",
        role: "Regular",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '0s' })

    const testerRefreshTokenExpired = testerAccessTokenExpired
    const adminRefreshTokenExpired = adminAccessTokenExpired

    test('T1: no cookies added to the request', () => {  
        const req = {
            cookies: {
                accessToken: undefined,
                refreshToken: undefined
            }
        }
        const res = {}
        const info = {
            authType: 'Simple'
        }
        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)

    });

    test('T2: verify given accessToken but some informations are missing (ex: role)', () => {
        const testerAccessTokenNotValid = jwt.sign({
            email: "tester@test.com",
            username: "tester"
        }, process.env.ACCESS_KEY, { expiresIn: '1y' })

        const testerRefreshTokenNotValid = testerAccessTokenNotValid

        const req = {
            cookies: {
                accessToken: testerAccessTokenNotValid,
                refreshToken: testerRefreshTokenNotValid
            }
        }
        const res = {}
        const info = {
            authType: 'Simple'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T3: verify given accessToken but some informations are missing (ex: role for accessToken)', () => {
        const testerAccessTokenNotValid = jwt.sign({
            email: "tester@test.com",
            username: "tester"
        }, process.env.ACCESS_KEY, { expiresIn: '1y' })

        const testerRefreshTokenNotValid = jwt.sign({
            email: "tester@test.com",
            username: "tester",
            role: 'Regular'
        }, process.env.ACCESS_KEY, { expiresIn: '1y' })

        const req = {
            cookies: {
                accessToken: testerAccessTokenNotValid,
                refreshToken: testerRefreshTokenNotValid
            }
        }
        const res = {}
        const info = {
            authType: 'Simple'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T4: verify given accessToken and refreshToken does not match (email is different)', () => {
        const testerAccessTokenNotValid = jwt.sign({
            email: "tester@test.com",
            username: "tester"
        }, process.env.ACCESS_KEY, { expiresIn: '1y' })

        const testerRefreshTokenNotValid = jwt.sign({
            email: "testerButNotTheOther@test.com",
            username: "tester"
        }, process.env.ACCESS_KEY, { expiresIn: '1y' })

        const req = {
            cookies: {
                accessToken: testerAccessTokenNotValid,
                refreshToken: testerRefreshTokenNotValid
            }
        }
        const res = {}
        const info = {
            authType: 'Simple'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T5: verify given accessToken and refreshToken does not match (username is different)', () => {
        const testerAccessTokenNotValid = jwt.sign({
            email: "tester@test.com",
            username: "tester"
        }, process.env.ACCESS_KEY, { expiresIn: '1y' })

        const testerRefreshTokenNotValid = jwt.sign({
            email: "tester@test.com",
            username: "testerButDifferent"
        }, process.env.ACCESS_KEY, { expiresIn: '1y' })

        const req = {
            cookies: {
                accessToken: testerAccessTokenNotValid,
                refreshToken: testerRefreshTokenNotValid
            }
        }
        const res = {}
        const info = {
            authType: 'Simple'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T6: authentication as user and requested username matches', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenValid,
                refreshToken: testerRefreshTokenValid
            }
        }
        const res = {}
        const info = {
            authType: 'User',
            username: 'tester'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(true)).toBe(true)
    }) 

    test('T7: authentication as user and requested username does not match', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenValid,
                refreshToken: testerRefreshTokenValid
            }
        }
        const res = {}
        const info = {
            authType: 'User',
            username: 'coolerTester'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T8: authentication as admin and user is an admin', () => {

        const req = {
            cookies: {
                accessToken: adminAccessTokenValid,
                refreshToken: adminRefreshTokenValid
            }
        }
        const res = {}
        const info = {
            authType: 'Admin'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(true)).toBe(true)
    }) 

    test('T9: authentication as admin and user is not an admin', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenValid,
                refreshToken: testerRefreshTokenValid
            }
        }
        const res = {}
        const info = {
            authType: 'Admin'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T10: authentication as group and user is not into the group', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenValid,
                refreshToken: testerRefreshTokenValid
            }
        }
        const res = {}
        const info = {
            authType: 'Group',
            emails: [
                'notTesterMail1',
                'notTesterMail2',
                'notTesterMail3'
            ]
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T11: authentication as group and user is into the group', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenValid,
                refreshToken: testerRefreshTokenValid
            }
        }
        const res = {}
        const info = {
            authType: 'Group',
            emails: [
                'notTesterMail1',
                'notTesterMail2',
                'notTesterMail3',
                'tester@test.com'
            ]
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(true)).toBe(true)
    }) 

    test('T12: authentication as user and requested username matches but accessToken is expired', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenExpired,
                refreshToken: testerRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const info = {
            authType: 'User',
            username: 'tester'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(true)).toBe(true)
    }) 

    test('T13: authentication as user and requested username does not match but accessToken is expired', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenExpired,
                refreshToken: testerRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const info = {
            authType: 'User',
            username: 'testerButItsNotTheOtherOne'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T14: authentication as admin and user is an admin but the accessToken is expired', () => {

        const req = {
            cookies: {
                accessToken: adminAccessTokenExpired,
                refreshToken: adminAccessTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const info = {
            authType: 'Admin'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(true)).toBe(true)
    }) 

    test('T14: authentication as admin and user is not an admin but the accessToken is expired', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenExpired,
                refreshToken: testerAccessTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const info = {
            authType: 'Admin'
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T15: authentication as group and user is not into the group and the accessToken is expired', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenExpired,
                refreshToken: testerRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const info = {
            authType: 'Group',
            emails: [
                'notTesterMail1',
                'notTesterMail2',
                'notTesterMail3'
            ]
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 

    test('T16: authentication as group and user is into the group and the accessToken is expired', () => {

        const req = {
            cookies: {
                accessToken: testerAccessTokenExpired,
                refreshToken: testerRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const info = {
            authType: 'Group',
            emails: [
                'notTesterMail1',
                'notTesterMail2',
                'notTesterMail3',
                'tester@test.com'
            ]
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(true)).toBe(true)
    }) 

    test('T17: accessToken and refreshToken are both expired', () => {
        const req = {
            cookies: {
                accessToken: testerAccessTokenExpired,
                refreshToken: testerRefreshTokenExpired
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const info = {
            authType: 'Simple',
        }

        const response = verifyAuth(req, res, info)
        expect(Object.values(response).includes(false)).toBe(true)
    }) 
})

describe('verifyAuthSimple', () => {
    const testerAccessTokenValid = jwt.sign({
        email: "tester@test.com",
        username: "tester",
        role: "Regular",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '1y' })

    const testerRefreshTokenValid = testerAccessTokenValid

    test('T1: accessToken and/or refreshToken are not defined', () => {
        const req = {
            cookies: {

            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = verifyAuthSimple(req, res)
        expect(Object.values(response).includes(false)).toBe(true)
    })

    test('T2: accessToken and refreshToken are both defined', () => {
        
        const req = {
            cookies: {
                accessToken: testerAccessTokenValid,
                refreshToken: testerRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = verifyAuthSimple(req, res)
        expect(Object.values(response).includes(true)).toBe(true)
    })
})

describe('verifyAuthUser', () => {
    const testerAccessTokenValid = jwt.sign({
        email: "tester@test.com",
        username: "tester",
        role: "Regular",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '1y' })

    const testerRefreshTokenValid = testerAccessTokenValid

    test('T1: accessToken and/or refreshToken are not defined', () => {
        const req = {
            cookies: {

            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = verifyAuthUser(req, res, 'tester')
        expect(Object.values(response).includes(false)).toBe(true)
    })

    test('T2: username is not defined', () => {
        const req = {
            cookies: {

            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = verifyAuthUser(req, res)
        expect(Object.values(response).includes(false)).toBe(true)
    })

    test('T3: accessToken and refreshToken are both defined as well the username', () => {
        
        const req = {
            cookies: {
                accessToken: testerAccessTokenValid,
                refreshToken: testerRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = verifyAuthUser(req, res, 'tester')
        expect(Object.values(response).includes(true)).toBe(true)
    })
})

describe('verifyAuthAdmin', () => {
    const adminAccessTokenValid = jwt.sign({
        email: "admin@email.com",
        username: "admin",
        role: "Admin",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '1y' })

    const adminRefreshTokenValid = adminAccessTokenValid

    test('T1: accessToken and/or refreshToken are not defined', () => {
        const req = {
            cookies: {

            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = verifyAuthAdmin(req, res)
        expect(Object.values(response).includes(false)).toBe(true)
    })

    test('T2: accessToken and refreshToken are both defined', () => {
        const req = {
            cookies: {
                accessToken: adminAccessTokenValid,
                refreshToken: adminRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = verifyAuthSimple(req, res)
        expect(Object.values(response).includes(true)).toBe(true)
    })
})

describe('verifyAuthGroup', () => {

    const testerAccessTokenValid = jwt.sign({
        email: "tester@test.com",
        username: "tester",
        role: "Regular",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '1y' })

    const testerRefreshTokenValid = testerAccessTokenValid

    const adminAccessTokenValid = jwt.sign({
        email: "admin@email.com",
        username: "admin",
        role: "Admin",
        id: 123
    }, process.env.ACCESS_KEY, { expiresIn: '1y' })

    const adminRefreshTokenValid = adminAccessTokenValid

    dotenv.config();
    beforeAll(async () => {
    const dbName = "testingDatabaseUtils";
    const url = `${process.env.MONGO_URI}/${dbName}`;

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    });

    beforeEach(async () => {
        const usersList = [
            {
                _id: new mongoose.Types.ObjectId(123456),
                email: "admin@email.com",
                username: "admin",
                role: "Admin",
                password: 'admin',
                refreshToken: adminRefreshTokenValid,
            },
            {
                _id: new mongoose.Types.ObjectId(23),
                email: "tester@test.com",
                username: "tester",
                password: 'tester',
                refreshToken: testerRefreshTokenValid,
                role: "Regular",
            }
            ]
        
        const fakeGroup = {
        name: 'fakeGroup',
        members: [
            {
            email: 'admin@email.com',
            user: mongoose.Types.ObjectId(123456)
            }
        ]
        }
    
        await User.deleteMany({})
        await Group.deleteMany({})
        await User.create(usersList)
        await Group.create(fakeGroup)
    })

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });



    test('T1: accessToken and/or refreshToken are not defined', async () => {
        const req = {
            cookies: {

            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = await verifyAuthGroup(req, res, 'fakeGroup')
        expect(Object.values(response).includes(false)).toBe(true)
    })

    test('T2: group name is not defined', async () => {
        const req = {
            cookies: {
                accessToken: adminAccessTokenValid,
                refreshToken: adminRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = await verifyAuthGroup(req, res)
        expect(Object.values(response).includes(false)).toBe(true)
    })

    test('T3: group does not exist', async () => {
        const req = {
            cookies: {
                accessToken: adminAccessTokenValid,
                refreshToken: adminRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = await verifyAuthGroup(req, res, 'thisGroupDoesNotExist')
        expect(Object.values(response).includes(false)).toBe(true)
    })

    test('T4: group does exist', async () => {
        const req = {
            cookies: {
                accessToken: adminAccessTokenValid,
                refreshToken: adminRefreshTokenValid
            }
        }
        const cookieMock = (name, value, options) => {
            res.cookieArgs = { name, value, options };
        }
        const res = {
            cookie: cookieMock,
            locals: {},
        }
        const response = await verifyAuthGroup(req, res, 'fakeGroup')
        expect(Object.values(response).includes(true)).toBe(true)
    })
})