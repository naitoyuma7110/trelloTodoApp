import React, { useState } from "react";
import {
	DndContext,
	closestCorners,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Todo, Status } from "../components/Todo/todoItem";
import SampleColmun from "../components/DndSample/sampleColumn";
import { RiCreativeCommonsSaLine } from "react-icons/ri";

export type Item = {
	id: string;
	title: string;
	content: string;
	status: string;
};

const Sample = () => {
	const [items, setItems] = useState<Item[]>([
		{
			id: "1",
			title: "タイトル",
			content: "TODO内容はここに記載します。",
			status: "1",
		},
		{
			id: "2",
			title: "タイトル2",
			content: "TODO内容の2番目",
			status: "Progress",
		},
		{
			id: "3",
			title: "タイトル3",
			content: "TODO内容の3番目",
			status: "Incomplete",
		},
		{
			id: "4",
			title: "タイトル4",
			content: "TODO内容の4番目",
			status: "Incomplete",
		},
		{
			id: "5",
			title: "5番目のTODO",
			content: "TODO内容の5番目",
			status: "Done",
		},
	]);

	const [statuses, setStatuses] = useState<Status[]>([
		"Incomplete",
		"Progress",
		"Done",
	]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const findColumn = (id: string | null) => {
		// この関数を使用するhandlerで取得したidが、カラムのidとドラッグアイテムのidである場合の両方を想定する
		if (!id) {
			return null;
		}
		// colmuのidが返ってきた場合はそのまま返す
		if (id === ("Incomplete" || "Progress" || "Done")) {
			return id;
		}
		// itemのidが渡された場合、itemもつカラムのidを返したい
		return items.find((item) => item.id === id)?.status;
	};

	const dragOverHandler = (event: DragOverEvent) => {
		const { over, active } = event;

		if (!over) {
			return;
		}

		// String型に変換しないと型が一致しない
		const activeId = String(active.id);
		const overId = String(over.id);
		const activeColumn = findColumn(activeId);
		const overColumn = findColumn(overId);

		if (active.id !== over.id) {
			const oldIndex = items.findIndex((v) => v.id === active.id);
			const newIndex = items.findIndex((v) => v.id === over.id);

			const updatedTodos = items.map((item) => {
				console.log(item.id);
				console.log(item.id === String(active.id));
				return item.id === String(active.id)
					? { ...item, status: overColumn || overId }
					: item;
			});

			setItems(arrayMove(updatedTodos, oldIndex, newIndex));
		}
	};

	return (
		<div className="grid grid-cols-3">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragOver={dragOverHandler}>
				{statuses.map((status: Status) => {
					const filteredTodo = items.filter((item) => {
						return item.status === status;
					});
					return (
						<SampleColmun key={status} todos={filteredTodo} status={status} />
					);
				})}
			</DndContext>
		</div>
	);
};

export default Sample;
