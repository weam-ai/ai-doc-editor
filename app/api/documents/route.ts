import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Document from '@/models/Document';
import mongoose from 'mongoose';
import { getSession } from '@/app/config/withSession';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?._id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    // Fetch documents for the specific user
    const documents = await Document.find({
      'user.id': session.user._id
    })
      .sort({ updatedAt: -1 })
      .select('title createdAt updatedAt tags');

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Temporarily disable authentication for testing
    // const session = await getServerSession(authOptions);
    
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const session = await getSession();

    const { title, content, contentHtml, templateId, templateName, editor, tags } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    // For testing purposes, provide fallback values if session data is missing
    const userId = session?.user?._id;
    const userEmail = session?.user?.email;
    const companyId = session?.user?.companyId;
    
    // Validate that we have the required user data
    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'User information is required' },
        { status: 400 }
      );
    }
    
    let document;
    
    try {
      document = new Document({
        title,
        content,
        contentHtml,
        user: {
          id: userId,
          email: userEmail,
        },
        companyId: companyId,
        templateId,
        templateName,
        editor,
        tags: tags || [],
      });
    } catch (modelError) {
      return NextResponse.json(
        { error: 'Invalid document data', details: modelError instanceof Error ? modelError.message : String(modelError) },
        { status: 400 }
      );
    }

    try {
      await document.save();
    } catch (saveError) {
      return NextResponse.json(
        { error: 'Failed to save document to database', details: saveError instanceof Error ? saveError.message : String(saveError) },
        { status: 500 }
      );
    }

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
