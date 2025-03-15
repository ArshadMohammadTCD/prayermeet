'use client';

import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
  address: string;
  type: 'MOSQUE' | 'PRAYER_ROOM' | 'OTHER';
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocation, setNewLocation] = useState<{
    name: string;
    address: string;
    type: Location['type'];
  }>({
    name: '',
    address: '',
    type: 'MOSQUE'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      if (!response.ok) throw new Error('Failed to fetch locations');
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      setError('Error loading locations');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocation),
      });
      
      if (!response.ok) throw new Error('Failed to create location');
      
      await fetchLocations();
      setNewLocation({ name: '', address: '', type: 'MOSQUE' });
    } catch (err) {
      setError('Error creating location');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to PrayerMeet
      </h1>
      
      {/* Add Location Form */}
      <div className="max-w-md mx-auto mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Add New Location</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={newLocation.address}
              onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={newLocation.type}
              onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value as 'MOSQUE' | 'PRAYER_ROOM' | 'OTHER' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="MOSQUE">Mosque</option>
              <option value="PRAYER_ROOM">Prayer Room</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Location
          </button>
        </form>
      </div>

      {/* Display Locations */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Prayer Locations</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="space-y-4">
          {locations.map((location) => (
            <div key={location.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">{location.name}</h3>
              <p className="text-gray-600">{location.address}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                {location.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
