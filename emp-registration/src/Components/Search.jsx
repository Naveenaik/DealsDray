import React from 'react'

const Search = ({ setSearchQuery }) => {

    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    return (
      <div >
        <div className="flex justify-end">
            <form className="" onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input
                  type="search"
                  id="default-search"
                  class="block w-[250px]  p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none "
                  placeholder="Search for employee"
                  required
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  class="text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </form>
            </div>
            </div>
    );
  };

export default Search