const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: '',
    allowedFormats: ['jpeg', 'png'],
    filename: (req, res, callback) => {
        callback(null, res.originalname);
    }
});

module.exports = multer({storage});