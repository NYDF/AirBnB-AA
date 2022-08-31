const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();

// delete iamge by reviewImageId
router.delete(
    '/:reviewImageId',
    requireAuth,
    //need authorization
    async (req, res) => {

        const reviewImageN = await ReviewImage.findByPk(req.params.reviewImageId)

        if (!reviewImageN) {
            return res
                .status(404)
                .json({ "message": "Review Image couldn't be found" });
        }

        reviewImageN.destroy();

        return res
            .status(200)
            .json({ "message": "Successfully deleted" })
    }
);

module.exports = router;
