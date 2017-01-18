var general_img_width;
var general_img_height;
var nb_images_width;
var nb_images_height;
var img_grow;
var container = $('#galerie_container');
var first_init = false;
var image_vague;

function init_parameters() {
	screen_ratio = $(parent.window).width() / $(parent.window).height();
   	if(screen_ratio < 1) {
        nb_images_width = 1;
		nb_images_height = 3;
   	} else if(screen_ratio < 2) {
        nb_images_width = 2;
		nb_images_height = 3;
	} else {
        nb_images_width = 4;
		nb_images_height = 3;
	}

	general_img_width = $(window).width() / nb_images_width;
	general_img_height = $(window).height() / nb_images_height;
	img_grow = general_img_height / 6;
}

function init_menu() {
	$('.icon-menu').click(function(e) {
		$('.menu_container').addClass('expand');
	});
	$('.icon-return').click(function(e) {
		reset_home();
	});
}

function init_galerie_view() {
	if(!docControl.isAnimate()) {
        container = $('#galerie_container')
		if($('.mCSB_scrollTools').length > 0) {
        	container.mCustomScrollbar('destroy');
        }

       	init_parameters();

		$('.grid-media, .sk-cube-grid').width(general_img_width);
		$('.grid-media, .sk-cube-grid').height(general_img_height);
		if(!first_init) {
			init_gridlayer_spinner();
		}

		container.width($(window).width());
		container.height($(window).height());

		container.mCustomScrollbar({
            mouseWheel: {
                scrollAmount: 200
            }
        });
		container.isotope({
		    itemSelector: '.grid-media',
		    masonry: {
		      columnWidth: general_img_width
		    }
		});

		container.on( 'arrangeComplete', function() {
			remove_loading();
			container.removeClass('loading');

			$('.grid-media').each(function() {
				$(this).attr('data-init-posx', parseInt($(this).css('left')));
				$(this).attr('data-init-posy', parseInt($(this).css('top')));
			});
		});

		$('.grid-media').waitForImages({
			each: function() {
				var el = this;
				// setTimeout(function() {
					remove_gridlayer_spinner(el);
					init_media(el);
				// }, 200);
			},
			waitForAll: true
		});

        remove_loading();
		$('.mCSB_container').height(container.height());
		container.height('100%');
        $('#galerie_container').removeClass('loading');

		init_menu();
		first_init = true;
	} 
	else {
		setTimeout(init_galerie_view, 500);
	}
}

function init_gridlayer_spinner() {
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
}

function remove_gridlayer_spinner(el) {
	if($(el).length != 0) {
		setTimeout(function() {
			$(el).children('.grid-layer').css('opacity', 0);
			setTimeout(function() {
				$(el).children('.grid-layer').remove();
			}, 701);
		}, 200);
	}
}

function hover_grid_media(media) {
    var x = $(media).attr('data-init-posx');
    var y = $(media).attr('data-init-posy');

    $(media).css({
        width: general_img_width + img_grow,
        height: general_img_height + img_grow*2,
        left: x - img_grow/2,
        top: y - img_grow/2,
        'z-index': 600
    });
}

function leave_grid_media(media) {
    var x = parseInt($(media).attr('data-init-posx'));
    var y = parseInt($(media).attr('data-init-posy'));

    $(media).css({
        width: general_img_width,
        height: general_img_height,
        left: x,
        top: y
    });

    setTimeout(function() {
        $(media).css('z-index', 1);
    }, 50);
}

function init_media(media) {
    $(media).attr('data-init-posx', $(media).position().left);
    $(media).attr('data-init-posy', $(media).position().top);

	$(media).hover(function () {
        hover_grid_media(this);
	});
	$(media).mouseleave(function() {
        leave_grid_media(this);
	});
    $(media).click(function() {
        mediaController.initMediaView(media);
    });
}

function delete_galerie() {
	container.unbind('arrangeComplete');
	container.isotope('destroy');
    $('#galerie_container').remove();
}

$(document).ready(function() {
	$(document).keyup(function(e) {
		if(!docControl.isAnimate()) {
			var code = e.keyCode || e.which;
			if(code === 27) {
				delete_galerie();
			}
		}
	});
    mediaController = new MediaController;
});

$(window).resize(init_galerie_view);