const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage, User, sequelize, ReviewImage } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const avgR = async (spotId) => {
    const avgReview = await Review.findAll({
        where: { spotId: spotId },
        attributes: [[sequelize.fn('AVG', sequelize.col("stars")), 'avgRating']],
        raw: true, nest: true
    })
    return avgReview
}

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

        let { size, page, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

        if (!size) {size = 20;}
        if (!page) {page = 0;}

        page = parseInt(page)
        size = parseInt(size)

        let pagination = {};
        const where = {};

        if (minPrice) {where.price = { [Op.gte]: parseInt(minPrice)}}
        if (maxPrice) {where.price = { [Op.lte]: parseInt(minPrice)}}

        if (minLat) {where.lat = { [Op.gte]: parseInt(minLat)}}
        if (maxLat) {where.lat = { [Op.lte]: parseInt(maxLat)}}

        if (minLng) {where.lng = { [Op.gte]: parseInt(minLng)}}
        if (maxLng) {where.lng = { [Op.lte]: parseInt(maxLng)}}

        if (page >= 1 && size >= 1) {
            pagination.limit = size
            pagination.offset = size * (page - 1)
        }

        let spots = await Spot.findAll({ where, raw: true, nest: true, ...pagination });

        for (let spot of spots) {
            const avg = await avgR(spot.id);

            spot.avgRating = avg[0].avgRating === null ? 0: avg[0].avgRating;
            const images = await SpotImage.findAll({
                where: {
                    spotId: spot.id,
                    preview: true
                },
                attributes: ['url'],
                raw: true, nest: true
            })
            // console.log("images:", images)
            spot.previewImage = images.length > 0 ? images[0].url : ""
        }
        return res.json(
            { "spots": spots, page, size }
        );
    }
);

// get all spots owned by current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        let spots = await Spot.findAll({ where:{ownerId: req.user.id},raw: true, nest: true });

        for (let spot of spots) {
            const avg = await avgR(spot.id);
            // console.log("avg:", avg)
            spot.avgRating = avg[0].avgRating === null ? 0: avg[0].avgRating;
            const images = await SpotImage.findAll({
                where: {
                    spotId: spot.id,
                    preview: true
                },
                attributes: ['url'],
                raw: true, nest: true
            })
            // console.log("images:", images)
            spot.previewImage = images.length > 0 ? images[0].url : ""
        }
        return res.json(
            { "spots": spots }
        );
    }
);

// get spot by spotId
router.get(
    '/:spotId',
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId, {
            include: [
                {
                    model: Review, attributes: []
                },
                {
                    model: SpotImage, attributes: ["id", "url", "preview"]
                },
                {
                    model: User, as: "Owner", attributes: ["id", "firstName", "lastName"]
                }],
        })

        if (!spot) {
            return res
                .status(404)
                .json({ "message": "Spot couldn't be found", statusCode: 404 });
        }
        const numReviews = await Review.count({
            where: {
                spotId: req.params.spotId
            }
        })

        const avgRating = await Review.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: [[sequelize.fn('AVG', sequelize.col("stars")), 'avgRating']]
        })

        const result = spot.toJSON();
        result.numReviews = numReviews;
        result.avgStarRating = avgRating[0].toJSON().avgRating;

        return res.json(
            result
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

        return res.json(spot);
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
                .json({ "message": "Spot couldn't be found", "statusCode": 404 });
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
                .json({ "message": "Spot couldn't be found", "statusCode": 404 });
        }

        const bookings = await Booking.findAll({ where: { spotId: req.params.spotId },
        include:[{
            model: User, attributes: ["id", "firstName", "lastName"]
        }]
        });

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
                .json({ "message": "Spot couldn't be found", "statusCode": 404 });
        }

        const reviews = await Review.findAll({ where: { spotId: req.params.spotId },
            include: [
                {
                    model: User, attributes: ["id", "firstName", "lastName"]
                },
                {
                    model: ReviewImage, attributes: ["id", "url"]
                }
            ],
        });
        return res.json(
            {reviews}
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
                .json({ "message": "Spot couldn't be found","statusCode": 404 });
        }

        const oldReview = await Review.findAll({ where: { userId: uid, spotId: sid } });
        if (oldReview.length) {
            return res
                .status(403)
                .json({ "message": "User already has a review for this spot", "statusCode": 403 });
        }

        const { review, stars } = req.body;
        const newReview = await Review.create({ spotId: sid, userId: uid, review, stars });

        return res.status(201).json(
            newReview
        );
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
        const { startDate, endDate } = req.body;

        const spot = await Spot.findByPk(sid)

        if (!spot) {
            return res
                .status(404)
                .json({ "message": "Spot couldn't be found", "statusCode": 404 });
        }

        // console.log("startDate:", startDate,endDate)

        const currentBooking = await Booking.findAll({
            where:{
                spotId: sid,
                [Op.or]:[{
                    startDate: {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate,
                    }
                }, {
                    endDate: {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    }
                }, {
                    startDate: {
                        [Op.lte]: startDate
                    },
                    endDate: {
                        [Op.gte]: startDate
                    }
                }, {
                    startDate: {
                        [Op.lte]: endDate
                    },
                    endDate: {
                        [Op.gte]: endDate
                    }
                }
            ]
            }
        });

        if (currentBooking.length) {
            return res
                .status(403)
                .json({"Message": "Sorry, this spot is already booked for the specified dates" ,
                "statusCode": 403,
                "errors":{"startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"}
                 });
        }

        newBooking = await Booking.create({ spotId: sid, userId: uid, startDate, endDate });

        return res.json({
            newBooking
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
                .json({ "message": "Spot couldn't be found", "statusCode": 404 });
        }

        const { url, preview } = req.body;

        const newImage = await SpotImage.create({ spotId: sid, url, preview });

        const result = await SpotImage.findByPk(newImage.id, {
            attributes:['id', 'preview', 'url']
        })
        return res.json(result);
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
                .json({ "message": "Spot couldn't be found", "statusCode": 404 });
        }

        spotN.destroy();

        return res
            .status(200)
            .json({ "message": "Successfully deleted", "statusCode": 200 })
    }
);


module.exports = router;
