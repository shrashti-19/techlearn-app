import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoLight from '../../assets/logoo.png';
import logoDark from '../../assets/logoo2.png';

const Sidebar = ({onToggle}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggle(newCollapsed); // Notify parent component
  };

  const menuItems = [
    { id: 'username', text: 'Profile', completed: false },
    { id: 'courses', text: 'Courses', completed: false },
    { id: 'exercises', text: 'Exercises', completed: false },
    { id: 'projects', text: 'Projects', completed: false },
    { id: 'dashboard', text: 'Dashboard', completed: true },
  ];

  return (
    <div className={`
      fixed top-0 bottom-0 left-0
      bg-white dark:bg-gray-900
      transition-all duration-300
      z-50
      ${collapsed ? 'w-16' : 'w-56'}
      border-r border-gray-200 dark:border-gray-700
      flex flex-col
    `}>
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 bg-gray-800 dark:bg-gray-700 text-white p-1 rounded-full shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-all"
      >
        {collapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
      </button>

      {/* Centered Logo Section - Bigger Size */}
      <div className={`h-24 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center p-2`}>
        {collapsed ? (
          <>
            <img src={logoLight} alt="Logo" className="w-12 h-12 object-contain dark:hidden" />
            <img src={logoDark} alt="Logo" className="w-12 h-12 object-contain hidden dark:block" />
          </>
        ) : (
          <>
            <img src={logoLight} alt="Logo" className="h-14 object-contain dark:hidden" />
            <img src={logoDark} alt="Logo" className="h-14 object-contain hidden dark:block" />
          </>
        )}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={`/${item.id}`}
                className={`
                  flex items-center py-2 px-3 rounded-md transition-colors
                  ${item.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}
                  hover:bg-gray-100 dark:hover:bg-gray-800
                `}
              >
                <span className={`mr-3 ${collapsed ? 'hidden' : 'block'}`}>
                  {item.completed ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="w-4 h-4 border border-gray-400 dark:border-gray-500 rounded-sm"></span>
                  )}
                </span>
                {!collapsed && (
                  <span>{item.text}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {!collapsed && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">
              Settings
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;