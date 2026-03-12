// "use client"
// import { useRouter } from 'next/navigation';
// import React from 'react';

// const CompleteButton = ({id}) => {
//     const router = useRouter();

//     const handleComplete = async() => {
//         console.log(id);
//         const completePayload = {
//             status: 'completed'
//         }
//         const res = await fetch(
//             `http://localhost:3000/api/todos/${id}`,
//             {
//                 method: 'PATCH',
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//                 body: JSON.stringify(completePayload),
//             }
//         );
//         const postedResponse = await res.json();
//         console.log(postedResponse);
//         if(res.ok){
//             // router.push("/");
//             router.refresh();
//         }
//     }

//     return (
//         <div>
//             <button onClick={handleComplete}>Complete</button>
//         </div>
//     );
// };

// export default CompleteButton;



"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { completeTodo } from '../actions/todos/getTodos';

const CompleteButton = ({ id, onComplete }) => {
    // const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // const handleComplete = async () => {
    //     setIsLoading(true);
    //     const completePayload = {
    //         status: 'completed'
    //     }
    //     const res = await fetch(
    //         `http://localhost:3000/api/todos/${id}`,
    //         {
    //             method: 'PATCH',
    //             headers: {
    //                 "Content-type": "application/json",
    //             },
    //             body: JSON.stringify(completePayload),
    //         }
    //     );
        
    //     if (res.ok) {
    //         router.refresh();
    //     }
    //     setIsLoading(false);
    // }

    return (
        <button
            // onClick={handleComplete}
            // onClick={() => completeTodo(id)}
            onClick={() => onComplete(id)}
            disabled={isLoading}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
            title="Mark as completed"
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            )}
        </button>
    );
};

export default CompleteButton;