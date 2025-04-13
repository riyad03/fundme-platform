import React from 'react';


function SearchBar(){
    return(
        <section className="SearchBar">
            <div class=" flex justify-center space-x-[0px] h-[100px] pt-[35px] mb-[35px]">
                <div className=" w-[52%]  p-4">
                    <div className="flex rounded-[20px] overflow-hidden">
                        <input type="text" placeholder="Search..." className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#169976]" />
                        <button className="bg-[#1dcd9f] text-white px-[35px] py-2 rounded-r-md hover:bg-[#169976] focus:outline-none focus:ring-2 focus:ring-[#169976]">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div class="pt-[15px]">
                    <select class="p-[10px] bg-[#1dcd9f] text-white rounded-[20px]">
                        <option value="Popular">Popular</option>
                        <option value="Newest">Newest</option>
                    </select>
                </div>
            </div>
            
        </section>
    );
}

export default SearchBar;