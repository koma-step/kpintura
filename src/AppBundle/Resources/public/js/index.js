var width = $('.page').width() / 5;

function init_galerie(){
	width = ($('.page').width()-10) / 5 -18;
	
	$('.img_gal').each(function(){
		$(this).css('width', width);
	});

	$('.fancybox').fancybox();
	$('.grid').isotope({
	    itemSelector: '.grid-item',
	    masonry: {
	      columnWidth: width
	    }
	});

}

$(window).resize(function(){
	init_galerie();
});

$(document).ready(function(){
	init_galerie();
});