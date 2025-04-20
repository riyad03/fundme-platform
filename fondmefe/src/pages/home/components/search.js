import React, { useState, useEffect } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    fetch('http://localhost:8080/api/analyze', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('AI Response:', data);
      })
      .catch((err) => console.error('Error', err));
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }

    // Static suggestions (replace with backend fetch if needed)
    const staticSuggestions = ['AI project', 'Web dev', 'E-commerce', 'FastAPI', 'Spring Boot'];
    const filtered = staticSuggestions.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, [query]);

  return (
    <section className="SearchBar relative">
      <div className="flex justify-center space-x-[0px] h-[100px] pt-[35px] mb-[35px]">
        <div className="w-[52%] p-4 relative">
          <div className="flex rounded-[20px] overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#169976]"
            />
            <button
              onClick={handleSearch}
              className="bg-[#1dcd9f] text-white px-[35px] py-2 rounded-r-md hover:bg-[#169976] focus:outline-none focus:ring-2 focus:ring-[#169976]"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute top-[60px] bg-white text-black border border-gray-300 w-full rounded shadow z-10">
              {suggestions.map((key,item) => (
                <li
                  key={key}
                  onClick={() => handleSuggestionClick(item)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-[15px]">
          <select className="p-[10px] bg-[#1dcd9f] text-white rounded-[20px]">
            <option value="Popular">Popular</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
