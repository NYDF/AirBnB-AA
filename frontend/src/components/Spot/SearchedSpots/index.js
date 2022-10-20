import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "../../../context/Modal";
import SpotCard from '../SpotCard';
import IndexFilter from "../../SearchFunction/IndexFilter";
import { thunkGetAllSpots } from '../../../store/spotReducer';
import './SearchedSpots.css'

function SearchedSpots({ searchFunc }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = searchFunc;

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    const spots = useSelector(state => state.spot)

    if (!spots) { return null }

    // console.log('searchTerm+++', searchTerm)

    let searchedSpotsArr = Object.values(spots)

    if (searchTerm && searchTerm.length !== 0) {
        searchedSpotsArr = searchedSpotsArr.filter((spot) => {
            return (spot.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                spot.city.toLowerCase().includes(searchTerm.toLowerCase()))
        })
    }

    let display;

    if (!searchedSpotsArr.length) {
        display = (
            <div className='filter-nofound-text'>Sorry we didn't find any results matching this search.</div>
        )
    } else {
        display = (
            <div className="spots-index">
                {searchedSpotsArr.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
            </div>)
    }

    return (
        <div id='spots-index-container'>
            {display}
        </div>
    );
}

export default SearchedSpots;
