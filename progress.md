| Function  | author (unit/integration)| Implementation | unit test | integration test | notes |
| -----------| --- | -------------------------------|---- |---- |--- |
| register | I/I | ✓ | ✓|✓|
| registerAdmin | I/I | ✓ | ✓|
| login | I/I |✓ | ✓|
| logout | I/I |✓ | ✓|
| createCategory | V/V |✓ | | | fix to auth mocks | 
| updateCategory | V/V|✓ | | | fix to auth mocks |
| deleteCategory | V/V|✓ | | | fix to auth mocks |
| getCategories | V/V|✓ | |
| createTransaction | V/V|✓ | |
| getAllTransactions | F/F|✓ | | | need to add auth mocks | 
| getTransactionsByUser | K/K|✓ | |  | one of the tests is failing |
| getTransactionsByUserByCategory | K/K|✓ | ✓ | |
| getTransactionsByGroup | K/K|✓ | ✓ | |
| getTransactionsByGroupByCategory | K/K|✓ | | |
| deleteTransactions | K/K|✓ | ✓ | | 
| deleteTransaction | K/K|✓ | ✓ | |
| getUsers | I/I |✓ | ✓ | |
| getUser | I/I |✓ | ✓ | |
| createGroup | I/K |✓ |  | |
| getGroups | I/I |✓ | ✓ | |
| getGroup | I/I |✓ | ✓ | |
| addToGroup | I/F | ✓ | | | Some parts that depend on authentication are missing|
| removeFromGroup | I/V | ✓ | | |  Some parts that depend on authentication are missing|
| deleteUser | I/I  | ✓ ||||
| deleteGroup  | I/I | ✓ | ✓ |||
| handleDateFilterParams | F/F| ✓ |✓ ||
| verifyAuth| F/F |✓ |✓ ||
| handleAmountFilterParams| F/F |✓ |✓ ||
| verifyAuthAdmin| F/F |✓ |✓ ||
| verifyAuthUser| F/F |✓ |✓ ||
| verifyAuthGroup | F/F|✓ |✓ ||