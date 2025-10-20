
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeLinkClass = "bg-blue-600 text-white";
  const inactiveLinkClass = "text-gray-300 hover:bg-blue-700 hover:text-white";
  const linkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'History', path: '/history' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <header className="bg-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
               <NavLink to="/dashboard" className="text-white text-xl font-bold tracking-wider">AdCreative AI</NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map(item => (
                   <NavLink key={item.name} to={item.path} className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} ${linkClasses}`}>
                     {item.name}
                   </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="text-sm text-blue-200 mr-4">
                Credits: {user?.credits.remaining}/{user?.credits.total}
              </div>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
                Logout
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} type="button" className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => (
                <NavLink key={item.name} to={item.path} className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} block ${linkClasses}`}>
                    {item.name}
                </NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-blue-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                 <p className="text-base font-medium leading-none text-white">{user?.email}</p>
                 <p className="text-sm font-medium leading-none text-blue-300 mt-1">Credits: {user?.credits.remaining}/{user?.credits.total}</p>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700">Logout</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
