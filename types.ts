
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Breaking' | 'Research' | 'Business' | 'Open Source';
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
  views: number;
  isSponsored?: boolean;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: 'Productivity' | 'Image' | 'Coding' | 'Video' | 'Marketing';
  rating: number;
  pricing: 'Free' | 'Freemium' | 'Paid';
  tags: string[];
  imageUrl: string;
  link: string;
  is_sponsored?: boolean;
}

export interface SummaryState {
  isLoading: boolean;
  content: string | null;
  error: string | null;
}
