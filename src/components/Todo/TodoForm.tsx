const TodoForm = (): JSX.Element => {
	return (
		<div className="w-100 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
			<div className="m-2">
				<input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<div className="m-2">
				<button
					type="submit"
					className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					TODO追加
				</button>
			</div>
		</div>
	);
};

export default TodoForm;
