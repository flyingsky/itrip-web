
var gallerySrv = require('../services/gallery');

/**
 * Fetch images in terms of page.
 */  
exports.index = function (req, res) {
    gallerySrv.fetchImages(req, function (datas) {
        res.render('tripboard/gallery', { images: datas, title: 'Index' });
    });
}


