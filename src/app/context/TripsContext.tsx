import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  image: string;
  status: 'planning' | 'upcoming' | 'ongoing' | 'completed';
  travelers: number;
}

interface TripsContextType {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Summer in Paris',
    destination: 'Paris, France',
    startDate: '2026-07-15',
    endDate: '2026-07-22',
    budget: 3500,
    spent: 1240,
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    status: 'upcoming',
    travelers: 2,
  },
];

export function TripsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const savedTrips = localStorage.getItem('traveloop_trips');

    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    } else {
      setTrips(mockTrips);
    }
  }, []);

  const addTrip = async (trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(),
    };

    const updatedTrips = [...trips, newTrip];

    setTrips(updatedTrips);

    localStorage.setItem(
      'traveloop_trips',
      JSON.stringify(updatedTrips)
    );
  };

  const deleteTrip = async (id: string) => {
    const updatedTrips = trips.filter((trip) => trip.id !== id);

    setTrips(updatedTrips);

    localStorage.setItem(
      'traveloop_trips',
      JSON.stringify(updatedTrips)
    );
  };

  return (
    <TripsContext.Provider
      value={{
        trips,
        addTrip,
        deleteTrip,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripsContext);

  if (context === undefined) {
    throw new Error('useTrips must be used within a TripsProvider');
  }

  return context;
}