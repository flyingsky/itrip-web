// ============================ common.js

(function ($) {

   $.itrip = $.itrip || {};
     
})(jQuery);

(function ($) {

   $.masonryHelper = function () {
      this.container = '.imagescontainer';
      this.config = { itemSelector: '.pin'
                     , columnWidth: 140};
   };
  
   $.extend($.masonryHelper, {
      prototype: {
         init: function () {
             var that = this,
                 $container = $(that.container);
             $container.imagesLoaded(function() {
                $container.masonry(that.config);
             });
         },
         addNew: function (data) {
            var that = this, 
                $boxes = $(data);
           $(that.container).prepend($boxes).masonry( 'appended', $boxes, true );
         }
      }
   });
     
})(jQuery);

// ======================================= homepage.js

(function ($) {
   function loadMoreImageHandler (event) {
      
      var mh = new $.masonryHelper();
      $.get('/index', {page:2}, function (data) {
         if (data) {
           mh.addNew(data);
         } else {
           //FIXME: show me error or ignore?
         }
      });

      event.preventDefault();
   };

   function init () {
      $('#LoadingPins').click(loadMoreImageHandler);
   }

   $.itrip.homepage = $.itrip.homepage || {};
   $.extend($.itrip.homepage, {
      init: init
   });
     
})(jQuery);


// ======================================= onload

$(function () {
   new $.masonryHelper().init();      
   $.itrip.homepage.init();
});
