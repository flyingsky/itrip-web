/**
 * User: ramon
 * Date: 7/21/12 11:26 AM
 */

   /*
    * 1. By default, we think all exports functions are public to client, in another word, any client can invoke
    * these functions and get JSON response result.
    *
    * 2. If some function is hidden for client, but you want to exports, please exports it as one property of an
    * exported object. For convention we use internal object. For example:
    *
    * exports.internal = {};
    * exports.internal.foo = function(){...};
    * exports.internal.bar = function(){...};
    *
    * 3. For any public service, we require the function signature satisfies below convention:
    * 3.1 If your function is asyn, please make sure first parameter is callback function with parameter name 'callback' and invoke callback when your execution is over, such as
    * function fetchImages.
    * 3.2 other parameters should have the same name in req.param. You are responsible to check the parameter data type, number or string.
    * By default we pass parameter as string from automatically service wrapper.
    */

// var easyimg = require('easyimage');

var LARGE_PAGE_SIZE = 30,
    SMALL_PAGE_SIZE = 10;


var path = require('path'),
    fs = require('fs'),
    utils = require('../lib/utils'),
    imgRelativeDir = 'demo_images',
    imgAbsoluteDir = path.join(process.pwd, 'public', imgRelativeDir);

var thumbnails = [{"width":"192","height":"256","url":"demo_images/1.jpg"},{"width":"192","height":"192","url":"demo_images/10.jpg"},{"width":"192","height":"288","url":"demo_images/11.jpg"},{"width":"192","height":"127","url":"demo_images/12.jpg"},{"width":"192","height":"256","url":"demo_images/13.jpg"},{"width":"191","height":"287","url":"demo_images/14.jpg"},{"width":"191","height":"287","url":"demo_images/15.jpg"},{"width":"192","height":"122","url":"demo_images/16.jpg"},{"width":"192","height":"192","url":"demo_images/17.jpg"},{"width":"191","height":"258","url":"demo_images/18.jpg"},{"width":"192","height":"143","url":"demo_images/19.jpg"},{"width":"191","height":"255","url":"demo_images/2.jpg"},{"width":"192","height":"144","url":"demo_images/20.jpg"},{"width":"192","height":"144","url":"demo_images/21.jpg"},{"width":"192","height":"132","url":"demo_images/22.jpg"},{"width":"192","height":"288","url":"demo_images/23.jpg"},{"width":"192","height":"267","url":"demo_images/24.jpg"},{"width":"192","height":"143","url":"demo_images/25.jpg"},{"width":"192","height":"143","url":"demo_images/26.jpg"},{"width":"192","height":"134","url":"demo_images/27.jpg"},{"width":"192","height":"120","url":"demo_images/28.jpg"},{"width":"192","height":"288","url":"demo_images/29.jpg"},{"width":"192","height":"192","url":"demo_images/3.jpg"},{"width":"192","height":"143","url":"demo_images/30.jpg"},{"width":"192","height":"192","url":"demo_images/31.jpg"},{"width":"192","height":"192","url":"demo_images/32.jpg"},{"width":"192","height":"288","url":"demo_images/33.jpg"},{"width":"192","height":"127","url":"demo_images/34.jpg"},{"width":"192","height":"192","url":"demo_images/35.jpg"},{"width":"191","height":"246","url":"demo_images/36.jpg"},{"width":"192","height":"384","url":"demo_images/37.jpg"},{"width":"192","height":"256","url":"demo_images/38.jpg"},{"width":"192","height":"256","url":"demo_images/39.jpg"},{"width":"191","height":"288","url":"demo_images/4.jpg"},{"width":"191","height":"277","url":"demo_images/40.jpg"},{"width":"192","height":"257","url":"demo_images/41.jpg"},{"width":"191","height":"287","url":"demo_images/42.jpg"},{"width":"48","height":"48","url":"demo_images/43.jpg"},{"width":"48","height":"48","url":"demo_images/44.jpeg"},{"width":"48","height":"48","url":"demo_images/45.jpg"},{"width":"48","height":"48","url":"demo_images/46.jpg"},{"width":"48","height":"48","url":"demo_images/47.jpg"},{"width":"48","height":"48","url":"demo_images/48.jpg"},{"width":"48","height":"48","url":"demo_images/49.jpg"},{"width":"192","height":"143","url":"demo_images/5.jpg"},{"width":"192","height":"144","url":"demo_images/6.jpg"},{"width":"192","height":"234","url":"demo_images/7.jpg"},{"width":"192","height":"191","url":"demo_images/8.jpg"},{"width":"191","height":"219","url":"demo_images/9.jpg"}];

exports.SMALL_PAGE_SIZE = SMALL_PAGE_SIZE;
exports.LARGE_PAGE_SIZE = LARGE_PAGE_SIZE;

exports.fetchImages = function (callback, page, pageSize) {
    var pageSize = pageSize || LARGE_PAGE_SIZE,
        index = page ? page : 1,
        itemStart = (index - 1) * pageSize, 
        itemEnd = itemStart + pageSize;

    if (thumbnails) {
        callback(thumbnails.slice(itemStart, itemEnd));
    } else {
        readImages(function (xs) {
            callback(xs ? xs.slice(itemStart, itemEnd) : []);
        });
    }
}

/**
 * Read Images via easyimage lib.
 */
function readImages (next) {
    fs.readdir(imgAbsoluteDir, function(err, imgs) {
        if (err) {
            throw err;
        }
        var thumbnails = [];
        imgs.forEach(function(imgFileShortName, index){
            var imgPath = path.join(imgAbsoluteDir, imgFileShortName);
            var relativePath = path.join(imgRelativeDir, imgFileShortName);

            easyimg.info(imgPath, function(err, features) {
                if (err) {
                    console.log('error in identify for: ' + imgPath);
                    throw err;
                }
                var thumbnail = {
                    width: features.width,
                    height: features.height,
                    //geometry: features.geometry,
                    url: relativePath
                };

                thumbnails[index] = thumbnail;

                // Why this loop??
                for(var i = 0; i < imgs.length; i++) {
                    if (!thumbnails[i]) {
                        return;
                    }
                }
                // TODO: thumbnails is variable outside async callback,
                // how this variable has been filled?
                next && next(thumbnails);
            });
        });
        
    });
}

exports.searchGallery = function(keyword) {
    if (!thumbnails || thumbnails.length <= 0) {
        return "no images found";
    }

    var len = thumbnails.length;
    var itemStart = utils.randomInt(len);
    var itemEnd = itemStart + utils.randomInt(len-itemStart);
    console.log('searchgallery: ' + itemStart + ', ' + itemEnd);
    return thumbnails.slice(itemStart, itemEnd);
};

exports.tripRecord = function(tripId) {
    var tripRecord = {
        id: 'trip_record_id',
        title:'Shanghai Trip',
        address:'Shanghai',
        authorId:'llmfei@gmail.com',
        authorName:'Ramon Liu',
        start:new Date(),
        end:new Date(),
        days:5,
        commentCount:20,
        favCount:10,
        dailyRecords: []
    };

    var len = thumbnails.length;
    for(var i = 0; i < 5; i++) {
        var pindex = utils.randomInt(len);
        pindex = pindex >= len ? len - 1 : pindex;
        var dailyRecord = {
            id: 'daily_record_id',
            title: 'Shanghai day ' + (i + 1),
            date: new Date(),
            intro: 'Intro: Shanghai day ' + (i + 1),
            photoUrl: thumbnails[pindex].url,
            commentCount: '5',
            favCount: '2'
        };
        tripRecord.dailyRecords.push(dailyRecord);
    }

    return tripRecord;
};

exports.upload = function(req, res) {
    var uploadView = 'tripboard/upload.jade';

    if (req.method == 'GET') {
        res.render(uploadView, {
            title: 'TripBoard',
            locals:{
                uploaded: false
            }
        });
        return;
    }

    if (req.method == 'POST') {
//        console.log(req.files);

        var tmpFile = req.files.displayImage.path;
        var extName = path.extname(req.files.displayImage.name);
        var imageUrl = "/upload/" + path.basename(tmpFile) + extName;
        var newPath = __dirname + "/../public" + imageUrl;

        fs.readFile(tmpFile, function (err, data) {
            if (err) {
                res.send(err);
                return;
            }

            fs.writeFile(newPath, data, function (err) {
                if (!err) {
                    res.render(uploadView, {
                        locals: {
                            title: 'TripBoard',
                            uploaded: true,
                            imageUrl: imageUrl
                        }
                    });
                } else {
                    res.send(err);
                }
            });
        });
    }
};

