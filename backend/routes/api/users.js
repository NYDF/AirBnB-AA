const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
    check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('FirstName need to be 4 characters and longer.'),
    check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage('FirstName need to be 30 characters or less.'),
    check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage('lastName need to be 30 characters or less.'),
    check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('lastName need to be 4 characters and longer.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,

  async (req, res) => {

    const { email, password, username, firstName, lastName } = req.body;

    let currentUsers = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
      attributes: { include: ['username', 'email'] }
    })

    if (currentUsers) {
      currentUsers = currentUsers.toJSON();

      if (currentUsers.email == email) {
        res.status(403);
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      } else {
        res.status(403);
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that username already exists"
          }
        })
      }
    } else {
      let user = await User.signup({ email, username, password, firstName, lastName });

      const token = await setTokenCookie(res, user)
      user = user.toJSON()
      user.token = token

      return res.json(user)
    }
  }
);

// get current user
router.get(
  '/current',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(
        user
      );
    } else return res.json({});
  }
);








module.exports = router;
