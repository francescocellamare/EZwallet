import { handleDateFilterParams, verifyAuth, handleAmountFilterParams, verifyAuthSimple, verifyAuthUser, verifyAuthAdmin, verifyAuthGroup } from '../controllers/utils';
import jwt from 'jsonwebtoken';
import { Group } from '../models/User';

beforeEach(()=>{
    jest.clearAllMocks();
    jest.resetAllMocks()
})


describe("handleDateFilterParams", () => { 
    test('T1: any parameter is defined', () => {
        const mockReq = {
            query: {
                
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = {}
        const response = handleDateFilterParams(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    });

    test.failing('T2: date and from are used together', () => {
        const mockReq = {
            query: {
                date: '2023-04-30',
                from: '2023-04-30'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const response = handleDateFilterParams(mockReq, mockRes)
    });

    test.failing('T3: date and upTo are used together', () => {
        const mockReq = {
            query: {
                date: '2023-04-30',
                upTo: '2023-04-30'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const response = handleDateFilterParams(mockReq, mockRes)
    });

    test.failing('T4: date invalid format', () => {
        const mockReq = {
            query: {
                date: '30-04-2023'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const response = handleDateFilterParams(mockReq, mockRes)
    });

    test.failing('T5: from invalid format', () => {
        const mockReq = {
            query: {
                from: '30-04-2023'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const response = handleDateFilterParams(mockReq, mockRes)
    });
  
    test.failing('T6: upTo invalid format', () => {
        const mockReq = {
            query: {
                upTo: '30-04-2023'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const response = handleDateFilterParams(mockReq, mockRes)
    });

    test('T7: date valid format without other parameters', () => {
        const mockReq = {
            query: {
                date: '2023-04-30'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = {
            date: {
                $gte: new Date(2023, 3, 30, 0, 0, 0),
                $lte: new Date(2023, 3, 30, 23, 59, 59)
            }
        }
        const response = handleDateFilterParams(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    });
    
    test('T8: from is the only defined parameter', () => {
        const mockReq = {
            query: {
                from: '2023-04-30'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = {
            date: {
                $gte: new Date(2023, 3, 30, 0, 0, 0),
            }
        }
        const response = handleDateFilterParams(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    });

    test('T9: upTo is the only defined parameter', () => {
        const mockReq = {
            query: {
                upTo: '2023-04-30'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = {
            date: {
                $lte: new Date(2023, 3, 30, 23, 59, 59)
            }
        }
        const response = handleDateFilterParams(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    });

    test('T10: from and upTo are the only defined parameters', () => {
        const mockReq = {
            query: {
                from: '2023-03-30',
                upTo: '2023-04-30'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = {
            date: {
                $gte: new Date(2023, 2, 30, 0, 0, 0),
                $lte: new Date(2023, 3, 30, 23, 59, 59)
            }
        }
        const response = handleDateFilterParams(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    });
})

describe("verifyAuth", () => { 
    test('T1: no cookies added to the request', () => {
        const mockReq = {
            cookies: {
                refreshToken: null,
                accessToken: null
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Simple"
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T2: verify given accessToken but some informations are missing (only one: role)', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Simple"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "Token is missing information"}
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T3: verify given accessToken but some informations are missing (two of them: role, username)', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Simple"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                role: "roletest"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "Token is missing information"}
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T4: verify given accessToken but some informations are missing (whole object)', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Simple"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "Token is missing information"}
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T5: verify given refreshToken but some informations are missing (whole object)', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Simple"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "Token is missing information"}
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T6: verify given accessToken and refreshToken does not match (email is different)', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Simple"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "anothermailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "Mismatched users" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T7: verify given accessToken and refreshToken does not match (username is different)', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Simple"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "anotherusertest",
                role: "roletest"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "Mismatched users" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T8: verify given accessToken and refreshToken does not match (role is different)', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Simple"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "anotherroletest"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "Mismatched users" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T9: authentication as user but requested username does not match', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "User",
            username: "anotherusertest"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "Username does not match with requested one" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T10: authentication as user and requested username matches', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "User",
            username: "usertest"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        const expectedRespone = { authorized: true, cause: "Authorized" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T11: authentication as admin and user is not an admin', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Admin"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "User does not have admin role" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T12: authentication as group and user is not into the group', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Group", 
            emails: [
                'mailtest1',
                'mailtest2',
                'mailtest3'
            ]
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestnotingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestnotingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        const expectedRespone = { authorized: false, cause: "User is not part of the group" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T13: authentication as group and user is into the group', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const info = {
            authType: "Group", 
            emails: [
                'mailtest1',
                'mailtest2',
                'mailtest3',
                'mailtestnotingroup'
            ]
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestnotingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestnotingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        const expectedRespone = { authorized: true, cause: "Authorized" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test.failing('T14: info object is not defined', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestnotingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestnotingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        verifyAuth(req, res, info).toThrow()
    });
    
    test('T15: authentication as user but requested username does not match and accessToken is expired', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "User",
            username: "anotherusertest"
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError")
            err.name = 'TokenExpiredError'
            throw err
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'sign').mockImplementationOnce( () => {'newAccessToken'} )
        const expectedRespone = { authorized: false, cause: "Username does not match with requested one" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T16: authentication as user and requested username does not matches and accessToken is expired', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "User",
            username: "anotherusertest"
        }
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
            const err = new Error("MyError")
            err.name = 'TokenExpiredError'
            throw err
        });
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                id: 1,
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'sign').mockImplementationOnce( () => 'newAccessToken' )
        const expectedRespone = { authorized: false, cause: "Username does not match with requested one" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T17: authentication as user and requested username does matches and accessToken is expired', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "User",
            username: "usertest"
        }
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError")
            err.name = 'TokenExpiredError'
            throw err
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                id: 1,
                email: "mailtest",
                username: "usertest",
                role: "roletest"
            }
            return obj
        })
        jest.spyOn(jwt, 'sign').mockImplementationOnce( () => {'newAccessToken'} )
        const expectedRespone = { authorized: true, cause: "Authorized" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T18: authentication as admin and user is not an admin and accessToken is expired', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "Admin"
        }
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError")
            err.name = 'TokenExpiredError'
            throw err
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtest",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        jest.spyOn(jwt, 'sign').mockImplementationOnce( () => {'newAccessToken'} )
        const expectedRespone = { authorized: false, cause: "User does not have admin role" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T19: authentication as group and user is not into the group and accessToken is expired ', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "Group", 
            emails: [
                'mailtest1',
                'mailtest2',
                'mailtest3'
            ]
        }
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError")
            err.name = 'TokenExpiredError'
            throw err
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestnotingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        jest.spyOn(jwt, 'sign').mockImplementationOnce( () => 'newAccessToken' )
        const expectedRespone = { authorized: false, cause: "User is not in the group" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T20: authentication as group and user is into the group and accessToken is expired', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "Group", 
            emails: [
                'mailtest1',
                'mailtest2',
                'mailtest3',
                'mailtestnotingroup'
            ]
        }
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError")
            err.name = 'TokenExpiredError'
            throw err
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestnotingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        jest.spyOn(jwt, 'sign').mockImplementationOnce( () => 'newAccessToken' )
        const expectedRespone = { authorized: true, cause: "Authorized" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T21: authentication as group and user is into the group and accessToken is expired', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "Group", 
            emails: [
                'mailtest1',
                'mailtest2',
                'mailtest3',
                'mailtestingroup'
            ]
        }
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError")
            err.name = 'TokenExpiredError'
            throw err
        })
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const obj = {
                email: "mailtestingroup",
                username: "usertest",
                role: "IamnotAdmin"
            }
            return obj
        })
        jest.spyOn(jwt, 'sign').mockImplementationOnce( () => 'newAccessToken' )
        const expectedRespone = { authorized: true, cause: "Authorized" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T22: accessToken and refreshToken are both expired', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "User",
            username: 'usertest'
        }
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err1 = new Error("MyError1")
            err1.name = 'TokenExpiredError'
            throw err1
        })
        // throws error for expired token at second call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err2 = new Error("MyError2")
            err2.name = 'TokenExpiredError'
            throw err2
        })
        const expectedRespone = { authorized: false, cause: "Perform login again" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T23: accessToken is expired and a generic error is thrown', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "User",
            username: 'usertest'
        }
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError1")
            err.name = 'TokenExpiredError'
            throw err
        })
        // throws error for expired token at second call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError2")
            err.name = 'GenericError'
            throw err
        })
        const expectedRespone = { authorized: false, cause: 'GenericError' }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T24: generic error is thrown and accessToken is not expired', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken',
                accessToken: 'accessTokenTest'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            locals: jest.fn()
        }
        const info = {
            authType: "User",
            username: 'usertest'
        }
        // throws generic error at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError1")
            err.name = 'GenericError'
            throw err
        })
        jest.spyOn(jwt, 'sign').mockImplementationOnce( () => 'newAccessToken' )
        const expectedRespone = { authorized: false, cause: 'GenericError' }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });
})

describe("handleAmountFilterParams", () => { 
    test('T1: min and max are not defined', () => {
        const mockReq = {
            query: {
                min: undefined,
                max: undefined
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = {}
        const response = handleAmountFilterParams(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    });

    test('T2: only max is defined', () => {
        const mockReq = {
            query: {
                max: 20
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = {
            "amount": {
                "$lte": 20
            }
        }
        const response = handleAmountFilterParams(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    });

    test('T3: only min is defined', () => {
        const mockReq = {
            query: {
                min: 12
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = {
            "amount": {
                "$gte": 12
            }
        }
        const response = handleAmountFilterParams(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    });

    test.failing('T4: min is not a number', () => {
        const mockReq = {
            query: {
                min: 'notAnumber',
                max: 20
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = Error("min param is not a number")
        const response = handleAmountFilterParams(mockReq, mockRes)
        expect(response).toThrow(Error)
    });

    test.failing('T5: max is not a number', () => {
        const mockReq = {
            query: {
                min: 12,
                max: 'notAnumber'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = Error("min param is not a number")
        const response = handleAmountFilterParams(mockReq, mockRes)
        expect(response).toThrow(Error)
    });
})

describe("verifyAuthSimple", () => { 
    test('T1: accessToken is not defined', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthSimple(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    })

    test('T2: refreshToken is not defined', () => {
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthSimple(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    })

    test('T3: accessToken and refreshToken are not defined', () => {
        const mockReq = {
            cookies: {
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthSimple(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    })

    test('T4: both tokens are defined', () => {
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken',
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const response = verifyAuthSimple(mockReq, mockRes)
        expect(response).toBeDefined()
    })
})

describe("verifyAuthUser", () => { 
    test('T1: accessToken is not defined', () => {
        const username = 'usertest'
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthUser(mockReq, mockRes, username)
        expect(response).toEqual(expectedRespone)
    })

    test('T2: refreshToken is not defined', () => {
        const username = 'usertest'
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthUser(mockReq, mockRes, username)
        expect(response).toEqual(expectedRespone)
    })

    test('T3: accessToken and refreshToken are not defined', () => {
        const username = 'usertest'
        const mockReq = {
            cookies: {
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthUser(mockReq, mockRes, username)
        expect(response).toEqual(expectedRespone)
    })

    test('T4: both tokens are defined as well username', () => {
        const username = 'usertest'
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken',
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const response = verifyAuthUser(mockReq, mockRes, username)
        expect(response).toBeDefined()
    })

    test('T5: both tokens are defined but username is not', () => {
        const username = undefined
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken',
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthUser(mockReq, mockRes, username)
        expect(response).toEqual(expectedRespone)
    })
})

describe("verifyAuthAdmin", () => { 
    test('T1: accessToken is not defined', () => {
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthAdmin(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    })

    test('T2: refreshToken is not defined', () => {
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthAdmin(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    })

    test('T3: accessToken and refreshToken are not defined', () => {
        const mockReq = {
            cookies: {
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = verifyAuthAdmin(mockReq, mockRes)
        expect(response).toEqual(expectedRespone)
    })

    test('T4: both tokens are defined', () => {
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken',
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const response = verifyAuthAdmin(mockReq, mockRes)
        expect(response).toBeDefined()
    })
})

describe("verifyAuthGroup", () => { 
    test('T1: accessToken is not defined', async () => {
        const group = 'groupTest'
        const mockReq = {
            cookies: {
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = await verifyAuthGroup(mockReq, mockRes, group)
        expect(response).toEqual(expectedRespone)
    })

    test('T2: refreshToken is not defined', async () => {
        const group = 'groupTest'
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = await verifyAuthGroup(mockReq, mockRes, group)
        expect(response).toEqual(expectedRespone)
    })

    test('T3: accessToken and refreshToken are not defined', async () => {
        const group = 'groupTest'
        const mockReq = {
            cookies: {
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = await verifyAuthGroup(mockReq, mockRes, group)
        expect(response).toEqual(expectedRespone)
    })

    test('T4: both tokens are defined as well group', async () => {
        const group = 'groupTest'
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken',
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(Group, 'findOne').mockImplementation(() => { 
            return {
                name: group, 
                members: [ 
                    {email: 'email1', id: 1},
                    {email: 'email2', id: 2}
                ]
            }
        })
        const response = await verifyAuthGroup(mockReq, mockRes, group)
        expect(response).toBeDefined()
    })

    test('T5: both tokens are defined but group is not', async () => {
        const group = undefined
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken',
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = await verifyAuthGroup(mockReq, mockRes, group)
        expect(response).toEqual(expectedRespone)
    })

    test('T6: both tokens are defined as well group and any group is found', async () => {
        const group = 'groupTest'
        const mockReq = {
            cookies: {
                accessToken: 'accesssToken',
                refreshToken: 'refreshToken'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(Group, 'findOne').mockImplementation( () => null)
        const expectedRespone = { authorized: false, cause: "Unauthorized" }
        const response = await verifyAuthGroup(mockReq, mockRes, group)
        expect(response).toEqual(expectedRespone)
    })
})