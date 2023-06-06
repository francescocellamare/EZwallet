# Test Report

<The goal of this document is to explain how the application was tested, detailing how the test cases were defined and what they cover>

# Contents

- [Dependency graph](#dependency-graph)

- [Integration approach](#integration-approach)

- [Tests](#tests)

- [Coverage](#Coverage)





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
|||||





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
|   FR31 createTransaction (unit)||           
|   FR31 createTransaction (integration)||  
|FR4   Manage categories | 
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






