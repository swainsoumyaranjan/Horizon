import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { Card, CardImage, CardTitle, CardContent, CardFooter, CardBadge } from '../ui/Card';
import { Event } from '../../types';
import { Button } from '../ui/Button';
import { causeCategories } from '../../data/mockData';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    return eventDate > now;
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

  const upcoming = isUpcoming(event.startDate);

  return (
    <Card hover className="h-full flex flex-col">
      <CardImage src={event.image} alt={event.title} />
      <div className="flex items-center mb-2">
        {upcoming ? (
          <CardBadge color="bg-success-100 text-success-800">
            Upcoming
          </CardBadge>
        ) : (
          <CardBadge color="bg-gray-100 text-gray-800">
            Past
          </CardBadge>
        )}
      </div>
      
      <CardTitle>{event.title}</CardTitle>
      
      <CardContent className="flex-1">
        <p className="line-clamp-3">{event.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{event.location.name}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <User size={16} className="mr-2" />
            <span>Organized by {event.organizer}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="mt-4">
        <div className="flex flex-wrap gap-2">
          {event.causes.slice(0, 2).map(cause => (
            <CardBadge key={cause} color={getCauseColor(cause)}>
              {causeCategories.find(c => c.id === cause)?.name || cause}
            </CardBadge>
          ))}
          {event.causes.length > 2 && (
            <CardBadge color="bg-gray-100 text-gray-700">
              +{event.causes.length - 2}
            </CardBadge>
          )}
        </div>
      </CardFooter>
      
      <Button className="mt-4 w-full" variant={upcoming ? 'primary' : 'outline'}>
        {upcoming ? 'Register Now' : 'View Details'}
      </Button>
    </Card>
  );
};