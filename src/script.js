;(function($){
  $.fn.rtable = function(options){
    options = $.extend({
      minWidth: 5
    }, options);

    return this.each(function(){
      var $table = $(this);
      var $colgroup = $table.find('colgroup').length ? $table.find('colgroup') : $('<colgroup></colgroup>').prependTo($table);

      // set current width to <col>-s
      var colsHTML = '';
      $table.find('thead th').each(function(){
        var $th = $(this);
        var width = $th.data('rtable-width') || $th.width() + 15;

        width = Math.max(width, $th.data('rtable-min-width') || options.minWidth);

        var $thContent = $th.html();
        var $newThContent = $('<div class="rtable-th"><div class="rtable-th-content"></div><div class="rtable-th-resize"></div></div>');

        $th.empty();

        $newThContent.appendTo($th).find('.rtable-th-content').append($thContent);

        colsHTML += '<col width="' + width + '">';
      });
      $colgroup.html(colsHTML);

      var $resizableTh, startX, startWidth;

      $table.find('thead').on('mousedown', '.rtable-th-resize', dragInit);

      function dragInit(event) {
        if (event.which != 1 || (event.button && event.button != 1)) { return; }

        $resizableTh = $(this).closest('th');
        startX = event.clientX;
        startWidth = parseInt($colgroup.find('col').eq($resizableTh.index()).attr('width'));

        $(document).on('mousemove', dragMove);
        $(document).on('mouseup', dragStop);
      }

      function dragMove(event) {
        var newWidth = startWidth + (event.clientX - startX);
        newWidth = Math.max(newWidth, $resizableTh.data('rtable-min-width') || options.minWidth);
        $colgroup.find('col').eq($resizableTh.index()).attr('width', newWidth);
      }

      function dragStop() {
        $(document).off('mousemove', dragMove);
        $(document).off('mouseup', dragStop);
      }

      $table.addClass('rtable');
    });
  };
}(jQuery));
