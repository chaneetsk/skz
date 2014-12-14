$( document ).ready(function() {

 	smoothScroll(1000);

});

function smoothScroll(duration) {
	$('a[href^="#"]').on('click', function(e){
		var target = $($(this).attr('href'));
		
		if (target.length>0) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			},duration);
		}
	});
}