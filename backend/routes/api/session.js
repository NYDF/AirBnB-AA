const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];
// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    let user = await User.login({ credential, password });

    if (!user) {

      return res
        .status(401)
        .json({ "message": "Invalid credentials", statusCode:401,
        "errors": "UserName or Email and Password are not match." });
    }

    // await setTokenCookie(res, user);
    const token = await setTokenCookie(res, user)
    user = user.toJSON()
    user.token = token

    return res.json(user);
  }
);

router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(
        user.toSafeObject()
      );
    } else return res.json({});
  }
);



module.exports = router;
