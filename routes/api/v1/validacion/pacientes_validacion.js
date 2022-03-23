const { check } = require("express-validator");
const { validateResult } = require("./validateHelper");

const validateCreate = [
    check('nombres')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next)=>{
        validateResult(req, res, next)
    }
]

const validatenew = [
    check('nombres')
        .exists()
        .not()
        .isEmpty()
        .isAlpha()
        .isLength({min:3}),
    check('apellidos')
        .exists()
        .not()
        .isEmpty()
        .isAlpha()
        .isLength({min:3}),
    check('identidad')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max:13})
        .isLength({min:13}),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    check('telefono')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max:8})
        .isLength({min:8}),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]
const validateupdate = [
    check('nombres')
        .exists()
        .not()
        .isEmpty()
        .isAlpha()
        .isLength({min:3}),
    check('apellidos')
        .exists()
        .not()
        .isEmpty()
        .isAlpha()
        .isLength({min:3}),
    check('identidad')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max:13})
        .isLength({min:13}),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    check('telefono')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max:8})
        .isLength({min:8}),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]


module.exports = { validateCreate, validatenew, validateupdate }