export function invalidFormatError(entity = "data") {
    return {
        type: "invalidFormat",
        message: `Invalid ${entity} format!`
    }
}