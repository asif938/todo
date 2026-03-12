import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async(req, {params}) => {
    const p = await params;
    const todoCollection = dbConnect(collectionNamesObj.todoCollection)
    const query = { _id: new ObjectId(p.id) }
    const singleTodo = await todoCollection.findOne(query)
    return NextResponse.json(singleTodo)
}

export const PATCH = async (req, { params }) => {
    const p = await params;
    const todoCollection = dbConnect(collectionNamesObj.todoCollection)
    const query = { _id: new ObjectId(p.id) }
    // const currentTodoData = await todoCollection.findOne(query)
    const body = await req.json()
    const filter = {
        $set: {...body}
    }
    const option = {
        upsert: true
    }
    const updateResponse = await todoCollection.updateOne(query, filter, option)
    revalidatePath("/")
    return NextResponse.json(updateResponse)
}

export const DELETE = async(req, {params}) => {
    const todoCollection = dbConnect(collectionNamesObj.todoCollection)
    const p = await params;
    const query = { _id: new ObjectId(p.id) }
    const deleteResponse = await todoCollection.deleteOne(query)
    revalidatePath("/");
    return NextResponse.json(deleteResponse)
}