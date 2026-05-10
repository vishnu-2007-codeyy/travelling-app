import express from 'express';
import {
  getTrips, getTripById, createTrip, updateTrip, deleteTrip,
  getItineraryItems, createItineraryItem, updateItineraryItem, deleteItineraryItem,
  getPackingItems, createPackingItem, togglePackingItem, deletePackingItem,
  getNotes, createNote, updateNote, deleteNote
} from '../controllers/tripController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(verifyToken);

// Trip routes
router.get('/trips', getTrips);
router.post('/trips', createTrip);
router.get('/trips/:id', getTripById);
router.put('/trips/:id', updateTrip);
router.delete('/trips/:id', deleteTrip);

// Itinerary routes
router.get('/trips/:tripId/itinerary', getItineraryItems);
router.post('/trips/:tripId/itinerary', createItineraryItem);
router.put('/itinerary/:itemId', updateItineraryItem);
router.delete('/itinerary/:itemId', deleteItineraryItem);

// Packing routes
router.get('/trips/:tripId/packing', getPackingItems);
router.post('/trips/:tripId/packing', createPackingItem);
router.put('/packing/:itemId', togglePackingItem);
router.delete('/packing/:itemId', deletePackingItem);

// Notes routes
router.get('/trips/:tripId/notes', getNotes);
router.post('/trips/:tripId/notes', createNote);
router.put('/notes/:noteId', updateNote);
router.delete('/notes/:noteId', deleteNote);

export default router;
