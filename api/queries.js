export const getAllTodos =
  "SELECT * FROM todos WHERE is_deleted = 0 ORDER BY is_done ASC";

export const getTodo =
  "SELECT * FROM todos WHERE todo_id = ? AND is_deleted = 0";

// export const addTodo =
// "INSERT INTO todos (`todo_title`, `todo_description`, `todo_time`, `is_deleted`) VALUES (?, ?, ?, 0)";

export const addTodo =
  "INSERT INTO todos (`todo_title`,`is_done`, `is_deleted`) VALUES (?,0,0)";

export const updateTodo =
  "UPDATE todos SET todo_title = ?, todo_description = ?, todo_time = ? WHERE todo_id = ? AND is_deleted = 0";

export const deleteTodo = "UPDATE todos SET is_deleted = 1 WHERE todo_id = ?";

export const updateIsDone = "UPDATE todos SET is_done = ? WHERE todo_id = ?";

export const resetList = "UPDATE todos SET is_done = 1 WHERE is_done = 0";
