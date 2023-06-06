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
|   createGroup T1    | |unit       ||
|   createGroup T2    | |unit       ||
|   createGroup T3    | |unit       ||
|   createGroup T4    | |unit       ||
|   createGroup T5    | |unit       ||
|   createGroup T6    | |unit       ||
|   createGroup T7    | |unit       ||
|   createGroup T8    | |unit       ||
|   createGroup T9    | |unit       ||
|   createGroup T10   | |unit       ||
|   createGroup T11   | |unit       ||
|   createGroup T12   | |unit       ||
|   createGroup T13   | |unit       ||
|   addToGroup T1     | |unit       ||
|   addToGroup T2     | |unit       ||
|   addToGroup T3     | |unit       ||
|   addToGroup T4     | |unit       ||
|   addToGroup T5     | |unit       ||
|   addToGroup T6     | |unit       ||
|   addToGroup T7     | |unit       ||
|   addToGroup T8     | |unit       ||
|   addToGroup T9     | |unit       ||
|   addToGroup T10    | |unit       ||
|   addToGroup T1     | |integration||
|   addToGroup T2     | |integration||
|   addToGroup T3     | |integration||
|   addToGroup T4     | |integration||
|   addToGroup T5     | |integration||
|   addToGroup T6     | |integration||
|   addToGroup T7     | |integration||
|   addToGroup T8     | |integration||
|   addToGroup T9     | |integration||
|   addToGroup T10    | |integration||
|   removeFromGroup I1| |integration|BB/ eq partitioning|
|   removeFromGroup I2| |integration|BB/ eq partitioning|
|   removeFromGroup I3| |integration|BB/ eq partitioning|
|   removeFromGroup I4| |integration|BB/ eq partitioning|
|   removeFromGroup I5| |integration|BB/ eq partitioning|
|   removeFromGroup I6| |integration|BB/ eq partitioning|
|   removeFromGroup I7| |integration|BB/ eq partitioning|
|   removeFromGroup I8| |integration|BB/ eq partitioning|
|   removeFromGroup I9| |integration|BB/ eq partitioning|
|   removeFromGroup I10| |integration|BB/ eq partitioning|
|   removeFromGroup I11| |integration|BB/ eq partitioning|
|   removeFromGroup I12| |integration|BB/ eq partitioning|
|   removeFromGroup I13| |integration|BB/ eq partitioning|
|   removeFromGroup I14| |integration|BB/ eq partitioning|
|   removeFromGroup I15| |integration|BB/ eq partitioning|
|   removeFromGroup I16| |integration|BB/ eq partitioning|
|   createTransaction U1| |unit|WB/ statement coverage|
|   createTransaction U2||unit|WB/ statement coverage|
|   createTransaction U3||unit|WB/ statement coverage|
|   createTransaction U4||unit|WB/ statement coverage|
|   createTransaction U5||unit|WB/ statement coverage|
|   createTransaction U6||unit|WB/ statement coverage|
|   createTransaction U7||unit|WB/ statement coverage|
|   createTransaction U8||unit|WB/ statement coverage|
|   createTransaction I1||integration|BB/ eq partitioning|
|   createTransaction I2||integration|BB/ eq partitioning|
|   createTransaction I3||integration|BB/ eq partitioning|
|   createTransaction I4||integration|BB/ eq partitioning|
|   createTransaction I5||integration|BB/ eq partitioning|
|   createTransaction I6||integration|BB/ eq partitioning|
|   createTransaction I7||integration|BB/ eq partitioning|
|   createTransaction I8||integration|BB/ eq partitioning|
|   getAllTransactions T1||unit||
|   getAllTransactions T2||unit||
|   getAllTransactions T3||unit||
|   getAllTransactions T4||unit||
|   getAllTransactions T1||integration||
|   getAllTransactions T2||integration||
|   getAllTransactions T3||integration||
|   createCategory U1||unit|WB/ statement coverage|
|   createCategory U2||unit|WB/ statement coverage|
|   createCategory U3||unit|WB/ statement coverage|
|   createCategory U4||unit|WB/ statement coverage|
|   createCategory U5||unit|WB/ statement coverage|
|   createCategory U6||unit|WB/ statement coverage|
|   createCategory U7||unit|WB/ statement coverage|
|   createCategory U8||unit|WB/ statement coverage|
|   createCategory I1||integration|BB/ eq partitioning|
|   createCategory I2||integration|BB/ eq partitioning|
|   createCategory I3||integration|BB/ eq partitioning|
|   createCategory I4||integration|BB/ eq partitioning|
|   createCategory I5||integration|BB/ eq partitioning|
|   createCategory I6||integration|BB/ eq partitioning|
|   createCategory I7||integration|BB/ eq partitioning|
|   createCategory I8||integration|BB/ eq partitioning|
|   updateCategory U1||unit|WB/ statement coverage|
|   updateCategory U2||unit|WB/ statement coverage|
|   updateCategory U3||unit|WB/ statement coverage|
|   updateCategory U4||unit|WB/ statement coverage|
|   updateCategory U5||unit|WB/ statement coverage|
|   updateCategory U6||unit|WB/ statement coverage|
|   updateCategory U7||unit|WB/ statement coverage|
|   updateCategory U8||unit|WB/ statement coverage|
|   updateCategory U9||unit|WB/ statement coverage|
|   updateCategory I1||integration|BB/ eq partitioning|
|   updateCategory I2||integration|BB/ eq partitioning|
|   updateCategory I3||integration|BB/ eq partitioning|
|   updateCategory I4||integration|BB/ eq partitioning|
|   updateCategory I5||integration|BB/ eq partitioning|
|   updateCategory I6||integration|BB/ eq partitioning|
|   updateCategory I7||integration|BB/ eq partitioning|
|   updateCategory I8||integration|BB/ eq partitioning|
|   updateCategory I9||integration|BB/ eq partitioning|
|   deleteCategory U1||unit|WB/ statement coverage|
|   deleteCategory U2||unit|WB/ statement coverage|
|   deleteCategory U3||unit|WB/ statement coverage|
|   deleteCategory U4||unit|WB/ statement coverage|
|   deleteCategory U5||unit|WB/ statement coverage|
|   deleteCategory U6||unit|WB/ statement coverage|
|   deleteCategory U7||unit|WB/ statement coverage|
|   deleteCategory U8||unit|WB/ statement coverage|
|   deleteCategory I1||integration|BB/ eq partitioning|
|   deleteCategory I2||integration|BB/ eq partitioning|
|   deleteCategory I3||integration|BB/ eq partitioning|
|   deleteCategory I4||integration|BB/ eq partitioning|
|   deleteCategory I5||integration|BB/ eq partitioning|
|   deleteCategory I6||integration|BB/ eq partitioning|
|   deleteCategory I7||integration|BB/ eq partitioning|
|   deleteCategory I8||integration|BB/ eq partitioning|
|   getCategories I1||unit|WB/ statement coverage|
|   getCategories I2||unit|WB/ statement coverage|
|   getCategories I3||unit|WB/ statement coverage|
|   getCategories I1||integration|BB/ eq partitioning|
|   getCategories I2||integration|BB/ eq partitioning|
|   getCategories I3||integration|BB/ eq partitioning|
|   verifyAuth T1        ||unit       ||
|   verifyAuth T2        ||unit       ||
|   verifyAuth T3        ||unit       ||
|   verifyAuth T4        ||unit       ||
|   verifyAuth T5        ||unit       ||
|   verifyAuth T6        ||unit       ||
|   verifyAuth T7        ||unit       ||
|   verifyAuth T8        ||unit       ||
|   verifyAuth T9        ||unit       ||
|   verifyAuth T10       ||unit       ||
|   verifyAuth T11       ||unit       ||
|   verifyAuth T12       ||unit       ||
|   verifyAuth T13       ||unit       ||
|   verifyAuth T14       ||unit       ||
|   verifyAuth T15       ||unit       ||
|   verifyAuth T16       ||unit       ||
|   verifyAuth T17       ||unit       ||
|   verifyAuth T18       ||unit       ||
|   verifyAuth T19       ||unit       ||
|   verifyAuth T20       ||unit       ||
|   verifyAuth T21       ||unit       ||
|   verifyAuth T22       ||unit       ||
|   verifyAuth T23       ||unit       ||
|   verifyAuth T24       ||unit       ||
|   verifyAuth T1        ||integration||
|   verifyAuth T2        ||integration||
|   verifyAuth T3        ||integration||
|   verifyAuth T4        ||integration||
|   verifyAuth T5        ||integration||
|   verifyAuth T6        ||integration||
|   verifyAuth T7        ||integration||
|   verifyAuth T8        ||integration||
|   verifyAuth T9        ||integration||
|   verifyAuth T10       ||integration||
|   verifyAuth T11       ||integration||
|   verifyAuth T12       ||integration||
|   verifyAuth T13       ||integration||
|   verifyAuth T14       ||integration||
|   verifyAuth T15       ||integration||
|   verifyAuth T16       ||integration||
|   verifyAuth T17       ||integration||
|   handleDateFilterParams T1 ||unit ||
|   handleDateFilterParams T2 ||unit ||
|   handleDateFilterParams T3 ||unit ||
|   handleDateFilterParams T4 ||unit ||
|   handleDateFilterParams T5 ||unit ||
|   handleDateFilterParams T6 ||unit ||
|   handleDateFilterParams T7 ||unit ||
|   handleDateFilterParams T8 ||unit ||
|   handleDateFilterParams T9 ||unit ||
|   handleDateFilterParams T10 ||unit||
|   handleAmountFilterParams T1||unit||
|   handleAmountFilterParams T2||unit||
|   handleAmountFilterParams T3||unit||
|   handleAmountFilterParams T4||unit||
|   handleAmountFilterParams T5||unit||





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
|FR26 removeFromGroup (integration) | |  
|FR3  Manage transactions |
|   FR31 createTransaction| createTransaction U1-U13 , createTransaction I1-I12 |           
|FR4   Manage categories | 
|   FR41 createCategory| createCategory U1-U8 , createCategory I1-I7 |        
|   FR42 updateCategory| updateCategory U1-U9 , updateCategory I1-I8 |     
|   FR43 deleteCategory | deleteCategory U1-U8 , deleteCategory I1-I6 |  
|   FR44 getCategories | getCategories U1-U3 , getCategories I1-I2 |  




## Coverage white box

Report here the screenshot of coverage values obtained with jest-- coverage 






