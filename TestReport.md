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
|FR2 Manage groups |
|   F21  createGroup T1    | |unit       ||
|   F21  createGroup T2    | |unit       ||
|   F21  createGroup T3    | |unit       ||
|   F21  createGroup T4    | |unit       ||
|   F21  createGroup T5    | |unit       ||
|   F21  createGroup T6    | |unit       ||
|   F21  createGroup T7    | |unit       ||
|   F21  createGroup T8    | |unit       ||
|   F21  createGroup T9    | |unit       ||
|   F21  createGroup T10   | |unit       ||
|   F21  createGroup T11   | |unit       ||
|   F21  createGroup T12   | |unit       ||
|   F21  createGroup T13   | |unit       ||
|   F24  addToGroup T1     | |unit       ||
|   F24  addToGroup T2     | |unit       ||
|   F24  addToGroup T3     | |unit       ||
|   F24  addToGroup T4     | |unit       ||
|   F24  addToGroup T5     | |unit       ||
|   F24  addToGroup T6     | |unit       ||
|   F24  addToGroup T7     | |unit       ||
|   F24  addToGroup T8     | |unit       ||
|   F24  addToGroup T9     | |unit       ||
|   F24  addToGroup T10    | |unit       ||
|   F24  addToGroup T1     | |integration||
|   F24  addToGroup T2     | |integration||
|   F24  addToGroup T3     | |integration||
|   F24  addToGroup T4     | |integration||
|   F24  addToGroup T5     | |integration||
|   F24  addToGroup T6     | |integration||
|   F24  addToGroup T7     | |integration||
|   F24  addToGroup T8     | |integration||
|   F24  addToGroup T9     | |integration||
|   F24  addToGroup T10    | |integration||
|   FR26 removeFromGroup T1| |integration||
|   FR26 removeFromGroup T2| |integration||
|   FR26 removeFromGroup T3| |integration||
|   FR26 removeFromGroup T4| |integration||
|   FR26 removeFromGroup T5| |integration||
|   FR26 removeFromGroup T6| |integration||
|   FR26 removeFromGroup T7| |integration||
|   FR26 removeFromGroup T8| |integration||
|   FR26 removeFromGroup T9| |integration||
|   FR26 removeFromGroup T10| |integration||
|   FR26 removeFromGroup T11| |integration||
|   FR26 removeFromGroup T12| |integration||
|   FR26 removeFromGroup T13| |integration||
|   FR26 removeFromGroup T14| |integration||
|   FR26 removeFromGroup T15| |integration||
|   FR26 removeFromGroup T16| |integration||
|FR3  Manage transactions|
|   FR31 createTransaction T1| |unit||
|   FR31 createTransaction T2||unit||
|   FR31 createTransaction T3||unit||
|   FR31 createTransaction T4||unit||
|   FR31 createTransaction T5||unit||
|   FR31 createTransaction T6||unit||
|   FR31 createTransaction T7||unit||
|   FR31 createTransaction T8||unit||
|   FR31 createTransaction T1||integration||
|   FR31 createTransaction T2||integration||
|   FR31 createTransaction T3||integration||
|   FR31 createTransaction T4||integration||
|   FR31 createTransaction T5||integration||
|   FR31 createTransaction T6||integration||
|   FR31 createTransaction T7||integration||
|   FR31 createTransaction T8||integration||
|   FR32 getAllTransactions T1||unit||
|   FR32 getAllTransactions T2||unit||
|   FR32 getAllTransactions T3||unit||
|   FR32 getAllTransactions T4||unit||
|   FR32 getAllTransactions T1||integration||
|   FR32 getAllTransactions T2||integration||
|   FR32 getAllTransactions T3||integration||
|FR4   Manage categories | 
|   FR41 createCategory T1||unit||
|   FR41 createCategory T2||unit||
|   FR41 createCategory T3||unit||
|   FR41 createCategory T4||unit||
|   FR41 createCategory T5||unit||
|   FR41 createCategory T6||unit||
|   FR41 createCategory T7||unit||
|   FR41 createCategory T8||unit||
|   FR41 createCategory T1||integration||
|   FR41 createCategory T2||integration||
|   FR41 createCategory T3||integration||
|   FR41 createCategory T4||integration||
|   FR41 createCategory T5||integration||
|   FR41 createCategory T6||integration||
|   FR41 createCategory T7||integration||
|   FR41 createCategory T8||integration||
|   FR42 updateCategory T1||unit||
|   FR42 updateCategory T2||unit||
|   FR42 updateCategory T3||unit||
|   FR42 updateCategory T4||unit||
|   FR42 updateCategory T5||unit||
|   FR42 updateCategory T6||unit||
|   FR42 updateCategory T7||unit||
|   FR42 updateCategory T8||unit||
|   FR42 updateCategory T9||unit||
|   FR42 updateCategory T1||integration||
|   FR42 updateCategory T2||integration||
|   FR42 updateCategory T3||integration||
|   FR42 updateCategory T4||integration||
|   FR42 updateCategory T5||integration||
|   FR42 updateCategory T6||integration||
|   FR42 updateCategory T7||integration||
|   FR42 updateCategory T8||integration||
|   FR42 updateCategory T9||integration||
|   FR43 deleteCategory T1||unit||
|   FR43 deleteCategory T2||unit||
|   FR43 deleteCategory T3||unit||
|   FR43 deleteCategory T4||unit||
|   FR43 deleteCategory T5||unit||
|   FR43 deleteCategory T6||unit||
|   FR43 deleteCategory T7||unit||
|   FR43 deleteCategory T8||unit||
|   FR43 deleteCategory T1||integration||
|   FR43 deleteCategory T2||integration||
|   FR43 deleteCategory T3||integration||
|   FR43 deleteCategory T4||integration||
|   FR43 deleteCategory T5||integration||
|   FR43 deleteCategory T6||integration||
|   FR43 deleteCategory T7||integration||
|   FR43 deleteCategory T8||integration||
|   FR44 getCategories T1||unit||
|   FR44 getCategories T2||unit||
|   FR44 getCategories T3||unit||
|   FR44 getCategories T1||integration||
|   FR44 getCategories T2||integration||
|   FR44 getCategories T3||integration||
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
|FR2 Manage groups |
| FR21 createGroup                |             |
| FR22 getGroups                  |             |
| FR23 getGroup                   |             |  
| FR24 addToGroup                 |             |  
|   FR26 removeFromGroup (integration) | |  
|FR3  Manage transactions |
|   FR31 createTransaction (unit)||           
|   FR31 createTransaction (integration)||  
|FR32 getAllTransactions ||
| FR36 getTransactionsByGroupByCategory |       |
| FR37 deleteTransaction ||
| FR38 deleteTransactions ||
|   FR4   Manage categories | 
|   FR41 createCategory (unit)| |        
|   FR41 createCategory (integration)| |   
|   FR42 updateCategory (unit)||     
|   FR42 updateCategory (integration)||   
|   FR43 deleteCategory (unit) ||  
|   FR43 deleteCategory (integration) ||
|   FR44 getCategories (unit) ||  
|   FR44 getCategories (integration) ||  




## Coverage white box

Report here the screenshot of coverage values obtained with jest-- coverage 






