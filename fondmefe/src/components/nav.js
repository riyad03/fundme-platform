import React from "react";
import { Link } from 'react-router-dom';


function Nav(){
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
                    <li>login</li>
                </ul>
            </div>
        </div>
    )
}

export default Nav;