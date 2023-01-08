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
    let markers = []
    let spots = useSelector(state => state.spot)
    let spotsArr = Object.values(spots)

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    spotsArr.forEach(ele => markers.push({ id: ele.id, name: ('$ ' + ele.price).toString(), position: { lat: ele.lat, lng: ele.lng } }))

    // console.log('spotsArr---',spotsArr)
    if (!spots || !markers.length) { return null }

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
                        <MapContainer markers={markers}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpotsIndex;
