function MediaController() {
    var media;

    MediaController.prototype.initMediaView = function(media) {
        this.media = media;
        // image_vague = $(media).Vague();
        // image_vague.animate(8, {
        //     easing: 'linear',
        //     duration: 0
        // });
        $('.grid-media.grow-up').removeClass('grow-up');
        $(media).addClass('grow-up');
        $(media).unbind('click');
        $(media).unbind('hover');
        $(media).unbind('mouseleave');

        $(document).keyup(function(e) {
            if(!parent.on_animate) {
                var code = e.keyCode || e.which;
                if(code === 27) {
                    this.deleteMediaView(this.media);
                }
            }
        });
    };
    
    MediaController.prototype.deleteMediaView = function(media) {
        
    };
}MediaController.prototype = new MediaController;

var mediaController = new MediaController();