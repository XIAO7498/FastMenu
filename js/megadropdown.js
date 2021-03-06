$(document).ready(function(){
    var sub = $('#sub');

    var activeRow;
    var activeMenu;

    var timer;
    
    var mouseInsub = false;

    sub.on('mouseenter',function(e){
      mouseInsub = true;
    }).on('mouseleave',function(e){
      mouseInsub = false;
    })

    var mouseTrack = [];

    var moveHandler = function(e){
      mouseTrack.push({
        x: e.pageX,
        y: e.pageY
      });

      if(mouseTrack.length > 3){
        mouseTrack.shift();
      }
    }

    $('#test')
      .on('mouseenter',function(e){
        sub.removeClass('none');

        $(document).bind('mousemove',moveHandler);
      })
      .on('mouseleave',function(e){
        sub.addClass('none');

        if (activeRow) {
            activeRow.removeClass('active');
            activeRow = null;
        }

        if (activeMenu) {
            activeMenu.addClass('none');
            activeMenu = null;
        }

        $(document).unbind('mousemove',moveHandler);
      })
      .on('mouseenter','li',function(e){
        if (!activeRow){
            activeRow = $(e.target).addClass('active');
            activeMenu = $('#' + activeRow.data('id'));
            activeMenu.removeClass('none');
            return;
        }

        if(timer){
          clearTimeout(timer);
        }

        var currMousePos = mouseTrack[mouseTrack.length-1];
        var leftCorner = mouseTrack[mouseTrack.length-2];

        var delay = needDelay(sub,leftCorner,currMousePos);

        if(delay){
          timer = setTimeout(function(){
            if(mouseInsub){
              return;
            }
  
            activeRow.removeClass('active');
            activeMenu.addClass('none');
    
            activeRow = $(e.target);
            activeRow.addClass('active');
            activeMenu = $('#' + activeRow.data('id'));
            activeMenu.removeClass('none');
            timer = null;
          },300);
        }else{
          var prevActionRow = activeRow;
          var prevActionMenu = activeMenu;

          activeRow = $(e.target);
          activeMenu = $('#' + activeRow.data('id'));

          prevActionRow.removeClass('active');
          prevActionMenu.addClass('none');

          activeRow.addClass('active');
          activeMenu.removeClass('none');
        }
      })
})