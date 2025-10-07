import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ChatHistory from '@/models/ChatHistory';
import { getSession } from '@/app/config/withSession';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?._id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('documentId');


    if (!documentId) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }

    await dbConnect();
    
    // Find chat history for the specific document and user
    const chatHistory = await ChatHistory.findOne({
      documentId: documentId,
      'user.id': session.user._id
    });


    return NextResponse.json(chatHistory || { messages: [] });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?._id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentId, messages } = await request.json();
    
    if (!documentId || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Document ID and messages are required' },
        { status: 400 }
      );
    }

    // Check if this is a template preview (documentId starts with 'template_')
    // If it's a template preview, don't save chat history
    if (documentId.startsWith('template_')) {
      return NextResponse.json({ message: 'Chat history not saved for template previews' }, { status: 200 });
    }

    await dbConnect();
    
    const userId = session.user._id;
    const userEmail = session.user.email;
    const companyId = session.user.companyId;
    
    // Find existing chat history or create new one
    let chatHistory = await ChatHistory.findOne({
      documentId: documentId,
      'user.id': userId
    });

    if (chatHistory) {
      // Update existing chat history
      chatHistory.messages = messages as any;
      await chatHistory.save();      
    } else {
      // Create new chat history
      chatHistory = new ChatHistory({
        documentId,
        user: {
          id: userId,
          email: userEmail,
        },
        companyId: companyId,
        messages: messages,
      });
      await chatHistory.save();
    }

    return NextResponse.json(chatHistory, { status: 201 });
  } catch (error) {
    console.error('Error saving chat history:', error);
    return NextResponse.json(
      { error: 'Failed to save chat history' },
      { status: 500 }
    );
  }
}
