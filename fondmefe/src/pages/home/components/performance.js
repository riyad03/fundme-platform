import React from "react";


function Performance(){
    return(
        <section className="Performances">
            <div class="h-[100px] dark:bg-[#0000008a] border-t border-t-[#1e1e1e] border-b border-b-[#1e1e1e] border-solid">
                <ul class="flex justify-center space-x-[180px] dark:text-white pt-[3px]">
                    <li> <img></img><h3 class="text-[35px] text-center text-[#169976]">40 000</h3><h4 class="text-center">Financed Projects</h4></li>
                    <li> <img></img><h3 class="text-[35px] text-center text-[#169976]">2 000 010 $</h3> <h4 class="text-center">for creative projects</h4></li>
                    <li>  <img></img><h3 class="text-[35px] text-center text-[#169976]">50 000</h3> <h4 class="text-center">contributors</h4></li>
                </ul>
            </div>
        </section>
    );
}

export default Performance;