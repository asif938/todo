// "use client";

// import { useRouter } from "next/navigation";

// export default function UpdateTodoForm({ data }) {
//     const router = useRouter();
//     console.log(data);

//     const handleUpdateTodo = async (e) => {
//         e.preventDefault();
//         console.log(data);

//         const form = e.target;
//         const updatedTask = form.addtodo.value;
//         // console.log(updateTodo);

//         const UpdatePayload = {
//             task: updatedTask,
//         }

//         const res = await fetch(`/api/todos/${data._id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(UpdatePayload),
//         });
//         const postedResponse = await res.json();
//         // router.push('/');

//         if (res.ok) {
//             //   form.reset();
//             router.push("/")
//             router.refresh();
//         }
//     };

//     return (
//         <form onSubmit={handleUpdateTodo}>
//             <input type="text" name="addtodo" placeholder="add new todo" defaultValue={data.task} />
//             <button type="submit">Update todo</button>
//         </form>
//     );
// }

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateTodos } from "../actions/todos/getTodos";

export default function UpdateTodoForm({ data }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdateTodo = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        //direct value pass korle action e object set kore dite hobe.
        const updatedTask = form.addtodo.value.trim();

        if (!updatedTask) {
            setIsSubmitting(false);
            return;
        }

        //payload object pass korle action e just object ta set korlei hobe
        // const UpdatePayload = {
        //     task: updatedTask,
        // }

        // const res = await fetch(`/api/todos/${data._id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(UpdatePayload),
        // });

        // if (res.ok) {
        //     router.push("/");
        //     router.refresh();
        // }

        // await updateTodos(data._id, UpdatePayload)
        await updateTodos(data._id, updatedTask)
        router.push("/");
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Edit Task</h2>
                        <p className="text-gray-600 mt-1">Update your task details</p>
                    </div>

                    <form onSubmit={handleUpdateTodo} className="space-y-6">
                        <div>
                            <label htmlFor="addtodo" className="block text-sm font-medium text-gray-700 mb-2">
                                Task Description
                            </label>
                            <textarea
                                id="addtodo"
                                name="addtodo"
                                rows="3"
                                defaultValue={data.task}
                                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
                                placeholder="Enter your task..."
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 font-medium"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Updating...
                                    </span>
                                ) : (
                                    "Update Task"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Status Badge */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Current Status:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                data.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {data.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}