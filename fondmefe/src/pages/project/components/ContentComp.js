import React from 'react';

function ContentComp(props){
    
   const campaigns = props.campaigns || [];
   const rewards=props.rewards || [];
   const faq=props.faq ||[];
    return(
        <div className="p-[120px] py-0 h-[300px] flex">
            
            <div className="w-1/4 py-[40px]">
                {props.activeTab === 'Campaigns' && (
                    <ul className="space-y-3">
                    {campaigns.map(item => (
                        <li key={item.id} className="text-gray-300">
                        {item.campaignName}
                        </li>
                    ))}
                    </ul>
                )}
                {props.activeTab === 'Rewards' && (
                    <ul className="space-y-3">
                    {rewards.map(item => (
                        <li key={item.id} className="text-gray-300">
                        {item.title}
                        </li>
                    ))}
                    </ul>
                )}
                {props.activeTab === 'FAQ' && (
                <ul className="space-y-4 text-gray-300">
                    {faq.map(item => (
                    <li key={item.id}>
                        <p className="font-semibold">{item.content}</p>
                        
                    </li>
                    ))}
                </ul>
                )}

                {props.activeTab === 'Creators' && (
                   <div className='pl-[40%]'>
                     <div className='h-[100px] w-[100px] overflow-hidden rounded-[200px] mb-[10px]'>
                        <img src="/static/icons/Account.png" className='w-[100%]'></img>
                     </div>
                     <p className='text-center w-[100px]'>{props.name}</p> 
                     <p className='text-center w-[100px]'>{props.followers}</p>   
                   </div> 
                   
                )}
            </div>
            {/* Main Content Placeholder */}
            <div className="flex-1 bg-black">
                {/* Add detailed content for other tabs here */}
                {props.activeTab === 'Creators' && (
                   <div className='mt-[50px]'>
                     <p>{props.description}</p> 
                   </div> 
                   
                )}
                {props.activeTab === 'FAQ' && (
                <ul className="space-y-4 mt-[65px] text-gray-300">
                    {faq.map(item => (
                    <li key={item.id}>
                        <p className="mt-[20px] font-semibold">{item.answer}</p>
                        
                    </li>
                    ))}
                </ul>
                )}
            </div>
      </div>
    );
}

export default ContentComp;