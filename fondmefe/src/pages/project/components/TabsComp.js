import React from 'react';

function TabsComp(props) {
  // Destructure what you expect from props
  const { tabs, activeTab, onTabChange } = props;

  return (
    <div className="px-6">
      <nav className="flex justify-around space-x-6 border-b border-gray-700 border-t p-[10px]">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-3 text-sm ${
              activeTab === tab
                ? 'border-b-2 border-green-400 text-white'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default TabsComp;
