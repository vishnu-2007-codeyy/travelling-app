import { useParams, useNavigate } from 'react-router';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

export function BudgetBreakdown() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, itineraryItems } = useTrips();

  const trip = trips.find(t => t.id === id);
  const tripItems = itineraryItems.filter(item => item.tripId === id && item.cost);

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

  const categoryTotals = tripItems.reduce((acc, item) => {
    const category = item.category;
    acc[category] = (acc[category] || 0) + (item.cost || 0);
    return acc;
  }, {} as Record<string, number>);

  const totalSpent = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
  const remaining = trip.budget - totalSpent;
  const percentUsed = (totalSpent / trip.budget) * 100;

  const categoryColors: Record<string, string> = {
    flight: 'bg-blue-500',
    accommodation: 'bg-purple-500',
    activity: 'bg-green-500',
    food: 'bg-orange-500',
    transport: 'bg-indigo-500',
    other: 'bg-gray-500',
  };

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
        <h1 className="text-3xl font-bold text-gray-900">{trip.title} - Budget</h1>
        <p className="text-gray-600 mt-1">Track and manage your trip expenses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <DollarSign className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900">${trip.budget.toLocaleString()}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="text-2xl font-bold text-gray-900">${remaining.toLocaleString()}</p>
          </CardBody>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Budget Progress</h2>
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">
              {percentUsed.toFixed(1)}% of budget used
            </span>
            <span className="font-medium text-gray-900">
              ${totalSpent.toLocaleString()} / ${trip.budget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${
                percentUsed > 100
                  ? 'bg-red-500'
                  : percentUsed > 80
                  ? 'bg-yellow-500'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>
          {percentUsed > 100 && (
            <p className="text-sm text-red-600 mt-2">
              ⚠️ You've exceeded your budget by ${(totalSpent - trip.budget).toLocaleString()}
            </p>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Spending by Category
          </h2>
        </CardHeader>
        <CardBody>
          {Object.keys(categoryTotals).length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No expenses tracked yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(categoryTotals)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount]) => {
                  const percent = (amount / totalSpent) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900 capitalize">{category}</span>
                        <span className="text-gray-600">
                          ${amount.toLocaleString()} ({percent.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${categoryColors[category]} h-2 rounded-full`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
