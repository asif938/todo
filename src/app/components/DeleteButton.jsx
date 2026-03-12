// "use client";

// import { useRouter } from 'next/navigation';
// // import { useRouter } from 'next/router';

// import React from 'react';

// const DeleteButton = ({id}) => {
//     const router = useRouter();
//     const handleDelete = async (id) => {
//         const res = await fetch(
//             `http://localhost:3000/api/todos/${id}`,
//             {
//                 method: "DELETE"
//             }
//         );
//         const data  = await res.json();
//         console.log(data);
//         router.refresh();
//     }
//     return (
//         <div>
//             <button onClick={()=> handleDelete(id)}>Delete</button>
//         </div>
//     );
// };

// export default DeleteButton;



"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { deleteTodo } from '../actions/todos/getTodos';

const DeleteButton = ({ id, onDelete }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // const handleDelete = async () => {
    //     if (!confirm('Are you sure you want to delete this task?')) return;

    //     setIsLoading(true);
    //     const res = await fetch(
    //         `http://localhost:3000/api/todos/${id}`,
    //         {
    //             method: "DELETE"
    //         }
    //     );
        
    //     if (res.ok) {
    //         router.refresh();
    //     }
    //     setIsLoading(false);
    // }

    return (
        <button
            // onClick={handleDelete}
            onClick={() => onDelete(id)}
            disabled={isLoading}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
            title="Delete task"
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            )}
        </button>
    );
};

export default DeleteButton;