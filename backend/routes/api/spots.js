const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateCreate = [
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


router.get(
    '/:spotId',
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            return res
              .status(404)
              .json({"message": "Spot couldn't be found"});
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
    validateCreate,
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

router.put(
    '/:spotId',
    requireAuth,
    validateCreate,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            return res
              .status(404)
              .json({"message": "Spot couldn't be found"});
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






module.exports = router;
