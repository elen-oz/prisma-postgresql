import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { title, content } = await req.json();
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { email: session.user.email } },
        },
    });
    return NextResponse.json(result);
}