import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Mail, MapPin, Calendar, DollarSign, Edit2, Check, X } from 'lucide-react';

export function UserProfile() {
  const { user } = useAuth();
  const { trips } = useTrips();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

  const totalTrips = trips.length;
  const completedTrips = trips.filter(t => t.status === 'completed').length;
  const totalBudget = trips.reduce((sum, t) => sum + t.budget, 0);
  const totalSpent = trips.reduce((sum, t) => sum + t.spent, 0);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setIsEditing(false);
  };

  const stats = [
    {
      name: 'Total Trips',
      value: totalTrips,
      icon: MapPin,
      color: 'bg-indigo-500',
    },
    {
      name: 'Completed',
      value: completedTrips,
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
      icon: DollarSign,
      color: 'bg-indigo-600',
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account and view your travel statistics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-center"
                  />
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" onClick={handleSave}>
                      <Check className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    className="mt-2"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit Profile
                  </Button>
                </>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 text-left space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">{totalTrips} trips planned</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Travel Statistics</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.name}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.name}</p>
                        <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {trips.slice(0, 5).map((trip) => (
                  <div key={trip.id} className="flex items-center gap-4">
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{trip.title}</h3>
                      <p className="text-sm text-gray-600">{trip.destination}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trip.status === 'planning'
                          ? 'bg-yellow-100 text-yellow-700'
                          : trip.status === 'upcoming'
                          ? 'bg-green-100 text-green-700'
                          : trip.status === 'ongoing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>
                ))}

                {trips.length === 0 && (
                  <p className="text-center text-gray-600 py-8">No trips yet</p>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
