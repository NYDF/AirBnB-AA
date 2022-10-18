import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "../../../context/Modal";
import SpotCard from '../SpotCard';
import IndexFilter from "../../SearchFunction/IndexFilter";
import './FilterSpots.css'

function FilterSpots() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const filterSpots = useSelector(state => state.filteredSpot)

    if (!filterSpots) { return null }

    const filterSpotsArr = Object.values(filterSpots)

    return (
        <div id='spots-index-container'>
            <div className="spots-index">
                {filterSpotsArr.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
            </div>
        </div>
    );
}

export default FilterSpots;
