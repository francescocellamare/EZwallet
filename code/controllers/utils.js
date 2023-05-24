import jwt, { decode } from 'jsonwebtoken'
import { Group, User } from '../models/User.js';

/**
 * Handle possible date filtering options in the query parameters for getTransactionsByUser when called by a Regular user.
 * @param req the request object that can contain query parameters
 * @returns an object that can be used for filtering MongoDB queries according to the `date` parameter.
 *  The returned object must handle all possible combination of date filtering parameters, including the case where none are present.
 *  Example: {date: {$gte: "2023-04-30T00:00:00.000Z"}} returns all transactions whose `date` parameter indicates a date from 30/04/2023 (included) onwards
 * @throws an error if the query parameters include `date` together with at least one of `from` or `upTo`
 */
export const handleDateFilterParams = (req) => {

    // Comparison operators : $eq, $gt, $gte, $in, $lt, $lte, $ne, $nin
    let operations = [];
    
    for(const key in req.query){
        
        let operation;
        let args;

        // check if param is a date
        const regex = /^[\d,]+$/;
        if(regex.test(req.query[key])){
            continue;
        }
        
        if(key === "in" | key === "nin"){
            // in and nin accept an array of amounts (comma seperated in the query) 
            args = req.query[key].split(",")  
            args = args.map(arg => new Date(arg));          
        }else{
            // all other operands only accept one value
            args = new Date(req.query[key])
        }

        operation = `$${key}`
        let filter = {}
        filter[operation] = args;

        operations.push({
            date : filter
        })
    }

    return operations;
}

/**
 * Handle possible authentication modes depending on `authType`
 * @param req the request object that contains cookie information
 * @param res the result object of the request
 * @param info an object that specifies the `authType` and that contains additional information, depending on the value of `authType`
 *      Example: {authType: "Simple"}
 *      Additional criteria:
 *          - authType === "User":
 *              - either the accessToken or the refreshToken have a `username` different from the requested one => error 401
 *              - the accessToken is expired and the refreshToken has a `username` different from the requested one => error 401
 *              - both the accessToken and the refreshToken have a `username` equal to the requested one => success
 *              - the accessToken is expired and the refreshToken has a `username` equal to the requested one => success
 *          - authType === "Admin":
 *              - either the accessToken or the refreshToken have a `role` which is not Admin => error 401
 *              - the accessToken is expired and the refreshToken has a `role` which is not Admin => error 401
 *              - both the accessToken and the refreshToken have a `role` which is equal to Admin => success
 *              - the accessToken is expired and the refreshToken has a `role` which is equal to Admin => success
 *          - authType === "Group":
 *              - either the accessToken or the refreshToken have a `email` which is not in the requested group => error 401
 *              - the accessToken is expired and the refreshToken has a `email` which is not in the requested group => error 401
 *              - both the accessToken and the refreshToken have a `email` which is in the requested group => success
 *              - the accessToken is expired and the refreshToken has a `email` which is in the requested group => success
 * @returns true if the user satisfies all the conditions of the specified `authType` and false if at least one condition is not satisfied
 *  Refreshes the accessToken if it has expired and the refreshToken is still valid
 */
export const verifyAuth = (req, res, info) => {
    const cookie = req.cookies
    if (!cookie.accessToken || !cookie.refreshToken) {
        return { authorized: false, cause: "Unauthorized"}
    }
    try {
        const decodedAccessToken = jwt.verify(cookie.accessToken, process.env.ACCESS_KEY);
        const decodedRefreshToken = jwt.verify(cookie.refreshToken, process.env.ACCESS_KEY);
        if (!decodedAccessToken.username || !decodedAccessToken.email || !decodedAccessToken.role) {
            return { authorized: false, cause: "Token is missing information"}
        }
        if (!decodedRefreshToken.username || !decodedRefreshToken.email || !decodedRefreshToken.role) {
            return { authorized: false, cause: "Token is missing information" }
        }
        if (decodedAccessToken.username !== decodedRefreshToken.username || decodedAccessToken.email !== decodedRefreshToken.email || decodedAccessToken.role !== decodedRefreshToken.role) {
            return { authorized: false, cause: "Mismatched users" }
        }
        if (info.authType === 'User') {
            const requestedUsername = info.username
            if (decodedAccessToken.username != requestedUsername /* || decodedRefreshToken.username != requestedUsername */) {
                return { authorized: false, cause: "Username does not match with requested one" }
            }
            if (decodedAccessToken.username === requestedUsername /* && decodedRefreshToken.username === requestedUsername */) {
                return { authorized: true, cause: "Authorized" }
            }
        }
        else if (info.authType === 'Admin') {
            if (decodedAccessToken.role != 'Admin' /* || decodedRefreshToken.role != 'Admin' */) {
                return { authorized: false, cause: "User does not have admin role" }
            }
        } 
        else if (info.authType === 'Group') {
            const requestedEmails = info.emails
            if (!requestedEmails.includes(decodedAccessToken.email) /* || !requestedEmails.includes(decodecRefreshToken.email) */) {
                return { authorized: false, cause: "User is not part of the group" }
            }
        }
        return { authorized: true, cause: "Authorized" }


} catch (err) {
    if (err.name === "TokenExpiredError") {
        try {

            if (info.authType === 'User') {
                if (decodecRefreshToken.username != requestedUsername) {
                    return { authorized: false, cause: "Username does not match with requested one" }
                }
            }
            else if (info.authType === 'Admin') {
                if (decodecRefreshToken.role != 'Admin') {
                    return { authorized: false, cause: "User does not have admin role" }
                }
            } 
            else if (info.authType === 'Group') {
                if (!requestedEmails.includes(decodedRefreshToken.email)) {
                    return { authorized: false, cause: "User is not in the group" }
                }    
            }

            const refreshToken = jwt.verify(cookie.refreshToken, process.env.ACCESS_KEY)
            const newAccessToken = jwt.sign({
                username: refreshToken.username,
                email: refreshToken.email,
                id: refreshToken.id,
                role: refreshToken.role
            }, process.env.ACCESS_KEY, { expiresIn: '1h' })
            res.cookie('accessToken', newAccessToken, { httpOnly: true, path: '/api', maxAge: 60 * 60 * 1000, sameSite: 'none', secure: true })
            res.locals.message = 'Access token has been refreshed. Remember to copy the new one in the headers of subsequent calls'
            return { authorized: true, cause: "Authorized" }
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return { authorized: false, cause: "Perform login again" }
            } else {
                return { authorized: false, cause: err.name }
            }
        }
    } else {
        return { authorized: false, cause: err.name };
    }
}
}

/**
 * Handle possible amount filtering options in the query parameters for getTransactionsByUser when called by a Regular user.
 * @param req the request object that can contain query parameters
 * @returns an object that can be used for filtering MongoDB queries according to the `amount` parameter.
 *  The returned object must handle all possible combination of amount filtering parameters, including the case where none are present.
 *  Example: {amount: {$gte: 100}} returns all transactions whose `amount` parameter is greater or equal than 100
 */
export const handleAmountFilterParams = (req) => {

    // Comparison operators : $eq, $gt, $gte, $in, $lt, $lte, $ne, $nin
    let operations = [];
    
    for(const key in req.query){
        
        let operation;
        let args;
        
        // check if param is a number
        const regex = /^[\d,]+$/;
        if(!regex.test(req.query[key])){
            continue;
        }

        if(key === "in" | key === "nin"){
            // in and nin accept an array of amounts (comma seperated in the query) 
            args = req.query[key].split(",")  
            args = args.map(arg => Number(arg));          
        }else{
            // all other operands only accept one value
            args = Number(req.query[key])
        }

        operation = `$${key}`
        let filter = {}
        filter[operation] = args;

        operations.push({
            amount : filter
        })
    }

    return operations;
}

/*----------------------------------------------------
    not in the original project
----------------------------------------------------*/

/*
    it's used for creating the required data according to code/README.md
    datafield is for the required data
    resfield is the response object received by each function
*/

export function createAPIobj(datafield, resfield) {
    const dataobj = {
        data: datafield,
        message: resfield.locals.message
    }
    return dataobj
}

/*
    functions verifyAuthUser(), verifyAuthAdmin(), verifyAuthGroup() are used as wrapper for calling to verifyAuth() 
    the proper way for calling is:

        const simpleAuth = verifyAuth(req, res, {authType: "Simple"})
        const userAuth = await verifyAuthUser(req, res)
        const adminAuth = verifyAuthAdmin(req, res)
        const groupAuth = await verifyAuthGroup(req, res)

    returned object
    {
        authorized: true|false,
        cause: String
    }


    example scenario for getTransactionByGroupByCategory():
    - user can work only with his own group
    - admin does not have this limit
    
export const getTransactionsByGroupByCategory = async (req, res) => {
    // parameters for the function
    const groupName = req.params.name
    const categoryType = req.params.category

    // the functions called are the same and must have different behaviors depending on the route.
    const pathAdmin = '/transactions/groups/:name/category/:category'
    
    // (.*) stands for whatever as parameters' placeholder
    const regexp = new RegExp('/transactions/groups/(.*)/category/(.*)')
    
    const userAuthInfo = await verifyAuthUser(req, res)
    const adminAuthInfo = verifyAuthAdmin(req, res)

    if ( userAuthInfo.authorized) {
        console.log('I am a user')
        const groupAuthInfo = await verifyAuthGroup(req, res, groupName)
        if ( groupAuthInfo.authorized) {
            console.log('I can work with this group')
            // work
        }
        else {
            console.log('I can not work with this group')
            return res.status(401).json({ message: groupAuthInfo.cause })
        }
    } 
    else if (req.path.match(regexp) && adminAuthInfo.authorized){
        console.log('I am an admin')
        console.log('I can work with whichever group')
        // work
    }
    else {
        console.log('I am nobody')
        return res.status(401).json({ message: adminAuthInfo.cause }) // unauthorized
    }
    ...
}
*/


export async function verifyAuthUser(req, res) {
    const cookie = req.cookies
    const userByRefreshToken = await User.findOne( {refreshToken: cookie.refreshToken}, {username: 1, _id: 0})
    if (!userByRefreshToken) 
        return { authorized: false, cause: "Unauthorized"}

    return verifyAuth(req, res, {authType: 'User', username: userByRefreshToken.username})
}

export function verifyAuthAdmin(req, res) {
    return verifyAuth(req, res, {authType: 'Admin'})
}

export async function verifyAuthGroup(req, res, groupName) {
    const cookie = req.cookies
    const userEmail = await User.findOne( {refreshToken: cookie.refreshToken}, {email: 1, _id: 0})
    // check at the user's email in the database
    if (!userEmail)
        return { authorized: false, cause: "Unauthorized"}
    const document = await Group.findOne({name: groupName}, {members: 1, _id: 0})
    if (!document)
        return { authorized: false, cause: "Unauthorized"}
    const emails = document.members.map(member => member.email)
    return verifyAuth(req, res, {authType: 'Group', emails: emails})
}