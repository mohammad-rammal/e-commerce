const multer = require('multer');
const ApiError = require('../utils/apiError');

const multerOptions = () => {
    // 1- DiskStorage engine will not return buffer (for not image processing)
    // const multerStorage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'uploads/categories');
    //     },
    //     filename: function (req, file, cb) {
    //         // filename = category-${id}-Date.now().jpeg
    //         const ext = file.mimetype.split('/')[1];
    //         const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    //         cb(null, filename);
    //     },
    // });

    // 2- Memory storage engine will return buffer (for image processing)
    const multerStorage = multer.memoryStorage();

    const multerFilter = function (req, file, cb) {
        // mimetype: image.jpeg
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new ApiError('Not an image! Please upload only images.', 400), false);
        }
    };

    const upload = multer({storage: multerStorage, fileFilter: multerFilter});
    // const upload = multer({dest: 'uploads/categories'});

    return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) => multerOptions().fields(arrayOfFields);
