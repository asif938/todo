
// import AddTodoForm from "./components/AddTodoForm";
// import Todolist from "./components/Todolist";

// export default function Home() {
//   return (
//     <div style={{ maxWidth: "500px", margin: "50px auto" }}>
//       <h1>Next.js MongoDB Native Todo App</h1>
//       <AddTodoForm />
//       <Todolist />
//     </div>
//   );
// }

import AddTodoForm from "./components/AddTodoForm";
import Todolist from "./components/Todolist";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Task Master
          </h1>
          <p className="text-gray-600 text-lg">Organize your tasks efficiently</p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/50">
          <AddTodoForm />
          <div className="mt-8">
            <Todolist />
          </div>
        </div>

        {/* Footer Stats - Will be populated by Todolist */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>✨ Stay organized, stay productive</p>
        </div>
      </div>
    </main>
  );
}