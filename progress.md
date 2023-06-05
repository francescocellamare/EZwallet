| Function  | author (unit/integration)| Implementation | unit test | integration test | notes |
| -----------| --- | -------------------------------|---- |---- |--- |
| register | I/I | ✓ | ✓|✓|
| registerAdmin | I/I | ✓ | ✓|✓|
| login | I/I |✓ | ✓|✓|
| logout | I/I |✓ | ✓|✓|
| createCategory | V/V |✓ | ✓| ✓ | | 
| updateCategory | V/V|✓ |✓ | ✓|  |
| deleteCategory | V/V|✓ | ✓|✓ | |
| getCategories | V/V|✓ | ✓|✓ |  |
| createTransaction | V/V|✓ | ✓ |✓ | |
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
| addToGroup | I/F | ✓ | ✓| ✓| |
| removeFromGroup | I/V | ✓ | |  | add route for users |
| deleteUser | I/I  | ✓ |✓|✓|one test still giving network error|
| deleteGroup  | I/I | ✓ | ✓ |✓||
| handleDateFilterParams | F/F| ✓ |✓ ||
| verifyAuth| F/F |✓ |✓ |✓ |
| handleAmountFilterParams| F/F |✓ |✓ ||
| verifyAuthAdmin| F/F |✓ |✓ |✓|
| verifyAuthUser| F/F |✓ |✓ |✓|
| verifyAuthGroup | F/F|✓ |✓ |✓|