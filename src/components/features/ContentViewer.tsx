import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { MessageCircle, ThumbsUp, Share2, Bookmark } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { sendTelegramNotification } from '../../lib/telegram';
import { supabase } from '../../lib/supabase';

interface ContentViewerProps {
  content: {
    id: string;
    title: string;
    description: string;
    type: string;
    url: string;
    video_url?: string;
  };
}

export const ContentViewer: React.FC<ContentViewerProps> = ({ content }) => {
  const [showChat, setShowChat] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  const handleLike = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('reactions').upsert({
        content_id: content.id,
        user_id: user.id,
        type: 'like'
      });

      await sendTelegramNotification(
        'content',
        `New Like on ${content.title}`,
        `A user liked the content "${content.title}"`
      );
    } catch (error) {
      console.error('Error liking content:', error);
    }
  };

  const handleComment = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !comment.trim()) return;

      await supabase.from('comments').insert({
        content_id: content.id,
        user_id: user.id,
        text: comment.trim()
      });

      await sendTelegramNotification(
        'content',
        `New Comment on ${content.title}`,
        `A user commented: "${comment}"`
      );

      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (name, avatar)
        `)
        .eq('content_id', content.id)
        .order('created_at', { ascending: false });

      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
          
          {content.video_url && (
            <div className="aspect-video mb-6">
              <ReactPlayer
                url={content.video_url}
                width="100%"
                height="100%"
                controls
              />
            </div>
          )}
          
          <p className="text-gray-700 mb-6">{content.description}</p>
          
          <div className="flex items-center gap-4 border-t border-b py-4">
            <Button
              variant="ghost"
              size="sm"
              icon={<ThumbsUp size={18} />}
              onClick={handleLike}
            >
              Like
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              icon={<MessageCircle size={18} />}
              onClick={() => setShowChat(!showChat)}
            >
              Comment
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              icon={<Share2 size={18} />}
            >
              Share
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              icon={<Bookmark size={18} />}
            >
              Save
            </Button>
          </div>
          
          {showChat && (
            <div className="mt-6">
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-2"
                  onClick={handleComment}
                >
                  Post Comment
                </Button>
              </div>
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.profiles.avatar}
                      alt={comment.profiles.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{comment.profiles.name}</p>
                      <p className="text-gray-600">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};