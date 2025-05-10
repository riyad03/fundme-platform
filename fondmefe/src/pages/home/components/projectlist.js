import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";



function PopularProjects(props){
    const [ProjectData,SetProject]=useState(null);
    useEffect(() => {
        const type = (props.status).toLowerCase();
    
        fetch(`http://localhost:8080/api/projects/batch?type=${type}`)
          .then((res) => {
            if (res.ok) return res.json();
            throw new Error("Failed to fetch");
          })
          .then((data) => {
            SetProject(data);
            console.log(`✅ ${props.tag} Projects:`, data);
          })
          .catch((err) => console.error("❌ Fetch error:", err));
      }, [props.tag]);

    const proj=ProjectData || [{id:0, title:'test'},{id:1, title:'test1'}];
    //const proj=[{id:0, title:'test'}];
    return(
        <section className="ProjectList">
            
            <div class=" p-[10%] pt-[0px] w-[100%] ">
                
                <h1 class=" text-white text-[40px] mb-[20px]">{props.tag}</h1>
                
                <div class="grid ml-[100px] md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16  ">
                    {proj.map(key=> (
                        <Link key={key.id} to={`/projects/${key.id}`}>
                            <div className="Project" class="w-[300px] h-[330px] border border-[#222222] rounded-[20px] overflow-hidden bg-[#191919cc]">
                                <div class="h-[180px] bg-white"><img></img></div>
                                <div className="Description" class="h-[120px] p-[20px] pt-[10px]">
                                    <h1 class="text-white text-[22px] font-normal">Project Title</h1>
                                    <p class="text-[#6e6e6e] mb-[10px]">Jebrane_7mar</p>
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
                        </Link>))}
                    
                    
                </div>
                
            </div>
        </section>
    );
}

export default PopularProjects;