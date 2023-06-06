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
|   createGroup U1    | |unit       ||
|   createGroup U2    | |unit       ||
|   createGroup U3    | |unit       ||
|   createGroup U4    | |unit       ||
|   createGroup U5    | |unit       ||
|   createGroup U6    | |unit       ||
|   createGroup U7    | |unit       ||
|   createGroup U8    | |unit       ||
|   createGroup U9    | |unit       ||
|   createGroup U10   | |unit       ||
|   createGroup U11   | |unit       ||
|   createGroup U12   | |unit       ||
|   createGroup U13   | |unit       ||
|   addToGroup U1     | |unit       ||
|   addToGroup U2     | |unit       ||
|   addToGroup U3     | |unit       ||
|   addToGroup U4     | |unit       ||
|   addToGroup U5     | |unit       ||
|   addToGroup U6     | |unit       ||
|   addToGroup U7     | |unit       ||
|   addToGroup U8     | |unit       ||
|   addToGroup U9     | |unit       ||
|   addToGroup U10    | |unit       ||
|   addToGroup I1     | |integration||
|   addToGroup I2     | |integration||
|   addToGroup I3     | |integration||
|   addToGroup I4     | |integration||
|   addToGroup I5     | |integration||
|   addToGroup I6     | |integration||
|   addToGroup I7     | |integration||
|   addToGroup I8     | |integration||
|   addToGroup I9     | |integration||
|   addToGroup I10    | |integration||
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
|   getAllTransactions U1||unit||
|   getAllTransactions U2||unit||
|   getAllTransactions U3||unit||
|   getAllTransactions U4||unit||
|   getAllTransactions I1||integration||
|   getAllTransactions I2||integration||
|   getAllTransactions I3||integration||
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
|   verifyAuth U1        ||unit       ||
|   verifyAuth U2        ||unit       ||
|   verifyAuth U3        ||unit       ||
|   verifyAuth U4        ||unit       ||
|   verifyAuth U5        ||unit       ||
|   verifyAuth U6        ||unit       ||
|   verifyAuth U7        ||unit       ||
|   verifyAuth U8        ||unit       ||
|   verifyAuth U9        ||unit       ||
|   verifyAuth U10       ||unit       ||
|   verifyAuth U11       ||unit       ||
|   verifyAuth U12       ||unit       ||
|   verifyAuth U13       ||unit       ||
|   verifyAuth U14       ||unit       ||
|   verifyAuth U15       ||unit       ||
|   verifyAuth U16       ||unit       ||
|   verifyAuth U17       ||unit       ||
|   verifyAuth U18       ||unit       ||
|   verifyAuth U19       ||unit       ||
|   verifyAuth U20       ||unit       ||
|   verifyAuth U21       ||unit       ||
|   verifyAuth U22       ||unit       ||
|   verifyAuth U23       ||unit       ||
|   verifyAuth U24       ||unit       ||
|   verifyAuth I1        ||integration||
|   verifyAuth I2        ||integration||
|   verifyAuth I3        ||integration||
|   verifyAuth I4        ||integration||
|   verifyAuth I5        ||integration||
|   verifyAuth I6        ||integration||
|   verifyAuth I7        ||integration||
|   verifyAuth I8        ||integration||
|   verifyAuth I9        ||integration||
|   verifyAuth I10       ||integration||
|   verifyAuth I11       ||integration||
|   verifyAuth I12       ||integration||
|   verifyAuth I13       ||integration||
|   verifyAuth I14       ||integration||
|   verifyAuth I15       ||integration||
|   verifyAuth I16       ||integration||
|   verifyAuth I17       ||integration||
|   handleDateFilterParams U1 ||unit ||
|   handleDateFilterParams U2 ||unit ||
|   handleDateFilterParams U3 ||unit ||
|   handleDateFilterParams U4 ||unit ||
|   handleDateFilterParams U5 ||unit ||
|   handleDateFilterParams U6 ||unit ||
|   handleDateFilterParams U7 ||unit ||
|   handleDateFilterParams U8 ||unit ||
|   handleDateFilterParams U9 ||unit ||
|   handleDateFilterParams U10 ||unit||
|   handleAmountFilterParams U1||unit||
|   handleAmountFilterParams U2||unit||
|   handleAmountFilterParams U3||unit||
|   handleAmountFilterParams U4||unit||
|   handleAmountFilterParams U5||unit||
| getTransactionsByUser U1   ||unit||
| getTransactionsByUser U2   ||unit||
| getTransactionsByUser U3   ||unit||
| getTransactionsByUser U4   ||unit||
| getTransactionsByUser U5   ||unit||
| getTransactionsByUser U6   ||unit||
| getTransactionsByUser U7   ||unit||
| getTransactionsByUser U8   ||unit||
| getTransactionsByUser U9   ||unit||
| getTransactionsByUserByCategory U1   ||unit||
| getTransactionsByUserByCategory U2   ||unit||
| getTransactionsByUserByCategory U3   ||unit||
| getTransactionsByUserByCategory U4   ||unit||
| getTransactionsByUserByCategory U5   ||unit||
| getTransactionsByUserByCategory U6   ||unit||
| getTransactionsByUserByCategory U7   ||unit||
| getTransactionsByGroup U1   ||unit||
| getTransactionsByGroup U2   ||unit||
| getTransactionsByGroup U3   ||unit||
| getTransactionsByGroup U4   ||unit||
| getTransactionsByGroup U5   ||unit||
| getTransactionsByGroup U6   ||unit||
| getTransactionsByGroupByCategory U1   ||unit||
| getTransactionsByGroupByCategory U2   ||unit||
| getTransactionsByGroupByCategory U3   ||unit||
| getTransactionsByGroupByCategory U4   ||unit||
| getTransactionsByGroupByCategory U5   ||unit||
| getTransactionsByGroupByCategory U6   ||unit||
| getTransactionsByGroupByCategory U7   ||unit||
| getTransactionsByGroupByCategory U8   ||unit||
| deleteTransaction U1   ||unit||
| deleteTransaction U2   ||unit||
| deleteTransaction U3   ||unit||
| deleteTransaction U4   ||unit||
| deleteTransaction U5   ||unit||
| deleteTransaction U6   ||unit||
| deleteTransaction U7   ||unit||
| deleteTransaction U8   ||unit||
| deleteTransactions U1   ||unit||
| deleteTransactions U2   ||unit||
| deleteTransactions U3   ||unit||
| deleteTransactions U4   ||unit||
| deleteTransactions U5   ||unit||
| deleteTransactions U6   ||unit||
| deleteTransactions U7   ||unit||






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
|FR24 addToGroup| addToGroup U1-U10 , addToGroup I1-I10|
|FR26 removeFromGroup| removeFromGroup U1-U11 , I1-I16|
|FR28 deleteGroup | deleteGroup deleteGroup U1-U6 , I1-I5|   
|FR3  Manage transactions |
|   FR31 createTransaction| createTransaction U1-U13 , createTransaction I1-I12 |    
| FR32 getAllTransactions | getAllTransactions U1-U4, getAllTransactions I1-I3|       
| FR33 getTransactionsByUser  | getTransactionsByUser U1-U9, getTransactionsByUser I1-I14, handleAmountFilterParams U1-U5, handleDateFilterParams U1-U10 |
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






