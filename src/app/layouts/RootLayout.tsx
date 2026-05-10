import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';

export function RootLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
