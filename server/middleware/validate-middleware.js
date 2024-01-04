const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        next();
    } catch (error) {
        next({ status:422, message:error.issues[0].message });
    }
}

module.exports = validate;