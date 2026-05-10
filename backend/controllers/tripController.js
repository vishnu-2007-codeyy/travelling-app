import { v4 as uuidv4 } from 'uuid';
import { getQuery, getAllQuery, runQuery } from '../models/database.js';

// TRIPS ENDPOINTS
export async function getTrips(req, res) {
  try {
    const trips = await getAllQuery(
      'SELECT * FROM trips WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(trips);
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getTripById(req, res) {
  try {
    const trip = await getQuery(
      'SELECT * FROM trips WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createTrip(req, res) {
  try {
    const { title, destination, startDate, endDate, budget, travelers, image } = req.body;

    if (!title || !destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const tripId = uuidv4();

    await runQuery(
      `INSERT INTO trips (id, user_id, title, destination, start_date, end_date, budget, image, travelers, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [tripId, req.user.id, title, destination, startDate, endDate, budget, image || '', travelers || 1, 'planning']
    );

    const newTrip = await getQuery('SELECT * FROM trips WHERE id = ?', [tripId]);
    res.status(201).json(newTrip);
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateTrip(req, res) {
  try {
    const { title, destination, startDate, endDate, budget, spent, status, travelers, image } = req.body;

    const trip = await getQuery(
      'SELECT * FROM trips WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    await runQuery(
      `UPDATE trips SET title = ?, destination = ?, start_date = ?, end_date = ?, budget = ?, spent = ?, status = ?, travelers = ?, image = ?
       WHERE id = ?`,
      [title || trip.title, destination || trip.destination, startDate || trip.start_date, endDate || trip.end_date,
       budget || trip.budget, spent !== undefined ? spent : trip.spent, status || trip.status, travelers || trip.travelers,
       image || trip.image, req.params.id]
    );

    const updatedTrip = await getQuery('SELECT * FROM trips WHERE id = ?', [req.params.id]);
    res.json(updatedTrip);
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteTrip(req, res) {
  try {
    const trip = await getQuery(
      'SELECT * FROM trips WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Delete related data
    await runQuery('DELETE FROM itinerary_items WHERE trip_id = ?', [req.params.id]);
    await runQuery('DELETE FROM packing_items WHERE trip_id = ?', [req.params.id]);
    await runQuery('DELETE FROM notes WHERE trip_id = ?', [req.params.id]);
    await runQuery('DELETE FROM trips WHERE id = ?', [req.params.id]);

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// ITINERARY ITEMS ENDPOINTS
export async function getItineraryItems(req, res) {
  try {
    const items = await getAllQuery(
      `SELECT i.* FROM itinerary_items i
       JOIN trips t ON i.trip_id = t.id
       WHERE i.trip_id = ? AND t.user_id = ?
       ORDER BY i.date, i.time`,
      [req.params.tripId, req.user.id]
    );
    res.json(items);
  } catch (error) {
    console.error('Get itinerary items error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createItineraryItem(req, res) {
  try {
    const { date, time, title, description, location, category, cost } = req.body;

    if (!date || !time || !title || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const itemId = uuidv4();

    await runQuery(
      `INSERT INTO itinerary_items (id, trip_id, date, time, title, description, location, category, cost)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [itemId, req.params.tripId, date, time, title, description || '', location || '', category, cost || 0]
    );

    const newItem = await getQuery('SELECT * FROM itinerary_items WHERE id = ?', [itemId]);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Create itinerary item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateItineraryItem(req, res) {
  try {
    const { date, time, title, description, location, category, cost } = req.body;

    const item = await getQuery('SELECT * FROM itinerary_items WHERE id = ?', [req.params.itemId]);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await runQuery(
      `UPDATE itinerary_items SET date = ?, time = ?, title = ?, description = ?, location = ?, category = ?, cost = ?
       WHERE id = ?`,
      [date || item.date, time || item.time, title || item.title, description || item.description,
       location || item.location, category || item.category, cost !== undefined ? cost : item.cost, req.params.itemId]
    );

    const updatedItem = await getQuery('SELECT * FROM itinerary_items WHERE id = ?', [req.params.itemId]);
    res.json(updatedItem);
  } catch (error) {
    console.error('Update itinerary item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteItineraryItem(req, res) {
  try {
    const item = await getQuery('SELECT * FROM itinerary_items WHERE id = ?', [req.params.itemId]);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await runQuery('DELETE FROM itinerary_items WHERE id = ?', [req.params.itemId]);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete itinerary item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// PACKING ITEMS ENDPOINTS
export async function getPackingItems(req, res) {
  try {
    const items = await getAllQuery(
      `SELECT p.* FROM packing_items p
       JOIN trips t ON p.trip_id = t.id
       WHERE p.trip_id = ? AND t.user_id = ?`,
      [req.params.tripId, req.user.id]
    );
    res.json(items);
  } catch (error) {
    console.error('Get packing items error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createPackingItem(req, res) {
  try {
    const { item, category } = req.body;

    if (!item || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const itemId = uuidv4();

    await runQuery(
      `INSERT INTO packing_items (id, trip_id, item, category, packed)
       VALUES (?, ?, ?, ?, ?)`,
      [itemId, req.params.tripId, item, category, 0]
    );

    const newItem = await getQuery('SELECT * FROM packing_items WHERE id = ?', [itemId]);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Create packing item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function togglePackingItem(req, res) {
  try {
    const packingItem = await getQuery('SELECT * FROM packing_items WHERE id = ?', [req.params.itemId]);
    if (!packingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await runQuery(
      'UPDATE packing_items SET packed = ? WHERE id = ?',
      [packingItem.packed ? 0 : 1, req.params.itemId]
    );

    const updatedItem = await getQuery('SELECT * FROM packing_items WHERE id = ?', [req.params.itemId]);
    res.json(updatedItem);
  } catch (error) {
    console.error('Toggle packing item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deletePackingItem(req, res) {
  try {
    const item = await getQuery('SELECT * FROM packing_items WHERE id = ?', [req.params.itemId]);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await runQuery('DELETE FROM packing_items WHERE id = ?', [req.params.itemId]);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete packing item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// NOTES ENDPOINTS
export async function getNotes(req, res) {
  try {
    const notes = await getAllQuery(
      `SELECT n.* FROM notes n
       JOIN trips t ON n.trip_id = t.id
       WHERE n.trip_id = ? AND t.user_id = ?
       ORDER BY n.created_at DESC`,
      [req.params.tripId, req.user.id]
    );
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const noteId = uuidv4();

    await runQuery(
      `INSERT INTO notes (id, trip_id, title, content)
       VALUES (?, ?, ?, ?)`,
      [noteId, req.params.tripId, title, content]
    );

    const newNote = await getQuery('SELECT * FROM notes WHERE id = ?', [noteId]);
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    const note = await getQuery('SELECT * FROM notes WHERE id = ?', [req.params.noteId]);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await runQuery(
      `UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [title || note.title, content || note.content, req.params.noteId]
    );

    const updatedNote = await getQuery('SELECT * FROM notes WHERE id = ?', [req.params.noteId]);
    res.json(updatedNote);
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteNote(req, res) {
  try {
    const note = await getQuery('SELECT * FROM notes WHERE id = ?', [req.params.noteId]);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await runQuery('DELETE FROM notes WHERE id = ?', [req.params.noteId]);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
