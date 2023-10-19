const express=require("express");
const router=express.Router();
const {addBanner,updateBanner,getBanner,deleteBanner,uploads}=require('../controllers/BannersController');

router.route('/api/banner').post(uploads.any(),addBanner).get(getBanner);
router.route('/api/banner/:id').post(uploads.any(),updateBanner).delete(deleteBanner);

module.exports=router