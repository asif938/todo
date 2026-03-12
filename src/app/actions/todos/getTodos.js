"use server";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";


// get todos
export const getTodos = async () => {
    try {
        const data = await dbConnect(collectionNamesObj.todoCollection).find({}).sort({ _id: -1 }).toArray();
        return data;
    } catch (error) {
        console.log(error);
        return []
    }
}

// delete todos
export const deleteTodo = async (id) => {
    const todoCollection = dbConnect(collectionNamesObj.todoCollection);

    await todoCollection.deleteOne({
        _id: new ObjectId(id),
    });

    revalidatePath("/");
}

// post todos
export const addTodo = async (postedData) => {
    try {
        const result = await dbConnect(collectionNamesObj.todoCollection).insertOne(postedData);
        revalidatePath("/");    
    } catch (error) {
        console.log(error);
        // return null
    }
}


// complete todos
export async function completeTodo(id) {
    const todoCollection = dbConnect(collectionNamesObj.todoCollection);

    await todoCollection.updateOne(
        {_id: new ObjectId(id)},
        {
            $set: {status: "completed"},
        }
    );
    revalidatePath("/");
}

//update todos
export async function updateTodos(id, updatedTask) {
    const todoCollection = dbConnect(collectionNamesObj.todoCollection);

    await todoCollection.updateOne(
        {_id: new ObjectId(id)},
        {
            // $set: task,
            $set: {task: updatedTask},
        }
    );
    revalidatePath("/");
}

// updating todo using same server action. this may use for complete todo and update todo.and this is the best approch.
// onClick={() => updateTodo(id, { status: "completed" })} //- (call from complete button)
// await updateTodo(data._id, payload) // call from UpdateTodoForm.jsx
// export async function updateTodo(id, payload){
//     const todoCollection = dbConnect(collectionNamesObj.todoCollection);

//     await todoCollection.updateOne(
//         {_id: new ObjectId(id)},
//         {
//             $set: payload,
//         }
//     );
//     revalidatePath("/");
// }

