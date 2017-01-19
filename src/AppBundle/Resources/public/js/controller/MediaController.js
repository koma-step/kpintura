(function() {
    this.MediaController = function() {
        this.media = null;
    };

    MediaController.prototype.init = function(media) {
        var ths = this;
        ths.media = media;

        $(media).unbind('click');
        $(media).unbind('hover');
        $(media).unbind('mouseleave');

        $('.grid-media.grow-up').removeClass('grow-up');
        $(media).css({
            'height': $(window).height() + 'px'
        });
        $(media).addClass('grow-up');

        var name = $(media).data('name');
        $(media).append('\
            <div class="media-big" style="background-image: url(\'media/big/' + name + '\');"></div>\
        ');
        $('.media-big').css('opacity', '0');
        $('.media-big').waitForImages(function() {
            $(this).css('opacity', '1');
        });

        $(document).unbind('keyup');
        $(document).keyup(function(e) {
            if(!parent.on_animate) {
                var code = e.keyCode || e.which;
                if(code === 27) {
                    ths.deleteMediaView(ths.media);
                }
            }
        });
    };
    
    MediaController.prototype.deleteMediaView = function(media) {
        var ths = this;
        $(media).removeClass('fixed');
        $(ths.media).removeClass('grow-up');
        $(ths.media).css({
            width: gControl.general_img_width,
            height: gControl.general_img_height,
            top: $(ths.media).data('init-posy'),
            left: $(ths.media).data('init-posx')
        });
        $(ths.media).children('.media-big').remove();
        gControl.init_media(ths.media);
        setTimeout(function() {
            $('#galerie_container').mCustomScrollbar({
                mouseWheel: {
                    scrollAmount: 200
                }
            });
            $('.mCSB_container').height(gControl.initial_height);
        }, 500);

        $(document).keyup(function(e) {
            if(!vControl.isAnimate()) {
                var code = e.keyCode || e.which;
                if(code === 27) {
                    gControl.delete_galerie();
                    hControl.reset_home();
                }
            }
        });
    };
}());