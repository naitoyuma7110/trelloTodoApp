import TodoItem from "../components/Todo/TodoItem";
import TodoForm from "@/components/Todo/TodoForm";

export default function Home() {
	return (
		<>
			<div className="w-100 flex justify-center">
				<div className="my-5">
					<h1 className="text-xl font-bold text-green-400">Hello World</h1>
					<TodoItem />
					<TodoItem />
					<TodoItem />
					<TodoForm />
				</div>
			</div>
		</>
	);
}
