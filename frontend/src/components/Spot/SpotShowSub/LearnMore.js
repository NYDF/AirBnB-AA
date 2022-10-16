import React from "react";
import './LearnMorePage.css'


function LearnMorePage() {
  return (
    <div className="learn-more-container">
      <div className="learn-more-window">
        <img className="learn-more-air-cover-img"
          src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="AIR COVER" />
        <div className="learn-more-title">

          AirCover is comprehensive protection included for free with every booking.</div>
        <hr></hr>

        <div className="learn-more-text-container">
          <div className="learn-more-text">
            <h3>Booking Protection Guarantee</h3>
            <div>In the unlikely event a Host needs to cancel your booking within 30 days of check-in, we’ll find you a similar or better home, or we’ll refund you.</div>
          </div>

          <div className="learn-more-text">
            <h3>Check-In Guarantee</h3>
            <div>If you can’t check into your home and the Host cannot resolve the issue, we’ll find you a similar or better home for the length of your original stay, or we’ll refund you.</div>
          </div>

          <div className="learn-more-text">
            <h3>Get-What-You-Booked Guarantee</h3>
            <div>If at any time during your stay you find your listing isn't as advertised—for example, the refrigerator stops working and your Host can’t easily fix it, or it has fewer bedrooms than listed.</div>
          </div>

          <div className="learn-more-text">
            <h3>24-hour Safety Line</h3>
            <div>If you ever feel unsafe, you’ll get priority access to specially-trained safety agents, day or night.</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LearnMorePage;
