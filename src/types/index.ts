export interface User {
  id: string;
  name: string;
  avatar: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  bio: string;
  interests: string[];
  impactScore: number;
  badges: Badge[];
  joinedDate: string;
}

export interface Organization {
  id: string;
  name: string;
  logo: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  website: string;
  description: string;
  causes: string[];
  verified: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  startDate: string;
  endDate: string;
  organizer: string;
  causes: string[];
  image: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  type: 'video' | 'article' | 'book' | 'report';
  causes: string[];
  featured: boolean;
  date: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  type: 'volunteer' | 'funding' | 'event' | 'petition' | 'course';
  causes: string[];
  location: string | null;
  deadline: string | null;
  image: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    value: string;
  }[];
}

export interface QuizResult {
  primaryCause: string;
  secondaryCauses: string[];
  description: string;
  recommendedContent: ContentItem[];
  recommendedOrganizations: Organization[];
}

export interface CauseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}