export interface SubStory {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date | null;
}

export interface Story {
  id: string;
  author: string;
  authorEmail: string;
  title: string;
  subStories: SubStory[];
  summary: string;
  imageUrl?: string;
  region: string;
  updatedAt: Date | null;
}

export interface SearchResult {
  id: string;
  author: string;
  region: string;
  title: string;
  summary: string;
  imageUrl?: string | null;
  updatedAt: Date | null;
  authorEmail: string;
}


export interface GeminiHistorySplit {
  title: string;
  summary: string;
  sections: {
    title: string;
    content: string;
    image?: string
  }[];
}
