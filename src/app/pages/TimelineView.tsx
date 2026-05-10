import { useParams, useNavigate } from 'react-router';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ArrowLeft, Calendar } from 'lucide-react';

export function TimelineView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, itineraryItems } = useTrips();

  const trip = trips.find(t => t.id === id);
  const tripItems = itineraryItems.filter(item => item.tripId === id);

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

  const groupedByDate = tripItems.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, typeof tripItems>);

  Object.keys(groupedByDate).forEach(date => {
    groupedByDate[date].sort((a, b) => a.time.localeCompare(b.time));
  });

  const sortedDates = Object.keys(groupedByDate).sort();

  const categoryIcons: Record<string, string> = {
    flight: '✈️',
    accommodation: '🏨',
    activity: '🎯',
    food: '🍽️',
    transport: '🚗',
    other: '📌',
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(`/trips/${id}`)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Trip
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{trip.title} - Timeline</h1>
        <p className="text-gray-600 mt-1">Visual overview of your trip schedule</p>
      </div>

      {sortedDates.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No timeline yet</h3>
            <p className="text-gray-600">Add activities to your itinerary to see them here</p>
          </CardBody>
        </Card>
      ) : (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

          <div className="space-y-8">
            {sortedDates.map((date, dateIndex) => (
              <div key={date} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold z-10">
                    Day {dateIndex + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h2>
                  </div>
                </div>

                <div className="ml-24 space-y-4">
                  {groupedByDate[date].map((item, index) => (
                    <Card key={item.id} hover>
                      <CardBody className="flex gap-4">
                        <div className="flex-shrink-0 text-center">
                          <div className="text-2xl mb-1">{categoryIcons[item.category]}</div>
                          <p className="text-sm font-medium text-gray-900">{item.time}</p>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          {item.description && (
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          )}
                          <p className="text-sm text-gray-500">📍 {item.location}</p>
                          {item.cost && (
                            <p className="text-sm font-medium text-indigo-600 mt-2">
                              💰 ${item.cost.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
