import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardImage, CardTitle, CardContent, CardFooter, CardBadge } from '../ui/Card';
import { Opportunity } from '../../types';
import { Button } from '../ui/Button';
import { causeCategories } from '../../data/mockData';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'volunteer':
        return 'Volunteer';
      case 'funding':
        return 'Funding';
      case 'event':
        return 'Event';
      case 'petition':
        return 'Petition';
      case 'course':
        return 'Course';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'volunteer':
        return 'bg-primary-100 text-primary-800';
      case 'funding':
        return 'bg-success-100 text-success-800';
      case 'event':
        return 'bg-secondary-100 text-secondary-800';
      case 'petition':
        return 'bg-accent-100 text-accent-800';
      case 'course':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <CardImage src={opportunity.image} alt={opportunity.title} />
      <div className="flex items-center mb-2">
        <CardBadge color={getTypeColor(opportunity.type)}>
          {getTypeLabel(opportunity.type)}
        </CardBadge>
        <span className="ml-2 text-sm text-gray-500">{opportunity.organization}</span>
      </div>
      
      <CardTitle>{opportunity.title}</CardTitle>
      
      <CardContent className="flex-1">
        <p className="line-clamp-3">{opportunity.description}</p>
        
        <div className="mt-4 space-y-2">
          {opportunity.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2" />
              <span>{opportunity.location}</span>
            </div>
          )}
          
          {opportunity.deadline && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2" />
              <span>Deadline: {formatDate(opportunity.deadline)}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="mt-4">
        <div className="flex flex-wrap gap-2">
          {opportunity.causes.slice(0, 2).map(cause => (
            <CardBadge key={cause} color={getCauseColor(cause)}>
              {causeCategories.find(c => c.id === cause)?.name || cause}
            </CardBadge>
          ))}
          {opportunity.causes.length > 2 && (
            <CardBadge color="bg-gray-100 text-gray-700">
              +{opportunity.causes.length - 2}
            </CardBadge>
          )}
        </div>
      </CardFooter>
      
      <Button className="mt-4 w-full" variant="primary">
        Apply Now
      </Button>
    </Card>
  );
};