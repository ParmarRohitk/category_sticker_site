import categoryImagesData from '@/data/categoryImages.json';

const CATEGORYWISEIMAGES = categoryImagesData;

const HOMEPAGEIMAGES = categoryImagesData.map((category) => {
    return {
        ...category,
        images: category.images.slice(0, 4),
    };
});

const fetchCategoryBySlug = (slug: string) => {
    return CATEGORYWISEIMAGES.find((category) => category.slug === slug);
};

const CATEGORIES = CATEGORYWISEIMAGES.map(({ slug, name }) => ({ slug, name }));


export {
    CATEGORYWISEIMAGES,
    HOMEPAGEIMAGES,
    fetchCategoryBySlug,
    CATEGORIES
}