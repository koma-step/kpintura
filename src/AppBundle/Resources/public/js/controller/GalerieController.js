(function() {
    this.GalerieController = function() {
        this.general_img_width = null;
        this.general_img_height = null;
        this.nb_images_width = null;
        this.nb_images_height = null;
        this.img_grow = null;
        this.image_vague = null;
        this.first_init = false;
        this.container = null;
        this.initial_height = 0;
        this.vague = null;
        this.vague_opt = {
            easing: 'linear',
            duration: 0
        };
    };

    GalerieController.prototype.init = function() {
        var ths = this;
        ths.container = $('#galerie_container');
        $(document).keyup(function(e) {
            if(!vControl.isAnimate()) {
                var code = e.keyCode || e.which;
                if(code === 27) {
                    ths.delete_galerie();
                }
            }
        });
        $(window).resize(function() {
            ths.init_galerie_view();
        });
    };

    GalerieController.prototype.init_parameters = function() {
        this.screen_ratio = $(window).width() / $(window).height();
        if(this.screen_ratio < 1) {
            this.nb_images_width = 1;
            this.nb_images_height = 3;
        } else if(this.screen_ratio < 2) {
            this.nb_images_width = 2;
            this.nb_images_height = 3;
        } else {
            this.nb_images_width = 4;
            this.nb_images_height = 3;
        }

        this.general_img_width = $(window).width() / this.nb_images_width;
        this.general_img_height = $(window).height() / this.nb_images_height;
        this.img_grow = this.general_img_height / 6;

        this.initial_height = MY_ARTICLES.length / this.nb_images_width * this.general_img_height;
    };

    GalerieController.prototype.init_menu = function() {
        $('.icon-menu').click(function(e) {
            $('.menu_container').addClass('expand');
        });
        $('.icon-return').click(function(e) {
            reset_home();
        });
    };

    GalerieController.prototype.init_isotope = function() {
        var ths = this;
        ths.container.isotope({
            itemSelector: '.grid-media',
            masonry: {
                columnWidth: ths.general_img_width
            }
        });

        ths.container.on( 'arrangeComplete', function() {
            ths.container.removeClass('loading');

            $('.grid-media').each(function() {
                $(this).attr('data-init-posx', parseInt($(this).css('left')));
                $(this).attr('data-init-posy', parseInt($(this).css('top')));
            });
        });
    };

    GalerieController.prototype.init_galerie_view = function() {
        var ths = this;
        if(!vControl.isAnimate()) {
            ths.container = $('#galerie_container');
            if($('.mCSB_scrollTools').length > 0) {
                ths.container.mCustomScrollbar('destroy');
            }

            ths.init_parameters();

            $('.grid-media, .sk-cube-grid').width(ths.general_img_width);
            $('.grid-media, .sk-cube-grid').height(ths.general_img_height);
            ths.init_gridlayer_spinner();

            ths.container.width($(window).width());
            ths.container.height($(window).height());

            ths.container.mCustomScrollbar({
                mouseWheel: {
                    scrollAmount: 200
                }
            });

            ths.init_isotope();

            $('.mCSB_container').height(ths.initial_height);
            ths.container.height('100%');
            ths.container.removeClass('loading');
            setTimeout(function() {
                vControl.remove_loading();
            }, 500);

            $('.grid-media').waitForImages({
                each: function() {
                    var el = this;
                    $(el).attr('data-init-posx', $(el).position().left);
                    $(el).attr('data-init-posy', $(el).position().top);
                    ths.init_media(el);
                    ths.remove_gridlayer_spinner(el);
                },
                waitForAll: true
            });

            ths.init_menu();
            ths.first_init = true;
        }
        else {
            setTimeout(function() {
                ths.init_galerie_view()
            }, 500);
        }
    };

    GalerieController.prototype.init_gridlayer_spinner = function() {
        $('.grid-layer').append('\
            <div class="sk-cube-grid">\
                <div class="sk-cube sk-cube1"></div>\
                <div class="sk-cube sk-cube2"></div>\
                <div class="sk-cube sk-cube3"></div>\
                <div class="sk-cube sk-cube4"></div>\
                <div class="sk-cube sk-cube5"></div>\
                <div class="sk-cube sk-cube6"></div>\
                <div class="sk-cube sk-cube7"></div>\
                <div class="sk-cube sk-cube8"></div>\
                <div class="sk-cube sk-cube9"></div>\
            </div>\
        ');
    };

    GalerieController.prototype.remove_gridlayer_spinner = function(el) {
        if($(el).length != 0) {
            setTimeout(function() {
                $(el).children('.grid-layer').css('opacity', 0);
                setTimeout(function() {
                    $(el).children('.grid-layer').remove();
                }, 701);
            }, 200);
        }
    };

    GalerieController.prototype.hover_grid_media = function(media) {
        if(!$(media).hasClass('grow-up')) {
            var ths = this;
            var x = $(media).attr('data-init-posx');
            var y = $(media).attr('data-init-posy');

            $(media).css({
                width: ths.general_img_width + ths.img_grow,
                height: ths.general_img_height + ths.img_grow * 2,
                left: x - ths.img_grow / 2,
                top: y - ths.img_grow / 2,
                'z-index': 600
            });
        }
    };

    GalerieController.prototype.leave_grid_media = function(media) {
        if(!$(media).hasClass('grow-up')) {
            var ths = this;
            var x = parseInt($(media).attr('data-init-posx'));
            var y = parseInt($(media).attr('data-init-posy'));

            $(media).css({
                width: ths.general_img_width,
                height: ths.general_img_height,
                left: x,
                top: y
            });

            setTimeout(function () {
                $(media).css('z-index', 1);
            }, 50);
        }
    };

    GalerieController.prototype.init_media = function(media) {
        var ths = this;

        $(media).hover(function () {
            ths.hover_grid_media(this);
        });
        $(media).mouseleave(function() {
            ths.leave_grid_media(this);
        });
        $(media).click(function() {
            mControl.init(media);
        });
    };

    GalerieController.prototype.delete_galerie = function() {
        $('#galerie_container').hide();
    }
}());
