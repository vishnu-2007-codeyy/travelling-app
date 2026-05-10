import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { MyTrips } from "./pages/MyTrips";
import { CreateTrip } from "./pages/CreateTrip";
import { TripDetail } from "./pages/TripDetail";
import { ItineraryBuilder } from "./pages/ItineraryBuilder";
import { BudgetBreakdown } from "./pages/BudgetBreakdown";
import { CitySearch } from "./pages/CitySearch";
import { ActivityExplorer } from "./pages/ActivityExplorer";
import { TimelineView } from "./pages/TimelineView";
import { PackingChecklist } from "./pages/PackingChecklist";
import { Notes } from "./pages/Notes";
import { UserProfile } from "./pages/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "trips", Component: MyTrips },
      { path: "trips/new", Component: CreateTrip },
      { path: "trips/:id", Component: TripDetail },
      { path: "trips/:id/itinerary", Component: ItineraryBuilder },
      { path: "trips/:id/budget", Component: BudgetBreakdown },
      { path: "trips/:id/timeline", Component: TimelineView },
      { path: "trips/:id/packing", Component: PackingChecklist },
      { path: "trips/:id/notes", Component: Notes },
      { path: "explore/cities", Component: CitySearch },
      { path: "explore/activities", Component: ActivityExplorer },
      { path: "profile", Component: UserProfile },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
