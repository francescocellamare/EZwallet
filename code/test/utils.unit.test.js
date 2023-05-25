import { handleDateFilterParams, verifyAuth, handleAmountFilterParams } from '../controllers/utils';

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

    test('T2: verify given accessToken but some informations are missing', () => {
        const mockReq = {
            cookies: {
                refreshToken: null,
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
        jest.spyOn(jwt, 'verify').mockReturnValue()
    });
})

describe("handleAmountFilterParams", () => { 
    test('Dummy test, change it', () => {
        expect(true).toBe(true);
    });
})
