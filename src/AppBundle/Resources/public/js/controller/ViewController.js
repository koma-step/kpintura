(function() {
    this.ViewController = function() {
        this.animate = false;
        this.loading = null;
    };

    ViewController.prototype.setAnimate = function(animate) {
        this.animate = animate;
    };

    ViewController.prototype.onAnimate = function() {
        this.animate = true;
    };

    ViewController.prototype.stopAnim = function() {
        this.animate = false;
    };

    ViewController.prototype.isAnimate = function() {
        return this.animate;
    };

    ViewController.prototype.initView = function() {
        this.loader = $('#loader-container');

        $('.image-load').waitForImages({
            finished: function() {
                $('#main-container').css('opacity', 1);
                $('#loader-container').css('opacity', 0);
                setTimeout(function() {
                    $('#loader-container').remove();
                }, 2000);
            },
            waitForAll: true
        });
    };

    ViewController.prototype.append_loading = function() {
        $('#page').append(this.loading);
        setTimeout(function() {
            $('#loader-container').css('opacity', 1);
        }, 10);
    };

    ViewController.prototype.remove_loading = function() {
        $('#loader-container').css('opacity', 0);
        setTimeout(function() {
            $('#loader-container').children().remove();
        }, 500);
    };

    ViewController.prototype.show_error = function(msg) {
        if($.fancybox) {
            setTimeout(function() {
                $.fancybox(msg, {
                    openEffect: 'elastic',
                    closeEffect: 'elastic',
                    openSpeed: 'slow',
                    scrolling: 'auto'
                });
            }, 500);

            if(this.isAnimate) {
                this.stopAnim();
            }
        }
    };
}());