(function() {
	this.HomeController = function() {
		this.vague = null;
        this.vague_opt = {
            easing: 'linear',
            duration: 0
        };
	};

	HomeController.prototype.init = function() {
        var ths = this;
        ths.vague = $('#background').Vague();

        $('#galerie, #contact').mouseover(function() {
            ths.over_buttons(this);
        });
        $('#galerie, #contact').mouseleave(function() {
            ths.reset_buttons(this);
        });

        $('#galerie').click(function() {
            ths.load_galerie();
        });
        $('#contact').click(function() {
            ths.load_contact();
        });

        $(document).keyup(function(e) {
            if(!vControl.isAnimate()) {
                var code = e.keyCode || e.which;
                if(code === 27) {
                    ths.reset_home();
                }
            }
        });
	};

    HomeController.prototype.reset_home = function() {
        var ths = this;
        if(!vControl.isAnimate()) {
            if($('.grow-up').length > 0 || $('.drop-down').length > 0) {
                vControl.onAnimate();

                $('.response-content').hide();
                $('.button').show();
                $('.button .text').show();
                $('#button-container, .button').addClass('go-normal');
                $('.grow-up').removeClass('grow-up');

                setTimeout(function() {
                    $('.go-normal').removeClass('go-normal');
                    $('.drop-down').removeClass('drop-down');
                    $('.script_ajax').remove();
                    $('.style_ajax').remove();
                    $('.response-content').remove();

                    var over = false;
                    if($('#galerie:has(:hover)').length == 1) {
                        vControl.stopAnim();
                        ths.over_buttons($('#galerie'));
                        vControl.onAnimate();
                        over = true;
                    }
                    else if($('#contact:has(:hover)').length == 1) {
                        vControl.stopAnim();
                        over_buttons($('#contact'));
                        vControl.onAnimate();
                        over = true;
                    }
                    if(over) {
                        ths.vague.animate(8, ths.vague_opt);
                    } else {
                        ths.reset_buttons();
                    }
                    vControl.stopAnim();
                }, 701);
            }

            $('#galerie').click(function() {
                ths.load_galerie(hControl);
            });
            $('#contact').click(function() {
                ths.load_contact(hControl);
            });
        }
    };

    HomeController.prototype.over_buttons = function(el) {
        var ths = this;
        if(!vControl.isAnimate() && !$(el).hasClass('grow-up')) {
            vControl.onAnimate();
            $(el).removeClass('mini');
            $(el).addClass('hover');
            $('.button:not(#' + $(el).attr('id') + ')').addClass('mini');
            $('.button:not(#' + $(el).attr('id') + ')').removeClass('hover');

            ths.vague.animate(8, ths.vague_opt).done(function() {
                vControl.stopAnim();
            });
        }
    };

    HomeController.prototype.reset_buttons = function(el) {
        var ths = this;
        if(!vControl.isAnimate()) {
            $('.hover').removeClass('hover');
            $('.mini').removeClass('mini');

            vControl.onAnimate();
            ths.vague.animate(0, ths.vague_opt).done(function() {
                vControl.stopAnim();
            });
        } else {
            setTimeout(function() {
                ths.reset_buttons(el);
            }, 200);
        }
    };

    HomeController.prototype.append_galerie = function() {
        var ths = this;
        if($('#galerie').length != 0) {
            var articles = MY_ARTICLES;
            var galerie = '\
                <div id="galerie_container" class="loading" data-mcs-theme="inset-3">\
                    <div class="menu_container">\
                        <span class="amokicon icon-menu"></span>\
                        <div class="galerie-dropdown-menu">\
                            <div class="item-dropdown">\
                                <span class="amokicon icon-return"></span>\
                            </div>\
                            <div class="item-dropdown">\
                                <span class="amokicon icon-contact"></span>\
                            </div>\
                        </div>\
                    </div>\
            ';
            for(var i = 0; i < articles.length; i++) {
                if(articles[i].name) {
                    galerie += '\
                        <div class="grid-media" data-name="'+articles[i].name+'" style="background-image: url(\'media/small/' + articles[i].name + '\');">\
                            <div class="grid-layer"></div>\
                        </div>\
                    ';
                }
            }
            galerie += "\
                </div>\
            ";
            $('#galerie').append(galerie);
            gControl.init_galerie_view();
        }
    };

    HomeController.prototype.load_galerie = function() {
        var ths = this;

        if(!vControl.isAnimate()) {
            vControl.onAnimate();
            vControl.append_loading();

            $('#contact').addClass('drop-down');
            $('#button-container').addClass('grow-up');
            $('#galerie').addClass('grow-up');

            setTimeout(function() {
                $('#contact').hide();
                $('.button .text').hide();
                vControl.stopAnim();
            }, 701);
            if($('.grid-media').length > 0) {
                setTimeout(function() {
                    gControl.init_parameters();
                    $('#galerie_container').show();
                }, 701);
            } else {
                ths.append_galerie();
            }

            $('#galerie').unbind('click');
            $('#contact').unbind('click');
        }
    };

    HomeController.prototype.load_contact = function() {
        var ths = this;
        if(!vControl.isAnimate()) {
            vControl.onAnimate();
            vControl.append_loading();

            var left = $('#galerie').offset().left;
            var top = $('#galerie').offset().top;
            $('#galerie').addClass('drop-down');
            $('#galerie').css('left', left);
            $('#galerie').css('top', top);

            $('#button-container').addClass('grow-up');
            $('#contact').addClass('grow-up');

            setTimeout(function() {
                $('#galerie').hide();
            }, 701);

            $.ajax({
                url: '/contact',
                success: function(response) {
                    $('#contact').append('<div class="response-content"></div>');
                    $('#contact .response-content').append(response);
                },
                error: function(response) {
                    vControl.show_error(response.responseText);
                },
                complete: function() {
                    setTimeout(function() {
                        vControl.remove_loading();
                    }, 100);
                    vControl.stopAnimate();
                }
            });
            $('#contact').unbind('click');
            $('#galerie').unbind('click');
        }
    };
}());