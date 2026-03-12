"use client";

import { useOptimistic } from "react";
import { deleteTodo } from "../actions/todos/getTodos";
import { completeTodo } from "../actions/todos/getTodos";
import { addTodo } from "../actions/todos/getTodos";
import DeleteButton from "./DeleteButton";
import CompleteButton from "./CompleteButton";
import Link from "next/link";
import AddTodoForm from "./AddTodoForm";

const OptimisticTodoList = ({ todos }) => {

    const [optimisticTodos, updateOptimistic] = useOptimistic(
        todos,
        (state, action) => {
            switch (action.type) {

                case "add":
                    return [action.todo, ...state];

                case "delete":
                    return state.filter(todo => todo._id !== action.id);

                case "complete":
                    return state.map(todo =>
                        todo._id === action.id
                            ? { ...todo, status: "completed" }
                            : todo
                    );

                default:
                    return state;
            }
        }
    );

    const handleDelete = async (id) => {
        updateOptimistic({ type: "delete", id }); // instant UI update
        await deleteTodo(id);
    };



    const handleComplete = async (id) => {

        updateOptimistic({ type: "complete", id }); // instant UI update

        await completeTodo(id); // update database
    };



    const handleAdd = async (task) => {

        const tempTodo = {
            _id: Date.now().toString(), // temporary id
            task,
            status: "pending"
        };

        // instantly add to UI
        updateOptimistic({
            type: "add",
            todo: tempTodo
        });

        await addTodo({
            task,
            status: "pending"
        }); // save in database
    };


    const completedCount = optimisticTodos.filter(item => item.status === 'completed').length;
    const totalCount = optimisticTodos.length;

    return (
        <div className="space-y-6">
            <AddTodoForm onAdd={handleAdd} />
            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-600">{totalCount}</p>
                    <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                    <p className="text-sm text-gray-600">Completed</p>
                </div>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
                {optimisticTodos.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="mt-4 text-gray-500 text-lg">No tasks yet. Add your first task above!</p>
                    </div>
                ) : (
                    optimisticTodos.map((item, index) => (
                        <div
                            key={item._id.toString()}
                            className="group flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
                        >
                            {/* Status Indicator */}
                            <div className={`flex-shrink-0 w-2 h-2 rounded-full ${item.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'}`} />

                            {/* Task Content */}
                            <div className="flex-1 min-w-0">
                                <p className={`text-gray-700 truncate ${item.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                                    {item.task}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {item.status === 'completed' ? '✓ Completed' : '○ In progress'}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Link
                                    href={`/todos/${item._id.toString()}`}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                    title="Edit"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </Link>
                                <CompleteButton id={item._id.toString()} onComplete={handleComplete} />
                                <DeleteButton id={item._id.toString()} onDelete={handleDelete} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OptimisticTodoList;