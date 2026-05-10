import { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Search, MapPin, Thermometer, Users, Star } from 'lucide-react';

const mockCities = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'The City of Light, known for art, fashion, and culture',
    temperature: '18°C',
    population: '2.1M',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    description: 'A vibrant metropolis blending tradition and innovation',
    temperature: '22°C',
    population: '14M',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    description: 'Mediterranean charm with stunning architecture',
    temperature: '24°C',
    population: '1.6M',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'The city that never sleeps',
    temperature: '15°C',
    population: '8.3M',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Modern luxury in the desert',
    temperature: '32°C',
    population: '3.3M',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    description: 'Ancient history meets modern Italian life',
    temperature: '20°C',
    population: '2.8M',
    rating: 4.8,
  },
];

export function CitySearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = mockCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Cities</h1>
        <p className="text-gray-600 mt-1">Discover your next travel destination</p>
      </div>

      <div className="mb-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search cities, countries, or attractions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city) => (
          <Card key={city.id} hover className="overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-900">{city.rating}</span>
              </div>
            </div>
            <CardBody>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{city.name}</h3>
              <p className="text-sm text-indigo-600 font-medium mb-3 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {city.country}
              </p>
              <p className="text-sm text-gray-600 mb-4">{city.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Thermometer className="w-4 h-4" />
                  {city.temperature}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  {city.population}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No cities found</h3>
            <p className="text-gray-600">Try a different search term</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
