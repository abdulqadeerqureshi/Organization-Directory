import React from 'react';
import { Users } from 'lucide-react';
import { UserList } from './features/users/UserList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Organization Directory
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and connect with team members across the organization. 
            Use the search and filters to find specific people, then click "View More" to see detailed profiles.
          </p>
        </div>
        
        <UserList />
      </div>
    </div>
  );
}

export default App;