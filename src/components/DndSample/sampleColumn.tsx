import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SampleTodo from "./sampleTodo";
import { Todo, Status } from "../Todo/todoItem";
import { Item } from "../../pages/sample";

type SampleColumnProps = {
  todos: Item[];
  status: Status;
};

const SampleColumn = (props: SampleColumnProps) => {
  const { setNodeRef } = useDroppable({ id: props.status });

  return (
    <SortableContext
      id={props.status}
      items={props.todos}
      strategy={rectSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={{
          background: "rgba(245,247,249,1.00)",
        }}
        className="m-2 p-4"
      >
        <div>{props.status}</div>
        <div>
          {props.todos.map((todo) => {
            return <SampleTodo key={todo.id} todo={todo} />;
          })}
        </div>
      </div>
    </SortableContext>
  );
};

export default SampleColumn;
