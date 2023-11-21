import React, { useState } from "react";
import styles from "./todo.module.css";
import TodoItem, { Todo } from "./todoItem";
import TodoForm from "./todoForm";
import { Status } from "./todoItem";

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
		{
			title: "Incompleteを挟んで",
			content: "差し込みIncomplete",
			status: "Incomplete",
		},
		{
			title: "4番目のTODO",
			content: "TODO内容の4番目はDONE",
			status: "Done",
		},
	]);

	const statuses = ["All", "Incomplete", "Progress", "Done"];

	const addTodoOnClick = (todo: Todo) => {
		// const newTodoList = todoItemList.slice();
		const newTodoList = [...todoItemList];

		newTodoList.push(todo);
		setTodoList(newTodoList);
		console.log("追加");
	};

	return (
		<>
			<div className={`grid grid-cols-${statuses.length}`}>
				{statuses.map((status, i) => {
					const filteredTodoList = todoItemList.filter(
						(item) => status === "All" || item.status === status
					);

					return (
						<div key={i} className="mx-2 px-4 py-2 rounded-lg bg-gray-200">
							<span className="inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white">
								{status}
							</span>
							{filteredTodoList.map((todo, j) => (
								<div key={j}>
									<TodoItem {...todo} />
								</div>
							))}
							{status === "All" && <TodoForm addTodoOnclick={addTodoOnClick} />}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default TodoListForm;
