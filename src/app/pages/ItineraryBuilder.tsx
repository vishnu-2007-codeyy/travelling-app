import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Plus, Trash2, MapPin, Clock } from 'lucide-react';

export function ItineraryBuilder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, itineraryItems, addItineraryItem, deleteItineraryItem } = useTrips();

  const trip = trips.find(t => t.id === id);
  const tripItems = itineraryItems.filter(item => item.tripId === id);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    title: '',
    description: '',
    location: '',
    category: 'activity' as const,
    cost: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    addItineraryItem({
      tripId: id,
      date: formData.date,
      time: formData.time,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      category: formData.category,
      cost: formData.cost ? parseFloat(formData.cost) : undefined,
    });

    setFormData({
      date: '',
      time: '',
      title: '',
      description: '',
      location: '',
      category: 'activity',
      cost: '',
    });
    setIsAdding(false);
  };

  const categoryColors = {
    flight: 'bg-blue-100 text-blue-700',
    accommodation: 'bg-purple-100 text-purple-700',
    activity: 'bg-green-100 text-green-700',
    food: 'bg-orange-100 text-orange-700',
    transport: 'bg-indigo-100 text-indigo-700',
    other: 'bg-gray-100 text-gray-700',
  };

  const groupedItems = tripItems.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, typeof tripItems>);

  Object.keys(groupedItems).forEach(date => {
    groupedItems[date].sort((a, b) => a.time.localeCompare(b.time));
  });

  if (!trip) {
    return (
      <div className="p-8">
        <Card>
          <CardBody className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Trip not found</h2>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(`/trips/${id}`)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Trip
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{trip.title} - Itinerary</h1>
        <p className="text-gray-600 mt-1">Plan your daily activities and schedule</p>
      </div>

      <div className="space-y-6">
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Activity
          </Button>
        )}

        {isAdding && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Add New Activity</h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <Input
                    type="time"
                    label="Time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label="Activity Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Visit Eiffel Tower"
                  required
                />

                <Input
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details"
                />

                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Champ de Mars, Paris"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="activity">Activity</option>
                      <option value="flight">Flight</option>
                      <option value="accommodation">Accommodation</option>
                      <option value="food">Food</option>
                      <option value="transport">Transport</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <Input
                    type="number"
                    label="Cost ($)"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">Add Activity</Button>
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        {Object.keys(groupedItems).length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities yet</h3>
              <p className="text-gray-600">Start planning your itinerary</p>
            </CardBody>
          </Card>
        ) : (
          Object.entries(groupedItems).sort().map(([date, items]) => (
            <Card key={date}>
              <CardHeader>
                <h2 className="text-lg font-bold text-gray-900">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h2>
              </CardHeader>
              <CardBody className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-shrink-0 text-center">
                      <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm font-medium text-gray-900">{item.time}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[item.category]}`}>
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      )}
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </p>
                      {item.cost && (
                        <p className="text-sm font-medium text-indigo-600 mt-2">
                          ${item.cost.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteItineraryItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
