import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { getSession } from '@/lib/session';
import { uploadFolders } from '@/lib/admin-menu';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const rawFolder = String(formData.get('folder') || 'zoytech').trim();
    const folder = uploadFolders.includes(rawFolder) ? rawFolder : 'zoytech';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image uploads are allowed.' }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be smaller than 8MB.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({ success: true, ...result, folder });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('[Upload API] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
