import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from '../../../store/spotReducer';
import { Modal } from "../../../context/Modal";
import SpotCard from '../SpotCard';
import IndexFilter from "../../SearchFunction/IndexFilter";
import './SpotsIndex.css'

function SpotsIndex() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const spots = useSelector(state => state.spot)

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    if (!spots) { return null }

    const spotsArr = Object.values(spots)

    return (
        <div id='spots-index-container'>
            <button className='filter-button'
                onClick={() => setShowModal(true)}>Filter</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <IndexFilter />
                </Modal>
            )}
            <div className="spots-index">
                {spotsArr.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
            </div>
        </div>
    );
}

export default SpotsIndex;
