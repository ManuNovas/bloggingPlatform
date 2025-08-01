const {validationResult, param} = require("express-validator");

const idRequest = [
    param("id")
        .notEmpty().withMessage("El ID es obligatorio"),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = idRequest;
