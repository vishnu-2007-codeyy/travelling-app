import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTrips } from '../context/TripsContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Plus, Trash2, FileText, Edit2 } from 'lucide-react';

export function Notes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, notes, addNote, updateNote, deleteNote } = useTrips();

  const trip = trips.find(t => t.id === id);
  const tripNotes = notes.filter(note => note.tripId === id);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !id) return;

    if (editingId) {
      updateNote(editingId, {
        title: formData.title,
        content: formData.content,
      });
      setEditingId(null);
    } else {
      addNote({
        tripId: id,
        title: formData.title,
        content: formData.content,
      });
    }

    setFormData({ title: '', content: '' });
    setIsAdding(false);
  };

  const handleEdit = (note: typeof tripNotes[0]) => {
    setFormData({ title: note.title, content: note.content });
    setEditingId(note.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '' });
    setEditingId(null);
    setIsAdding(false);
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
        <h1 className="text-3xl font-bold text-gray-900">{trip.title} - Notes & Journal</h1>
        <p className="text-gray-600 mt-1">Document your travel memories and ideas</p>
      </div>

      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} className="w-full mb-6">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      )}

      {isAdding && (
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? 'Edit Note' : 'New Note'}
            </h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Note title..."
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your thoughts..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  {editingId ? 'Update Note' : 'Save Note'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {tripNotes.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes yet</h3>
            <p className="text-gray-600">Start documenting your travel experiences</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tripNotes.map(note => (
            <Card key={note.id} hover>
              <CardHeader className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{note.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(note.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-indigo-600 hover:text-indigo-700 p-2"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>
              {note.content && (
                <CardBody className="pt-0">
                  <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
                </CardBody>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
