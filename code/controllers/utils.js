import jwt, { decode } from 'jsonwebtoken'

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
        // remove vvvvv
        //res.status(401).json({ message: "Unauthorized" });
        return false;
    }
    try {
        const decodedAccessToken = jwt.verify(cookie.accessToken, process.env.ACCESS_KEY);
        const decodedRefreshToken = jwt.verify(cookie.refreshToken, process.env.ACCESS_KEY);
        if (!decodedAccessToken.username || !decodedAccessToken.email || !decodedAccessToken.role) {
            res.status(401).json({ message: "Token is missing information" })
            return false
        }
        if (!decodedRefreshToken.username || !decodedRefreshToken.email || !decodedRefreshToken.role) {
            res.status(401).json({ message: "Token is missing information" })
            return false
        }
        if (decodedAccessToken.username !== decodedRefreshToken.username || decodedAccessToken.email !== decodedRefreshToken.email || decodedAccessToken.role !== decodedRefreshToken.role) {
            res.status(401).json({ message: "Mismatched users" });
            return false;
        }
        if (info.authType === 'User') {
            const requestedUsername = info.username
            if (decodedAccessToken.username != requestedUsername /* || decodedRefreshToken.username != requestedUsername */) {
                res.status(401).json({ message: "Username does not match with requested one" })
                return false
            }
            if (decodedAccessToken.username === requestedUsername /* && decodedRefreshToken.username === requestedUsername */) {
                return true
            }
        }
        else if (info.authType === 'Admin') {
            if (decodedAccessToken.role != 'Admin' /* || decodedRefreshToken.role != 'Admin' */) {
                res.status(401).json({ message: "User does not have admin role" })
                return false
            }
        } 
        else if (info.authType === 'Group') {
            const requestedEmails = info.emails
            if (!requestedEmails.includes(decodedAccessToken.email) /* || !requestedEmails.includes(decodecRefreshToken.email) */) {
                res.status(401).json({ message: "User is not part of the group" })
                return false
            }
        }
        return true


} catch (err) {
    if (err.name === "TokenExpiredError") {
        try {

            if (info.authType === 'User') {
                if (decodecRefreshToken.username != requestedUsername) {
                    res.status(401).json({ message: "Username does not match with requested one" })
                    return false
                }
            }
            else if (info.authType === 'Admin') {
                if (decodecRefreshToken.role != 'Admin') {
                    res.status(401).json({ message: "User does not have admin role" })
                    return false
                }
            } 
            else if (info.authType === 'Group') {
                if (!requestedEmails.includes(decodedRefreshToken.email)) {
                    res.status(401).json({ message: "User does not have admin role" })
                    return false
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
            return true
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                res.status(401).json({ message: "Perform login again" });
            } else {
                res.status(401).json({ message: err.name });
            }
            return false;
        }
    } else {
        res.status(401).json({ message: err.name });
        return false;
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

function createAPIobj(datafield, resfield) {
    const dataobj = {
        data: datafield,
        message: resfield.locals.message
    }
    return dataobj
}

export { createAPIobj }
