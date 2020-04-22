const mongoose = require('mongoose');
const local_uri = 'mongodb://localhost/dipterv';
const atlas_uri = 'mongodb+srv://mongooAdmin:almaFa13@dipterv-gztt8.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(local_uri, {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose;