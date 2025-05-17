import React from 'react';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🛍️ Product Dashboard</h1>
      <Dashboard />
    </div>
  );
}