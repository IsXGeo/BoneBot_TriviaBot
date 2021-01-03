const mongoose = require('mongoose')
const mongoPath = require(process.env.MONGO_URI)

console.log(mongoPath)

module.exports = async () => {
    await mongoose.connect(mongoPath)
    return mongoose
}