(function($) { $.fn.galerieGrid = function(options) {
	var default = {
		item: '',
		columnWidth: '50px',
		arrangeComplete: null
	};
	var parameters = $.extend(default, options);

	return $(this).each(function() {


		if(parameters.arrangeComplete) {
			parameters.arrangeComplete();
		}
	});
};})(jQuery);