var loader, 
	i_max;

$(document).ready(init_view);

function init_view() {
	loader = $('#loader-container');
	
	i_max = $('.image-load').length;

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
}

function load_images() {
	$('.image-load').each(function() {
		if(this.complete) {
			image_loaded.call(this);
		} else {
			$(this).one('load', image_loaded(this));
		}
	});
}

function append_loading() {
	$('#page').append(loader);
	setTimeout(function() {
		$('#loader-container').css('opacity', 1);
	}, 10);
}
function remove_loading() {
	$('#loader-container').css('opacity', 0);
	setTimeout(function() {
		$('#loader-container').remove();
	}, 1000);
}

function show_error(msg) {
	if($.fancybox) {
		setTimeout(function() {
			$.fancybox(msg, {
				openEffect: 'elastic',
				closeEffect: 'elastic',
				openSpeed: 'slow',
				scrolling: 'auto'
			});
		}, 500);
		
		if(on_animate) {
			on_animate = false;
		}
	}
}