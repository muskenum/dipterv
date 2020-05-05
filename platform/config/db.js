const mongoose = require('mongoose');
const uri = 'mongodb+srv://mongooAdmin:almaFa13@dipterv-gztt8.mongodb.net/platform?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose;