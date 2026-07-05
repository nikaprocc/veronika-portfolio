import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const sectionType = searchParams.get('sectionType');

    if (!projectId || !sectionType) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const imagePath = path.join(process.cwd(), 'public/images', projectId, sectionType);

    if (!fs.existsSync(imagePath)) {
      return Response.json({ images: [] });
    }

    const files = fs.readdirSync(imagePath);
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.webm', '.mov', '.pdf'].includes(ext);
    }).sort();

    return Response.json({ images });
  } catch (error) {
    console.error('Error reading images:', error);
    return Response.json({ error: 'Failed to read images', images: [] }, { status: 500 });
  }
}