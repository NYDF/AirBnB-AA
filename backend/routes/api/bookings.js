const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();

// get all bookings by current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const bookings = await Booking.findAll({ where: { userId: req.user.id } });

        return res.json(
            {bookings}
        );
    }
);



// // create a spot
// router.post(
//     '/',
//     requireAuth,
//     validateSpot,
//     async (req, res) => {
//         const { address, city, state, country, lat, lng, name, description, price } = req.body;
//         const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price });
//         spot.ownerId = req.user.id
//         await spot.save()
//         return res.json({
//             spot
//         });
//     }
// );

// edit spot by spotId
// router.put(
//     '/:spotId',
//     requireAuth,
//     validateSpot,
//     async (req, res) => {
//         const { address, city, state, country, lat, lng, name, description, price } = req.body;
//         const spot = await Spot.findByPk(req.params.spotId)

//         if (!spot) {
//             return res
//                 .status(404)
//                 .json({ "message": "Spot couldn't be found" });
//         }

//         spot.update({
//             address: address,
//             city: city,
//             state: state,
//             country: country,
//             lat: lat,
//             lng: lng,
//             name: name,
//             description: description,
//             price: price
//         })
//         return res.json(
//             spot
//         );

//     }
// );

// // Get all Reviews by a Spot's id
// router.get(
//     '/:spotId/reviews',
//     async (req, res) => {
//         const spot = await Spot.findByPk(req.params.spotId)

//         if (!spot) {
//             return res
//                 .status(404)
//                 .json({ "message": "Spot couldn't be found" });
//         }

//         const reviews = await Review.findAll({ where: { spotId: req.params.spotId } });
//         return res.json(
//             reviews
//         );
//     });


// // create an image for a spot
// router.post(
//     '/:spotId/images',
//     requireAuth,
//     // require authorization
//     async (req, res) => {
//         uid = req.user.id;
//         sid = req.params.spotId;

//     const spot = await Spot.findByPk(req.params.spotId)

//     if (!spot) {
//         return res
//             .status(404)
//             .json({ "message": "Spot couldn't be found" });
//     }


//         const { url, preview } = req.body;

//         const newImage = await SpotImage.create({ spotId:sid , url, preview });

//         return res.json(newImage);
//     }
// );

// // delete spot by spotId
// router.delete(
//     '/:spotId',
//     requireAuth,
//     //need authorization
//     async (req, res) => {
//         const spotN = await Spot.findByPk(req.params.spotId)

//         if (!spotN) {
//             return res
//                 .status(404)
//                 .json({ "message": "Spot couldn't be found" });
//         }

//         spotN.destroy();

//         return res
//             .status(200)
//             .json({ "message": "Successfully deleted" })
//     }
// );


module.exports = router;
