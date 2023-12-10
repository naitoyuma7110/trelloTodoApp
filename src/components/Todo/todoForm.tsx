import React, { useState } from "react";
import { Todo } from "./todoItem";

type TodoFormProps = {
  addTodoOnclick: (todo: Todo) => void;
};

const TodoForm = (props: TodoFormProps): JSX.Element => {
  const [formTodo, setFormTodo] = useState<Todo>({
    id: "0",
    title: "Hello",
    content: "World",
    status: "Incomplete",
  });

  const handlerAddTodoOnclick = () => {
    props.addTodoOnclick(formTodo);
    setFormTodo({
      id: "0",
      title: "",
      content: "",
      status: "Incomplete",
    });
  };

  const handlerTodoTitleFormOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTodo = { ...formTodo };
    newTodo.title = event.target.value;
    setFormTodo(newTodo);
  };

  const handlerTodoContentFormOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTodo = { ...formTodo };
    newTodo.content = event.target.value;
    setFormTodo(newTodo);
  };

  return (
    <div className="w-100 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="m-2">
          <label className="text-gray-400">タイトル</label>
          <input
            type="text"
            value={formTodo.title}
            onChange={handlerTodoTitleFormOnChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="m-2">
          <label className="text-gray-400">内容</label>
          <input
            type="text"
            value={formTodo.content}
            onChange={handlerTodoContentFormOnChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="m-2">
          <button
            onClick={handlerAddTodoOnclick}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            TODO追加
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
