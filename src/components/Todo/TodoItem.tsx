import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

type Status = "Done" | "Progress" | "Incomplete";

export type TodoItemProps = {
	title: string;
	content: string;
	status: Status;
};

const TodoItem = (props: TodoItemProps): JSX.Element => {
	// 状態に応じて各クラス名、テクストを取得する
	let statusClassName = {
		text: "",
		textColor: "",
		bgColor: "",
	};

	switch (props.status) {
		case "Done":
			statusClassName.text = "完了";
			statusClassName.textColor = "text-emerald-500";
			statusClassName.bgColor = "bg-emerald-500";
			break;
		case "Progress":
			statusClassName.text = "実行中";
			statusClassName.textColor = "text-blue-600";
			statusClassName.bgColor = "bg-blue-600";
			break;
		case "Incomplete":
			statusClassName.text = "未対応";
			statusClassName.textColor = "text-gray-500";
			statusClassName.bgColor = "bg-gray-600";
			break;
	}

	return (
		<div className="flex w-full border border-gray-300 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
			<div
				className={`flex items-center justify-center w-12 ${statusClassName.bgColor}`}>
				{props.status === "Done" && (
					<FaCheckCircle className="w-6 h-6 text-white fill-current" />
				)}
			</div>

			<div className="px-4 py-2 w-80">
				<div className="mx-3">
					<span className={`font-semibold ${statusClassName.textColor}`}>
						{statusClassName.text}
					</span>
					<p className="me-1 mb-0 text-gray-700">{props.title}</p>
					<span className="text-sm  text-gray-600 dark:text-gray-200 me-1">
						{props.content}
					</span>
				</div>
			</div>
		</div>
	);
};

export default TodoItem;
