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
|   FR26 removeFromGroup I1| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I2| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I3| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I4| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I5| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I6| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I7| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I8| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I9| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I10| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I11| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I12| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I13| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I14| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I15| |integration|BB/ eq partitioning|
|   FR26 removeFromGroup I16| |integration|BB/ eq partitioning|
|FR3  Manage transactions|
|   FR31 createTransaction U1| |unit|WB/ statement coverage|
|   FR31 createTransaction U2||unit|WB/ statement coverage|
|   FR31 createTransaction U3||unit|WB/ statement coverage|
|   FR31 createTransaction U4||unit|WB/ statement coverage|
|   FR31 createTransaction U5||unit|WB/ statement coverage|
|   FR31 createTransaction U6||unit|WB/ statement coverage|
|   FR31 createTransaction U7||unit|WB/ statement coverage|
|   FR31 createTransaction U8||unit|WB/ statement coverage|
|   FR31 createTransaction I1||integration|BB/ eq partitioning|
|   FR31 createTransaction I2||integration|BB/ eq partitioning|
|   FR31 createTransaction I3||integration|BB/ eq partitioning|
|   FR31 createTransaction I4||integration|BB/ eq partitioning|
|   FR31 createTransaction I5||integration|BB/ eq partitioning|
|   FR31 createTransaction I6||integration|BB/ eq partitioning|
|   FR31 createTransaction I7||integration|BB/ eq partitioning|
|   FR31 createTransaction I8||integration|BB/ eq partitioning|
|FR4   Manage categories | 
|   FR41 createCategory U1||unit|WB/ statement coverage|
|   FR41 createCategory U2||unit|WB/ statement coverage|
|   FR41 createCategory U3||unit|WB/ statement coverage|
|   FR41 createCategory U4||unit|WB/ statement coverage|
|   FR41 createCategory U5||unit|WB/ statement coverage|
|   FR41 createCategory U6||unit|WB/ statement coverage|
|   FR41 createCategory U7||unit|WB/ statement coverage|
|   FR41 createCategory U8||unit|WB/ statement coverage|
|   FR41 createCategory I1||integration|BB/ eq partitioning|
|   FR41 createCategory I2||integration|BB/ eq partitioning|
|   FR41 createCategory I3||integration|BB/ eq partitioning|
|   FR41 createCategory I4||integration|BB/ eq partitioning|
|   FR41 createCategory I5||integration|BB/ eq partitioning|
|   FR41 createCategory I6||integration|BB/ eq partitioning|
|   FR41 createCategory I7||integration|BB/ eq partitioning|
|   FR41 createCategory I8||integration|BB/ eq partitioning|
|   FR42 updateCategory U1||unit|WB/ statement coverage|
|   FR42 updateCategory U2||unit|WB/ statement coverage|
|   FR42 updateCategory U3||unit|WB/ statement coverage|
|   FR42 updateCategory U4||unit|WB/ statement coverage|
|   FR42 updateCategory U5||unit|WB/ statement coverage|
|   FR42 updateCategory U6||unit|WB/ statement coverage|
|   FR42 updateCategory U7||unit|WB/ statement coverage|
|   FR42 updateCategory U8||unit|WB/ statement coverage|
|   FR42 updateCategory U9||unit|WB/ statement coverage|
|   FR42 updateCategory I1||integration|BB/ eq partitioning|
|   FR42 updateCategory I2||integration|BB/ eq partitioning|
|   FR42 updateCategory I3||integration|BB/ eq partitioning|
|   FR42 updateCategory I4||integration|BB/ eq partitioning|
|   FR42 updateCategory I5||integration|BB/ eq partitioning|
|   FR42 updateCategory I6||integration|BB/ eq partitioning|
|   FR42 updateCategory I7||integration|BB/ eq partitioning|
|   FR42 updateCategory I8||integration|BB/ eq partitioning|
|   FR42 updateCategory I9||integration|BB/ eq partitioning|
|   FR43 deleteCategory U1||unit|WB/ statement coverage|
|   FR43 deleteCategory U2||unit|WB/ statement coverage|
|   FR43 deleteCategory U3||unit|WB/ statement coverage|
|   FR43 deleteCategory U4||unit|WB/ statement coverage|
|   FR43 deleteCategory U5||unit|WB/ statement coverage|
|   FR43 deleteCategory U6||unit|WB/ statement coverage|
|   FR43 deleteCategory U7||unit|WB/ statement coverage|
|   FR43 deleteCategory U8||unit|WB/ statement coverage|
|   FR43 deleteCategory I1||integration|BB/ eq partitioning|
|   FR43 deleteCategory I2||integration|BB/ eq partitioning|
|   FR43 deleteCategory I3||integration|BB/ eq partitioning|
|   FR43 deleteCategory I4||integration|BB/ eq partitioning|
|   FR43 deleteCategory I5||integration|BB/ eq partitioning|
|   FR43 deleteCategory I6||integration|BB/ eq partitioning|
|   FR43 deleteCategory I7||integration|BB/ eq partitioning|
|   FR43 deleteCategory I8||integration|BB/ eq partitioning|
|   FR44 getCategories I1||unit|WB/ statement coverage|
|   FR44 getCategories I2||unit|WB/ statement coverage|
|   FR44 getCategories I3||unit|WB/ statement coverage|
|   FR44 getCategories I1||integration|BB/ eq partitioning|
|   FR44 getCategories I2||integration|BB/ eq partitioning|
|   FR44 getCategories I3||integration|BB/ eq partitioning|
|||||





# Coverage



## Coverage of FR

<Report in the following table the coverage of  functional requirements (from official requirements) >

| Functional Requirements covered |   Test(s) | 
| ------------------------------- | ----------- | 
|FR2 Manage groups |
|   FR26 removeFromGroup | |  
|FR3  Manage transactions |
|   FR31 createTransaction||           
|FR4   Manage categories | 
|   FR41 createCategory| |        
|   FR42 updateCategory||     
|   FR43 deleteCategory ||  
|   FR44 getCategories ||  




## Coverage white box

Report here the screenshot of coverage values obtained with jest-- coverage 






