const {newDataSchema} = require('./joiSchema')
module.exports.validateNewData = (req,res, next) => {
    const { error } = newDataSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        console.log(msg);
        res.status(400).json({message : msg});
    } else {
        next()
    }
}
