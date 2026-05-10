import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Calendar, DollarSign, TrendingUp, Clock, Plus } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const { trips } = useTrips();

  const upcomingTrips = trips.filter(t => t.status === 'upcoming' || t.status === 'planning');
  const totalBudget = trips.reduce((sum, t) => sum + t.budget, 0);
  const totalSpent = trips.reduce((sum, t) => sum + t.spent, 0);

  const stats = [
    {
      name: 'Total Trips',
      value: trips.length,
      icon: MapPin,
      color: 'bg-indigo-500',
    },
    {
      name: 'Upcoming Trips',
      value: upcomingTrips.length,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      name: 'Total Budget',
      value: `$${totalBudget.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-pink-500',
    },
    {
      name: 'Total Spent',
      value: `$${totalSpent.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-indigo-600',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}! ✈️
        </h1>
        <p className="text-gray-600 mt-1">Here's an overview of your travel plans</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} hover>
              <CardBody className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
              <Link to="/trips/new">
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  New Trip
                </Button>
              </Link>
            </CardHeader>
            <CardBody className="space-y-4">
              {upcomingTrips.length > 0 ? (
                upcomingTrips.map((trip) => (
                  <Link key={trip.id} to={`/trips/${trip.id}`}>
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
                      <img
                        src={trip.image}
                        alt={trip.destination}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{trip.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          {trip.destination}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Budget</p>
                        <p className="font-semibold text-gray-900">${trip.budget}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                          trip.status === 'upcoming'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No upcoming trips yet</p>
                  <Link to="/trips/new">
                    <Button className="mt-4">Plan your first trip</Button>
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            </CardHeader>
            <CardBody className="space-y-3">
              <Link to="/trips/new">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Trip
                </Button>
              </Link>
              <Link to="/explore/cities">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Explore Cities
                </Button>
              </Link>
              <Link to="/trips">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View All Trips
                </Button>
              </Link>
            </CardBody>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Budget Overview</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-medium">${totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Total Budget</span>
                    <span className="font-medium">${totalBudget.toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Remaining</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${(totalBudget - totalSpent).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
