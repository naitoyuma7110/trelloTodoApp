const TodoItem = () => {
	return (
		<div className="w-80 p-1 overflow-hidden border border-solid border-gray-200 bg-white rounded-lg shadow-md dark:bg-gray-800">
			<div className="px-4 py-2 -mx-3">
				<div className="mx-3">
					<span className="font-semibold text-emerald-500 dark:text-emerald-400">
						完了
					</span>
					<p className="text-sm text-gray-600 dark:text-gray-200">
						TodoアイテムとFormを作成する
					</p>
				</div>
			</div>
		</div>
	);
};

export default TodoItem;
