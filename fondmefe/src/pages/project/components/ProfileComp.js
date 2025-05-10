import React from "react";
import { FaThumbsUp, FaComment } from 'react-icons/fa';


function ProfileComp(props){
    
    return(
        <div className="flex items-center justify-between h-[120px] p-[50px] px-[70px] pb-[60px]  ">
            <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-500 rounded-full" />
            <div>
                <h1 className="text-2xl font-semibold">{props.title}</h1>
                <p className="text-gray-400 text-sm">Riyad Rachidi · 30k Followers</p>
            </div>
            <button className="px-4 py-1 bg-green-400 text-black rounded">Follow</button>
            <button className="px-4 py-1 border border-gray-600 text-gray-300 rounded">Share</button>
            </div>

            <div className="flex items-center space-x-6">
            <button className="px-6 py-2 bg-green-400 text-black rounded">Donate</button>
            <div className="flex items-center space-x-1 text-gray-400">
                <FaThumbsUp />
                <span>+78</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
                <FaComment />
                <span>+24</span>
            </div>
            </div>
      </div>
    );
}

export	default ProfileComp;