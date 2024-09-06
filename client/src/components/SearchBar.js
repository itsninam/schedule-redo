import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ filteredSchedule, day, setSearchFilter }) {
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    setSearchFilter(filteredSchedule);
    // eslint-disable-next-line
  }, [day]);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchItem(event.target.value);

    const filteredItems = filteredSchedule.filter((schedule) =>
      schedule.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setSearchFilter(filteredItems);

    if (searchTerm.length === 0) {
      setSearchFilter(filteredSchedule);
    }
  };

  return (
    <form>
      <input
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search artist..."
      />
      <FaSearch className="search-icon" />
    </form>
  );
}

export default SearchBar;
