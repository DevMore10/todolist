import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  let savedList = [];

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      setTodos(todos);
    }
  }, []);

  const localSave = () => {
    localStorage.setItem("todos", JSON.stringify(savedList));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.filter((item) => item.id == id);
    console.log(t);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    console.log(id);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    localSave();
  };

  const handleAdd = () => {
    savedList = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(savedList);
    console.log(savedList);
    setTodo("");
    localSave();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    localSave();
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2 ">
        <div className="addtodo my-2 flex flex-col">
          <h1 className="text-2xl text-violet-950 font-bold mx-1 my-1"> Add To-do</h1>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="p-1 font-bold rounded-3xl px-4"
          />
          <button
            disabled={todo.length == 0}
            onClick={handleAdd}
            className="bg-violet-950 hover:bg-violet-900 text-white my-2 font-bold text-sm p-1 px-3 cursor-pointer rounded-3xl"
          >
            Save
          </button>
        </div>

        <div className="">
          <input type="checkbox" checked={showFinished} onChange={toggleFinished} name="" id="" />
          <span> Show Finished Tasks</span>
        </div>
        <div className="h-[1px] bg-black opacity-15 mx-auto my-1"></div>

        <div className="todos">
          <h1 className="text-2xl text-violet-950 font-bold mx-2 my-2">Your To-dos</h1>
          {todos.length === 0 && <div className="mx-4 my-2">Add some Tasks</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex my-2 justify-between items-center border-b-2 border-violet-900 py-2 border-opacity-25"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className="font-bold">
                      <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                    </div>
                  </div>
                  <div className="buttons flex h-full mx-2 ">
                    <button
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      className="edit bg-violet-950 hover:bg-violet-900 text-white mx-1 font-bold text-sm p-1 px-3 rounded-md"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="delete bg-violet-950 hover:bg-violet-900 text-white mx-1 font-bold text-sm p-1 px-3 rounded-md"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
