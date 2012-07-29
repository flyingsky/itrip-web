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
             this.infiniteScroll();
         },
         addNew: function (data) {
            var that = this, 
                $boxes = $(data),
                $container = $(that.container);
            $container.prepend($boxes);
            $container.imagesLoaded(function() {
               $container.masonry('appended', $boxes, true);
            });
         },
         infiniteScroll: function () {
             var that = this,
                 $container = $(that.container);
             $container.infinitescroll({
                 navSelector  : '#page-nav',    // selector for the paged navigation 
                 nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
                 itemSelector : '.pin',         // selector for all items you'll retrieve
                 loading: {
                     finishedMsg: 'No more pages to load.',
                     img: '/imgs/waiting.gif',
                     selector: '#LoadingPins'
                 }
             },
             // trigger Masonry as a callback
             function( newElements ) {
                 // hide new items while they are loading
                 var $newElems = $( newElements ).css({ opacity: 0 });
                 // ensure that images load before adding to masonry layout
                 $newElems.imagesLoaded(function(){
                     // show elems now they're ready
                     $newElems.animate({ opacity: 1 });
                     $container.masonry( 'appended', $newElems, true ); 
                 });
             });
         }
      }
   });
     
})(jQuery);

// ======================================= homepage.js

(function ($) {

   function init () {
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
