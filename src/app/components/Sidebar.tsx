import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Search,
  Compass,
  User,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'My Trips', href: '/trips', icon: MapPin },
  { name: 'Create Trip', href: '/trips/new', icon: PlusCircle },
  { name: 'Explore Cities', href: '/explore/cities', icon: Search },
  { name: 'Activities', href: '/explore/activities', icon: Compass },
  { name: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-indigo-900 to-purple-900 text-white w-64">
      <div className="px-6 py-6 border-b border-indigo-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          Traveloop
        </h1>
        <p className="text-indigo-300 text-sm mt-1">Plan your perfect journey</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href ||
            (item.href !== '/' && location.pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-indigo-200 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-indigo-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-indigo-200 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
