import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { Card, CardImage, CardTitle, CardContent, CardFooter, CardBadge } from '../ui/Card';
import { ContentItem } from '../../types';
import { causeCategories } from '../../data/mockData';

interface ContentCardProps {
  content: ContentItem;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'article':
        return '📄';
      case 'book':
        return '📚';
      case 'report':
        return '📊';
      default:
        return '📄';
    }
  };

  const getCauseColor = (causeId: string) => {
    const cause = causeCategories.find(c => c.id === causeId);
    if (cause) {
      switch (causeId) {
        case 'environment':
          return 'bg-green-100 text-green-800';
        case 'education':
          return 'bg-blue-100 text-blue-800';
        case 'equality':
          return 'bg-purple-100 text-purple-800';
        case 'health':
          return 'bg-red-100 text-red-800';
        case 'innovation':
          return 'bg-amber-100 text-amber-800';
        case 'community':
          return 'bg-indigo-100 text-indigo-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card hover className="h-full flex flex-col">
      <CardImage src={content.thumbnail} alt={content.title} />
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className="text-lg mr-2">{getTypeIcon(content.type)}</span>
          <span className="text-sm text-gray-500 capitalize">{content.type}</span>
          {content.featured && (
            <CardBadge className="ml-auto" color="bg-accent-100 text-accent-800">
              Featured
            </CardBadge>
          )}
        </div>
        
        <CardTitle>{content.title}</CardTitle>
        
        <CardContent>
          <p className="line-clamp-3">{content.description}</p>
        </CardContent>
      </div>
      
      <CardFooter className="mt-4">
        <div className="flex flex-wrap gap-2">
          {content.causes.slice(0, 2).map(cause => (
            <CardBadge key={cause} color={getCauseColor(cause)}>
              {causeCategories.find(c => c.id === cause)?.name || cause}
            </CardBadge>
          ))}
          {content.causes.length > 2 && (
            <CardBadge color="bg-gray-100 text-gray-700">
              +{content.causes.length - 2}
            </CardBadge>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>{formatDate(content.date)}</span>
        </div>
      </CardFooter>
      
      <a 
        href={content.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-4 text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
      >
        View Resource
        <ExternalLink size={14} className="ml-1" />
      </a>
    </Card>
  );
};