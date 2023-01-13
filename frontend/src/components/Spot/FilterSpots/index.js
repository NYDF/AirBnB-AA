import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotCard from '../SpotCard';
import './FilterSpots.css'

function FilterSpots() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const filterSpots = useSelector(state => state.filteredSpot)

    let display;

    const filterSpotsArr = Object.values(filterSpots)

    if (!filterSpotsArr.length) {
        display = (
            <div className='filter-nofound-text'>Sorry we didn't find any results matching this search.</div>
        )
    } else {
        display = (<div className="spots-index">
            {filterSpotsArr.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
        </div>)
    }

    return (
        <div id='spots-index-container'>
            {display}
        </div>
    );
}

export default FilterSpots;
