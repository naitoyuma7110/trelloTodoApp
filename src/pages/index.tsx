import TodoListForm from "../components/Todo/todoListForm";

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className="m-5 w-full max-lg">
          <TodoListForm />
        </div>
      </div>
    </>
  );
}
