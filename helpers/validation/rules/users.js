const { query, body, check } = require('express-validator')
const { User } = require('../../../database/models')

const passwordRequirement = (password) => {
    const containOneNumberLetterSpecialChar = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
    if (!password.match(containOneNumberLetterSpecialChar)) {
        return Promise.reject("NOT_MEET_REQUIREMENT");
    }

    return true;
}

const editProfile = [
    body('firstName').notEmpty().withMessage("IS_EMPTY").bail(),
    body('lastName').notEmpty().withMessage("IS_EMPTY").bail(),
    body('mobile').notEmpty().withMessage("IS_EMPTY").bail()
    .custom(mobile => {
        return User.findOne({
            where: {mobile}
        }).then(user => {
            if(user) return Promise.reject("ALREADY_TAKEN");
        });
    })
];

const register = [
    body('firstName').notEmpty().withMessage("IS_EMPTY").bail(),
    body('lastName').notEmpty().withMessage("IS_EMPTY").bail(),
    body('email').notEmpty().withMessage("IS_EMPTY").bail()
    .isEmail().withMessage("NOT_EMAIL_FORMATTED")
    .custom(email => {
        return User.findOne({
            where: { email }
        }).then(user => {
            if (user) return Promise.reject("ALREADY_TAKEN");
        });
    }),
    body('password').notEmpty().withMessage("IS_EMPTY").bail()
    .custom(passwordRequirement).bail(),
    body('mobile').notEmpty().withMessage("IS_EMPTY").bail()
    .custom(mobile => {
        return User.findOne({
            where: {mobile}
        }).then(user => {
            if(user) return Promise.reject("ALREADY_TAKEN");
        });
    })
];

const login = [
    body('email').notEmpty().withMessage("IS_EMPTY").bail()
    .isEmail().withMessage("NOT_EMAIL_FORMATTED"),
    body('password').notEmpty().withMessage("IS_EMPTY").bail()
];

// const newForgotPassword = [
//     body('email')
//         .notEmpty().withMessage(wording.IS_EMPTY).bail()
//         .isEmail().withMessage(wording.NOT_EMAIL_FORMATTED),
// ];

// const validateForgotPassword = [
//     body('code')
//         .notEmpty().withMessage(wording.IS_EMPTY).bail()
        
// ];

// const saveForgotPassword = [
//     body('code').notEmpty().withMessage(wording.IS_EMPTY).bail(),
//     body('password').notEmpty().withMessage(wording.IS_EMPTY).bail()
//     .custom(passwordRequirement).bail()
// ];

// const newVerificationAccount = [
//     body('user_id').notEmpty().withMessage(wording.IS_EMPTY).bail()
// ];

// const verifyVerification = [
//     body('code').notEmpty().withMessage(wording.IS_EMPTY).bail()
// ];

// const favoritesProgram = [
//     query('isPaginated').toBoolean()
// ];

const address = [
    body('address_line1').notEmpty().withMessage('IS_EMPTY').bail(),
    body('city').notEmpty().withMessage('IS_EMPTY').bail(),
    body('postalcode').notEmpty().withMessage('IS_EMPTY').bail(),
    body('country').notEmpty().withMessage('IS_EMPTY').bail(),
    body('mobile').notEmpty().withMessage('IS_EMPTY').bail(),
]

module.exports = {
    register,
    login,
    editProfile,
    address
};
