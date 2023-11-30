import TodoForm from "@/components/Todo/todoForm";
import { Todo } from "@/components/Todo/todoItem";
import TodoListForm from "../components/Todo/todoListForm";

export default function Home() {
	return (
		<>
			<div className="w-100 flex justify-center">
				<div className="my-5">
					<TodoListForm />
				</div>
			</div>
		</>
	);
}
