import "./index.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaPlusSquare, FaRedoAlt, FaCheck } from "react-icons/fa";

function App() {
  //list of todo items
  const [todos, setTodos] = useState([]);
  //check for table data changes
  const [refresh, setRefresh] = useState(true);
  //referencing todo input field
  const value = useRef(null);
  //check if input is empty
  const [emptyCheck, setEmptyCheck] = useState(false);

  //custom buttons for swal

  const swalWithCustomButton = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-green-500 hover:bg-green-800 text-white font-semibold hover:text-white py-2 px-4 border border-green-600 hover:border-transparent rounded",
    },
    buttonsStyling: false,
  });

  //get initial set of todos from database
  const getTodosURL = "http://localhost:5000/todos/";
  useEffect(() => {
    if (refresh) {
      axios
        .get(getTodosURL)
        .then((res) => {
          setTodos(res.data);
        })
        .catch((err) => {
          console.log("Get todos error.");
        });
    }
    setRefresh(false);
  }, [refresh]);

  //handle add todo
  const handleAdd = () => {
    //getting value of todo input field
    const todo = value.current.value;
    //clear input field
    value.current.value = "";
    if (todo == "") {
      setEmptyCheck(true);
    } else {
      const addTodoURL = "http://localhost:5000/todos/";
      axios
        .post(addTodoURL, { todo_title: todo })
        .then((res) => {
          Swal.fire("Success", "To-Do has been added.", "success");
          setRefresh(true);
        })
        .catch((err) => {
          console.log("Error adding todo.");
        });
    }
  };

  //handle done/undo button
  const handleDone = (id, type) => {
    const data = { todo_id: id, type: type };
    const handleDoneURL = "http://localhost:5000/todos/handleDone";

    axios
      .put(handleDoneURL, data)
      .then((res) => {
        setRefresh(true);
        if (type == "done")
          swalWithCustomButton.fire("Task has been completed.", "", "success");
      })
      .catch((err) => {
        console.log("Handle Done Error.");
      });
  };

  //handle remove todo
  const handleRemove = (id) => {
    const handleRemoveURL = "http://localhost:5000/todos/delete/" + id;

    Swal.fire({
      title: "Delete To-Do?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(handleRemoveURL, [])
          .then((res) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setRefresh(true);
          })
          .catch((err) => {
            console.log("Remove To-do Error.");
          });
      }
    });
  };

  return (
    <div>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <div className="flex justify-between">
              <h1 className="text-gray-700">To-Do List</h1>
              <button className="rounded-full background">Mode</button>
            </div>

            <div className="flex mt-4">
              <input
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker " +
                  (emptyCheck ? "border-red-500" : "")
                }
                placeholder="Add To-Do"
                ref={value}
              />
              <button
                alt="Add To-Do Item"
                title="Add To-Do Item"
                className="bg-green-500 hover:bg-green-800 text-white font-semibold hover:text-white py-2 px-4 border border-green-600 hover:border-transparent rounded"
                onClick={handleAdd}
              >
                <FaPlusSquare />
              </button>
              <button
                alt="Reset To-Do List"
                title="Reset To-Do List"
                className="bg-red-500 ml-1 hover:bg-red-800 text-white font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded"
              >
                <FaRedoAlt />
              </button>
            </div>
          </div>
          <div>
            {todos.map((row, index) => {
              return (
                <div className="flex mb-4 items-center" key={row.todo_id}>
                  <p
                    className={
                      "w-full  " +
                      (row.is_done
                        ? "line-through text-yellow-800"
                        : "text-gray-900")
                    }
                  >
                    {row.todo_title}
                  </p>
                  {row.is_done ? (
                    <button
                      onClick={(e) => {
                        handleDone(e.target.id, "undo");
                      }}
                      id={row.todo_id}
                      className="bg-transparent m-1 hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
                    >
                      Undo
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        handleDone(e.target.id, "done");
                      }}
                      id={row.todo_id}
                      className="bg-transparent m-1 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-3 px-4 border border-green-500 hover:border-transparent rounded"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      handleRemove(e.target.id);
                    }}
                    id={row.todo_id}
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-3 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
