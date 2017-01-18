var vague, vague_opt;

/**
 * see document.js
 * @var docControl DocumentController
 */

function reset_home() {
	if(!docControl.isAnimate()) {
		if($('.grow-up').length > 0 || $('.drop-down').length > 0) {
			docControl.onAnimate();

			$('.response-content').hide();
			$('.button').show();
			$('.button .text').show();
			$('#button-container, .button').addClass('go-normal');

			setTimeout(function() {
				$('.go-normal').removeClass('go-normal');
				$('.drop-down').removeClass('drop-down');
				$('.grow-up').removeClass('grow-up');
				$('.script_ajax').remove();
				$('.style_ajax').remove();
				$('.response-content').remove();

				var over = false;
				if($('#galerie:has(:hover)').length == 1) {
					docControl.stopAnim();
                    over_buttons($('#galerie'));
                    docControl.onAnimate();
					over = true;
				}
				else if($('#contact:has(:hover)').length == 1) {
					docControl.stopAnim();
                    over_buttons($('#contact'));
                    docControl.onAnimate();
					over = true;
				}
				if(over) {
					vague.animate(8, vague_opt);
				} else {
					reset_buttons();
				}
                docControl.stopAnim();
			}, 701);
		}

		$('#galerie').click(load_galerie);
		$('#contact').click(load_contact);
	}
}

function over_buttons(el) {
	if(!docControl.isAnimate() && !$(el).hasClass('grow-up')) {
        docControl.onAnimate();
		$(el).removeClass('mini');
		$(el).addClass('hover');
		$('.button:not(#' + $(el).attr('id') + ')').addClass('mini');
		$('.button:not(#' + $(el).attr('id') + ')').removeClass('hover');

		vague.animate(8, vague_opt).done(function() {
            docControl.stopAnim();
	    });
	}
}

function reset_buttons(el) {
	if(!docControl.isAnimate()) {
		$('.hover').removeClass('hover');
		$('.mini').removeClass('mini');

        docControl.onAnimate();
		vague.animate(0, vague_opt).done(function() {
            docControl.stopAnim();
	    });
	} else {
		setTimeout(function() {
			reset_buttons(el);
		}, 200);
	}
}

function append_galerie() {
	if($('#galerie').length != 0) {
		$('.button .text').hide();
        var articles = my_articles;
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
					<div class="grid-media" style="background-image: url(\'media/small/' + articles[i].name + '\');">\
						<div class="grid-layer"></div>\
					</div>\
				';
			}
        }
        galerie += "\
            </div>\
        "
        $('#galerie').append(galerie);
        init_galerie_view();
	}
}

function load_galerie() {
	if(!docControl.isAnimate()) {
        docControl.onAnimate();
		append_loading();

		$('#contact').addClass('drop-down');
		$('#button-container').addClass('grow-up');
		$('#galerie').addClass('grow-up');

		setTimeout(function() {
			$('#contact').hide();
			$('.button .text').hide();
            docControl.stopAnim();
		}, 701);

        append_galerie();

		$('#galerie').unbind('click', load_galerie);
		$('#contact').unbind('click', load_contact);
	}
}

function load_contact() {
	if(!docControl.isAnimate()) {
        docControl.onAnimate();
		append_loading();

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
				show_error(response.responseText);
			},
			complete: function() {
				setTimeout(function() {
					remove_loading();
				}, 100);
                docControl.stopAnimate();
			}
		});
		$('#contact').unbind('click', load_contact);
		$('#galerie').unbind('click', load_galerie);
	}
}

$(function() {
	vague = $('#background').Vague();
	vague_opt = {
		easing: 'linear',
	    duration: 0
	};

	$('#galerie, #contact').mouseover(function() {
		over_buttons(this)
	});
	$('#galerie, #contact').mouseleave(function() {
		reset_buttons(this)
	});

	$('#galerie').click(load_galerie);
	$('#contact').click(load_contact);

	$(document).keyup(function(e) {
		if(!docControl.isAnimate()) {
			var code = e.keyCode || e.which;
			if(code === 27) {
				reset_home();
			}
		}
	});
});