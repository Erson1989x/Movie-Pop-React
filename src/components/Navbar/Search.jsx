import React, { useEffect, useRef } from 'react'
import useKey from '../../Hooks/useKey'


const Search = ({query, setQuery}) => {
  const inputEl = useRef(null)

  useKey('Enter', () => {
    if(document.activeElement === inputEl.current) return
    inputEl.current.focus();
    setQuery("");

  })

 // useEffect(() => {
 //   const el = document.querySelector('.search');
 //   console.log(el);
 //   el.focus();
 // }, [])

  return (
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
  />
  )
}

export default Search