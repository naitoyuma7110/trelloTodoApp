import { FaCheckCircle } from "react-icons/fa";
import { TbProgress } from "react-icons/tb";
import { RiZzzFill } from "react-icons/ri";

export type Status = "Done" | "Progress" | "Incomplete";

export type Todo = {
	title: string;
	content: string;
	status: Status;
};

const TodoItem = (props: Todo): JSX.Element => {
	// 状態に応じて各クラス名、テキスト、アイコンを取得する
	let statusValues = {
		text: "",
		textColor: "",
		bgColor: "",
		iconDom: <p>Task is in progress...</p>,
	};

	switch (props.status) {
		case "Done":
			statusValues.text = "完了";
			statusValues.textColor = "text-emerald-500";
			statusValues.bgColor = "bg-emerald-500";
			statusValues.iconDom = (
				<FaCheckCircle className="w-6 h-6 text-white fill-current" />
			);
			break;
		case "Progress":
			statusValues.text = "対応中";
			statusValues.textColor = "text-blue-600";
			statusValues.bgColor = "bg-blue-600";
			statusValues.iconDom = (
				<TbProgress className="w-6 h-6 text-white fill-current" />
			);
			break;
		case "Incomplete":
			statusValues.text = "未対応";
			statusValues.textColor = "text-gray-500";
			statusValues.bgColor = "bg-gray-600";
			statusValues.iconDom = (
				<RiZzzFill className="w-6 h-6 text-white fill-current" />
			);
			break;
	}

	return (
		<div className="flex w-full border border-gray-300 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
			<div
				className={`flex items-center justify-center w-12 ${statusValues.bgColor}`}>
				{statusValues.iconDom}
			</div>

			<div className="px-4 p-2 w-full">
				<div className="px-1">
					<div className="flex justify-start">
						<span className="me-2 flex-auto text-gray-700">{props.title}</span>
						<span className={`font-semibold  ${statusValues.textColor}`}>
							{statusValues.text}
						</span>
					</div>
					<span className="text-sm  text-gray-600 dark:text-gray-200">
						{props.content}
					</span>
				</div>
			</div>
		</div>
	);
};

export default TodoItem;