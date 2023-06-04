| Function  | author (unit/integration)| Implementation | unit test | integration test | notes |
| -----------| --- | -------------------------------|---- |---- |--- |
| register | I/I | ✓ | ✓|✓|
| registerAdmin | I/I | ✓ | ✓|
| login | I/I |✓ | ✓|
| logout | I/I |✓ | ✓|
| createCategory | V/V |✓ | ✓| | last integration test is failing | 
| updateCategory | V/V|✓ |✓ | ✓|  |
| deleteCategory | V/V|✓ | ✓| | second and sixth integration tests are failing |
| getCategories | V/V|✓ | ✓| | last integration test is failing |
| createTransaction | V/V|✓ | | | first unit test is failing and problems with integration|
| getAllTransactions | F/F|✓ |✓  | ✓ | |
| getTransactionsByUser | K/K|✓ | ✓ | ✓ | |
| getTransactionsByUserByCategory | K/K|✓ | ✓ | ✓ |
| getTransactionsByGroup | K/K|✓ | ✓ |  |
| getTransactionsByGroupByCategory | K/K|✓ | | |
| deleteTransactions | K/K|✓ | ✓ | | 
| deleteTransaction | K/K|✓ | ✓ | |
| getUsers | I/I |✓ | ✓ | |
| getUser | I/I |✓ | ✓ | |
| createGroup | I/K |✓ |  | |
| getGroups | I/I |✓ | ✓ | |
| getGroup | I/I |✓ | ✓ | |
| addToGroup | I/F | ✓ | | | |
| removeFromGroup | I/V | ✓ | | ✓ |  |
| deleteUser | I/I  | ✓ ||||
| deleteGroup  | I/I | ✓ | ✓ |||
| handleDateFilterParams | F/F| ✓ |✓ ||
| verifyAuth| F/F |✓ |✓ |✓ |
| handleAmountFilterParams| F/F |✓ |✓ ||
| verifyAuthAdmin| F/F |✓ |✓ ||
| verifyAuthUser| F/F |✓ |✓ ||
| verifyAuthGroup | F/F|✓ |✓ ||