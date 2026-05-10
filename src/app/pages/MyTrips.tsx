import { Link } from 'react-router';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Calendar, Users, Plus } from 'lucide-react';

export function MyTrips() {
  const { trips } = useTrips();

  const groupedTrips = {
    planning: trips.filter(t => t.status === 'planning'),
    upcoming: trips.filter(t => t.status === 'upcoming'),
    ongoing: trips.filter(t => t.status === 'ongoing'),
    completed: trips.filter(t => t.status === 'completed'),
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600 mt-1">Manage all your travel adventures</p>
        </div>
        <Link to="/trips/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Trip
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedTrips).map(([status, tripList]) => (
          tripList.length > 0 && (
            <div key={status}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">{status}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripList.map((trip) => (
                  <Link key={trip.id} to={`/trips/${trip.id}`}>
                    <Card hover className="h-full overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={trip.image}
                          alt={trip.destination}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                            status === 'upcoming' ? 'bg-green-100 text-green-700' :
                            status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {status}
                          </span>
                        </div>
                      </div>
                      <CardBody>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{trip.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {trip.destination}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-600">Budget</p>
                              <p className="font-semibold text-gray-900">${trip.budget.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-600">Spent</p>
                              <p className="font-semibold text-indigo-600">${trip.spent.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                              style={{ width: `${Math.min((trip.spent / trip.budget) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {trips.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
            <Link to="/trips/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Trip
              </Button>
            </Link>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
