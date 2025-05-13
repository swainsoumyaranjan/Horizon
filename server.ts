import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Dummy data for organizations, events, and content
const organizations = [
  { id: '1', name: 'Impact Foundation', description: 'Non-profit organization', causes: ['Education', 'Health'] },
  { id: '2', name: 'Save the Planet', description: 'Environmental advocacy group', causes: ['Environment', 'Climate Change'] },
];

const events = [
  { id: '1', title: 'Climate Change Awareness', startDate: '2025-06-12', location: 'New York', organizer: 'Save the Planet', causes: ['Environment'] },
];

const content = [
  { id: '1', title: 'How to Save the Earth', url: 'https://example.com/earth', type: 'article', causes: ['Environment'], featured: true, date: '2025-04-01' },
];

// API Endpoints
app.get('/api/organizations', (req: Request, res: Response) => {
  res.json(organizations);
});

app.get('/api/events', (req: Request, res: Response) => {
  res.json(events);
});

app.get('/api/content', (req: Request, res: Response) => {
  res.json(content);
});

// Root Route (Optional)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Impact API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

