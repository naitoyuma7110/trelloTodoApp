import React, { FC, useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../components/DndSample/SortableItem";
import { Item } from "../components/DndSample/types";

const style = {
	padding: "1rem",
};

const App: FC = () => {
	const [items, setItems] = useState<Array<Item>>([
		{ id: 1, name: "dnd-kit example 1" },
		{ id: 2, name: "dnd-kit example 2" },
		{ id: 3, name: "dnd-kit example 3" },
		{ id: 4, name: "dnd-kit example 4" },
		{ id: 5, name: "dnd-kit example 5" },
		{ id: 6, name: "dnd-kit example 6" },
		{ id: 7, name: "dnd-kit example 7" },
		{ id: 8, name: "dnd-kit example 8" },
	]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			return;
		}

		if (active.id !== over.id) {
			const oldIndex = items.findIndex((v) => v.id === active.id);
			const newIndex = items.findIndex((v) => v.id === over.id);
			setItems(arrayMove(items, oldIndex, newIndex));
		}
	};

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}>
				<SortableContext items={items} strategy={verticalListSortingStrategy}>
					<ul style={style}>
						{items.map((item) => (
							<SortableItem key={item.id} item={item} />
						))}
					</ul>
					<p>HELLO</p>
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default App;
