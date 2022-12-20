const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();

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
            attributes: ['id', 'preview', 'url']
        })
        return res.json(result);
    }
);

// delete iamge by reviewImageId
router.delete(
    '/:spotImageId',
    requireAuth,
    //need authorization
    async (req, res) => {

        const reviewImageN = await SpotImage.findByPk(req.params.spotImageId)

        if (!reviewImageN) {
            return res
                .status(404)
                .json({ "message": "Spot Image couldn't be found", "statusCode": 404 });
        }

        reviewImageN.destroy();

        return res
            .status(200)
            .json({ "message": "Successfully deleted", "statusCode": 200 })
    }
);

module.exports = router;
