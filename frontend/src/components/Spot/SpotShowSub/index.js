
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

        </>
    );
};

export default SpotShowSub;
