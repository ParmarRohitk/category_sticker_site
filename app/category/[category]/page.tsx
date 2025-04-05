import { CATEGORIES } from '@/app/api/fetchdata';
import GalleryClient from '@/app/components/GalleryClient';

export function generateStaticParams() {
    return CATEGORIES.map((category) => ({
        category: category.slug,
    }));
}

export default async function GalleryPage({
    params,
}: {
    params: Promise<{ category: string }>
}) {
    const { category } = await params
    return <GalleryClient category={category} />
}