import React, { useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';  // Use your custom axios instance
import { Organization } from '../types';  // Assuming you defined the Organization interface in types.ts

const Organizations: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    axiosInstance.get('/api/organizations')  // Make sure the base URL is set in axiosInstance
      .then(response => {
        setOrganizations(response.data);
      })
      .catch(error => {
        console.error("Error fetching organizations:", error);
      });
  }, []);

  return (
    <div className="organizations">
      <h2>Organizations</h2>
      {organizations.map(org => (
        <div key={org.id} className="organization">
          <h3>{org.name}</h3>
          <p>{org.description}</p>
          <p>Causes: {org.causes.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Organizations;

