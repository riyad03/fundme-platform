import React from 'react';

function ContentComp(props){
   
    return(
        <div className="p-[120px] py-0 h-[300px] flex">
            {/* Sidebar */}
            <div className="w-1/4 py-[40px]">
            {props.activeTab === 'Campaigns' && (
                <ul className="space-y-3">
                {props.campaigns.map(item => (
                    <li key={item} className="text-gray-300">
                    {item}
                    </li>
                ))}
                </ul>
            )}
            </div>
            {/* Main Content Placeholder */}
            <div className="flex-1 bg-black">
            {/* Add detailed content for other tabs here */}
            </div>
      </div>
    );
}

export default ContentComp;