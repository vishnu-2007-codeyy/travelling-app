import { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Compass, Mountain, UtensilsCrossed, Camera, Waves, Building2 } from 'lucide-react';

const activityCategories = [
  { name: 'All', icon: Compass },
  { name: 'Adventure', icon: Mountain },
  { name: 'Food & Dining', icon: UtensilsCrossed },
  { name: 'Sightseeing', icon: Camera },
  { name: 'Water Sports', icon: Waves },
  { name: 'Cultural', icon: Building2 },
];

const mockActivities = [
  {
    id: 1,
    title: 'Eiffel Tower Summit Tour',
    category: 'Sightseeing',
    location: 'Paris, France',
    duration: '2 hours',
    price: 45,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
  },
  {
    id: 2,
    title: 'Scuba Diving Experience',
    category: 'Water Sports',
    location: 'Bali, Indonesia',
    duration: '4 hours',
    price: 120,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  },
  {
    id: 3,
    title: 'Street Food Tour',
    category: 'Food & Dining',
    location: 'Bangkok, Thailand',
    duration: '3 hours',
    price: 35,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
  },
  {
    id: 4,
    title: 'Mountain Hiking Adventure',
    category: 'Adventure',
    location: 'Swiss Alps, Switzerland',
    duration: '6 hours',
    price: 80,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
  },
  {
    id: 5,
    title: 'Temple & Shrine Tour',
    category: 'Cultural',
    location: 'Kyoto, Japan',
    duration: '5 hours',
    price: 65,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
  },
  {
    id: 6,
    title: 'Cooking Class Experience',
    category: 'Food & Dining',
    location: 'Rome, Italy',
    duration: '3 hours',
    price: 75,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
  },
];

export function ActivityExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredActivities = selectedCategory === 'All'
    ? mockActivities
    : mockActivities.filter(activity => activity.category === selectedCategory);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activity Explorer</h1>
        <p className="text-gray-600 mt-1">Find exciting activities for your trips</p>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {activityCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.name
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} hover className="overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-full">
                <span className="font-bold text-indigo-600">${activity.price}</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-sm">⭐ {activity.rating}</span>
              </div>
            </div>
            <CardBody>
              <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded mb-2">
                {activity.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{activity.location}</p>
              <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-200">
                <span>⏱️ {activity.duration}</span>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Learn more →
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
