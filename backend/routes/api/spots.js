const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required.'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required.'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required.'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid.'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid.'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required.'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required.'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required.'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
];
// get all spots
router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.findAll()
        return res.json(
            { "spots": spots }
        );
    }
);

// get all spots owned by current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findAll({ where: { ownerId: req.user.id } });

        return res.json(
            spot
        );
    }
);

// get spot by spotId
router.get(
    '/:spotId',
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            return res
                .status(404)
                .json({ "message": "Spot couldn't be found" });
        }

        return res.json(
            spot
        );
    }
);

// create a spot
router.post(
    '/',
    requireAuth,
    validateSpot,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price });
        spot.ownerId = req.user.id
        await spot.save()
        return res.json({
            spot
        });
    }
);

// edit spot by spotId
router.put(
    '/:spotId',
    requireAuth,
    validateSpot,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            return res
                .status(404)
                .json({ "message": "Spot couldn't be found" });
        }

        spot.update({
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        })
        return res.json(
            spot
        );

    }
);

// get all bookings by spotId
router.get(
    '/:spotId/bookings',
    requireAuth,
    async (req, res) => {

        const sid = req.params.spotId;
        const spot = await Spot.findByPk(sid)

        if (!spot) {
            return res
                .status(404)
                .json({ "message": "Spot couldn't be found" });
        }

        const bookings = await Booking.findAll({ where: { spotId: req.params.spotId} });

        return res.json(
            {bookings}
        );
    }
);

// Get all Reviews by a Spot's id
router.get(
    '/:spotId/reviews',
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            return res
                .status(404)
                .json({ "message": "Spot couldn't be found" });
        }

        const reviews = await Review.findAll({ where: { spotId: req.params.spotId } });
        return res.json(
            reviews
        );
    });

// Create a Review for a Spot based on the Spot's id
router.post(
    '/:spotId/reviews',
    validateReview,
    requireAuth,
    async (req, res) => {
        uid = req.user.id;
        sid = req.params.spotId;

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res
            .status(404)
            .json({ "message": "Spot couldn't be found" });
    }

        const oldReview = await Review.findAll({ where: { userId: uid, spotId: sid } });
        if (oldReview.length) {
            return res
                .status(403)
                .json({ "message": "User already has a review for this spot" });
        }

        const { review, stars } = req.body;
        const newReview = await Review.create({ spotId: sid, userId: uid, review, stars });

        return res.json({
            newReview
        });
    }
);

// Create a Booking for a Spot based on the Spot's id
router.post(
    '/:spotId/bookings',
    requireAuth,
    // Require proper authorization: Spot must NOT belong to the current user
    async (req, res) => {
        uid = req.user.id;
        sid = req.params.spotId;

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res
            .status(404)
            .json({ "message": "Spot couldn't be found" });
    }

        const allBookings = await Booking.findAll({ where: { spotId: sid } });
        // if (oldReview.length) {
        //     return res
        //         .status(403)
        //         .json({ "message": "User already has a review for this spot" });
        // }

        // const { review, stars } = req.body;
        // const newReview = await Review.create({ spotId: sid, userId: uid, review, stars });

        return res.json({
            allBookings
        });
    }
);




// create an image for a spot
router.post(
    '/:spotId/images',
    requireAuth,
    // require authorization
    async (req, res) => {
        uid = req.user.id;
        sid = req.params.spotId;

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res
            .status(404)
            .json({ "message": "Spot couldn't be found" });
    }


        const { url, preview } = req.body;

        const newImage = await SpotImage.create({ spotId:sid , url, preview });

        return res.json(newImage);
    }
);

// delete spot by spotId
router.delete(
    '/:spotId',
    requireAuth,
    //need authorization
    async (req, res) => {
        const spotN = await Spot.findByPk(req.params.spotId)

        if (!spotN) {
            return res
                .status(404)
                .json({ "message": "Spot couldn't be found" });
        }

        spotN.destroy();

        return res
            .status(200)
            .json({ "message": "Successfully deleted" })
    }
);


module.exports = router;
