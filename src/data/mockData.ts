import { 
  User, 
  Organization, 
  Event, 
  ContentItem, 
  Opportunity, 
  Badge,
  QuizQuestion,
  CauseCategory 
} from '../types';

// Cause Categories
export const causeCategories: CauseCategory[] = [
  {
    id: 'environment',
    name: 'Environment',
    icon: 'leaf',
    color: 'bg-green-500',
    description: 'Climate action, conservation, and sustainable practices'
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'book-open',
    color: 'bg-blue-500',
    description: 'Access to quality education and learning resources'
  },
  {
    id: 'equality',
    name: 'Equality',
    icon: 'users',
    color: 'bg-purple-500',
    description: 'Social justice, human rights, and equal opportunities'
  },
  {
    id: 'health',
    name: 'Health',
    icon: 'heart-pulse',
    color: 'bg-red-500',
    description: 'Mental and physical health, wellness, and healthcare access'
  },
  {
    id: 'innovation',
    name: 'Innovation',
    icon: 'lightbulb',
    color: 'bg-amber-500',
    description: 'Technology for good, creative solutions to social problems'
  },
  {
    id: 'community',
    name: 'Community',
    icon: 'home',
    color: 'bg-indigo-500',
    description: 'Local engagement, neighborhood development, and community building'
  }
];

// Mock Current User
export const currentUser: User = {
  id: 'u1',
  name: 'Alex Morgan',
  avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  location: {
    lat: 40.7128,
    lng: -74.0060,
    name: 'New York, USA'
  },
  bio: 'Passionate about tech for good and environmental sustainability',
  interests: ['environment', 'innovation', 'education'],
  impactScore: 756,
  badges: [
    {
      id: 'b1',
      name: 'Climate Champion',
      description: 'Completed 3 environmental projects',
      icon: 'award',
      level: 2
    },
    {
      id: 'b2',
      name: 'Connection Maker',
      description: 'Connected with 20+ change-makers',
      icon: 'users',
      level: 1
    },
    {
      id: 'b3',
      name: 'Knowledge Seeker',
      description: 'Read 10+ articles on social impact',
      icon: 'book',
      level: 3
    }
  ],
  joinedDate: '2023-09-15'
};

// Users
export const users: User[] = [
  currentUser,
  {
    id: 'u2',
    name: 'Jordan Lee',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      name: 'London, UK'
    },
    bio: 'Working on education access in underserved communities',
    interests: ['education', 'equality', 'community'],
    impactScore: 892,
    badges: [
      {
        id: 'b4',
        name: 'Education Advocate',
        description: 'Led 5 educational initiatives',
        icon: 'book-open',
        level: 3
      }
    ],
    joinedDate: '2023-07-22'
  },
  {
    id: 'u3',
    name: 'Taylor Kim',
    avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: 'San Francisco, USA'
    },
    bio: 'Tech entrepreneur focused on healthcare innovation',
    interests: ['health', 'innovation', 'environment'],
    impactScore: 615,
    badges: [
      {
        id: 'b5',
        name: 'Health Innovator',
        description: 'Created 2 health tech solutions',
        icon: 'stethoscope',
        level: 2
      }
    ],
    joinedDate: '2023-10-05'
  }
];

// Organizations
export const organizations: Organization[] = [
  {
    id: 'org1',
    name: 'EcoSolutions',
    logo: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      name: 'Los Angeles, USA'
    },
    website: 'https://ecosolutions.org',
    description: 'Working to create innovative solutions for climate challenges',
    causes: ['environment', 'innovation'],
    verified: true
  },
  {
    id: 'org2',
    name: 'EduAccess',
    logo: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: {
      lat: 48.8566,
      lng: 2.3522,
      name: 'Paris, France'
    },
    website: 'https://eduaccess.org',
    description: 'Creating educational opportunities for underserved communities',
    causes: ['education', 'equality'],
    verified: true
  },
  {
    id: 'org3',
    name: 'Global Health Initiative',
    logo: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: {
      lat: -33.8688,
      lng: 151.2093,
      name: 'Sydney, Australia'
    },
    website: 'https://globalhealthinitiative.org',
    description: 'Improving healthcare access in developing regions',
    causes: ['health', 'equality'],
    verified: false
  }
];

// Events
export const events: Event[] = [
  {
    id: 'e1',
    title: 'Climate Action Conference',
    description: 'Join leaders in sustainability for a three-day conference on climate solutions',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      name: 'New York, USA'
    },
    startDate: '2025-06-15T09:00:00Z',
    endDate: '2025-06-17T17:00:00Z',
    organizer: 'EcoSolutions',
    causes: ['environment', 'innovation'],
    image: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'e2',
    title: 'Education for All Hackathon',
    description: 'A weekend hackathon to develop tech solutions for education access',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: 'San Francisco, USA'
    },
    startDate: '2025-07-08T10:00:00Z',
    endDate: '2025-07-10T18:00:00Z',
    organizer: 'EduAccess',
    causes: ['education', 'innovation'],
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'e3',
    title: 'Community Garden Planting Day',
    description: 'Help plant and maintain a community garden in an urban food desert',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      name: 'London, UK'
    },
    startDate: '2025-05-22T09:00:00Z',
    endDate: '2025-05-22T15:00:00Z',
    organizer: 'Urban Greening Project',
    causes: ['environment', 'community', 'health'],
    image: 'https://images.pexels.com/photos/7728089/pexels-photo-7728089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Content Library
export const contentItems: ContentItem[] = [
  {
    id: 'c1',
    title: 'How Regenerative Agriculture Can Transform Our Planet',
    description: 'Learn about innovative farming techniques that can restore ecosystems while producing food',
    url: 'https://example.com/video1',
    thumbnail: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'video',
    causes: ['environment', 'innovation'],
    featured: true,
    date: '2024-04-10'
  },
  {
    id: 'c2',
    title: 'The Future of Education: Accessible Learning for All',
    description: 'Exploring technology solutions that are making quality education accessible globally',
    url: 'https://example.com/article1',
    thumbnail: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'article',
    causes: ['education', 'equality', 'innovation'],
    featured: false,
    date: '2024-03-22'
  },
  {
    id: 'c3',
    title: 'Mental Health in the Digital Age',
    description: 'A comprehensive report on the impacts of technology on mental health and wellbeing',
    url: 'https://example.com/report1',
    thumbnail: 'https://images.pexels.com/photos/3823526/pexels-photo-3823526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'report',
    causes: ['health', 'innovation'],
    featured: true,
    date: '2024-02-15'
  },
  {
    id: 'c4',
    title: 'Building Sustainable Communities',
    description: 'Case studies of urban and rural communities implementing sustainable practices',
    url: 'https://example.com/book1',
    thumbnail: 'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'book',
    causes: ['environment', 'community'],
    featured: false,
    date: '2024-01-30'
  },
  {
    id: 'c5',
    title: 'The Economics of Equality',
    description: 'Exploring economic systems that promote social justice and reduce inequality',
    url: 'https://example.com/video2',
    thumbnail: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'video',
    causes: ['equality', 'innovation'],
    featured: true,
    date: '2024-04-05'
  }
];

// Opportunities
export const opportunities: Opportunity[] = [
  {
    id: 'op1',
    title: 'Tech Mentors for Underserved Schools',
    organization: 'EduAccess',
    description: 'Volunteer to teach coding and digital skills to students in underserved communities',
    type: 'volunteer',
    causes: ['education', 'equality', 'innovation'],
    location: 'Multiple Locations',
    deadline: '2025-06-30',
    image: 'https://images.pexels.com/photos/3182749/pexels-photo-3182749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'op2',
    title: 'Funding for Climate Tech Startups',
    organization: 'EcoSolutions',
    description: 'Grants available for early-stage startups developing climate solutions',
    type: 'funding',
    causes: ['environment', 'innovation'],
    location: null,
    deadline: '2025-05-15',
    image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'op3',
    title: 'Sustainable Living Workshop Series',
    organization: 'Urban Greening Project',
    description: 'Learn practical skills for sustainable living in urban environments',
    type: 'course',
    causes: ['environment', 'community'],
    location: 'Online',
    deadline: null,
    image: 'https://images.pexels.com/photos/6985132/pexels-photo-6985132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'op4',
    title: 'Healthcare Access Petition',
    organization: 'Global Health Initiative',
    description: 'Sign our petition advocating for expanded healthcare access in rural areas',
    type: 'petition',
    causes: ['health', 'equality'],
    location: null,
    deadline: '2025-07-31',
    image: 'https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Quiz Questions
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "Which global issue makes you feel most passionate?",
    options: [
      { id: '1a', text: "Climate change and environmental protection", value: "environment" },
      { id: '1b', text: "Education access and quality", value: "education" },
      { id: '1c', text: "Social justice and human rights", value: "equality" },
      { id: '1d', text: "Public health and wellness", value: "health" },
      { id: '1e', text: "Technology and innovation for social good", value: "innovation" },
      { id: '1f', text: "Community development and local causes", value: "community" }
    ]
  },
  {
    id: 2,
    text: "How do you prefer to contribute to causes?",
    options: [
      { id: '2a', text: "Hands-on volunteering", value: "volunteer" },
      { id: '2b', text: "Donating or fundraising", value: "funding" },
      { id: '2c', text: "Advocacy and raising awareness", value: "advocacy" },
      { id: '2d', text: "Creating innovative solutions", value: "innovation" },
      { id: '2e', text: "Education and knowledge sharing", value: "education" }
    ]
  },
  {
    id: 3,
    text: "Which environment do you work best in?",
    options: [
      { id: '3a', text: "Collaborative team settings", value: "collaborative" },
      { id: '3b', text: "Independent projects", value: "independent" },
      { id: '3c', text: "Leadership positions", value: "leadership" },
      { id: '3d', text: "Supporting roles", value: "support" },
      { id: '3e', text: "Flexible, varied environments", value: "flexible" }
    ]
  },
  {
    id: 4,
    text: "Which skill would you most like to use for positive impact?",
    options: [
      { id: '4a', text: "Technical or digital skills", value: "technical" },
      { id: '4b', text: "Creative and artistic abilities", value: "creative" },
      { id: '4c', text: "Research and analytical thinking", value: "analytical" },
      { id: '4d', text: "Communication and storytelling", value: "communication" },
      { id: '4e', text: "Organizational and logistical talents", value: "organizational" }
    ]
  },
  {
    id: 5,
    text: "What scale of impact are you most interested in?",
    options: [
      { id: '5a', text: "Local community level", value: "local" },
      { id: '5b', text: "National or regional level", value: "national" },
      { id: '5c', text: "Global or international level", value: "global" },
      { id: '5d', text: "Individual or personal level", value: "individual" },
      { id: '5e', text: "Systemic or structural level", value: "systemic" }
    ]
  }
];