import React from "react";

function Header(){
    return(
        <section className="Header">
            <div class="flex justify-evenly dark:bg-black h-[400px]">
                <div class="dark:text-white w-[600px] h-[150px] relative left-10 pt-[45px]">
                    <h1 class="block text-[50px] font-bold">Unlock Your Potential</h1>
                    <p class="block text-[20px]">Your Hands Can Turn Ideas into 100 Projects</p>
                    <a class="block mt-[20px] w-[100px] p-[10px] rounded-[100px] text-center bg-[#1DCD9F] cursor-pointer">Fund</a>
                </div>
                <div class="border-[5px] border-white border-solid w-[30%] h-[80%] relative right-10">
                    <img></img>
                </div>
        
        
            </div>
        </section>
    );
}

export default Header;