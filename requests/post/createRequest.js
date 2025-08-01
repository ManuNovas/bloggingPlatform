const {body, validationResult} = require("express-validator");

const createRequest = [
    body("title")
        .trim()
        .notEmpty().withMessage("El título es obligatorio")
        .isLength({max: 128}).withMessage("El título no debe exceder los 128 caracteres"),
    body("content")
        .trim()
        .notEmpty().withMessage("El contenido es obligatorio"),
    body("category")
        .trim()
        .notEmpty().withMessage("La categoría es obligatoria")
        .isLength({max: 64}).withMessage("La categoría no debe exceder los 64 caracteres"),
    body("tags")
        .isArray().withMessage("Debe seleccionar al menos una etiqueta")
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

module.exports = createRequest;
