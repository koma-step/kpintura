var auto_toggle = true;
var columnWidth = $('.page').width() / 5 -10;

function hideshow_menu(){
	if($('#hideshow').hasClass('icon-arrow-right')){
		retract_container();
	}else if($('#hideshow').hasClass('icon-arrow-left')){
		expand_container();
	}

	$('#hideshow').toggleClass('icon-arrow-right');
	$('#hideshow').toggleClass('icon-arrow-left');
	auto_toggle = !auto_toggle;
}

function expand_container(){
	$('.navbar_km').css('margin-left', '-'+columnWidth+'px');
	$('#container').css('width', $('.page').width() - 10);

	if(typeof init_galerie == 'function'){
		setTimeout(init_galerie, 1000);
	}
}

function retract_container(){
	$('.navbar_km').css('margin-left', 0);
	$('#container').css('width', $('.page').width() - $('.navbar_km').width() - 10);

	if(typeof init_galerie == 'function'){
		setTimeout(init_galerie, 1000);
	}
}


function init_galerie(){
	columnWidth = $('.page').width() / 5 -10;

	$('.navbar_km').css('width', columnWidth);
	$('.hide_show').css('margin-left', columnWidth);
	$('.title').css('width', columnWidth/1.1);
	$('.item').children('.link').children('label').css('font-size', columnWidth/15+'px');
	$('.item').children('.link').children('span').css('font-size', columnWidth/20+'px');
	$('.list_menu').css('margin-left', columnWidth-$('.list_menu').width()-10);

	$('.navbar_km').mouseleave(function(){
		if(auto_toggle){ 
			$('.navbar_km').css('margin-left', '-'+columnWidth+10+'px');
			$('.page .invisible').css('display', '');
			$('.list_menu .sub_menu').css('width', 0);
			expand_container();
		}
	});
}

function init_functions(){
	$('.page .invisible').hover(function(){
		if(auto_toggle){
			$('.page .invisible').css('display', 'none');
			retract_container();
		}
	});
	
	$('.navbar_km .home').hover(function(){
		$('.home .top').css('margin-top', 0);
		$('.home .bottom').css('margin-bottom', 0);
	});
	$('.navbar_km .home').mouseleave(function(){
		$('.home .top').css('margin-top', '-50px');
		$('.home .bottom').css('margin-bottom', '-15px');
	});

	$('.list_menu .item').click(function(){
		var href = $(this).children('a').attr('href');
		window.location.replace(href);
	});

	$('.list_menu .item').hover(function(){ 
		var slide = $(this).prev('.slide');
		var direction = $(this).parent('.sub_menu').length==0 ? 'left' : 'right';
		slide.css('margin-'+direction, 0);
		slide.css('width', '200px');
	});
	$('.list_menu .item').mouseleave(function(){
		var slide = $(this).prev('.slide');
		var direction = $(this).parent('.sub_menu').length==0 ? 'left' : 'right';
		slide.css('margin-'+direction, '200px');
		slide.css('width', 0);
	});

	$('.item').not('.sub_item').hover(function(){
		$('.sub_menu').css('width', 0);
		$('.sub_menu').css('z-index', 1);

		var sub = $(this).next('.sub_menu');
		if(sub.length > 0){
			sub.css('width', '200px');
			sub.css('z-index', 2);
			$('list_menu').css('width', '410px');
		}
	});
	$('.list_menu').mouseleave(function(){
		$('.sub_menu').css('width', 0);
		$('list_menu').css('width', '210px');
	});

	$('#hideshow').click(hideshow_menu);
	
	$('.page').css('opacity', 1);
}


$(window).resize(function(){
	init_view();
});

$(document).ready(function(){
	init_view();
	init_functions();
	hideshow_menu();
});