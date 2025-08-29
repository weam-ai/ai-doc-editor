import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/config/withSession';
import dbConnect from '@/lib/db';
import Template from '@/models/Template';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    // Get system templates and user's custom templates
    const templates = await Template.find({
      $or: [
        { isSystem: true },
        { createdBy: session.user._id }
      ]
    }).sort({ category: 1, name: 1 });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, category, content, contentHtml, prompt } = await request.json();

    if (!name || !description || !category || !content || !prompt) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    const template = new Template({
      name,
      description,
      category,
      content,
      contentHtml,
      prompt,
      createdBy: session.user._id,
      isSystem: false,
    });

    await template.save();

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}
