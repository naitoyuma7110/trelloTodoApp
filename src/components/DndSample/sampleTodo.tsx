import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Item } from "../../pages/sample";

type SampleProps = {
	todo: Item;
};
const SampleTodo = (props: SampleProps) => {
	const { attributes, listeners, setNodeRef, transform } = useSortable({
		id: props.todo.id,
	});

	const style = {
		margin: "10px",
		opacity: 1,
		color: "#333",
		background: "white",
		padding: "10px",
		transform: CSS.Transform.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			className="border border-blue-100">
			<div>{props.todo.title}</div>
			<div> {props.todo.content}</div>
		</div>
	);
};

export default SampleTodo;
