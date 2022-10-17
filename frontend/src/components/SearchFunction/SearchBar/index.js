import { useState } from 'react';
import './SearchBar.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = async (e) => {

  }

  return (
    <form className='search-bar-container'>
      <input type='text'
        placeholder='Search...  (e.g. New York, Connecticut, etc.)'
        className='search-bar'
        onChange={(e) => { setSearchTerm(e.target.value) }}
      />

      <button className="search-button" type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
}

export default SearchBar;
