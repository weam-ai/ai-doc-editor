import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ChatHistory from '@/models/ChatHistory';
import { getSession } from '@/app/config/withSession';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?._id) {
      console.log('Chat History GET - No session user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('documentId');

    console.log('Chat History GET - Document ID:', documentId);
    console.log('Chat History GET - User ID:', session.user._id);

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }

    await dbConnect();
    
    // Find chat history for the specific document and user
    const chatHistory = await ChatHistory.findOne({
      documentId: documentId,
      'user.id': session.user._id
    });

    console.log('Chat History GET - Found chat history:', chatHistory);
    console.log('Chat History GET - Messages count:', chatHistory?.messages?.length || 0);

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
      console.log('Chat History POST - No session user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentId, messages } = await request.json();
    
    if (!documentId || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Document ID and messages are required' },
        { status: 400 }
      );
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
