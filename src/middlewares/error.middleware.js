import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Something went wrong.")
}