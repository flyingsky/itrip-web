
var gallerySrv = require('../services/gallery');

/**
 * Fetch images in terms of page.
 */  
exports.index = function (req, res) {
    gallerySrv.fetchImages(req, function (datas) {
        var page = gallerySrv.getPageIndexParam(req),
            jade = parseInt(page) >= 2 ? 'tripboard/gallery' : 'index';

        res.render(jade, { images: datas, title: 'Index' });

    }, 12);
};
