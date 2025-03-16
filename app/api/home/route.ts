/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import path from 'path';
import categoryMetadata from '../category.json';

// Helper function to get 4 images for each category
const getCategoryImages = (categoryPath: string) => {
  const files = fs.readdirSync(categoryPath);

  // Filter out PNG files and get the first 4 images
  return files
    .filter((file) => file.endsWith('.png'))
    .slice(0, 4) // Take the first 4 images
    .map((file) => `/catwiseimages/${path.basename(categoryPath)}/${file}`); // Return image URLs (relative to the public folder)
};

// Define the category data (id, name, slug, icon)
export async function GET(req: Request) {
  const categoriesPath = path.join(process.cwd(), 'public', 'catwiseimages');
  
  try {
    // Get all category directories
    const categories = fs.readdirSync(categoriesPath).filter((dir) =>
      fs.statSync(path.join(categoriesPath, dir)).isDirectory()
    );

    // For each category, get the first 4 images and combine with category metadata
    const categoryImages = categoryMetadata.map((categoryData) => {
      const categoryPath = path.join(categoriesPath, categoryData.slug);
      const images = getCategoryImages(categoryPath);

      return {
        ...categoryData, // Add category metadata
        images, // Add images
      };
    });

    return new Response(JSON.stringify({ categoryImages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error reading categories for home' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
