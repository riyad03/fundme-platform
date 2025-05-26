import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';


function Nav(){
    const [SignedIn,SetSign]=useState(false);
    const [profileList,SetEnableProfileList]=useState(false);
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        SetSign(isLoggedIn);
    }, []); // runs once after the component mounts

    const enableList=()=>{
        if(profileList===false){
            SetEnableProfileList(true);
        }
        else{
            SetEnableProfileList(false);
        }
    }
    const disablelist=()=>{
        SetEnableProfileList(false);
    }
    const signOut=()=>{
        localStorage.removeItem("isLoggedIn");
        SetSign(false);
    }
    return(
        <div class="flex justify-between w-full p-[18px] dark:bg-[#000000]">
            <div class="w-[140px] h-[50px]">

            </div>
            <div class='pt-[10px]'>
                <ul class="flex ">
                    <li><Link class="m-[10px] dark:text-white" to='/'>Home</Link></li>
                    <li><Link class="m-[10px] dark:text-white"  to='/launch'>Launch </Link></li>
                    <li><Link class="m-[10px] dark:text-white" to='/about'>About</Link></li>
                    <li><Link class="m-[10px] dark:text-white" to='/contactus'>Contact</Link></li>
                    {
                        SignedIn?(
                        <div className="flex w-[110px]">
                            <li className="w-[50px] bg-black border-2 border-[#22c55e] mt-0 relative -top-2.5 rounded-full overflow-hidden h-[50px]"><Link class="m-[10px] dark:text-white" to='/'><img className="w-[30px] relative -top-[15px] left-[8px]" src="http://img.icons8.com/m_rounded/512/FFFFFF/appointment-reminders.png"></img></Link></li>
                            <li className="border-[#22c55e]"><Link onClick={enableList}  className="border-2 border-[#22c55e] block w-[50px] h-[50px] mt-0 relative -top-2.5 rounded-full ml-[10px] p-[8px] pl-[9.5px]"><img className="w-[28px]" src="/static/icons/Account.png"></img></Link></li>
                            <ul onMouseLeave ={disablelist} className={`${!profileList ? 'hidden':''} absolute right-[10px] overflow-hidden border-2 border-[#1dcd9f] text-white bg-black rounded-[20px] z-[2]`}>
                                    <li><Link to='/projectediting' className="block p-[10px] pb-[10px] hover:bg-green-500 cursor-pointer ">Check Profile</Link></li>
                                    <li><Link to='/projectcreation' className=" block p-[10px] pb-[10px] hover:bg-green-500 cursor-pointer ">Create Project</Link></li>
                                    <li><a onClick={signOut} className=" block p-[10px] pb-[15px] hover:bg-green-500 cursor-pointer ">Sign out</a></li>
                            </ul>
                        </div>
                        ):(
                            <div>
                                <li className=""><Link   className="border-2 border-[#22c55e] block w-[50px] h-[50px] mt-0 relative -top-2.5 rounded-full ml-[10px] p-[8px] pl-[9.5px]"  to='/signup'><img className="w-[28px]" src="/static/icons/Account.png"></img></Link></li>
                                
                            </div>
                        )

                        
                    }
                    
                    
                    
                </ul>
            </div>
        </div>
    )
}

export default Nav;