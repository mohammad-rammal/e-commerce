const express = require('express');
const {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
    resizeImage,
    uploadBrandImage,
} = require('../controllers/brandController');
const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
} = require('../utils/validators/brandValidator');

const router = express.Router();

router.route('/').get(getBrands).post(uploadBrandImage, resizeImage, createBrandValidator, createBrand);
router
    .route('/:id')
    .get(getBrandValidator, getBrand)
    .put(uploadBrandImage, resizeImage, updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
