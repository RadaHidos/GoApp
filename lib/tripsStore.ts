export interface Trip {
  id: string;
  createdAt: string;
  destination: string;
  departure: string;
  days: number;
  budget: number;
  people: number;
  isCouple: boolean;
  vibes: string[];
  totalCost: number;
  savings: number;
  progressPercent: number;
  isOverBudget: boolean;
  selectedFlight: {
    id: string;
    airline: string;
    time: string;
    price: number;
    stops: string;
  };
  selectedStay: {
    id: string;
    name: string;
    distance: string;
    price: number;
    image: string;
  };
  selectedPlaces: string[]; // Store IDs of selected places
}

const STORAGE_KEY = "go_saved_trips";

export const getTrips = (): Trip[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getTripById = (id: string): Trip | undefined => {
  const trips = getTrips();
  return trips.find((t) => t.id === id);
};

export const saveTrip = (trip: Trip): Trip[] => {
  if (typeof window === "undefined") return [];
  const trips = getTrips();
  const newTrips = [trip, ...trips];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrips));
  return newTrips;
};

export const deleteTrip = (id: string): Trip[] => {
  if (typeof window === "undefined") return [];
  const trips = getTrips();
  const newTrips = trips.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrips));
  return newTrips;
};

export const clearTrips = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
