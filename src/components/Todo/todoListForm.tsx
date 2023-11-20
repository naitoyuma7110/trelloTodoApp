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
		{
			title: "5番目のTODO",
			content: "TODO内容の5番目はProgress",
			status: "Progress",
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
			<div className="flex">
				<div className="mx-2 px-4 py-2 rounded-lg bg-gray-200">
					<span className="inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white">
						All
					</span>
					{todoItemList.map((todo, i) => {
						return <TodoItem key={i} {...todo} />;
					})}
					<TodoForm addTodoOnclick={addTodoOnClick} />
				</div>
				{["Done", "Progress", "Incomplete"].map((status, i) => {
					const filteredTodoList = todoItemList.filter(
						(item) => (item.status as Status) === status
					);

					return (
						<div key={i} className="mx-2 px-4 py-2 rounded-lg bg-gray-200">
							<span
								key={i}
								className="inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white">
								{status}
							</span>
							{filteredTodoList.map((todo, j) => (
								<TodoItem key={j} {...todo} />
							))}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default TodoListForm;
