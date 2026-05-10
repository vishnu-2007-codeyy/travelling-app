import { useParams, Link } from 'react-router';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Calendar, Users, DollarSign, List, Clock, Package, FileText } from 'lucide-react';

export function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const { trips } = useTrips();

  const trip = trips.find(t => t.id === id);

  if (!trip) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <Card>
          <CardBody className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Trip not found</h2>
            <Link to="/trips">
              <Button>Back to Trips</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }

  const actions = [
    {
      title: 'Itinerary Builder',
      description: 'Plan your daily activities',
      icon: List,
      href: `/trips/${id}/itinerary`,
      color: 'bg-indigo-500',
    },
    {
      title: 'Budget Breakdown',
      description: 'Track expenses and budget',
      icon: DollarSign,
      href: `/trips/${id}/budget`,
      color: 'bg-purple-500',
    },
    {
      title: 'Timeline View',
      description: 'Visualize your trip schedule',
      icon: Clock,
      href: `/trips/${id}/timeline`,
      color: 'bg-pink-500',
    },
    {
      title: 'Packing Checklist',
      description: 'Never forget essentials',
      icon: Package,
      href: `/trips/${id}/packing`,
      color: 'bg-indigo-600',
    },
    {
      title: 'Notes & Journal',
      description: 'Document your memories',
      icon: FileText,
      href: `/trips/${id}/notes`,
      color: 'bg-purple-600',
    },
  ];

  const duration = Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-80 bg-gradient-to-r from-indigo-900 to-purple-900">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
            <p className="text-xl flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              {trip.destination}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody className="text-center">
              <Calendar className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-xl font-bold text-gray-900">{duration} days</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Travelers</p>
              <p className="text-xl font-bold text-gray-900">{trip.travelers}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <DollarSign className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Budget</p>
              <p className="text-xl font-bold text-gray-900">${trip.budget.toLocaleString()}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <DollarSign className="w-8 h-8 text-indigo-700 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Spent</p>
              <p className="text-xl font-bold text-gray-900">${trip.spent.toLocaleString()}</p>
            </CardBody>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.href}>
                  <Card hover className="h-full">
                    <CardBody className="flex flex-col items-center text-center p-8">
                      <div className={`${action.color} p-4 rounded-xl mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
