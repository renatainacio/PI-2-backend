import { invalidFormatError } from "../errors/invalidFormat.js";

export default function validateSchema(schema, type) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, {abortEarly: false});
        if (validation.error) throw invalidFormatError(type);
        next();
    }
}