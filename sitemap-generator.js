import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "next-sitemap";
import { CATEGORIES } from "./app/api/fetchdata";

async function generateCategorySitemaps() {
  for (const category of CATEGORIES) {
    const smStream = new SitemapStream({
      hostname: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    // Add image paths here
    const urls = category.images.map((img, idx) => ({
      url: `/category/${category.slug}`,
      img: [
        {
          url: img,
          title: `${category.slug}-${idx + 1}`,
        },
      ],
    }));

    urls.forEach((url) => smStream.write(url));
    smStream.end();

    const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());

    writeFileSync(`./out/sitemap-${category.slug}.xml`, sitemap);
  }
}

generateCategorySitemaps();
