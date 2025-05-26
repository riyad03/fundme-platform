import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import {calculateDateDifference} from "../../../components/calc";
import {cacheProject,cacheUser} from "../../../components/cach";



function PopularProjects(props){
    const [ProjectData,SetProject]=useState(null);
    const [UserData,SetUser]=useState(null);
    useEffect(() => {
        const type = props.status.toLowerCase();

        const fetchProjectsAndUsers = async () => {
            try {
                /** Fetch projects */
                const res = await fetch(`http://localhost:8080/api/projects?status=${type}`);
                if (!res.ok) throw new Error("Failed to fetch projects");
                const projects = await res.json();
                SetProject(projects);

                /** Extract unique creatorIds */
                const creatorIds = [...new Set(projects.map(project => project.creatorId))];

                /** Fetch all users in parallel using Promise.all */
                const userPromises = creatorIds.map(async (creatorId) => {
                    const userRes = await fetch(`http://localhost:8080/api/users/${creatorId}`);
                    if (!userRes.ok) throw new Error(`Failed to fetch user for creatorId ${creatorId}`);
                    const user = await userRes.json();
                    return { creatorId, user };
                });

                const usersData = await Promise.all(userPromises);

                /** Create a map of creatorId -> user */
                const usersMap = {};
                usersData.forEach(({ creatorId, user }) => {
                    usersMap[creatorId] = user;
                });

                SetUser(usersMap);

            } catch (err) {
                console.error("❌ Fetch error:", err);
            }
        };

    fetchProjectsAndUsers();

    }, [props.status]);

    const proj=ProjectData || [{id:0, title:'test'},{id:1, title:'test1'}];
    console.log(proj);
    const usersMap=UserData??[];
    //const proj=[{id:0, title:'test'}];
    return(
        <section className="ProjectList">
            
            <div class=" p-[10%] pt-[0px] w-[100%] ">
                
                <h1 class=" text-white text-[40px] mb-[20px]">{props.tag}</h1>
                
                <div class="grid ml-[100px] md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16  ">
                    {proj.map(key=> (
                        <Link key={key.id} /*onClick={()=>cacheProject(key.id,key)}*/ to={`/projects/${key.id}`} state={{project:key,user:usersMap?.[key.creatorId]}}>
                            <div className="Project" class="w-[300px] h-[400px] border border-[#222222] rounded-[20px] overflow-hidden bg-[#191919cc]">
                                <div class="overflow-hidden h-[180px] bg-black">{/*<img src={`https://storage.cloud.google.com/fundme-asset/${key.name+key.imageId}.png`}>*</img>*/}<img src={`/fileStorage${key.imageUrl}`}></img></div>
                                <div className="Description" class="h-[120px] p-[20px] pt-[10px]">
                                    <h1 class="text-white font-[20px] text-[22px] font-normal">{key.title}</h1>
                                    <p class="text-[#6e6e6e] mb-[10px]">{(usersMap?.[key.creatorId])?.name}</p>
                                    <div className="details" class=" flex justify-between text-[#6e6e6e]">
                                        <p>{key.id} views</p>
                                        <p>{calculateDateDifference(key.dateStarted)}
                                        </p>
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