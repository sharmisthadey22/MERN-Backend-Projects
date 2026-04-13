import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/app/models/order';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newOrder = await Order.create(body);
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Order failed" }, { status: 500 });
    }
}