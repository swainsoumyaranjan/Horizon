import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { UserProfileCard } from '../components/features/UserProfileCard';
import { Search, Users, MessageCircle, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const CommunityPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-heading">Community</h1>
        <p className="text-gray-600 mt-2">
          Connect with change-makers from around the world
        </p>
      </div>
      
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
          />
        </div>
      </div>
      
      {/* Community Stats */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-primary-100 mr-4">
              <Users size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{profiles.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-secondary-100 mr-4">
              <MessageCircle size={24} className="text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => new Date(p.created_at).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-accent-100 mr-4">
              <UserPlus size={24} className="text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => new Date(p.created_at).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Community Members */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold font-heading">Members</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading profiles...</p>
          </div>
        ) : filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProfiles.map(profile => (
              <UserProfileCard
                key={profile.id}
                user={{
                  id: profile.id,
                  name: profile.name || 'Anonymous',
                  email: profile.email,
                  avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${profile.email}`,
                  bio: profile.bio || 'No bio provided',
                  location: profile.location as any || { name: 'Location not set' },
                  interests: (profile.causes as string[]) || [],
                  impactScore: profile.impact_score,
                  badges: [],
                  joinedDate: profile.created_at
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No profiles found</h3>
            <p className="text-gray-500">
              {searchQuery ? 'Try adjusting your search to find more people.' : 'Be the first to join the community!'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};