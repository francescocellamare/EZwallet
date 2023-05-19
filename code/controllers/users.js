import { Group, User } from "../models/User.js";
import { transactions } from "../models/model.js";
import { verifyAuth } from "./utils.js";

import mongoose from "mongoose";
import { createAPIobj } from "./utils.js";
/**
 * Return all the users
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `email` and `role`
  - Optional behavior:
    - empty array is returned if there are no users
 */
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

/**
 * Return information of a specific user
  - Request Body Content: None
  - Response `data` Content: An object having attributes `username`, `email` and `role`.
  - Optional behavior:
    - error 401 is returned if the user is not found in the system
 */
export const getUser = async (req, res) => {
    try {
        const cookie = req.cookies
        if (!cookie.accessToken || !cookie.refreshToken) {
            return res.status(401).json({ message: "Unauthorized" }) // unauthorized
        }
        const username = req.params.username
        const user = await User.findOne({ refreshToken: cookie.refreshToken })
        if (!user) return res.status(401).json({ message: "User not found" })
        if (user.username !== username) return res.status(401).json({ message: "Unauthorized" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

/**
 * Create a new group
  - Request Body Content: An object having a string attribute for the `name` of the group and an array that lists all the `memberEmails`
  - Response `data` Content: An object having an attribute `group` (this object must have a string attribute for the `name`
    of the created group and an array for the `members` of the group), an array that lists the `alreadyInGroup` members
    (members whose email is already present in a group) and an array that lists the `membersNotFound` (members whose email
    +does not appear in the system)
  - Optional behavior:
    - error 401 is returned if there is already an existing group with the same name
    - error 401 is returned if all the `memberEmails` either do not exist or are already in a group
    
  NEW according to slack
>>> TODO -if user is not part of the new group his email must be added to the list
    */
export const createGroup = async (req, res) => {
  
  // null for user not found
  async function getUserId(email){
    const id = await User.find( {email: email} ).select('_id')
    if(id.length === 0) 
      return null
    return id
  }

  async function isPartOfOtherGroups(email) {
    const inAnyGroup = await Group.find({})
      .select('members.email')
    let emails= []
    
    for(let group of inAnyGroup) {
      for(let email of group.members)
        emails.push(email)
    }

    emails = emails.map( item => item.email)
    if(emails.includes(email))
      return true

    return false
  }

  

  try {
    let { name, membersEmails } = req.body

    // ========================== input validation ==========================
    if(name === '')
      name = 'group'  //TOBE changed with schema default value
    
    // not required in optional behavior but useful for test
    if(membersEmails.length === 0)
      return res.status(401).json({ message: "all the `memberEmails` either do not exist" });

    // ======================================================================

    /*
      optional behavior 1
    */
    const found = await Group.findOne( {name: name} )
    if (found) {
      return res.status(401).json({ message: "group's name not available" });
    }

    const newGroup = {
      name: name,
      members: []
    }
    const membersNotFound = []
    const alreadyInGroup = []

    for(let email of membersEmails) {
      let id = await getUserId(email)
      if(!id) {
        membersNotFound.push(email)
      }
      else {
        const inAnotherGroup = await isPartOfOtherGroups(email)

        if(inAnotherGroup) 
          alreadyInGroup.push(email)
        else{
          id = String(id).match(new RegExp('\"[a-z0-9]*\"'))[0]
          id = id.substring(1, id.length-1)
          const currentUser = await User.findById(mongoose.Types.ObjectId(id)).select('_id')
          
          newGroup.members.push( {
            email: email,
            user: currentUser
          })
        }
      }
    }

    if(membersEmails.length === alreadyInGroup.length + membersNotFound.length)
      return res.status(401).json({ message: "all the `memberEmails` either do not exist or are already in a group" });

    // creating object to return
    const returnedObj = {
      group: newGroup,
      alreadyInGroup: alreadyInGroup,
      membersNotFound: membersNotFound
    }

    Group.create(newGroup)
      .then( res.json( createAPIobj(returnedObj, res) ) )
      .catch(err => {
        throw (err)
      })

    // console.log('i want to add: ' + membersEmails)
    // console.log('members not found: ' + membersNotFound)
    // console.log('already in group: ' + alreadyInGroup)
    
  } catch (err) {
      res.status(500).json(err.message)
  }
}

/**
 * Return all the groups
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having a string attribute for the `name` of the group
    and an array for the `members` of the group
  - Optional behavior:
    - empty array is returned if there are no groups
 */
export const getGroups = async (req, res) => {
  try {
    if (!verifyAuth(req, res, {authType: 'Admin'})) {
      return res.status(401).json({ message: "Unauthorized" }) // unauthorized
    }
    
    const groups = await Group.find( {} ).select('name').select('members')

    // behavior 1
    if(groups.length === 0) 
      res.json( createAPIobj( [], res ) )

    res.json( createAPIobj(groups, res) )
  } catch (err) {
      res.status(500).json(err.message)
  }
}

/**
 * Return information of a specific group
  - Request Body Content: None
  - Response `data` Content: An object having a string attribute for the `name` of the group and an array for the 
    `members` of the group
  - Optional behavior:
    - error 401 is returned if the group does not exist
 */
export const getGroup = async (req, res) => {
  try {
    if (!verifyAuth(req, res, {authType: 'User', username: requested_username} || !verifyAuth(req, res, {authType: 'Admin'}))) {
      return res.status(401).json({ message: "Unauthorized" }) // unauthorized
    }

    const name = req.params.name
    const groups = await Group.find( {name: name} ).select('name').select('members')

    // behavior 1
    if(groups.length === 0) 
      return res.status(401).json({ message: "group does not exist" });
      
    res.json( createAPIobj(groups, res) )
  } catch (err) {
      res.status(500).json(err.message)
  }
}

/**
 * Add new members to a group
  - Request Body Content: An array of strings containing the emails of the members to add to the group
  - Response `data` Content: An object having an attribute `group` (this object must have a string attribute for the `name` of the
    created group and an array for the `members` of the group, this array must include the new members as well as the old ones), 
    an array that lists the `alreadyInGroup` members (members whose email is already present in a group) and an array that lists 
    the `membersNotFound` (members whose email does not appear in the system)
  - Optional behavior:
    - error 401 is returned if the group does not exist
    - error 401 is returned if all the `memberEmails` either do not exist or are already in a group
 */
export const addToGroup = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json(err.message)
    }
}

/**
 * Remove members from a group
  - Request Body Content: An object having an attribute `group` (this object must have a string attribute for the `name` of the
    created group and an array for the `members` of the group, this array must include only the remaining members),
    an array that lists the `notInGroup` members (members whose email is not in the group) and an array that lists 
    the `membersNotFound` (members whose email does not appear in the system)
  - Optional behavior:
    - error 401 is returned if the group does not exist
    - error 401 is returned if all the `memberEmails` either do not exist or are not in the group
 */
export const removeFromGroup = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json(err.message)
    }
}

/**
 * Delete a user
  - Request Parameters: None
  - Request Body Content: A string equal to the `email` of the user to be deleted
  - Response `data` Content: An object having an attribute that lists the number of `deletedTransactions` and a boolean attribute that
    specifies whether the user was also `deletedFromGroup` or not.
  - Optional behavior:
    - error 401 is returned if the user does not exist 
 */
export const deleteUser = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json(err.message)
    }
}

/**
 * Delete a group
  - Request Body Content: A string equal to the `name` of the group to be deleted
  - Response `data` Content: A message confirming successful deletion
  - Optional behavior:
    - error 401 is returned if the group does not exist
 */
export const deleteGroup = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json(err.message)
    }
}