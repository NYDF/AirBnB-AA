const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();

// get all bookings by current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const bookings = await Booking.findAll({ where: { userId: req.user.id }, raw: true, nest: true,
            include: [
                {
                    model: Spot, attributes: ["id", "ownerId","address","city","state","country","lat", "lng","name","price"]
                }],
        });

        for (let booking of bookings) {
            const prevImage = await SpotImage.findOne({
                where: {spotId:booking.spotId, preview:true},
                attributes:['url'],
                raw: true, nest: true
            })
            booking.Spot.previewImage = prevImage.url
            console.log('!!!!!', prevImage)
        }

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
                .json({ "message": "Booking couldn't be found", "statusCode": 404 });
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
                .json({ "message": "Booking couldn't be found", "statusCode": 404 });
        }

        bookingN.destroy();

        return res
            .status(200)
            .json({ "message": "Successfully deleted", "statusCode": 200 })
    }
);


module.exports = router;
