
var gallerySrv = require('../../services/gallery');

/**
 * 
 */ 
exports.index = function(req, res) {
    gallerySrv.fetchImages(req, function (datas) { res.send(datas); }, gallerySrv.SMALL_PAGE_SIZE);
};

exports.search = gallerySrv.searchGallery;

exports.tripRecord = gallerySrv.tripRecord;

exports.upload = gallerySrv.upload;

