import { Group, User } from "../models/User.js";
import { transactions } from "../models/model.js";
import { verifyAuth, verifyAuthUser, verifyAuthAdmin, verifyAuthGroup  } from "./utils.js";


import mongoose from "mongoose";
/**
 * Return all the users
  - Request Body Content: None
  - Response `data` Content: An array of objects, each one having attributes `username`, `email` and `role`
  - Optional behavior:
    - empty array is returned if there are no users
 */
export const getUsers = async (req, res) => {
    try {

      const adminAuthInfo = verifyAuthAdmin(req, res)
      if(!adminAuthInfo.authorized) {
        return res.status(401).json({error: adminAuthInfo.cause})
      }
        const users = await User.find();
        res.status(200).json({data: users, refreshedTokenMessage: res.locals.refreshedTokenMessage});
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
      const cookie  = req.cookies;
      const username = req.params.username
      const userAuthInfo = verifyAuthUser(req, res, username)
      const adminAuthInfo = verifyAuthAdmin(req, res)
      if((!userAuthInfo.authorized)||(!adminAuthInfo.authorized)){
        return res.status(401)
      }

        const user = await User.findOne({ refreshToken: cookie.refreshToken })
        if (!user) return res.status(401).json({ error: "User not found" })
        if (user.username !== username) return res.status(401).json({error: "Unauthorized" })
        res.status(200).json({data:user, refreshTokenMessage:res.locals.refreshTokenMessage})
    } catch (error) {
        res.status(500).json({error: error.message})
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
    
    TODO:
      - user email not in list ==> add it ( at admin side ) 
    */
export const createGroup = async (req, res) => {
  
  // null for user not found
  async function getUserId(email){
    const id = await User.findOne( {email: email}, {_id: 1} )
    return id
  }

  async function isPartOfOtherGroups(email) {
    const inAnyGroup = await Group.find({}, {_id: 0, members: 1})
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
    const emailMatch = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const currentUserEmail = await User.findOne( {refreshToken: cookie.refreshToken}, {_id: 0, email: 1} ).email

    const cookie = req.cookies
    let name = req.body.name
    let memberEmails = req.body.memberEmails

    // wrong body
    if (!name || !memberEmails || name === '' )
      return res.status(400).json({error: "body does not contain all the necessary attributes"})

    // not valid email found
    if (memberEmails.includes(''))
      return res.status(400).json({ error: "email is not valid" });
    if ( memberEmails.map(item => item.match(emailMatch)).includes(null) )
      return res.status(400).json({ error: "email is not valid" });

    // group name already exists
    let found = await Group.findOne( {name: name} )
    if (found) {
      return res.status(400).json({ error: "group's name not available" });
    }

    // user already in group
    found = await Group.findOne( {members: { $elemMatch: {email: currentUserEmail} }} )    
    if (found) {
      return res.status(400).json({ error: "user is already in group" });
    }  

    

    const userAuthInfo = await verifyAuthUser(req, res)
    const adminAuthInfo = verifyAuthAdmin(req, res)

    if (!userAuthInfo.authorized)
      return res.status(401).json({ error: userAuthInfo.cause })
    // if it's not an admin I need to be part of the group otherwise it does not (TO BE verified with new requirements)
    if (!adminAuthInfo.authorized) {
      if (!memberEmails.includes(currentUserEmail)) 
        memberEmails.push(currentUserEmail)
    }

    const newGroup = {
      name: name,
      members: []
    }
    const membersNotFound = []
    const alreadyInGroup = []

    
    for(let email of memberEmails) {
      let id = await getUserId(email)
      if(!id) {
        membersNotFound.push(email)
      }
      else {
        if(await isPartOfOtherGroups(email)) 
          alreadyInGroup.push(email)
        else{
          const currentUser = await User.findById({_id: mongoose.Types.ObjectId(id)})
          
          newGroup.members.push( {
            email: email,
            user: currentUser
          })
        }
      }
    }

    // no one has been added
    if(memberEmails.length === alreadyInGroup.length + membersNotFound.length)
      return res.status(400).json({ error: "all the `memberEmails` either do not exist or are already in a group" });

    // creating object to return
    const returnedObj = {
      group: newGroup,
      alreadyInGroup: alreadyInGroup,
      membersNotFound: membersNotFound
    }
    
    Group.create( {
      name: newGroup.name, 
      members: newGroup.members.map( elem => { 
        return {"email": elem.email, "user": elem.user._id} 
      })
    })
    .then( res.status(200)
              .json({
                data: {
                  group: returnedObj.group, 
                  membersNotFound: returnedObj.membersNotFound,
                  alreadyInGroup: returnedObj.alreadyInGroup
                }, 
                refreshedTokenMessage: res.locals.refreshedTokenMessage
              })
    ) 
    .catch(err => {
      throw (err)
    })
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
    const adminAuthInfo = verifyAuthAdmin(req, res)

    if(!adminAuthInfo.authorized) {
      return res.status(401).json({ error: adminAuthInfo.cause })
    }

    const groups = await Group.find( {}, {name: 1, members: 1, _id: 0} )
    res.status(200).json({data: groups, refreshedTokenMessage: res.locals.refreshedTokenMessage})
  } catch (err) {
      res.status(500).json({error: err.message})
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
    const name = req.params.name
    const adminAuthInfo = verifyAuthAdmin(req, res)
    const groupAuthInfo = await verifyAuthGroup(req, res, name)

    // checking authentication
    if ( !groupAuthInfo.authorized || !adminAuthInfo.authorized )
      return res.status(401).json({ error: 'authenticated user who is neither part of the group nor an admin' })

    // checking group in db
    const groups = await Group.findOne( {name: name}, {name: 1, members: 1, _id: 0} )
    if(!groups) 
      return res.status(400).json({ error: "group does not exist" });
      
      res.status(200).json({data: {group: groups, refreshedTokenMessage: res.locals.refreshedTokenMessage}})
  } catch (err) {
      res.status(500).json(err.message)
  }
}

/*Add new members to a group
  - Request Body Content: An array of strings containing the emails of the members to add to the group
  - Response `data` Content: An object having an attribute `group` (this object must have a string attribute for the `name` of the
    created group and an array for the `members` of the group, this array must include the new members as well as the old ones), 
    an array that lists the `alreadyInGroup` members (members whose email is already present in a group) and an array that lists 
    the `membersNotFound` (members whose email does not appear in the system)
  - Optional behavior:
    - error 401 is returned if the group does not exist
    - error 401 is returned if all the `memberEmails` either do not exist or are already in a group
 */
export const addToGroup = async (req, res) => { //Only own group or admin any group
  try {
    /*const cookie = req.cookies
    if (!cookie.accessToken) {
      return res.status(401).json({ message: "Unauthorized" }) // unauthorized
    }*/

    const group = await Group.findOne({ name: req.params.name });
    if (!group) return res.status(401).json({ error: "Group not found" })

    const inputEmail = req.body.email;

    let membersNotFound = [];
    let alreadyInGroup = [];
    let oldMembers = [];

    //old members 
    group.members.forEach(
      member => {
        oldMembers.push({ "email": member.email, "user": member.user });
      }
    );

    let newMembers = [];
    let newMemberAdded = false;

    //For each input email I search if there is a User that has that email. If it is not found, I add the User in membersNotFound; if it is found, I check if the User belongs to a group (I am looking for a Group with group.members.email matching the email of the existing user). If the User already belongs to a group it is added in AlreadyInGroup, otherwise in members.  
    for (const iEmail of inputEmail) {
      const corrUser = await User.findOne({ email: iEmail }); //corresponding User

      if (corrUser) {
        const corrGroup = await Group.findOne({ "members.email": iEmail });
        if (corrGroup) {
          alreadyInGroup.push({ "email": iEmail, "user": corrUser._id });
        } else {
          newMembers.push({ "email": iEmail, "user": corrUser._id });
          newMemberAdded = true;
        }
      } else {
        membersNotFound.push({ "email": iEmail });
      }
    }
    if (!newMemberAdded) {
      return res.status(401).json({ error: "All the members' email either do not exist or are already in a group" })
    }


    let data = {
      "group":
      {
        "name": req.params.name,
        "members": oldMembers.concat(newMembers),
        "alreadyInGroup": alreadyInGroup,
        "membersNotFound": membersNotFound
      }
    };

    await Group.updateOne(
      { name: req.params.name },
      { $push: { members: { $each: newMembers } } }
    );

    return res.json(data);

  } catch (err) {
    res.status(500).json(err.message)
  }
}

/**
 * Remove members from a group
  - Request Body Content: An array of strings containing the emails of the members to remove from the group
  - Response Data Content: An object having an attribute `group` (this object must have a string attribute for the `name` of the
    created group and an array for the `members` of the group, this array must include only the remaining members),
    an array that lists the `notInGroup` members (members whose email is not in the group) and an array that lists 
    the `membersNotFound` (members whose email does not appear in the system)
  - Optional behavior:
    - error 401 is returned if the group does not exist
    - error 401 is returned if all the `memberEmails` either do not exist or are not in the group
 */
export const removeFromGroup = async (req, res) => { //Only own group or admin any group
  try {
    /*const cookie = req.cookies
    if (!cookie.accessToken) {
      return res.status(401).json({ message: "Unauthorized" }) // unauthorized
    }*/

    const group = await Group.findOne({ name: req.params.name });
    if (!group) return res.status(401).json({ error: "Group not found" })

    const inputEmail = req.body.email;

    let membersNotFound = [];
    let notInGroup = [];
    let remainingMembers = [];
    let memberToRemove = [];

    let inGroup = false;

    //For each input email I search if there is a User that has that email. If it is not found, I add the User in membersNotFound; if it is found, I check if the User belongs to this group (checking if group.members.email matches the email of the existing user). If the User belongs to this group it is removed from the group, otherwise it is added to notInGroup members.  
    for (const iEmail of inputEmail) {
      const corrUser = await User.findOne({ email: iEmail }); //corresponding User
      if (corrUser) {
        for (const member of group.members) {
          if (member.email === iEmail) {
            memberToRemove.push({ "email": iEmail, "user": corrUser._id });
            inGroup = true;
          }
        }
        if (!inGroup) {
          notInGroup.push({ "email": iEmail, "user": corrUser._id });
        }
        inGroup = false;
      } else {
        membersNotFound.push({ "email": iEmail });
      }
    }

    remainingMembers = group.members.filter(
      (member) => !memberToRemove.find((m) => m.email === member.email)
    );
    if (remainingMembers.length == 0) {
      return res.status(401).json({ error: "All the members' email either do not exist or are not in the group" })
    }

    let data = {
      "group":
      {
        "name": req.params.name,
        "members": remainingMembers,
        "notInGroup": notInGroup,
        "membersNotFound": membersNotFound
      }
    };

    await Group.updateOne(
      { name: req.params.name },
      { members: remainingMembers }
    );

    return res.json(data);

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
export const deleteUser = async (req, res) => { //Admin
  try {

    /*const cookie = req.cookies
    if (!cookie.accessToken) {
        return res.status(401).json({ message: "Unauthorized" }) // unauthorized
    }*/

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }
    let userDeleted = await User.deleteOne({ email: req.body.email });

    const { deletedCount } = await transactions.deleteMany({ username: user.username });

    let deletedFromGroup = 0;
    const groups = await Group.find({ "members.email": req.body.email }).count();
    if (groups) {
      deletedFromGroup = 1;
    } else {
      deletedFromGroup = 0;
      //REMOVE FROM GROUP !!!
    }

    let data = { "deletedTransactions": deletedCount, "deletedFromGroup": deletedFromGroup };

    return res.json(data)

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
export const deleteGroup = async (req, res) => { //Admin any group
  try {
    /*const cookie = req.cookies
    if (!cookie.accessToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }*/

    const group = await Group.findOne({ name: req.body.name })
    if (!group) {
      return res.status(401).json({ message: "Group not found" })
    }

    let data = await Group.deleteOne({ name: req.body.name });
    return res.json("deleted");

  } catch (err) {
    res.status(500).json(err.message)
  }
}