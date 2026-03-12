// "use client";

// import { useRouter } from "next/navigation";

// export default function AddTodoForm() {
//   const router = useRouter();

//   const handleAddTodo = async (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const addtodo = form.addtodo.value;

//     const res = await fetch("/api/todos", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         task: addtodo,
//         status: "incompleted",
//       }),
//     });

//     if (res.ok) {
//       form.reset();
//       router.refresh(); 
//     }
//   };

//   return (
//     <form onSubmit={handleAddTodo}>
//       <input type="text" name="addtodo" placeholder="add new todo" />
//       <button type="submit">Add todo</button>
//     </form>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addTodo } from "../actions/todos/getTodos";

export default function AddTodoForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const addtodo = form.addtodo.value.trim();

    if (!addtodo) {
      setIsSubmitting(false);
      return;
    }

    const payload = {
      task: addtodo,
      status: "incompleted",
    };

    // const res = await fetch("/api/todos", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     task: addtodo,
    //     status: "incompleted",
    //   }),
    // });

    const result = await addTodo(payload);
    console.log(result);
    form.reset();
    // router.push("/");


    // if (res.ok) {
    //   form.reset();
    //   router.refresh();
    // }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleAddTodo} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          name="addtodo"
          placeholder="What needs to be done?"
          className="w-full px-5 py-4 pr-32 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding...
            </span>
          ) : (
            "Add Task"
          )}
        </button>
      </div>
    </form>
  );
}