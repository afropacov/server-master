const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const Product = require('../model/Product');

const upload = multer();

AWS.config.update({
    accessKeyId: 'AKIAZOEMY2CS4XZSDE6Y',
    secretAccessKey: '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',
    region: 'us-east-1',
});

let s3 = new AWS.S3();

router.get('/', async (req, res) => {
    const products = await Product.find().exec();
    res.json(products);
})


router.post('/', upload.single('image'), async (req, res) => {

    const file = req.file;
    const { name, price, description } = req.body;


    const params = {
        Bucket: 'david-capstone-bucket',
        Key: file.originalname,
        Body: file.buffer,
    }
    try {

        const foundProduct = await Product.findOne({ name: name }).exec();

        if (!foundProduct) {

            s3.upload(params, (err, data) => {
                if (err) {
                    console.log('ERROR');
                    return res.status(503).send('Error');
                }
            })


            const result = await Product.create({
                name: name,
                image: file.originalname,
                description: description,
                price: price
            })






            return res.json({ success: `Product ${name} uplaoded successfully!` });
        } else {
            return res.json({ success: `Product ${name} already exists successfully!` });
        }




    } catch (error) {
        console.log(error);
        return res.sendStatus(503);
    }



});

router.post('/addPrices/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const prices = req.body;
        const foundProduct = await Product.findById(id).exec();

        foundProduct.prices = prices;

        await foundProduct.save();
        
        res.sendStatus(200);
        console.log('Success');
    } catch (error) {
        res.sendStatus(500);
    }


})
module.exports = router;