# Requirements Document - future EZWallet

Date: 

Version: V2 - description of EZWallet in FUTURE form (as proposed by the team)

 
| Version number | Change |
| ----------------- |:-----------|
| | | 


# Contents

- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
	+ [Context Diagram](#context-diagram)
	+ [Interfaces](#interfaces) 
	
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
	+ [Functional Requirements](#functional-requirements)
	+ [Non functional requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
	+ [Use case diagram](#use-case-diagram)
	+ [Use cases](#use-cases)
    	+ [Relevant scenarios](#relevant-scenarios)
- [Glossary](#glossary)
- [System design](#system-design)
- [Deployment diagram](#deployment-diagram)

# Informal description
EZWallet (read EaSy Wallet) is a software application designed to help individuals and families keep track of their expenses. Users can enter and categorize their expenses, allowing them to quickly see where their money is going. EZWallet is a powerful tool for those looking to take control of their finances and make informed decisions about their spending.



# Stakeholders


| Stakeholder name  | Description | 
| ----------------- |:-----------:|
|     User   |        Individual who wants to keep track of their expenses or their family expenses| 
| Admin| Manages users' accounts|
|Currency exchange service| API for converting transaction's currency to the specified default currency|
|Google ads| Third party service for providing ads|
|Start up company| Company that develops the software and provides the service|
|Competitors| Companies that provide the same service|



# Context Diagram and interfaces

## Context Diagram


## Interfaces

| Actor | Logical Interface | Physical Interface  |
| ------------- |:-------------:| -----:|
|   User    |GUI(to be defined -Manage transactions, budget categories, view reports, etc...)  | Smartphone or PC (Web browser) |
| Admin | GUI(to be defined - same functionalities as user + Manage users' accounts) | Smartphone or PC (Web browser)|
|Google ads| Internet link | Google ads' API|
|Currency exchange service| Internet link| Currency exchange service's API|


# Stories and personas
\<A Persona is a realistic impersonation of an actor. Define here a few personas and describe in plain text how a persona interacts with the system>

\<Persona is-an-instance-of actor>

\<stories will be formalized later as scenarios in use cases>


# Functional and non functional requirements

## Functional Requirements



| ID        | Description  |
| ------------- |:-------------:| 
| FR1     | Authorize and authenticate 		|
|FR1.1|  Log in|
| FR1.1.1  | Log in using email and password |
| FR1.1.2   |	Log in using 3rd party agent    |
| FR1.3   | Reset password                  |
| FR1.4   | Register as a new user          |
| FR1.5   | Verify email                    |
| FR1.6   | Log out                         |
| FR2     | Manage personal account				    |
| FR2.1   | Delete personal account					|
| FR2.2  | Edit profile picture            |
| FR2.3   | Change password 				|
|FR2.4| Change application's settings|
| FR2.4.1  | Change theme      |
| FR2.4.2   | Change language   |
| FR2.4.3  | Change default currency            | 
| FR2.4.4  | Change date format              | 
| FR3 | Manage categories           | 
| FR3.1 | Create category             | 
| FR3.2 | Delete category             | 
| FR3.3| View categories|
| FR3.4 | Edit Category           | 
| FR3.4.1 | Edit name          | 
| FR3.4.2 | Edit color         | 
|FR3.5| Label important categories|
|  FR4     |  Manage transaction  | 
|  FR4.1     |  Add a new transaction | 
|  FR4.2     |  Edit a transaction| 
|  FR4.3     |  Delete a transaction |
|FR4.4| View transactions|
|  FR4.4.1     |  Filter transactions|
|  FR4.4.1.1    |  Filter by date|
|  FR4.4.1.2   |  Filter by category|
|  FR4.4.1.3    |  Filter by amount spent|
|  FR4.4.2    |  Sort transactions|
|  FR4.4.2.1    |  Sort by date|
|  FR4.4.2.2    |  Sort by amount spent|
|  FR4.4.3    |  Group transactions|
|  FR4.4.3.1    |  Filter by date|
|  FR4.4.3.2   |  Filter by category|
|  FR5     | Manage expenses |    
|  FR5.1     |  Add a new balance |        
|  FR5.2     |  Delete a balance |        
|  FR5.3  |  Specify income and recurrent income for a balance |
|  FR5.4  |  Specify expenses and recurrent expenses for a balance |
|  FR5.5  |  Allocate budget for a category |
|  FR5.6  |  Transfer budget from one category to another category |
|  FR5.7  |  Get notified when exceeding the allocated budget of a category |
| FR5.8| Transfer money from one balance to another|
|FR6| Manage family accounts|
|FR6.1| Create a family account|
|FR6.2| Delete a family account|
|FR6.3| Invite users to a family account|
|FR6.4| Manage roles in family account|
|FR6.4.1| Notify parents when kids exceed budgets|
|FR6.4.2| Add income to a kid account|
|FR7| View statistical reports |
|FR7.1| Visualize trends over time|
|FR7.1.1| View amount of selected balances|
|FR7.1.2| View total amount of all balances|
|FR7.1.3| View expenses|
|FR7.1.4| View expenses per category|
|FR7.1.5| View income|
|FR7.2| View percentage of spendings by category in a specific time range|
|FR7.3|View overall expenses |
|FR7.3.1|Group by day|
|FR7.3.2|Group by month|
|FR7.3.3|Group by year|
|FR7.4|View overall income |
|FR7.4.1|Group by day|
|FR7.4.2|Group by month|
|FR7.4.3|Group by year|
|FR7.5|View available budget for each category|
|FR7.6|View percentage of amount spent from the available budget for each category|
| FR8         | Manage users' accounts |
| FR8.1      | View list of users |
|FR8.2| View a user's account|
| FR8.2       | Update a user's account |
| FR8.3       | Delete a user's account |


## Non Functional Requirements

\<Describe constraints on functional requirements>

| ID        | Type (efficiency, reliability, ..)           | Description  | Refers to |
| ------------- |:-------------:| :-----:| -----:|
|  NFR1     |   |  | |
|  NFR2     | |  | |
|  NFR3     | | | |
| NFRx .. | | | | 


# Use case diagram and use cases


## Use case diagram
\<define here UML Use case diagram UCD summarizing all use cases, and their relationships>


\<next describe here each use case in the UCD>
### Use case 1, UC1
| Actors Involved        |  |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the UC can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after UC is finished> |
|  Nominal Scenario     | \<Textual description of actions executed by the UC> |
|  Variants     | \<other normal executions> |
|  Exceptions     | \<exceptions, errors > |

##### Scenario 1.1 

\<describe here scenarios instances of UC1>

\<a scenario is a sequence of steps that corresponds to a particular execution of one use case>

\<a scenario is a more formal description of a story>

\<only relevant scenarios should be described>

| Scenario 1.1 | |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the scenario can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after scenario is finished> |
| Step#        | Description  |
|  1     |  |  
|  2     |  |
|  ...     |  |

##### Scenario 1.2

##### Scenario 1.x

### Use case 2, UC2
..

### Use case x, UCx
..



# Glossary

\<use UML class diagram to define important terms, or concepts in the domain of the application, and their relationships> 

\<concepts must be used consistently all over the document, ex in use cases, requirements etc>

# System Design
\<describe here system design>

\<must be consistent with Context diagram>

# Deployment Diagram 

\<describe here deployment diagram >




