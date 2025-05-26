import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';



function SuggestionsComp(props){
    const [ProjectsData,SetProjects]=useState(null);
    

    useEffect(()=>{
        
        const type=(props.SimilarTag || 'default').toLowerCase();
        fetch(`http://localhost:8080/api/projects?type=${type}`).
        then((res)=>{
            if(res.ok) return res.json();
            throw new Error("Failed to fetch");
        }).then((data)=>{
            SetProjects(data);
            
        }).catch((err) => console.error("❌ Fetch error:", err));
    },props.tag);

    

   

    
    const Relatedprojects=[{id:0,title:"test"},{id:1,title:"test"},{id:2,title:"test"}]||ProjectsData;
    
    return(
        <div class="p-[30px] pl-[80px]">
            <h1 class="text-[30px] font-semibold">More related to {props.SimilarTag}</h1>
            <div class=" pl-[50px] pt-[50px] grid md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
                {
                Relatedprojects.map(
                        project=>(

                        <Link  key={project.id} to={`../projects/${project.id}`}>
                             <div className="Project" class="w-[300px] h-[330px] border border-[#222222] rounded-[20px] overflow-hidden bg-[#191919cc]">
                                <div class="h-[180px] bg-white"><img></img></div>
                                <div className="Description" class="h-[120px] p-[20px] pt-[10px]">
                                    <h1 class="text-white text-[22px] font-normal">{Relatedprojects.name}</h1>
                                    <p class="text-[#6e6e6e] mb-[10px]">Riyad Rachidi</p>
                                    <div className="details" class=" flex justify-between text-[#6e6e6e]">
                                        <p>1200 contributions</p>
                                        <p>13 years ago</p>
                                    </div>
                                
                                    <div className="CallAction" class="flex justify-start">
                                    <a class="block mt-[05px] w-[80px] p-[5px] text-[14px] rounded-[100px] text-center bg-[#1DCD9F] cursor-pointer text-white">Consult</a>
                                    <a class="block ml-[05px] mt-[05px] w-[80px] p-[5px] text-[14px] rounded-[100px] text-center border border-[#1dcd9f] cursor-pointer text-white">Save</a>

                                    </div>
                                </div>
                                
                            </div>

                        </Link>))
                }
            </div>
        </div>
    )
}

export default SuggestionsComp;