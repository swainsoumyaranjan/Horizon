// src/components/ContentList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentItem } from '../types';

const ContentList: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(response => {
        setContentItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching content:", error);
      });
  }, []);

  return (
    <div className="content-list">
      <h2>Featured Content</h2>
      {contentItems.map(item => (
        <div key={item.id} className="content-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
