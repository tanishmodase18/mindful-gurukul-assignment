const errormiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Error from Server";
    const extra = err.extra || "Error";

    return res.status(status).json({message, extra});
}

module.exports = errormiddleware;