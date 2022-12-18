import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from '../../../store/spotReducer';
import { Modal } from "../../../context/Modal";
import SpotCard from '../SpotCard';
import IndexFilter from "../../SearchFunction/IndexFilter";
import './SpotsIndex.css'
import MapContainer from '../../Maps';

function SpotsIndex() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    let spots = useSelector(state => state.spot)

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    if (!spots) { return null }

    let spotsArr = Object.values(spots)
    // console.log('spotsArr---',spotsArr)


    return (
        <>
            <div className='filter-button-container'>
                <button className='filter-button'
                    onClick={() => setShowModal(true)}>
                    <i id="filter-icon" className="fas fa-sliders-h"></i>
                    Filter</button>
            </div>

            <div id='spots-index-container'>

                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <IndexFilter />
                    </Modal>
                )}
                <div className="spots-index-all">
                    {spotsArr.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
                </div>

                <>
                <MapContainer />
                </>

            </div>
        </>
    );
}

export default SpotsIndex;
