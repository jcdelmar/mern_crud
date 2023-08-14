# mern_crud

> DEPLOYED DATABASE IN https://www.freesqldatabase.com/

> DEPLOYED API WEB SERVICE IN https://dashboard.render.com/

# How to run (with remote mysql db)

1. **npm install** in main folder
2. **npm install** in server folder
3. **npm run start** in server folder
4. **npm install** in client folder
5. **npm run dev** in client folder

# How to run (with local mysql db)

## Create new mysql database in mysql server for application

> Mysql database server can be ran with xampp application  
> Installation: https://www.apachefriends.org/  
> Guide: https://hevodata.com/learn/xampp-mysql/

1. **npm install** in main folder
2. **npm install** in server folder
3. **npm install** in client folder
4. Update database information in /api/.env with newly created database with the following format

> DEV_PORT=""

> HOST=""

> USER=""

> PASSWORD= ""

> DB=""

5.Update URL information in /client/.env using the following variables.

> VITE_STATUS="TESTING"

> VITE_PORT=5000

> VITE_GET_TODOS_LOCAL="http://localhost:5000/todos/"

> VITE_ADD_TODO_LOCAL="http://localhost:5000/todos/"

> VITE_HANDLE_DONE_LOCAL="http://localhost:5000/todos/handleDone"

> VITE_HANDLE_REMOVE_LOCAL="http://localhost:5000/todos/delete/"

> VITE_HANDLE_RESET_LOCAL="http://localhost:5000/todos/resetList/"

> VITE_HANDLE_EDIT_LOCAL="http://localhost:5000/todos/update/"

5. **npm run start** in server folder
