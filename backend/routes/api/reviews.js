const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, Spot, ReviewImage, User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required.'),
    check('stars') // need to findout the number requirement
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
];

// Get all Reviews of the Current User
router.get(
    '/current',
    async (req, res) => {
        const reviews = await Review.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: User, attributes: ["id", "firstName", "lastName"]
                },
                {
                    model: Spot, attributes: ["id", "ownerId","address","city","state","country","lat", "lng","name","price"]
                },
                {
                    model: ReviewImage, attributes: ["id", "url"]
                }
            ],

        });

        return res.json(
            {reviews}
        );
    }
);

// Edit a review by reviewId
router.put(
    '/:reviewId',
    requireAuth,
    //need authorization
    validateReview,
    async (req, res) => {
        const { review, stars } = req.body;

        const reviewN = await Review.findByPk(req.params.reviewId)

        if (!reviewN) {
            return res
                .status(404)
                .json({ "message": "Review couldn't be found" });
        }

        reviewN.update({
            review,
            stars
        })

        return res.json(
            reviewN
        );
    }
);

// delete review by reviewId
router.delete(
    '/:reviewId',
    requireAuth,
    //need authorization
    async (req, res) => {
        const reviewN = await Review.findByPk(req.params.reviewId)

        if (!reviewN) {
            return res
                .status(404)
                .json({ "message": "Review couldn't be found" });
        }

        reviewN.destroy();

        return res
            .status(200)
            .json({ "message": "Successfully deleted" })
    }
);

// create an image for a review
router.post(
    '/:reviewId/images',
    requireAuth,
    // require authorization
    async (req, res) => {
        uid = req.user.id;
        rid = req.params.reviewId;

    const reviewN = await Review.findByPk(rid)

    if (!reviewN) {
        return res
            .status(404)
            .json({ "message": "Review couldn't be found" });
    }
    const count = await ReviewImage.count({
        where: {
            reviewId: rid
        }
    })

        const { url } = req.body;

        const newImage = await ReviewImage.create({ reviewId:rid, url });

        if (count > 10) {
            return res
                .status(403)
                .json({ "message": "Maximum number of images for this resource was reached" });
        }
        return res.json(newImage);
    }
);





module.exports = router;
