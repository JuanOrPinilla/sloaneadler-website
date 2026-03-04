import axios from 'axios';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Create axios instance with auth header
const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
  },
});

// Types for Strapi responses
export interface StrapiImage {
  data?: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
      width?: number;
      height?: number;
    };
  };
}

export interface StrapiAuthor {
  id: number;
  name: string;
  slug: string;
  bio?: string;
  image?: StrapiImage;
}

export interface StrapiCategory {
  id: number;
  title: string;
  slug: string;
  description?: string;
}

export interface StrapiBlock {
  type: string;
  children?: Array<{
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    url?: string;
    children?: Array<{
      type: string;
      text?: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
      code?: boolean;
    }>;
  }>;
  level?: number;
  format?: 'ordered' | 'unordered';
  url?: string;
}

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: StrapiBlock[];
  coverImage?: StrapiImage;
  publishedAt: string;
  status: 'draft' | 'published';
  featured: boolean;
  author?: { data: { id: number; attributes: Omit<StrapiAuthor, 'id'> } };
  categories?: { data: Array<{ id: number; attributes: Omit<StrapiCategory, 'id'> }> };
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Transformed post type
export interface TransformedPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: StrapiBlock[];
  coverImage: string | null;
  publishedAt: string;
  status: 'draft' | 'published';
  featured: boolean;
  author: StrapiAuthor | null;
  categories: StrapiCategory[];
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
}

// Helper to get full image URL
export const getStrapiImageUrl = (image?: StrapiImage): string | null => {
  if (!image?.data?.attributes?.url) return null;
  const url = image.data.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

// Helper to transform Strapi post to simplified format
export const transformPost = (post: StrapiPost): TransformedPost => {
  const authorData = post.author?.data;
  const categoriesData = post.categories?.data;

  return {
    id: post.id,
    documentId: post.documentId,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: getStrapiImageUrl(post.coverImage),
    publishedAt: post.publishedAt,
    status: post.status,
    featured: post.featured,
    author: authorData
      ? {
          id: authorData.id,
          name: authorData.attributes.name,
          slug: authorData.attributes.slug,
          bio: authorData.attributes.bio,
          image: authorData.attributes.image,
        }
      : null,
    categories: categoriesData?.map((cat) => ({
      id: cat.id,
      title: cat.attributes.title,
      slug: cat.attributes.slug,
      description: cat.attributes.description,
    })) || [],
    tags: post.tags || [],
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
  };
};

// Fetch all published posts
export async function getPosts(): Promise<TransformedPost[]> {
  try {
    const response = await strapiClient.get<
      StrapiResponse<StrapiPost[]>
    >('/posts', {
      params: {
        filters: {
          status: {
            $eq: 'published',
          },
        },
        sort: ['publishedAt:desc'],
        populate: {
          author: true,
          categories: true,
          coverImage: true,
        },
      },
    });

    return response.data.data.map(transformPost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch featured posts
export async function getFeaturedPosts(
  limit: number = 5
): Promise<TransformedPost[]> {
  try {
    const response = await strapiClient.get<
      StrapiResponse<StrapiPost[]>
    >('/posts', {
      params: {
        filters: {
          status: {
            $eq: 'published',
          },
          featured: {
            $eq: true,
          },
        },
        sort: ['publishedAt:desc'],
        pagination: {
          limit,
        },
        populate: {
          coverImage: true,
        },
      },
    });

    return response.data.data.map(transformPost);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(
  slug: string
): Promise<TransformedPost | null> {
  try {
    const response = await strapiClient.get<
      StrapiResponse<StrapiPost[]>
    >('/posts', {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
          status: {
            $eq: 'published',
          },
        },
        populate: {
          author: true,
          categories: true,
          coverImage: true,
        },
      },
    });

    if (response.data.data.length === 0) {
      return null;
    }

    return transformPost(response.data.data[0]);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

// Fetch all authors
export async function getAuthors(): Promise<StrapiAuthor[]> {
  try {
    interface AuthorResponseItem {
      id: number;
      attributes: Omit<StrapiAuthor, 'id'>;
    }

    const response = await strapiClient.get<
      StrapiResponse<AuthorResponseItem[]>
    >('/authors', {
      params: {
        sort: ['name:asc'],
        populate: {
          image: true,
        },
      },
    });

    return response.data.data.map((author: AuthorResponseItem) => ({
      id: author.id,
      name: author.attributes.name,
      slug: author.attributes.slug,
      bio: author.attributes.bio,
      image: author.attributes.image,
    }));
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

// Fetch all categories
export async function getCategories(): Promise<StrapiCategory[]> {
  try {
    interface CategoryResponseItem {
      id: number;
      attributes: Omit<StrapiCategory, 'id'>;
    }

    const response = await strapiClient.get<
      StrapiResponse<CategoryResponseItem[]>
    >('/categories', {
      params: {
        sort: ['title:asc'],
      },
    });

    return response.data.data.map((category: CategoryResponseItem) => ({
      id: category.id,
      title: category.attributes.title,
      slug: category.attributes.slug,
      description: category.attributes.description,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default strapiClient;
