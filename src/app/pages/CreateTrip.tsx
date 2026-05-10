import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft } from 'lucide-react';

export function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();

  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: '1',
    image: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTrip = {
      title: formData.title,
      destination: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseFloat(formData.budget),
      spent: 0,
      travelers: parseInt(formData.travelers),
      image: formData.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      status: 'planning' as const,
    };

    addTrip(newTrip);
    navigate('/trips');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900">Create New Trip</h1>
          <p className="text-gray-600 mt-1">Start planning your next adventure</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Trip Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Summer in Paris"
              required
            />

            <Input
              label="Destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Paris, France"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Start Date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />

              <Input
                type="date"
                label="End Date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                label="Budget ($)"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="2500"
                min="0"
                step="0.01"
                required
              />

              <Input
                type="number"
                label="Number of Travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <Input
              label="Cover Image URL (optional)"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Create Trip
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/trips')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
