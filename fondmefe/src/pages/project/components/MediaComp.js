import React, { useState } from 'react';



function MediaComp(props) {
  
    return (
        
         
          <div className="flex flex-col md:flex-row gap-6  p-[80px] py-0">
            <div className="flex-1 bg-gray-300 h-[550px] rounded-lg">
               <video className='w-[100%] h-[100%] bg-black' width="100%" height="100%" controls>
                  {/*<source src={`https://storage.cloud.google.com/fundme-asset/${props.name+props.videoId}.mp4`} type="video/mp4"/>*/}
                  <source src={`/fileStorage${props.videoUrl}`} type="video/mp4"/>
                  
                </video>
               
            </div>
            <div className="w-full md:w-1/3 flex flex-col space-y-4">
              {/* Raised Text with Underline */}
              <div className="relative text-xl font-semibold">
                4500/{props.donationGoal}
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