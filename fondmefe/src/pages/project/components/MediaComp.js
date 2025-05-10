import React, { useState } from 'react';



function MediaComp() {
  
    return (
        
         
          <div className="flex flex-col md:flex-row gap-6  p-[80px] py-0">
            <div className="flex-1 bg-gray-300 h-[550px] rounded-lg" />
            <div className="w-full md:w-1/3 flex flex-col space-y-4">
              {/* Raised Text with Underline */}
              <div className="relative text-xl font-semibold">
                4500/41000
                <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-green-400" />
              </div>
              {/* Comment Box */}
              <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-[467px]" />
                <input
                  type="text"
                  placeholder="What you think?"
                  className="w-full bg-gray-700 text-white p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );
}

export default MediaComp;