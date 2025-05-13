import React, { useEffect, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { organizations, events, users } from '../../data/mockData';
import { Organization, Event, User } from '../../types';
import { Button } from '../ui/Button';
import { MapPin, Calendar, Building, User as UserIcon } from 'lucide-react';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  markers: {
    type: 'organization' | 'event' | 'user';
    position: google.maps.LatLngLiteral;
    data: Organization | Event | User;
  }[];
  onMarkerClick: (type: 'organization' | 'event' | 'user', data: Organization | Event | User) => void;
}

const Map: React.FC<MapProps> = ({ center, zoom, markers, onMarkerClick }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<google.maps.Marker | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  // Initialize the map
  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e9e9e9',
              },
              {
                lightness: 17,
              },
            ],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              {
                color: '#f5f5f5',
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#ffffff',
              },
              {
                lightness: 17,
              },
            ],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#fefefe',
              },
              {
                lightness: 20,
              },
            ],
          },
        ],
      });
      
      setMap(newMap);
      setInfoWindow(new google.maps.InfoWindow());
    }
  }, [ref, map, center, zoom]);

  // Add markers to the map
  useEffect(() => {
    if (map && infoWindow) {
      // Clear previous markers
      if (activeMarker) {
        activeMarker.setMap(null);
      }
      
      markers.forEach((markerData) => {
        const getMarkerIcon = () => {
          if (markerData.type === 'organization') {
            return {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#0F766E',
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 8,
            };
          } else if (markerData.type === 'event') {
            return {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#4F46E5',
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 8,
            };
          } else {
            return {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#EA580C',
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 8,
            };
          }
        };
        
        const marker = new google.maps.Marker({
          position: markerData.position,
          map,
          icon: getMarkerIcon(),
          animation: google.maps.Animation.DROP,
        });
        
        marker.addListener('click', () => {
          onMarkerClick(markerData.type, markerData.data);
          
          const getInfoContent = () => {
            let content = '';
            
            if (markerData.type === 'organization') {
              const org = markerData.data as Organization;
              content = `
                <div class="p-2">
                  <h3 class="font-bold">${org.name}</h3>
                  <p class="text-sm">${org.location.name}</p>
                </div>
              `;
            } else if (markerData.type === 'event') {
              const event = markerData.data as Event;
              content = `
                <div class="p-2">
                  <h3 class="font-bold">${event.title}</h3>
                  <p class="text-sm">${event.location.name}</p>
                </div>
              `;
            } else {
              const user = markerData.data as User;
              content = `
                <div class="p-2">
                  <h3 class="font-bold">${user.name}</h3>
                  <p class="text-sm">${user.location.name}</p>
                </div>
              `;
            }
            
            return content;
          };
          
          infoWindow.setContent(getInfoContent());
          infoWindow.open(map, marker);
        });
        
        return () => {
          marker.setMap(null);
        };
      });
    }
  }, [map, markers, infoWindow, onMarkerClick]);

  return <div ref={ref} className="w-full h-full rounded-lg" />;
};

interface ImpactMapProps {
  apiKey?: string;
}

export const ImpactMap: React.FC<ImpactMapProps> = ({ 
  apiKey = "AIzaSyB63xNWnqIg5QwzJxbB8v43oD-v5zycwXI" 
}) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    organizations: boolean;
    events: boolean;
    users: boolean;
  }>({
    organizations: true,
    events: true,
    users: true,
  });
  
  const [selectedItem, setSelectedItem] = useState<{
    type: 'organization' | 'event' | 'user' | null;
    data: Organization | Event | User | null;
  }>({
    type: null,
    data: null,
  });
  
  const handleMarkerClick = (
    type: 'organization' | 'event' | 'user', 
    data: Organization | Event | User
  ) => {
    setSelectedItem({ type, data });
  };
  
  const toggleFilter = (filter: 'organizations' | 'events' | 'users') => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };
  
  const getMarkers = () => {
    const markers: {
      type: 'organization' | 'event' | 'user';
      position: google.maps.LatLngLiteral;
      data: Organization | Event | User;
    }[] = [];
    
    if (selectedFilters.organizations) {
      organizations.forEach(org => {
        markers.push({
          type: 'organization',
          position: { lat: org.location.lat, lng: org.location.lng },
          data: org,
        });
      });
    }
    
    if (selectedFilters.events) {
      events.forEach(event => {
        markers.push({
          type: 'event',
          position: { lat: event.location.lat, lng: event.location.lng },
          data: event,
        });
      });
    }
    
    if (selectedFilters.users) {
      users.forEach(user => {
        markers.push({
          type: 'user',
          position: { lat: user.location.lat, lng: user.location.lng },
          data: user,
        });
      });
    }
    
    return markers;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-0 overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Global Impact Map</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedFilters.organizations ? 'primary' : 'outline'}
            icon={<Building size={16} />}
            onClick={() => toggleFilter('organizations')}
          >
            Organizations
          </Button>
          <Button
            size="sm"
            variant={selectedFilters.events ? 'secondary' : 'outline'}
            icon={<Calendar size={16} />}
            onClick={() => toggleFilter('events')}
          >
            Events
          </Button>
          <Button
            size="sm"
            variant={selectedFilters.users ? 'accent' : 'outline'}
            icon={<UserIcon size={16} />}
            onClick={() => toggleFilter('users')}
          >
            People
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 h-[500px]">
          <Wrapper apiKey={apiKey}>
            <Map
              center={{ lat: 20, lng: 0 }}
              zoom={2}
              markers={getMarkers()}
              onMarkerClick={handleMarkerClick}
            />
          </Wrapper>
        </div>
        
        <div className="p-4 border-l">
          {selectedItem.data ? (
            <div>
              {selectedItem.type === 'organization' && (
                <div>
                  <h3 className="text-lg font-semibold font-heading">
                    {(selectedItem.data as Organization).name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{(selectedItem.data as Organization).location.name}</span>
                  </div>
                  <p className="mt-3 text-gray-700">
                    {(selectedItem.data as Organization).description}
                  </p>
                  <div className="mt-4">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => window.open((selectedItem.data as Organization).website, '_blank')}
                    >
                      Visit Website
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedItem.type === 'event' && (
                <div>
                  <h3 className="text-lg font-semibold font-heading">
                    {(selectedItem.data as Event).title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{(selectedItem.data as Event).location.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar size={16} className="mr-1" />
                    <span>{formatDate((selectedItem.data as Event).startDate)}</span>
                  </div>
                  <p className="mt-3 text-gray-700">
                    {(selectedItem.data as Event).description}
                  </p>
                  <div className="mt-4">
                    <Button variant="secondary" size="sm">
                      View Event Details
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedItem.type === 'user' && (
                <div>
                  <h3 className="text-lg font-semibold font-heading">
                    {(selectedItem.data as User).name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{(selectedItem.data as User).location.name}</span>
                  </div>
                  <p className="mt-3 text-gray-700">
                    {(selectedItem.data as User).bio}
                  </p>
                  <div className="mt-4">
                    <Button variant="accent" size="sm">
                      Connect
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MapPin size={32} className="mx-auto mb-3 text-gray-400" />
              <p>Select a marker on the map to see details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};