import React from "react";
import { Link } from 'react-router-dom';

function Header(){
    return(
        <section className="Header">
            <div class="flex justify-evenly dark:bg-black bg-white h-[400px]">
                <div class="dark:text-white text-black w-[600px] h-[150px] relative left-10 pt-[45px]">
                    <h1 class="block text-[50px] font-bold">Unlock Your Potential</h1>
                    <p class="block text-[20px]">Your Hands Can Turn Ideas into 100 Projects</p>
                    <Link to='/projects/:101' class="block mt-[20px] w-[100px] p-[10px] rounded-[100px] text-center bg-[#1DCD9F] cursor-pointer">Fund</Link>
                </div>
                <div class="border-[5px] overflow-hidden rounded-[20px] border-[#1DCD9F] border-solid w-[30%] h-[80%] relative right-10">
                    <img src="/fileStorage/images/b471e593-2eb5-4e09-9646-a2256f175bf2_EcoVision Initiative2026.png"></img>
                </div>
        
        
            </div>
        </section>
    );
}

export default Header;