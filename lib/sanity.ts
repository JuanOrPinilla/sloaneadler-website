import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: process.env.NODE_ENV === 'production',
});

export const getSanityImageUrl = (imageRef: string) => {
  if (!imageRef) return null;
  const [, id, dimensions, format] = imageRef.split('-');
  return `https://cdn.sanity.io/images/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET || 'production'}/${id}-${dimensions}.${format}`;
};

export const queries = {
  allPosts: `*[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    author->{name, slug, image},
    categories[]->{title, slug},
    tags,
    featured
  }`,

  featuredPosts: `*[_type == "post" && status == "published" && featured == true] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt
  }`,

  postBySlug: `*[_type == "post" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    publishedAt,
    author->{name, slug, image, bio},
    categories[]->{title, slug},
    tags,
    metaTitle,
    metaDescription
  }`,

  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`,
};
