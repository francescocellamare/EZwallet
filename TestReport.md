# Test Report

<The goal of this document is to explain how the application was tested, detailing how the test cases were defined and what they cover>

# Contents

- [Test Report](#test-report)
- [Contents](#contents)
- [Dependency graph](#dependency-graph)
- [Integration approach](#integration-approach)
- [Tests](#tests)
- [Coverage](#coverage)
  - [Coverage of FR](#coverage-of-fr)
  - [Coverage white box](#coverage-white-box)





# Dependency graph 

     <report the here the dependency graph of EzWallet>
     
# Integration approach

    <Write here the integration sequence you adopted, in general terms (top down, bottom up, mixed) and as sequence
    (ex: step1: unit A, step 2: unit A+B, step 3: unit A+B+C, etc)> 
    <Some steps may  correspond to unit testing (ex step1 in ex above)>
    <One step will  correspond to API testing, or testing unit route.js>
    


# Tests

   <in the table below list the test cases defined For each test report the object tested, the test level (API, integration, unit) and the technique used to define the test case  (BB/ eq partitioning, BB/ boundary, WB/ statement coverage, etc)>   <split the table if needed>


| Test case name | Object(s) tested | Test level | Technique used |
|--|--|--|--|
|   removeFromGroup I1| removeFromGroup, verifyAuthAdmin, Group.findOne, User.findOne, Group.updateOne  |integration|BB/ eq partitioning|integration|BB/ eq partitioning|
|   removeFromGroup I2| removeFromGroup, verifyAuthAdmin |integration|BB/ eq partitioning|
|   removeFromGroup I3| removeFromGroup, verifyAuthAdmin  |integration|BB/ eq partitioning|
|   removeFromGroup I4| removeFromGroup, verifyAuthAdmin |integration|BB/ eq partitioning|
|   removeFromGroup I5| removeFromGroup, verifyAuthAdmin |integration|BB/ eq partitioning|
|   removeFromGroup I6| removeFromGroup, verifyAuthAdmin, Group.findOne  |integration|BB/ eq partitioning|
|   removeFromGroup I7| removeFromGroup, verifyAuthAdmin, Group.findOne  |integration|BB/ eq partitioning|
|   removeFromGroup I8| removeFromGroup, verifyAuthGroup, Group.findOne, User.findOne   |integration|BB/ eq partitioning|
|   removeFromGroup I9| removeFromGroup, verifyAuthGroup, Group.findOne, User.findOne, Group.updateOne |integration|BB/ eq partitioning|
|   removeFromGroup I10| removeFromGroup, verifyAuthGroup |integration|BB/ eq partitioning|
|   removeFromGroup I11| removeFromGroup, verifyAuthGroup |integration|BB/ eq partitioning|
|   removeFromGroup I12| removeFromGroup, verifyAuthGroup |integration|BB/ eq partitioning|
|   removeFromGroup I13| removeFromGroup, verifyAuthGroup |integration|BB/ eq partitioning|
|   removeFromGroup I14|  removeFromGroup, verifyAuthGroup, Group.findOne |integration|BB/ eq partitioning|
|   removeFromGroup I15| removeFromGroup, verifyAuthGroup, Group.findOne |integration|BB/ eq partitioning|
|   removeFromGroup I16| removeFromGroup, verifyAuthGroup, Group.findOne, User.findOne |integration|BB/ eq partitioning|
|   createTransaction U1| createTransaction |unit|WB/ statement coverage|
|   createTransaction U2| createTransaction |unit|WB/ statement coverage|
|   createTransaction U3| createTransaction |unit|WB/ statement coverage|
|   createTransaction U4| createTransaction |unit|WB/ statement coverage|
|   createTransaction U5| createTransaction |unit|WB/ statement coverage|
|   createTransaction U6| createTransaction |unit|WB/ statement coverage|
|   createTransaction U7| createTransaction |unit|WB/ statement coverage|
|   createTransaction U8| createTransaction |unit|WB/ statement coverage|
|   createTransaction U9| createTransaction |unit|WB/ statement coverage|
|   createTransaction U10| createTransaction |unit|WB/ statement coverage|
|   createTransaction U11| createTransaction |unit|WB/ statement coverage|
|   createTransaction U12| createTransaction |unit|WB/ statement coverage|
|   createTransaction U13| createTransaction |unit|WB/ statement coverage|
|   createTransaction I1|createTransaction, verifyAuthUser, categories.countDocuments, User.countDocuments, transactions.save |integration|BB/ eq partitioning|
|   createTransaction I2|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I3|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I4|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I5|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I6|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I7|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I8|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I9|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I10|createTransaction, verifyAuthUser |integration|BB/ eq partitioning|
|   createTransaction I11|createTransaction, verifyAuthUser, categories.countDocuments |integration|BB/ eq partitioning|
|   createTransaction I12|createTransaction, verifyAuthUser, categories.countDocuments, User.countDocuments  |integration|BB/ eq partitioning|
|   createCategory U1| getAllTransactions |unit|WB/ statement coverage|
|   createCategory U2| getAllTransactions |unit|WB/ statement coverage|
|   createCategory U3| getAllTransactions |unit|WB/ statement coverage|
|   createCategory U4| getAllTransactions |unit|WB/ statement coverage|
|   createCategory U5| getAllTransactions |unit|WB/ statement coverage|
|   createCategory U6| getAllTransactions |unit|WB/ statement coverage|
|   createCategory U7| getAllTransactions |unit|WB/ statement coverage|
|   createCategory U8| getAllTransactions |unit|WB/ statement coverage|
|   createCategory I1| createCategory, verifyAuthAdmin, categories.countDocuments, categories.save |integration|BB/ eq partitioning|
|   createCategory I2| createCategory, verifyAuthAdmin |integration|BB/ eq partitioning|
|   createCategory I3|createCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   createCategory I4|createCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   createCategory I5|createCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   createCategory I6|createCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   createCategory I7|createCategory, verifyAuthAdmin, categories.countDocuments|integration|BB/ eq partitioning|
|   updateCategory U1| updateCategory |unit|WB/ statement coverage|
|   updateCategory U2| updateCategory |unit|WB/ statement coverage|
|   updateCategory U3| updateCategory |unit|WB/ statement coverage|
|   updateCategory U4| updateCategory |unit|WB/ statement coverage|
|   updateCategory U5| updateCategory |unit|WB/ statement coverage|
|   updateCategory U6| updateCategory |unit|WB/ statement coverage|
|   updateCategory U7| updateCategory |unit|WB/ statement coverage|
|   updateCategory U8| updateCategory |unit|WB/ statement coverage|
|   updateCategory U9| updateCategory |unit|WB/ statement coverage|
|   updateCategory I1|updateCategory, verifyAuthAdmin, categories.countDocuments, categories.updateOne, transactions.updateMany  |integration|BB/ eq partitioning|
|   updateCategory I2|updateCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   updateCategory I3|updateCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   updateCategory I4|updateCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   updateCategory I5|updateCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   updateCategory I6|updateCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   updateCategory I7|updateCategory, verifyAuthAdmin, categories.countDocuments|integration|BB/ eq partitioning|
|   updateCategory I8|updateCategory, verifyAuthAdmin, categories.countDocuments, categories.updateOne|integration|BB/ eq partitioning|
|   deleteCategory U1| deleteCategory |unit|WB/ statement coverage|
|   deleteCategory U2| deleteCategory |unit|WB/ statement coverage|
|   deleteCategory U3| deleteCategory |unit|WB/ statement coverage|
|   deleteCategory U4| deleteCategory |unit|WB/ statement coverage|
|   deleteCategory U5| deleteCategory |unit|WB/ statement coverage|
|   deleteCategory U6| deleteCategory |unit|WB/ statement coverage|
|   deleteCategory U7| deleteCategory |unit|WB/ statement coverage|
|   deleteCategory U8| deleteCategory |unit|WB/ statement coverage|
|   deleteCategory I1|deleteCategory, verifyAuthAdmin, categories.countDocuments, categories.find, categories.deleteMany, transactions.updateMany  |integration|BB/ eq partitioning|
|   deleteCategory I2| deleteCategory, verifyAuthAdmin |integration|BB/ eq partitioning|
|   deleteCategory I3|deleteCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   deleteCategory I4|deleteCategory, verifyAuthAdmin|integration|BB/ eq partitioning|
|   deleteCategory I5| deleteCategory, verifyAuthAdmin, categories.countDocuments|integration|BB/ eq partitioning|
|   deleteCategory I6| deleteCategory, verifyAuthAdmin, categories.countDocuments, categories.find|integration|BB/ eq partitioning|
|   getCategories U1| getCategories |unit|WB/ statement coverage|
|   getCategories U2| getCategories |unit|WB/ statement coverage|
|   getCategories U3| getCategories |unit|WB/ statement coverage|
|   getCategories I1|getCategories, verifyAuthSimple, categories.find|integration|BB/ eq partitioning|
|   getCategories I2|getCategories, verifyAuthSimple|integration|BB/ eq partitioning|






# Coverage



## Coverage of FR

<Report in the following table the coverage of  functional requirements (from official requirements) >

| Functional Requirements covered |   Test(s) | 
| ------------------------------- | ----------- | 
|FR1 Manage users| |
|FR11  register | register U1-U6 , register I1-I5|
|FR12 login| login U1-U7 , login I1-I6|
|FR13 logout| logout U1-U4 , logout I1-I3|
|FR14 registerAdmin |registerAdmin U1-U6 , registerAdmin I1-I5|
|FR15 getUsers | getUsers U1-U4 , getUsers I1-I3|
|FR16 getUser | getUser U1-U4 , getUser I1-I4|
|FR17 deleteUser | deleteUser U1-U8 , deleteUser I1-I7|
|FR2 Manage groups |
|FR21 createGroup |createGroup U1-U13 , createGroup I1-I9|
|FR22 getGroups| getGroups U1-U4 , getGroups I1-I2|
|FR23 getGroup | getGroup U1-U4, getGroup I1-I4|
|FR24 addToGroup| addToGroup U1-U10 , I1-I10|
|FR26 removeFromGroup| removeFromGroup U1-U11 , I1-I16|
|FR28 deleteGroup | deleteGroup deleteGroup U1-U6 , I1-I5|   
|FR3  Manage transactions |
|   FR31 createTransaction| createTransaction U1-U13 , createTransaction I1-I12 |           
| FR33 getTransactionsByUser  | getTransactionsByUser U1-U9, getTransactionsByUser I1-I14 |
| FR34 getTransactionsByUserByCategory| getTransactionsByUserByCategory U1-U7, getTransactionsByUserByCategory I1-I10 |
| FR35 getTransactionsByGroup | getTransactionsByGroup U1-U6, getTransactionsByGroup I1-I5 |
| FR36 getTransactionsByGroupByCategory | getTransactionsByGroupByCategory U1-U8, getTransactionsByGroupByCategory I1-I7 |
| FR37 deleteTransaction | deleteTransaction U1-U8, deleteTransaction I1-I6|
| FR38 deleteTransactions | deleteTransactions U1-U7, deleteTransactions I1-I5 |
|FR4   Manage categories | 
|   FR41 createCategory| createCategory U1-U8 , createCategory I1-I7 |        
|   FR42 updateCategory| updateCategory U1-U9 , updateCategory I1-I8 |     
|   FR43 deleteCategory | deleteCategory U1-U8 , deleteCategory I1-I6 |  
|   FR44 getCategories | getCategories U1-U3 , getCategories I1-I2 |   




## Coverage white box

Report here the screenshot of coverage values obtained with jest-- coverage 






