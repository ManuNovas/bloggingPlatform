const {body, validationResult, param} = require("express-validator");

const updateRequest = [
    param("id")
        .notEmpty().withMessage("El ID es obligatorio"),
    body("title")
        .trim()
        .isLength({max: 128}).withMessage("El título no debe exceder los 128 caracteres"),
    body("category")
        .trim()
        .isLength({max: 64}).withMessage("La categoría no debe exceder los 64 caracteres"),
    body("tags")
        .custom((tags) => {
            if (!tags.every(tag => (typeof tag === "string" && tag.trim().length <= 32))) {
                throw new Error("Cada etiqueta debe ser un texto y no debe exceder los 32 caracteres")
            }
            return true;
        }),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = updateRequest;
