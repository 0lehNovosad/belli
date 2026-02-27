export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: 'novyny' | 'porady';
  tags: string[];
  date: string;
  image?: { url: string; alt: string };
};

export type BlogCategory = {
  id: string;
  slug: string;
  name: string;
};
