const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage, ReviewImage } = require('../../db/models')

const {singleMulterUpload} = require('../../awsS3')

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
                .json({ "message": "Review Image couldn't be found", "statusCode": 404 });
        }

        reviewImageN.destroy();

        return res
            .status(200)
            .json({ "message": "Successfully deleted", "statusCode": 200 })
    }
);


// router.post(
//     "/",
//     singleMulterUpload("image"),
//     validateSignup,
//     asyncHandler(async (req, res) => {
//       const { email, password, username } = req.body;
//       const profileImageUrl = await singlePublicFileUpload(req.file);
//       const user = await User.signup({
//         username,
//         email,
//         password,
//         profileImageUrl,
//       });

//       setTokenCookie(res, user);

//       return res.json({
//         user,
//       });
//     })
//   );

module.exports = router;
