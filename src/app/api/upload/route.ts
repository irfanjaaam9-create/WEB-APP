import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, 'source-by-zahid-media');

    // Save to Media DB
    const mediaRecord = await prisma.media.create({
      data: {
        fileName: file.name,
        fileUrl: result.url,
        publicId: result.public_id,
        fileType: file.type || result.format,
        fileSize: result.bytes || file.size,
      },
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      media: mediaRecord,
    });
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image to Cloudinary: ' + error.message }, { status: 500 });
  }
}
