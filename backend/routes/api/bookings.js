const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();

// get all bookings by current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const bookings = await Booking.findAll({ where: { userId: req.user.id } });

        return res.json(
            {bookings}
        );
    }
);

// edit a booking based on bookingId
router.put(
    '/:bookingId',
    requireAuth,
    //need authorization
    async (req, res) => {
        const { startDate, endDate } = req.body;

        const oldBooking = await Booking.findByPk(req.params.bookingId)

        if (!oldBooking) {
            return res
                .status(404)
                .json({ "message": "Booking couldn't be found" });
        }

        oldBooking.update({
            startDate,
            endDate
        })

        return res.json(
            oldBooking
        );
    }
);

// delete booking by bookingId
router.delete(
    '/:bookingId',
    requireAuth,
    //need authorization
    async (req, res) => {
        const bookingN = await Booking.findByPk(req.params.bookingId)

        if (!bookingN) {
            return res
                .status(404)
                .json({ "message": "Booking couldn't be found" });
        }

        bookingN.destroy();

        return res
            .status(200)
            .json({ "message": "Successfully deleted" })
    }
);


module.exports = router;
