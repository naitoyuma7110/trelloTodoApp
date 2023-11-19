import React, { useState } from "react";

import TodoItem, { Todo } from "./todoItem";
import TodoForm from "./todoForm";

const TodoListForm = (): JSX.Element => {
	const [todoItemList, setTodoList] = useState<Todo[]>([
		{
			title: "タイトル",
			content: "TODO内容はここに記載します。",
			status: "Done",
		},
		{
			title: "タイトル2",
			content: "TODO内容の二番目",
			status: "Progress",
		},
		{
			title: "タイトル3",
			content: "TODO内容の3番目",
			status: "Incomplete",
		},
	]);
	const addTodoOnClick = (todo: Todo) => {
		// const newTodoList = todoItemList.slice();
		const newTodoList = [...todoItemList];

		newTodoList.push(todo);
		setTodoList(newTodoList);
		console.log("追加");
	};

	return (
		<>
			{todoItemList.map((todo, i) => {
				return <TodoItem key={i} {...todo} />;
			})}
			<TodoForm addTodoOnclick={addTodoOnClick} />
		</>
	);
};

export default TodoListForm;
