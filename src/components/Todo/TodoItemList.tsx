import TodoItem, { TodoItemProps } from "./todoItem";

type TodoItemListProps = {
	data: Array<TodoItemProps>;
};

const TodoItemList = (props: TodoItemListProps) => {
	return props.data.map((todoItem: TodoItemProps, i) => {
		return <TodoItem key={i} {...todoItem} />;
	});
};

export default TodoItemList;
