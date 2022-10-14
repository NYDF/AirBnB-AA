
import React from "react";
// import { AiOutlineKey  } from "react-icons/fa"
import './SpotShowSub.css'
import { AiOutlineKey, AiOutlineRest, AiOutlineCalendar } from "react-icons/ai";


const SpotShowSub = () => {
    return (
        <>
            <div className="spot-show-features">
                <div className="spot-show-icons"><AiOutlineKey /></div>

                <div className="features-text-container">

                    <div className="features-text-title">
                        Self check-in
                    </div>

                    <div>
                        Check yourself in with the keypad.
                    </div>

                </div>
            </div>

            <div className="spot-show-features">
                <div className="spot-show-icons"><AiOutlineRest /></div>

                <div className="features-text-container">

                    <div className="features-text-title">
                        Jonathan is a Superhost
                    </div>

                    <div>
                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                    </div>

                </div>
            </div>

            <div className="spot-show-features">
                <div className="spot-show-icons"><AiOutlineCalendar /></div>

                <div className="features-text-container">

                    <div className="features-text-title">
                        Free cancellation within 48 hours.
                    </div>

                    <div>
                        It's always a good idea to ensure you can make changes to your travel plans, just in case.
                    </div>

                </div>
            </div>

            <hr></hr>

            <div className="air-cover-img-container">
                <img className="air-cover-img"
                src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="AIR COVER" />
            </div>
            <div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            <div className="air-cover-text2">Learn More</div>
        </>
    );
};

export default SpotShowSub;
