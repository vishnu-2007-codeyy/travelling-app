import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { TripsProvider } from './context/TripsContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <TripsProvider>
        <RouterProvider router={router} />
      </TripsProvider>
    </AuthProvider>
  );
}