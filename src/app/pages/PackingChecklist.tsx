import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Plus, Trash2, Package, CheckCircle2, Circle } from 'lucide-react';

const defaultCategories = ['Clothing', 'Toiletries', 'Electronics', 'Documents', 'Accessories', 'Other'];

export function PackingChecklist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, packingItems, addPackingItem, togglePackingItem, deletePackingItem } = useTrips();

  const trip = trips.find(t => t.id === id);
  const tripPackingItems = packingItems.filter(item => item.tripId === id);

  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Clothing');

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

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim() || !id) return;

    addPackingItem({
      tripId: id,
      item: newItem.trim(),
      category: selectedCategory,
      packed: false,
    });

    setNewItem('');
  };

  const groupedItems = tripPackingItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof tripPackingItems>);

  const totalItems = tripPackingItems.length;
  const packedItems = tripPackingItems.filter(item => item.packed).length;
  const progress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

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
        <h1 className="text-3xl font-bold text-gray-900">{trip.title} - Packing Checklist</h1>
        <p className="text-gray-600 mt-1">Never forget your essentials</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Progress</h2>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="font-semibold text-gray-900 whitespace-nowrap">
              {packedItems} / {totalItems}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            {progress === 100 ? '🎉 All packed and ready to go!' : `${Math.round(progress)}% complete`}
          </p>
        </CardBody>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Add New Item</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleAddItem} className="flex gap-3">
            <div className="flex-1">
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter item name..."
                className="mb-0"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {defaultCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </form>
        </CardBody>
      </Card>

      {totalItems === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items yet</h3>
            <p className="text-gray-600">Start adding items to your packing list</p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-6">
          {defaultCategories.map(category => {
            const items = groupedItems[category] || [];
            if (items.length === 0) return null;

            return (
              <Card key={category}>
                <CardHeader>
                  <h2 className="text-lg font-bold text-gray-900">{category}</h2>
                </CardHeader>
                <CardBody className="space-y-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <button
                        onClick={() => togglePackingItem(item.id)}
                        className="flex-shrink-0"
                      >
                        {item.packed ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300" />
                        )}
                      </button>
                      <span
                        className={`flex-1 ${
                          item.packed ? 'text-gray-400 line-through' : 'text-gray-900'
                        }`}
                      >
                        {item.item}
                      </span>
                      <button
                        onClick={() => deletePackingItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
