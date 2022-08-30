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
    check('Name')
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

// create a spot
router.post(
    '/',
    restoreUser,
    // validateCreate,
    async (req, res) => {
        // const { address, city, state, country, lat, lng, name, description, pricel } = req.body;
        // const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, pricel });

        // return res.json({
        //     spot
        // });
        return res.send("hello")
    }
);


module.exports = router;
