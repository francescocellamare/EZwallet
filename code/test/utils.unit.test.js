import { handleDateFilterParams, verifyAuth, handleAmountFilterParams } from '../controllers/utils';
import jwt from 'jsonwebtoken';

describe("handleDateFilterParams", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
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
            json: jest.fn()
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

    test.only('T16: authentication as user and requested username does not matches and accessToken is expired', () => {
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
            json: jest.fn()
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
            json: jest.fn()
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

    test('T18: authentication as group and user is not into the group and accessToken is expired ', () => {
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
        const expectedRespone = { authorized: false, cause: "User is not part of the group" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T19: authentication as group and user is into the group and accessToken is expired', () => {
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
        const expectedRespone = { authorized: true, cause: "Authorized" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T19: authentication as group and user is into the group and accessToken is expired', () => {
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
        // throws error for expired token at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            // const err = new Error("MyError")
            // err.name = 'TokenExpiredError'
            // throw err
            throw new Error({name: 'TokenExpiredError'});
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

    test('T20: accessToken and refreshToken are both expired', () => {
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
            err.name = 'TokenExpiredError'
            throw err
        })
        const expectedRespone = { authorized: false, cause: "Perform login again" }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });

    test('T21: accessToken is expired and a generic error is thrown', () => {
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

    test('T22: generic error is thrown and accessToken is not expired', () => {
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
            username: 'usertest'
        }
        // throws generic error at first call
        jest.spyOn(jwt, 'verify').mockImplementationOnce( () => {
            const err = new Error("MyError1")
            err.name = 'GenericError'
            throw err
        })
        const expectedRespone = { authorized: false, cause: 'GenericError' }
        const response = verifyAuth(mockReq, mockRes, info)
        expect(response).toEqual(expectedRespone)
    });
})

describe("handleAmountFilterParams", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})
