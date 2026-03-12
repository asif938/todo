// import UpdateTodoForm from '@/app/components/UpdateTodoForm';
// import { headers } from 'next/headers';
// import React from 'react';

// const UpdateTodo = async ({ params }) => {
//     const p = await params;
//     const res = await fetch(
//         `http://localhost:3000/api/todos/${p.id}`,
//         {
//             headers: new Headers(await headers()),
//         }
//     );
//     const data = await res.json();
//     return (
//         <div>
//             <UpdateTodoForm data={data}></UpdateTodoForm>
//         </div>
//     );
// };

// export default UpdateTodo;





import UpdateTodoForm from '@/app/components/UpdateTodoForm';
import { headers } from 'next/headers';
import React from 'react';
import Link from 'next/link';

const UpdateTodo = async ({ params }) => {
    const p = await params;
    const res = await fetch(
        `http://localhost:3000/api/todos/${p.id}`,
        {
            headers: new Headers(await headers()),
        }
    );
    const data = await res.json();
    
    return (
        <div>
            {/* Back Navigation */}
            <div className="absolute top-4 left-4">
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Tasks
                </Link>
            </div>
            <UpdateTodoForm data={data} />
        </div>
    );
};

export default UpdateTodo;