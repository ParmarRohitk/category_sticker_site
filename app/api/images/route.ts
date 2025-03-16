/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const categoryPath = path.join(process.cwd(), 'public', 'catwiseimages', category || ''); // Get category folder path

  try {
    // Ensure the category exists
    if (!category || !fs.existsSync(categoryPath)) {
      return new Response(
        JSON.stringify({ error: 'Category not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Read files in the category folder
    const files = fs.readdirSync(categoryPath);

    // Filter out only PNG files
    const images = files
      .filter((file) => file.endsWith('.png'))
      .map((file) => `/catwiseimages/${category}/${file}`); // Construct image URLs

    return new Response(JSON.stringify({ images }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error reading images from category' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
