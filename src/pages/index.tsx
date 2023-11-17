import TodoForm from "@/components/Todo/todoForm";
import TodoItemList from "@/components/Todo/TodoItemList";
import { Todo } from "@/components/Todo/todoItem";

// const todoItem = {
// 	title: "タイトル",
// 	content: "TODO内容はここに記載します。",
// };

const todoItemList: Todo[] = [
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
];

export default function Home() {
	return (
		<>
			<div className="w-100 flex justify-center">
				<div className="my-5">
					<h1 className="text-xl font-bold text-green-400">Hello World</h1>
					<TodoItemList data={todoItemList} />
					<TodoForm />
				</div>
			</div>
		</>
	);
}
