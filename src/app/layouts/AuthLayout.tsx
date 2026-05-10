import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Plane } from 'lucide-react';

export function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Traveloop</h1>
          <p className="text-indigo-200">Your journey begins here</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
