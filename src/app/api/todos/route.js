import dbConnect, { collectionNamesObj } from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    const todoCollection = dbConnect(collectionNamesObj.todoCollection)
    const result = await todoCollection.find({}).toArray()

    return NextResponse.json(result)
}

export const POST = async(req) => {
    const body = await req.json();
    const todoCollection = dbConnect(collectionNamesObj.todoCollection)
    const result = await todoCollection.insertOne(body)

    return NextResponse.json(result)
}
