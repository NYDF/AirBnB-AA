const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const asyncHandler = require('express-async-handler')

const router = express.Router();

// create an image for a spot with aws
router.post(
    "/:spotId/aws/images",
    requireAuth,
    singleMulterUpload("file"),

    asyncHandler (async (req, res) => {
        // console.log('hiiiiiiiiiiiiiiiiiii')
        // console.log('req=================', req.file)

        uid = req.user.id;
        sid = req.params.spotId.toString();
        const url = await singlePublicFileUpload(req.file);
        const spot = await Spot.findByPk(req.params.spotId)
        // console.log('^^^^^^^^^^^^^^^^^^^^^', spot)

        if (!spot) {
            return res
                .status(404)
                .json({ "message": "Spot couldn't be found", "statusCode": 404 });
        }

        const { preview } = req.body;

        const newImage = await SpotImage.create({ spotId: sid, url, preview });

        const result = await SpotImage.findByPk(newImage.id, {
            // attributes: ['id', 'url']
            attributes: ['id', 'preview', 'url']
        })
        return res.json(result);
    }
    )
);


// create an image for a spot without aws
router.post(
    '/:spotId/images',
    requireAuth,

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
