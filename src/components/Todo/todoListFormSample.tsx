import React, { useState } from "react";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import TodoItem, { Todo } from "./todoItem";
import TodoForm from "./todoForm";

const TodoListFormSample = (): JSX.Element => {
  const [todoItemList, setTodoList] = useState<Todo[]>([
    {
      id: "1",
      title: "タイトル",
      content: "TODO内容はここに記載します。",
      status: "Done",
    },
    {
      id: "2",
      title: "タイトル2",
      content: "TODO内容の二番目",
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
      title: "4番目",
      content: "差し込みIncomplete",
      status: "Incomplete",
    },
    {
      id: "5",
      title: "5番目のTODO",
      content: "TODO内容の4番目はDONE",
      status: "Done",
    },
  ]);

  const [statuses, setStatuses] = useState([
    "All",
    "Incomplete",
    "Progress",
    "Done",
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log(over ? `over.id is ${over.id}` : "そこには何もありません");
    console.log("active id is " + active.id);

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = todoItemList.findIndex((v) => v.id === active.id);
      const newIndex = todoItemList.findIndex((v) => v.id === over.id);
      setTodoList(arrayMove(todoItemList, oldIndex, newIndex));
    }
  };

  const addTodoOnClick = (todo: Todo) => {
    const newTodoList = [...todoItemList];

    todo.id = (newTodoList.length + 1).toString();
    newTodoList.push(todo);
    setTodoList(newTodoList);
    console.log("追加");
  };

  return (
    <>
      <div className={`grid grid-cols-${statuses.length} grid-cols-4`}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {statuses.map((status, i) => {
            const filteredTodoList = todoItemList.filter(
              (item) => status === "All" || item.status === status,
            );

            return (
              <div key={i} className="mx-2 px-4 py-2 rounded-lg bg-gray-200">
                <span className="inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white">
                  {status}
                </span>

                {status !== "All" ? (
                  <>
                    {filteredTodoList.map((todo, j) => (
                      <SortableContext
                        key={todo.id}
                        items={todoItemList}
                        strategy={rectSortingStrategy}
                      >
                        <TodoItem todo={todo} isSortable />
                      </SortableContext>
                    ))}
                  </>
                ) : (
                  filteredTodoList.map((todo, j) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))
                )}
                {status === "All" && (
                  <TodoForm addTodoOnclick={addTodoOnClick} />
                )}
              </div>
            );
          })}
        </DndContext>
      </div>
    </>
  );
};

export default TodoListFormSample;
