var gallerySrv = require('../services/gallery'),
   util = require('../lib/utils');

/**
 * Fetch images in terms of page.
 */
exports.index = function (req, res) {
   var pageIndex = util.parseInt(req.param('page'), 0);
   var pageSize = util.parseInt(req.param('pageSize'), 0);
   gallerySrv.fetchImages(function (datas) {
      var jade = pageIndex >= 2 ? 'tripboard/gallery' : 'index';
      res.render(jade, { images:datas, title:'Index' });
   }, pageIndex, pageSize, 12);
};
