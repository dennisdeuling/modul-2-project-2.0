const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: './public/uploads/profile-pics',
	filename: (req, file, callback) => {
		callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
	}
});

const uploadSingle = multer({
	storage: storage,
	limits: {
		fileSize: 100000000
	},
	fileFilter: (req, file, callback) => {
		checkFileType(file, callback);
	}
}).single('profile');

const checkFileType = (file, callback) => {
	const fileTypes = /jpeg|jpg|png|gif/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extName) {
		return callback(null, true);
	} else {
		return callback('Error: Images only');
	}
};

module.exports.uploadSingle = uploadSingle;