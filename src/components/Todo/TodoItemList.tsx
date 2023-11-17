import TodoItem, { Todo } from "./todoItem";

export type TodoItemListProps = {
	data: Array<Todo>;
};

const TodoItemList = (props: TodoItemListProps) => {
	return props.data.map((todoItem, i) => {
		return <TodoItem key={i} {...todoItem} />;
	});
};

export default TodoItemList;
