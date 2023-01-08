import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from '../../../store/spotReducer';
import { Modal } from "../../../context/Modal";
import SpotCard from '../SpotCard';
import IndexFilter from "../../SearchFunction/IndexFilter";
import MapContainer from '../../Maps';
import Footer from '../../Footer';

import './SpotsIndex.css'

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
            <div id='spots-index-container'>

                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <IndexFilter />
                    </Modal>
                )}

                <div className='spots-left-right'>

                    <div className='spots-left-big'>
                        <div className='filter-button-container'>
                            <div className='filter-button-left-words'>8 homes</div>
                            <button className='filter-button'
                                onClick={() => setShowModal(true)}>
                                <i id="filter-icon" className="fas fa-sliders-h"></i>
                                Filter</button>
                        </div>

                        <div className="spots-index-all">
                            {spotsArr.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
                        </div>

                        <Footer />
                    </div>

                    <div className="spots-index-map">
                        <MapContainer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpotsIndex;
