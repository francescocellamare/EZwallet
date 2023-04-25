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
| FR1.4   | Register as a new user          |	<!-- password validation >
| FR1.4   | Register as a new user using 3rd party service           | <!-- use case not written >
| FR1.5   | Verify email                    |
| FR1.6   | Log out                         |
| FR2     | Manage personal account				    |
| FR2.1   | Delete personal account					|
| FR2.2  | Edit profile picture            |
| FR2.3   | Change password 				|
| FR2.4   | Edit personal information 				|
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
|FR3.5| Label important category|
|FR3.6| Unlabel a category |
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
|  FR5.5  |  Allocate budget for a category |
|  FR5.6  |  Transfer budget from one category to another category | 
|FR6| Manage family accounts|
|FR6.1| Create a family account|
|FR6.2| Delete a family account|
|FR6.3| Invite users to a family account|
|FR6.4| Add income to a kid account| <!-- use case not written >
|FR6.5| Join family account | 
|FR6.6| leave family account | 
|FR6.7| remove family account | 
|FR6.8| View child's dashboard |
|FR7| View statistical reports |
|FR7.1| Visualize trends over time|
|FR7.1.1| View amount of selected balances|
|FR7.1.2| View total amount of all balances|
|FR7.1.3| View expenses|
|FR7.1.4| View expenses per category|
|FR7.1.5| View income|
|FR7.2  | View percentage of spendings by category in a specific time range|
|FR7.3  | View overall expenses |
|FR7.4  | View overall expenses per category |
|FR7.5  | View overall income |
|FR7.6  | View available budget for each category|
|FR7.7  | View percentage of amount spent from the available budget for each category|
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


### Use case 1, REGISTER
| Actors Involved | User |
| ------------- |:-------------:| 
|  Precondition     | User has no account 		|
|  Post condition   | User has a new account	|
|  Nominal Scenario | User uses a new email 		|
|  Variants     	| --- |
|  Exceptions     	| User uses an email that is already linked to an account |


| Scenario 1.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User has no account 	 |
|  Post condition   | User has a new account |
| Step#  | Description  |
|  1     | User asks to sign up 									  |  
|  2     | System asks for email and password 						  |
|  3     | User inserts required fields 							  |
|  4     | User submits form 										  |
|  5     | System verifies that the email is not in use 			  |
|  6     | System creates the account 								  |
|  7     | System adds a default category "Others" to the account and sets its budget to 0    |
|  7     | System adds a default balance "Default" to the account     |
|  7     | System redirects user to the home page 					  |


| Scenario 1.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User has an account 					   |
|  Post condition   | The operation ends with an error message |
| Step#  | Description  |
|  1     | User asks to sign up 									  |  
|  2     | System asks for email and password 						  |
|  3     | User inserts required fields 							  |
|  4     | User submits form 										  |
|  5     | System verifies that the user's account already exists 	  |
|  6     | System notifies the User that he/she is already registered |


### Use case 2, LOGIN
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User has an account 				 |
|  Post condition     | User is authorized 					 |
|  Nominal Scenario   | User uses correct email and password |
|  Variants     	  | --- |
|  Exceptions     	  | Email and password do not match or the user enters an email that is not registered |

| Scenario 2.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User has an account |
|  Post condition   | User is authorized  |
| Step#  | Description  |
|  1     | User asks to login 								  |  
|  2     | System asks for email and password 				  |
|  3     | User enters email and password 				      |
|  4     | System verifies that email and password are correct|
|  5     | User is authorized 								  |

| Scenario 2.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User has an account 	 |
|  Post condition   | User is not authorized |
| Step#  | Description  |
|  1     | User asks to login 				  						   |  
|  2     | System asks for email and password 						   |
|  3     | User enters email and password          					   |
|  4     | System verifies that email and password do not match		   |
|  6   	 | User is not authorized									   |
|  7     | System notifies the user that he/she used wrong credentials |

| Scenario 2.3 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User does not have an account |
|  Post condition   | User is not authorized 		|
| Step#  | Description  |
|  1     | User asks to login 								|  
|  2     | System asks for email and password 				|
|  3     | User enters email and password 					|
|  4     | System verifies that the email is not registered |
|  5   	 | User is not authorized 							|

### Use case 3, LOGIN USING 3rd PARTY AGENT
| Actors Involved        | User, 3rd party authentication service |
| ------------- |:-------------:| 
|  Precondition    	  | User has an account with 3rd party agent |
|  Post condition     | User is authorized 						 |
|  Nominal Scenario   | User log in using a 3rd party service 	 |
|  Variants     	  | --- |
|  Exceptions     	  | User is not registered to any 3rd party agent, User fails to authenitcate using the 3rd party service |

| Scenario 3.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User has an account |
|  Post condition     | User is authorized |
| Step#  | Description  |
|  1     | User asks to login using a 3rd party service 				  |  
|  2     | System asks for the service to be used 						  |
|  3     | User chooses the service 									  |
|  5     | System redirect the user to the 3rd party service login form   |
|  6     | 3rd party authentication service asks the user to login		  |
|  7     | user provides all the necessary information to login 		  |
|  8     | 3rd party authentication service authorizes the user			  | 
|  9     | System checks if the user is authorized with 3rd party service |
|  10    | User is authorized 											  |

| Scenario 3.2 | Exception |
| ------------- |:-------------:| 
|  Precondition       | User has an account 	|
|  Post condition     | User is not authorized  |
| Step#  | Description  |
|  1     | User asks to login using a 3rd party service 				  |  
|  2     | System asks for the service to be used 						  |
|  3     | User chooses the service 									  |
|  5     | System redirect the user to the 3rd party service login form   |
|  6     | 3rd party authentication service asks the user to login		  |
|  7     | user provides all the necessary information to login 		  |
|  8     | 3rd party authentication service authorizes the user			  | 
|  9     | System checks if the user is authorized with 3rd party service |
|  10    | System finds out that the user is not registerd using the 3rd party authenitcation service |
|  11   | System informs the user that the account does no exist |

| Scenario 3.3 | Exception |
| ------------- |:-------------:| 
|  Precondition       | User has an account 	|
|  Post condition     | User is not authorized  |
| Step#  | Description  |
|  1     | User asks to login using a 3rd party service 				  |  
|  2     | System asks for the service to be used 						  |
|  3     | User chooses the service 									  |
|  5     | System redirect the user to the 3rd party service login form   |
|  6     | 3rd party authentication service asks the user to login		  |
|  7     | user provides all the necessary information to login 		  |
|  8     | 3rd party authentication service does not authorizes the user			  | 
|  9     | user is not authorized |

### Use case 4, CHANGE PASSWORD
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in 					|
|  Post condition     | User changes his/her password 			|
|  Nominal Scenario   | User is logged in				    |
|  Variants     	  | --- |
|  Exceptions     	  | user provides an incorrect current password, user uses the same password					|

| Scenario 4.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in 		  |
|  Post condition     | User changes his/her password |
| Step#  | Description  |
|  1     | User asks to change his/her password 					|  
|  2     | System aks for current and new password  |
|  3     | User provides all the required information	|
|  4     | System updates the user's password 						|

| Scenario 4.2 | Exception |
| ------------- |:-------------:| 
|  Precondition       | User is logged in 				  |
|  Post condition     | User does not change his/her password |
| Step#  | Description  |
|  1     | User asks to change his/her password 					|  
|  2     | System aks for current and new password  |
|  3     | User provides inputs an incorrect current password	|
|  4     | System does not update the password and informs user that password is incorrect 						|

| Scenario 4.2 | Exception |
| ------------- |:-------------:| 
|  Precondition       | User is logged in 				  |
|  Post condition     | User does not change his/her password |
| Step#  | Description  |
|  1     | User asks to change his/her password 					|  
|  2     | System aks for current and new password  |
|  3     | User provides all the required information, but uses the current password as a new password	|
|  4     | System does not update the password and informs user that password is incorrect 						|


### Use case 5, RESET PASSWORD
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is not logged in 	 |
|  Post condition     | User resets his/her password |
|  Nominal Scenario   | user changes to a new password within the allowed time 	 |
|  Variants     	  | |
|  Exceptions     	  | email expired, user uses the current password as a new password |

| Scenario 5.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is not logged in 	 |
|  Post condition     | User resets his/her password |
| Step#  | Description  |
|  1     | User asks to reset his/her password						|  
|  2     | System sends an email to user for resetting the password |
|  3     | User confirms the request and changes his/her password	|
|  4     | System updates the user's password 						|

| Scenario 5.2 | Exception |
| ------------- |:-------------:| 
|  Precondition       | User is not logged in 			 |
|  Post condition     | User does not reset his/her password |
| Step#  | Description  |
|  1     | User asks to reset his/her password 						|	  
|  2     | System sends an email to user for resetting the password |
|  3     | User confirms the request but received email is expired	|
|  4     | System does not reset password and shows an error message 							|

| Scenario 5.2 | Exception |
| ------------- |:-------------:| 
|  Precondition       | User is not logged in 			 |
|  Post condition     | User does not reset his/her password |
| Step#  | Description  |
|  1     | User asks to reset his/her password 						|	  
|  2     | System sends an email to user for resetting the password |
|  3     | User confirms the request but the user uses the current password as a new password	|
|  4     | System does not reset password and shows an error message 							|

### Use case 6, VERIFY EMAIL
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in 					 |
|  Post condition     | User verifies his/her email 			 |
|  Nominal Scenario   | user verifies his/her email within the allowed time limit					 |
|  Variants     	  | |
|  Exceptions     	  | email expired |

| Scenario 6.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in		|
|  Post condition     | User verifies his/her email |
| Step#  | Description  |
|  1     | User asks for verifying his/her email					 |  
|  2     | System sends an email to the user for verifying the email |
|  3     | User confirms the request 								 |
|  4     | System updates the user's data 							 |

| Scenario 6.2 | Exception |
| ------------- |:-------------:| 
|  Precondition       | User is logged in 			   |
|  Post condition     | User does not verify his/her email |
| Step#  | Description  |
|  1     | User asks for verifying his/her email 					 |  
|  2     | System sends an email to the user for verifying the email |
|  3     | User confirms the request but received email is expired	 |
|  4     | System shows an error message 							 |

### Use case 7, LOGOUT
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition       | User is logged in  |
|  Post condition     | User is logged out |
|  Nominal Scenario   | User is logged in  |
|  Variants       | --- |
|  Exceptions     | User does not have an account |

| Scenario 7.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User has an account |
|  Post condition   | User is logged out  |
| Step#        | Description  |
|  1     | User asks to logout |  
|  2     | System allows the operation |


| Scenario 7.2| Exception |
| ------------- |:-------------:| 
|  Precondition     | User does not have an account	|
|  Post condition   | User receives an error message|
| Step#        | Description  |
|  1     | User asks to logout 												  |  
|  2     | System denies the operation because the user account was not found |
|  3     | Error message is sent to the user 								  |



### Use case 8, DELETE PERSONAL ACCOUNT
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in				|
|  Post condition     | User has no account anymore |
|  Nominal Scenario   | User confirmed operation by providing his/her password				|
|  Variants     	  | --- |
|  Exceptions     	  | User does not delete his/her account because he/she used wrong credentials |

| Scenario 8.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in				|
|  Post condition     | User has not an account anymore |
| Step#  | Description  |
|  1     | User asks to delete his/her account 	|  
|  2     | System requests for the password 	|
|  3     | User enters his/her password 			|
|  4     | System checks the password			|
|  5     | System deletes user's account 		|

| Scenario 8.2 | Exception |
| ------------- |:-------------:| 
|  Precondition       | User is logged in	 		|
|  Post condition     | User still have his/her account |
| Step#  | Description  |
|  1     | User asks to delete his/her account			   |  
|  2     | System requests for the password 			   |
|  3     | User enters his/her password 					   |
|  4     | System checks the password and it does not match|
|  5    | System shows an error message 				   |


### Use case 9, EDIT PERSONAL INFORMATION
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in		  	  |
|  Post condition     | User updates his/her information |
|  Nominal Scenario   | User is logged in			  |
|  Variants     	  | --- |
|  Exceptions     	  | --- |

| Scenario 9.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in |
|  Post condition     | User updates his/her information |
| Step#  | Description  |
|  1     | User asks to modify his/her account's information			|  
|  2     | System shows pre-compiled and editable form of current personal information to the user  	|
|  3     | User modifies his/her information							|
|  4     | System updates user's information							|

### Use case 10, EDIT PROFILE PICTURE
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in 				 |
|  Post condition     | User updates his/her profile picture |
|  Nominal Scenario   | User is logged in				 |
|  Variants     	  | --- |
|  Exceptions     	  | --- |

| Scenario 10.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in 				 |
|  Post condition     | User updates his/her profile picture |
| Step#  | Description  |
|  1     | User asks to modifies his/her account's profile picture	|  
|  2     | System requests the new profile picture 					|
|  3     | User uploads the image 									|
|  4     | System updates user's profile picture 					|

### Use case 11, CHANGE DEFAULT DISPLAY CURRENCY
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in				|
|  Post condition     | User changes default diplay currency	|
|  Nominal Scenario   | User is logged in				|
|  Variants     	  |  |
|  Exceptions     	  |  |

| Scenario 11.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in 				|
|  Post condition     | User changes default display currency	|
| Step#  | Description  |
|  1     | User asks for changing default display currency																 |  
|  2     | System shows list of possible choices 																 |
|  3     | User chooses a new currency 																		 |
|  4     | System updates each amount of money with the new currency using a 3rd party currency exchange service |

### Use case 12, CHANGE DATE FORMAT
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in 					  |
|  Post condition     | User changes date format 			  |
|  Nominal Scenario   | User is logged in					  |
|  Variants     	  | --- |
|  Exceptions     	  | --- |

| Scenario 12.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in 		 |
|  Post condition     | User changes date format |
| Step#  | Description  |
|  1     | User asks to change date format for the whole application	|  
|  2     | System questions the user for the new format 				|
|  3     | User enters the new format 									|
|  4     | System updates date format in application's settings |

### Use case 13, CHANGE THEME
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in	|
|  Post condition     | User changes theme	|
|  Nominal Scenario   | User is logged in	|
|  Variants     	  | --- |
|  Exceptions     	  | --- |

| Scenario 13.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in	|
|  Post condition     | User changes theme	|
| Step#  | Description  |
|  1     | User asks to change theme for the whole application	|  
|  2     | System show the toggle to the user 					|
|  3     | User switches it 									|
|  4     | System updates application's theme in settings |

### Use case 14, CHANGE LANGUAGE
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition    	  | User is logged in		|
|  Post condition     | User changes language	|
|  Nominal Scenario   | User is logged in		|
|  Variants     	  | --- |
|  Exceptions     	  | --- |

| Scenario 14.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition       | User is logged in 		|
|  Post condition     | User changes language	|
| Step#  | Description  |
|  1     | User asks to change language					|  
|  2     | System shows the list of possible languages	|
|  3     | User selects a new language 				|
|  4     | System updates application's language 		|

### Use Case 15: Create a Category

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | A new category is created |
|  Nominal Scenario     | User is logged in and Category name he/she specifies is not in use |
|  Variants     | --- |
|  Exceptions     |  User specifies a category name that is already in use |


| Scenario 15.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | User has a new account |
| Step#        | Description  |
|  1     | User asks to create a new category |  
|  2     | System asks to specify category name and choose color from list of available colors |
|  3     | User inserts required fields |
|  4     | User submits form |
|  5     | System verifies that the chosen name is not in use|
|  6     | system sets the budget for the category to 0 |
|  7   | System stores new category |


| Scenario 15.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in but specifies a categoty name that is already in use |
|  Post condition     | Operation ends with an error message |
| Step#        | Description |
|  1     | User asks to create a new category |  
|  2     | System asks to specify category name and choose color from list of available colors |
|  3     | User inserts required fields |
|  4     | User submits form |
|  5     | System verifies that the chosen name is in use|
|  6   | System notifies the user that he/she has to choose another name for the category |



### Use Case 16: Delete a Category

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | A category is deleted |
|  Nominal Scenario     | User asks to delete a non-default category and confirms the operation |
|  Variants     | --- |
|  Exceptions     | User tries to delete the default "Others" category, User does not confirm the operation  |


| Scenario 16.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | A category is deleted and all its corresponding transactions become associated to the default category (others...) |
| Step#        | Description  |
|  1     | User asks to delete a category |  
|  2     | System asks the user to confirm the operation  |
|  3     | User confirms the operation |
|  4     | System deletes the category |
|  5     | System fetches all transactions related to this category and associates them to the default category "Others"|
 


| Scenario 16.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | No changes made |
| Step#        | Description  |
|  1     | User asks to delete a category |  
|  2     | System asks the user to confirm the operation  |
|  3     | User does not confirm the operation | 
|  4     | System does not delete the category | 

| Scenario 16.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | No changes made and the user receives an error message |
| Step#        | Description  |
|  1     | User asks to delete the "Others" default category |  
|  2     | System rejects the request and shows an error message  |


### Use Case 17: View categories

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | User receives a list of all available categories |
|  Nominal Scenario     | User is logged in |
|  Variants     | --- |
|  Exceptions     | --- |

| Scenario 7.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and he/she has at least one category |
|  Post condition     | User receives a list of all of his/her categories |
| Step#        | Description  |
|  1     | User asks to view his/her categories |  
|  2     | System looks up all categories|
|  3     | System returns a list of categories |

### Use Case 18: Edit a category

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | A category is updated |
|  Nominal Scenario     | User is logged in and has a category to be edited  |
|  Variants     | ---|
|  Exceptions     | User tries to update the default "Others" category, User changes name to a name already associated to another category |

| Scenario 18.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and does not change the name of a non-default category to name already in use |
|  Post condition     | A category is updated |
| Step#        | Description  |
|  1     | User asks to edit a specific category |  
|  2     | System asks user to change name or/and color||
|  3     | User applies changes |
|  4     | System verifies that the new name is not in use|
|  5     | System applies changes|


| Scenario 18.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and he/she changes the category name to a name already in use|
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to edit a non-default category |  
|  2     | System ask user to change name or/and color|
|  3     | User apply changes |
|  4     | System verifies that chosen name is in use|
|  5   | System notifies the user that he/she has to choose another name for the category |


| Scenario 18.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and he/she changes the category name to a name already in use|
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to edit a default category |  
|  2     | System rejects the request and returns an error message |

### Use Case 19: Label important category

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in  |
|  Post condition     | A category is labeled as important |
|  Nominal Scenario     | User is logged in and the category is not already labeled|
|  Variants     | ---|
|  Exceptions     | Category is already labeled as important |

| Scenario 7.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and the category is not already labeled |
|  Post condition     | A category is labeled as important |
| Step#        | Description  |
|  1     | User asks to label a specific category |  
|  2     | System verifies that the category is not labeled|
|  3     | System labels the category as important|



| Scenario 7.1 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and the category is already labeled |
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to label a specific category |  
|  2     | System verifies that the category is already labeled|
|  3    | System notifies the user that the category is already labeled|

### Use Case 4: UNLABEL A CATEGORY

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | A categoty is unlabeled|
|  Nominal Scenario     | User is logged in and asks to unlabel a category that has a label|
|  Variants     | ---|
|  Exceptions     |User is logged in and asks to unlabel a category that has no label|

| Scenario 4.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and asks to unlabel a category that has a label|
|  Post condition     | A category is unlabeled |
| Step#        | Description  |
|  1     | User asks to unlabel a category|  
|  2     | System verifies that the category is labeled|
|  3     | System unlabels the category|

| Scenario 4.1 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and asks to unlabel a category that has no label|
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to unlabel a category|  
|  2     | System verifies that the category is already unlabeled|
|  3     | System denies the operation and notifies the user that the category does not have a label |


### Use case 19, Add a new transaction

| Actors Involved | User (Parent or Child) |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | A new transaction is added to the user's list of transactions |
|  Nominal Scenario     | The information entered by user is valid |
|  Variants     | User asks to create a recurrent transaction, User didn't specify a category |
|  Exceptions     | User provided invalid information |


| Scenario 19.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in  |
|  Post condition     | A new transaction is added to the user's list of transactions |
| Step#        | Description  |
|  1     | user asks to add a new transaction |  
|  2     | system asks the user to provide transaction date, amount, direction, category, balance, an optional description, wether to make it a recurrent transaction, and the period in days of the recurrent transaction  |
|  3     | user fills all required fields and does not select the recurrent transaction option |
|  4	 | user submits form		|
|  5     | system validates all input fields					|
|  6     | system creates transaction |
|  7     | system calculates the remaining budget for the selected category |
|  8     | system notifies the user if the budget for that category was exceeded and also notifies parents if the user is a child in a family |
|  9     | system returns the new transaction and a message indicating that the operation was successful					|

| Scenario 19.1 | Variant |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in  |
|  Post condition     | A new recurrent transaction is added to the user's list of transactions after a specific period of time |
| Step#        | Description  |
|  1     | user asks to add a new transaction |  
|  2     | system asks the user to provide transaction date, amount, direction, category, balance, an optional description, wether to make it a recurrent transaction, and the period of the recurrent transaction  |
|  3     | user fills all required fields, selects the recurrent transaction option, and sets the period to the desired amount of days  |
|  4	 | user submits form		|
|  5     | system validates all input fields					|
|  6     | system creates transaction |
|  7     | system calculates the remaining budget for the selected category |
|  8     | system notifies the user if the budget for that category was exceeded and also notifies parents if the user is a child in a family |
|  9     | system returns the new transaction and a message indicating that the operation was successful					|
| 10     | system adds the same transaction to the user's transaction list each time the specified number of days passes |

| Scenario 19.2 | Variant |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in  |
|  Post condition     | A new transaction is added to the user's list of transactions |
| Step#        | Description  |
|  1     | user asks to add a new transaction |  
|  2     | system asks the user to provide transaction date, amount, direction, category, balance, an optional description, wether to make it a recurrent transaction, and the period of the recurrent transaction  |
|  3     | user fills all required fields but doesn't select a category |
|  4	 | user submits the form		|
|  5     | system validates all input fields and finds out that the category is not specified |
|  6     | system sets the category to the "Others" default catgeory  |
|  7     | system calculates the remaining budget for the "Others" category |
|  8     | system notifies the user if the budget for that category was exceeded and also notifies parents if the user is a child in a family |
|  7     | system returns the new transaction and a message indicating that the operation was successful					|

| Scenario 19.3 | Exception |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in  |
|  Post condition     | transaction is not created and the user receives an error message |
| Step#        | Description  |
|  1     | user asks to add a new transaction |  
|  2     | system asks the user to provide transaction date, amount, direction, category, balance, an optional description, wether to make it a recurrent transaction, and the period of the recurrent transaction  |
|  3     | user fills all the required fields |
|  4	 | user submits the form		|
|  5     | system validates all the input fields					|
|  6     | system finds out that one of the field is invalid (ex: user selected a non existing category, an invalid date, or one of the required fields is missing ) |
|  7     | system does not create the transaction					|
|  7     | system return an error message to the User |

### Use case 20, Edit a transaction

| Actors Involved | User (Parent or Child) |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and at least has one transaction |
|  Post condition     | The selected transaction is updated |
|  Nominal Scenario     | The new information entered by user is valid |
|  Variants     | User didn't update information |
|  Exceptions     | User provided invalid information |


| Scenario 20.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has at least one transaction |
|  Post condition     | The selected transaction is updated |
| Step#        | Description  |
|  1     | user asks to edit a transaction |  
|  2     | system displays the transaction and asks the user to update the desired fields (date, amount, direction, category, balance, and description) |
|  3     | user updates the desired fields and submits form |
|  5     | system validates all input fields |
|  6     | system updates the transaction |
|  7     | system returns the updated transaction and a message indicating that the operation was successful					|

| Scenario 20.3 | Variant |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has at least one transaction |
|  Post condition     | The selected transaction is not updated and the user receives an new error message |
| Step#        | Description  |
|  1     | user asks to edit a transaction |  
|  2     | system displays the transaction and asks the user to update the desired fields (date, amount, direction, category, balance, and description) |
|  3     | user submits form without updating any of the fields |
|  5     | system does not update the transaction |

| Scenario 20.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has at least one transaction |
|  Post condition     | The selected transaction is not updated and the user receives an new error message |
| Step#        | Description  |
|  1     | user asks to edit a transaction |  
|  2     | system displays the transaction and asks the user to update the desired fields (date, amount, direction, category, balance, and description) |
|  3     | user updates the desired fields and submits form |
|  5     | system validates all input fields |
|  6     | system finds out that one of the field is invalid (ex: selected a non existing category, an invalid date, or one of the required fields is missing ) |
|  7     | system does not update the transaction and returns an error message	|


### Use case 21, Delete transaction(s)

| Actors Involved | User (Parent or Child) |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and has at least one transaction |
|  Post condition     | The selected transactions are deleted |
|  Nominal Scenario     | user confirms the deletion and does not cancel the operation |
|  Variants     | --- |
|  Exceptions     | user does not confirm the operation, user decides to restore the deleted transactions|

| Scenario 21.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has at least one transaction |
|  Post condition     | The selected transactions are deleted |
| Step#        | Description  |
|  1     | user selects one or more transactions |  
|  2     | user asks to delete transactions |
|  3     | system asks the user to confirm the operation |
|  4     | user confirms his/her intent to delete the selected transactions |
|  5     | system deletes the transactions |
|  6     | system informs the user that the operation was successful and displays an undo popup |
|  7     | system waits for a couple of seconds before hiding the undo button |

| Scenario 21.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has at least one transaction |
|  Post condition     | The selected transactions are not deleted |
| Step#        | Description  |
|  1     | user selects one or more transactions |  
|  2     | user asks to delete transactions |
|  3     | system asks the user to confirm the operation |
|  4     | user does not confirm his/her intent to delete the selected transactions |
|  5     | The system does not delete the selected transactions |

| Scenario 21.3 | Exception |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has at least one transaction |
|  Post condition     | The selected transactions are not deleted |
| Step#        | Description  |
|  1     | user selects one or more transactions |  
|  2     | user asks to delete transactions |
|  3     | system asks the user to confirm the operation |
|  4     | user confirms his/her intent to delete the selected transactions |
|  5     | system deletes the transactions |
|  6     | system informs the user that the operation was successful and displays an undo popup |
|  7     | user decides to undo the operation |
|  8	 | system restores all the deleted transactions |
|  9 	 | systems notifies the user that the transactions were restored |

### Use case 22, View transactions

| Actors Involved | User (Parent or Child) |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Poscondition     | user views a list of his/her transactions |
|  Nominal Scenario     | user has at least one transaction and views all of his/her transactions in the default order  |
|  Variants     | user views a modified list of his/her transactions based on the selected filters, order, and grouping options / user has no transactions  |
|  Exceptions     | --- |

| Scenario 22.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and at least has one transaction |
|  Post condition     | user views all of his/her transactions in the default order |
| Step#        | Description  |
|  1     | user asks to view his/her transactions |  
| 2		 | system retrieves all transactions and orders them starting from the most recent transaction |
|  3     | systems returns the retrieved list of transactions |

| Scenario 22.2 | Variant |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has at least one transaction |
|  Post condition     | user views a modified list of transactions based on the selected filter, order, and grouping options  |
| Step#        | Description  |
|  1     | user asks to view his/her transactions |  
|  2     | system returns a list of all of his/her transactions ordered by starting from the most recent  transaction |
|  3 	|  user asks to change transactions order, group by category or time, or to filter by date, type, amount spent, or category |
| 4		| system retrieves a new list of transactions based on the selected filters, order, and grouping		|
| 5     | system returns the new list of transactions |


| Scenario 22.3 | Variant |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has no transactions  |
|  Post condition     | user recieves a message indicating that he/she doesn't have any transactions  |
| Step#        | Description  |
|  1     | user asks to view his/her transactions |  
|  2     | system does not find any transactions to show |
|  3 	|  system displays a message indicating that the user didn't add any transactions along with a button to add transactions |

### Use case 23, Add a new balance

| Actors Involved | User (Parent or Child) |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | A new balance is added to the User's profile |
|  Nominal Scenario     | user provides valid information |
|  Variants     | user does not specify a starting amount |
|  Exceptions     | user specifies an already in use balance name |

| Scenario 23.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in |
|  Post condition     | A new balance is added to the User's profile  |
| Step#        | Description  |
|  1     | user asks to add a new balance |  
|  2     | system asks for the balance name, icon, and starting amount |
|  3	 | user provides all the reqiured information |
|  3	 | system validates all input fields (checks that the balance name is not already in use and if the starting balance is set) |  
|  4 | system creates the new balance |
| 5 | system displays list of balances and returns a message indicating that the operation was successful |


| Scenario 23.2 | Variant |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in |
|  Post condition     | A new balance is added to the User's profile |
| Step#        | Description  |
|  1     | user asks to add a new balance |  
|  2     | system asks for the balance name, icon, and starting amount |
|  3	 | user provides all the reqiured information but does not set a starting balance |
|  3	 | system validates all input fields (checks that the balance name is not already in use and if the starting balance is set) |  
| 5 | system sets the starting balance to zero | 
|  4 | system creates the new balance |
| 5 | system displays list of balances and returns a message indicating that the operation was successful |



| Scenario 7.1 | Exception |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in |
|  Post condition     | The new balance is not created and the user recevies an error message  |
| Step#        | Description  |
|  1     | user asks to add a new balance |  
|  2     | system asks for the balance name, icon, and starting amount |
|  3	 | user provides all the reqiured information but does not set a starting balance |
|  3	 | system validates the input fields (checks that the balance name is not already in use and if the starting balance is set) |  
| 5 | system finds out that the balance name is already in use | 
|  4 | system does not create the new balance |
| 5 | system returns an error message indicating that the operation failed |

### Use case 23, Delete a balance

| Actors Involved | User (Parent or Child) |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The selected balance is deleted and the user receives a message indicating that the operation was successful |
|  Nominal Scenario     | User has two or more balances |
|  Variants     | --- |
|  Exceptions     | User has only one balance / Child tries to delete allowance balance |

| Scenario 23.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has at least two balances |
|  Post condition     | The selected balance is deleted and the user receives a message indicating that the operation was successful |
| Step#        | Description  |
|  1     | user asks to delete a balance |  
|  2     | system asks the user to confirm the operation and informs the user that existing transactions will still belong to this balance |
|  3     | user confirms his/her intent to delete balance |  
|  4     | system deletes balance |
|  5     | system returns a message indicating that the operation was successful |  

| Scenario 23.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has only one balance |
|  Post condition     | The selected balance is not deleted and the user receives the option to create a new balance |
| Step#        | Description  |
|  1     | user asks to delete a balance |  
|  2     | system refuses to delete balance | 
|  3     | system informs the user that he/she should at least have on balance and gives the user the option to create a new balance |

| Scenario 23.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in and has only one balance |
|  Post condition     | The selected balance is not deleted and the user receives the option to create a new balance |
| Step#        | Description  |
|  1     | kid asks to delete allowance balance |  
|  2     | system refuses to delete balance | 
|  3     | system informs the kid that he/she cannot delete the default allowance balance |

### Use case 24, Allocate budget for a catgory

| Actors Involved | User (Parent or Child) |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | Provided amount of money is added to the specified category's budget |
|  Nominal Scenario     | --- |
|  Variants     | --- |
|  Exceptions     | --- |

| Scenario 23.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in |
|  Post condition     | Provided amount of money is added to the specified category's budget |
| Step#        | Description  |
|  1     | user asks to set a budget for a category |  
|  2     | system asks the user to select a category and input the amount|
|  3     | user provides all the required information |  
|  4     | system adds the provided amount to the existing budget of the selected category  |
|  5     | system returns a message indicating that the operation was successful |  

### Use case 24, Transfer budget from one category to another category

| Actors Involved | User (Parent or Child) |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | Provided amount of money is moved from the budget of one category to another |
|  Nominal Scenario     | User is logged in |
|  Variants     | --- |
|  Exceptions     | --- |

| Scenario 23.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     |  User is logged in |
|  Post condition     | Provided amount of money is moved from the budget of one category to another  |
| Step#        | Description  |
|  1     | user asks to transfer budget |  
|  2     | system asks the user to select amount, source category, and destination category|
|  3     | user provides all the required information |  
|  4     | system adds the provided amount to the destination category's budget and subtracts it from the source directory's budget  |
|  5     | system notifies the user if the budget for the source directory is now negative |
|  5     | system returns a message indicating that the operation was successful |  

### Use Case 1: Create a family account

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in  |
|  Post condition     | A family account is created and the user becomes a parent in it |
|  Nominal Scenario     | User is logged in and does not belong to a family account|
|  Variants     | ---|
|  Exceptions     | User already belonging to a family account |

| Scenario 1.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and does not belong to a family account |
|  Post condition     | A family account is created for this user |
| Step#        | Description  |
|  1     | User asks to create a family account |  
|  2     | System verifies that user does not belong to a family account|
|  3     | System create a family account|
|  4     | System adds the user as a parent of this account|


| Scenario 1.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User already belongs to a family account|
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to create a family account |  
|  2     | System verifies that the user already belongs to a family account|
|  3     | System notifies the user that he/she can't create a family account unless he/she exits the current family account he/she belongs to|

### Use Case 2: Delete a family account

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and his/her role is parent in the family account |
|  Post condition     | The family account is deleted |
|  Nominal Scenario     | User is logged in and his/her role is parent in the family account|
|  Variants     | ---|
|  Exceptions     | User role is child in the family account |

| Scenario 2.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and his/her role is parent in the family account |
|  Post condition     | The family account is deleted |
| Step#        | Description  |
|  1     | User asks to delete the family account |  
|  2     | System verifies that the user is parent in the family account|
|  3     | System renames the allowance balance in children accounts to default balance|
|  4     | System deletes the family account|


| Scenario 2.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User role is child in the family account|
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to create a family account |  
|  2     | System verifies that the user's role is child in the family account|
|  3     | System notifies the user that he/she can't delete the account|


### Use Case 3: Invite a user to family account

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and his/her role is parent in the family account |
|  Post condition     | A user is invited to the family account |
|  Nominal Scenario     | User is logged in and his/her role is parent in the family account and the email entered correspond to a registered user |
|  Variants     | ---|
|  Exceptions     | User role is child in the family account or invited user is not registered |

| Scenario 3.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and his/her role is parent in the family account |
|  Post condition     | A user is invited to the family account |
| Step#        | Description  |
|  1     | User asks to invite a user to the family account |  
|  2     | System verifies that the user is parent in the family account|
|  3     | System asks user to specify the email to user he/she wants to invite|
|  4     | System verifies that email corresponds to a registered user|
|  5    |  System ask  user to specify the role(parent/child) of the target user in the family account 
|  6    | System send invitation email to the target user|



| Scenario 3.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User role is child in the family account|
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to invite a user to the family account |  
|  2     | System verifies that the user is child in the family account|
|  3     | System notifies the user that he/she can't invite a user to the family account|


| Scenario 3.3 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User role is parent and the entered email does not correspond to a registered user|
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to invite a user to the family account |  
|  2     | System verifies that the user is parent in the family account|
|  3     | System asks user to specify the email to user he/she wants to invite|
|  4     | System verifies that email doesn't corresponds to a registered user|
|  5     | System notifies the user that the target person is not registered|


### Use Case 4: Join a family account

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and received an invitation to a family account |
|  Post condition     | User joins a family account |
|  Nominal Scenario     | User does not already belong to a family account and he/she is invited to be parent of a family account, User does not belong to a family account and he's invited to be a child in family account  |
|  Variants     | ---|
|  Exceptions     | User already belongs to a family account|

| Scenario 4.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged and does not already belong to a family account |
|  Post condition     |User joins a family account as a parent |
| Step#        | Description  |
|  1     | User receives an invititation to be a parent in a family account |  
|  2     | User accepts this invitation|
|  3     | System verifies that user does not already belong to a family account|
|  5    | System add user to the family account|

| Scenario 4.2 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged and does not already belong to a family account |
|  Post condition     |User joins a family account as a child and an allowance balance is added to his/her account  |
| Step#        | Description  |
|  1     | User receives an invititation to be a child in a family account |  
|  2     | User accepts this invitation|
|  3     | System verifies that user does not already belong to a family account|
|  5    | System adds user to the family account|
|  6    | System adds a new balance in the user account called allowance|


| Scenario 4.3 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged and belongs to a family account|
|  Post condition     |Operation ends with an error |
| Step#        | Description  |
|  1     | User receives an invititation to be a parent in a family account |  
|  2     | User accepts this invitation|
|  3     | System verifies that user already belongs to a family account|
|  5    | System notifies user that he/she can't join this family account unless he/she exits the current one|

Use Case 4: Leave a family account

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and is a member of a family account |
|  Post condition     | user is removed from family account |
|  Nominal Scenario     | User is not the only parent in the family account|
|  Variants     | ---|
|  Exceptions     |User is a child in the family account, User is the only parent in the family account|

| Scenario 4.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in as a parent in a family account and is not the only parent|
|  Post condition     | User is removed from family account |
| Step#        | Description  |
|  1     | User asks to leave the family account|  
|  2     | System verifies that user is a parent in the family account|
|  3     | System asks user to confirm the opertaion|
|  4     | User confirms his/her intent to leave the family account|
|  5     | System verifies that user is not the only parent in the family account|
|  6     | System removes user from the family account|


| Scenario 4.2 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in as the only parent in the family account|
|  Post condition     | User is removed from family account and the family account is deleted |
| Step#        | Description  |
|  1     | User asks to leave the family account|  
|  2     | System verifies that user is a parent in the family account|
|  3     | System asks user to confirm the opertaion|
|  4     | User confirms his/her intent to leave the family account|
|  5     | System verifies that user is the only parent in the family account|
|  6     | System remoces user from the family account|
|  7     | System deletes the family account|



| Scenario 4.3 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is a child in the family account|
|  Post condition     | Operation ends with an error |
| Step#        | Description  |
|  1     | User asks to leave the family account|  
|  2     | System verifies that user is a child in the family account|
|  3     | System denies the operation and notifies user that he/she can't leave the family account|


### Use Case 5: Remove a child from family account

| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and is a member of a family account |
|  Post condition     | specified user is removed from family account |
|  Nominal Scenario     | User is a parent in the family account|
|  Variants     | ---|
|  Exceptions     |User does not confirm the operation, User is a child in the family account, User is trying to remove another parent in the family account|

| Scenario 4.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in as a parent in a family account and asks to remove a child from the family account|
|  Post condition     | A specifies user is removed from family account |
| Step#        | Description  |
|  1     | User asks to remove a user from the family account|  
|  2     | System verifies that user is a parent in the family account|
|  3     | System asks user to confirm the opertaion|
|  4     | User confirms his/her intent to remove a user from family account|
|  5     | System verifies that the specifies user is a child|
|  6     | System removes the specified user from the family account|


| Scenario 4.1 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in as a parent in a family account and try to remove another parent in the family account |
|  Post condition     | specified user is not removed from the family account |
| Step#        | Description  |
|  1     | User asks to remove a user from the family account|  
|  2     | System verifies that user is a parent in the family account|
|  3     | System asks user to confirm the opertaion|
|  4     | User does not confirm this operation|
|  5     | System does not remove the specified user from the family account|


| Scenario 4.1 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in as a parent in a family account and try to remove another parent in the family account |
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to remove a user from the family account|  
|  2     | System verifies that user is a parent in the family account|
|  3     | System asks user to confirm the opertaion|
|  4     | User confirms his/her intent to remove a user from family account|
|  5     | System verifies that the specified user is a parent|
|  6     | System denies the operation and notifies user that he/she cannot remove another parent in the family account|


| Scenario 4.1 | Exception |
| ------------- |:-------------:| 
|  Precondition     | User is logged in as a child in the family account |
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | User asks to remove a user from the family account|  
|  2     | System verifies that user is a child in the family account|
|  3     | System denies the operation and notifies user that he/she can't make this operation|

### Use Case 4: VIEW CHILD'S DASHBOARD

| Actors Involved        | Parent |
| ------------- |:-------------:| 
|  Precondition     | Parent is logged in |
|  Post condition     | Sytem displays child's dashboard|
|  Nominal Scenario     | User is logged in and ask to see a child's dashboard in his family account|
|  Variants     | ---|
|  Exceptions     |Parent is logged in and ask to see another parent's dashboard in his family account|

| Scenario 4.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | Parent is logged in and ask to see a child's dashboard in his family account|
|  Post condition     | System shows child's dashboard |
| Step#        | Description  |
|  1     | Parent asks to see another family member's dashboard|  
|  2     | System verifies that user is a parent in the family account|
|  3     | System verifies that the specified user is a child in the family account|
|  4     | System displayes child's dashboard|

| Scenario 4.1 | Exception |
| ------------- |:-------------:| 
|  Precondition     | Parent is logged in and ask to see a parent's dashboard in his family account|
|  Post condition     | Operation ends with an error message |
| Step#        | Description  |
|  1     | Parent asks to see another family member's dashboard|  
|  2     | System verifies that user is a parent in the family account|
|  3     | System verifies that the specified user is a parent in the family account|
|  4     | System denies the operation and notifies the parent that he/she can't view another parent's dashboard |

### Use case 1, VIEW THE AMOUNT OF SELECTED BALANCES OVER TIME
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The available amount in each selected balances is shown over time |
|  Nominal Scenario     | user selects some of the balances |
|  Variants     |  user selects all balances |
|  Exceptions     | --- |


| Scenario 1.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The available amount in each selected balances is shown over time |
| Step#        | Description  |
|  1     | The user asks for viewing the amount of all balances |  
|  2     | System looks up all balances |
|  3     | System asks the user to select which balances to display |
|  4     | User selects some of the balances |
|  5     | The user asks for viewing the amount of the selected balances over time |  
|  6     | System shows required information |

| Scenario 1.2 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The available amount in each selected balances is shown over time |
| Step#        | Description  |
|  1     | The user asks for viewing the amount of all balances |  
|  2     | System looks up all balances |
|  3     | System asks the user to select which balances to display |
|  4     | User selects all of the balances |
|  5     | The user asks for viewing the amount of all balances over time |  
|  6     | System shows required information |

### Use case 3, VIEW EXPENSES OVER TIME
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The expenses are shown |
|  Nominal Scenario     | There are stored expenses |
|  Variants     |  There are no stored expenses |
|  Exceptions     | --- |


| Scenario 3.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The expenses are shown  |
| Step#        | Description  |
|  1     | The user asks for viewing the expenses  |  
|  2     | System looks up the expenses |
|  3     | System shows required information |

| Scenario 3.2 | Variant |
| ------------- |:-------------:| 
|  Precondition     | There are no stored expenses |
|  Post condition     | User receives an empty graph |
| Step#        | Description  |
|  1     | The user asks for viewing the expenses  |  
|  2     | System looks up the expenses |
|  3     | System does not find any expenses |
|  4     | System returns an empty graph |

### Use case 4, VIEW EXPENSES PER CATEGORY OVER TIME
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The expenses per category are shown |
|  Nominal Scenario     | There are stored expenses per category |
|  Variants     |  There are no stored expenses |
|  Exceptions     | --- |


| Scenario 4.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and the user has at least one expense |
|  Post condition     | The expenses per category are shown  |
| Step#        | Description  |
|  1     | The user asks for viewing the expenses per category  |  
|  2     | System looks up the expenses per category |
|  3     | System shows required information |


| Scenario 4.2 | Variant |
| ------------- |:-------------:| 
|  Precondition     | User is logged in and there are no stored expenses  |
|  Post condition     | User receives an empty graph |
| Step#        | Description  |
|  1     | The user asks for viewing the expenses per category  |  
|  2     | System looks up the expenses |
|  3     | System does not find any expenses |
|  4     | System returns an empty graph |

### Use case 5, VIEW INCOME OVER TIME
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The income is shown |
|  Nominal Scenario     | There is at least one stored income |
|  Variants     |  There is no stored income |
|  Exceptions     | --- |


| Scenario 5.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The income is shown  |
| Step#        | Description  |
|  1     | The user asks for viewing the income  |  
|  2     | System looks up the income |
|  3     | System shows required information |


| Scenario 5.2 | Variant |
| ------------- |:-------------:| 
|  Precondition     | There is no a stored income |
|  Post condition     | User receives an empty graph |
| Step#        | Description  |
|  1     | The user asks for viewing the income  |  
|  2     | System looks up the income |
|  3     | System does not find any income |
|  4     | System returns an empty graph |

### Use case 6, VIEW PERCENTAGE OF SPENDINGS BY CATEGORY IN A SPECIFIC TIME RANGE
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The percentage of spendings by category in a specific time range is shown as a pie chart |
|  Nominal Scenario     | There are stored spendings |
|  Variants     |  --- |
|  Exceptions     | There are no stored spendings |


| Scenario 6.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The percentage of spendings by category in a specific time range is shown  |
| Step#        | Description  |
|  1     | The user asks for viewing the percentage of spendings by category in a specific time range |  
|  2     | System looks up the spendings by category |
|  3     | System shows spendings by category |
|  4     | System asks for selecting a time range |  
|  5     | The user selects a time range |  
|  6     | System computes the percentages |
|  7     | System shows the required pie chart |


| Scenario 6.2 | Variant |
| ------------- |:-------------:| 
|  Precondition     | There are no stored spendings |
|  Post condition     | User receives a percentage equal to zero |
| Step#        | Description  |
|  1     | The user asks for viewing the percentage of spendings by category  |  
|  2     | System looks up the spendings by category |
|  3     | System does not find any spending |
|  4     | System shows a message asking the user to add spendings to display this chart  |

### Use case 7, VIEW OVERALL EXPENSES
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The overall expenses are shown |
|  Nominal Scenario     | There are stored expenses |
|  Variants     | --- |
|  Exceptions     | --- |


| Scenario 7.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The overall expenses are shown  |
| Step#        | Description  |
|  1     | The user asks for viewing the dashboard  |  
|  2     | System looks up the overall expenses |
|  3     | System sums up all expenses from all balances over the last month |
|  3     | System shows required information |


### Use case 8, VIEW OVERALL INCOME
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The overall income is shown |
|  Nominal Scenario     | There is a stored income |
|  Variants     |  --- |
|  Exceptions     | --- |


| Scenario 8.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The overall income are shown  |
| Step#        | Description  |
|  1     | The user asks for viewing the dashboard  |  
|  2     | System looks up the overall income over the last month |
|  3     | System shows required information |


### Use case 9, VIEW AVAILABLE BUDGET FOR EACH CATEGORY
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The available budget for each category is shown |
|  Nominal Scenario     | User is logged in  |
|  Variants     |  --- |
|  Exceptions     | --- |


| Scenario 9.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The available budget for each category is shown  |
| Step#        | Description  |
|  1     | The user asks for viewing the dashboard  |  
|  2     | System looks up the available budget for each category |
|  3     | System shows required information |

### Use case 10, VIEW PERCENTAGE OF AMOUNT SPENT FROM THE AVAILABLE BUDGET FOR EACH CATEGORY
| Actors Involved        | User |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The percentage of amount spent from the available budget for each category is shown |
|  Nominal Scenario     | --- |
|  Variants     |  --- |
|  Exceptions     | --- |


| Scenario 10.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | User is logged in |
|  Post condition     | The percentage of amount spent from the available budget for each category is shown  |
| Step#        | Description  |
|  1     | The user asks for viewing the dashboard  |  
|  2     | System looks up the percentage of amount spent from the available budget for each category over the last month|
|  3     | System shows required information |


### Use case 11, VIEW LIST OF USERS
| Actors Involved        | Admin |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | List of users is shown |
|  Nominal Scenario     | Admin is logged in  |
|  Variants     | --- |
|  Exceptions     | --- |


| Scenario 11.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | List of users is shown |
| Step#        | Description  |
|  1     | The admin asks for viewing the list of users |  
|  2     | System shows required information |

### Use case 12, VIEW A USER'S ACCOUNT
| Actors Involved        | Admin |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | User's account is shown |
|  Nominal Scenario     | Admin is logged in  |
|  Variants     | --- |
|  Exceptions     | --- |


| Scenario 12.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | User's account is shown |
| Step#        | Description  |
|  1     | The admin asks for viewing the list of users |  
|  2     | System shows required information |
|  3     | The admin asks for viewing a specific user's account |  
|  4     | System shows required information |

### Use case 13, UPDATE USER
| Actors Involved        | Admin |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | User's account is updated |
|  Nominal Scenario     | Admin update's user information |
|  Variants     | Admin does not update user's information |
|  Exceptions     | --- |


| Scenario 13.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | User's account is updated |
| Step#        | Description  |
|  1     | The admin asks for viewing the list of users |  
|  2     | System shows required information |
|  3     | The admin selects a specific user's account |  
|  4     | System shows required information |
|  5     | The admin asks for updating some user details |  
|  6     | system shows the selected user's details and asks the admin to update the desired information | 
|  7     | The admin submits |  
|  8     | System updates the user's details |

| Scenario 13.1 | Variants |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | User's account stays the same |
| Step#        | Description  |
|  1     | The admin asks for viewing the list of users |  
|  2     | System shows required information |
|  3     | The admin selects a specific user's account |  
|  4     | System shows required information |
|  5     | The admin asks for updating some user details |  
|  6     | system shows the selected user's details and asks the admin to update the desired information | 
|  7     | The admin does not modify the user's details and submits |  
|  8     | System does not update user's details |

### Use case 14, DELETE USER

| Actors Involved        | Admin |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | User account is deleted |
|  Nominal Scenario     | Admin is logged in |
|  Variants     | --- |
|  Exceptions     | --- |


| Scenario 14.1 | Nominal |
| ------------- |:-------------:| 
|  Precondition     | Admin is logged in |
|  Post condition     | User account is deleted |
| Step#        | Description  |
|  1     | The admin asks for reading users' accounts |  
|  2     | System shows users' accounts |
|  3     | The admin asks for deleting an user's account |  
|  4     | systems asks the admin to confirm his/her intent of deleting user's account |
|  4     | The admin confirms |  
|  5     | System deletes the user's account |

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




