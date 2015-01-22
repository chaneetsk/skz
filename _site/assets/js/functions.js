$( document ).ready(function() {

 	smoothScroll(1000);
 	workBelt();
 	workLoad();
 	clientDisplay();

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

function workBelt() {
	$('.thumb-unit').click(function() {
		$('.work-belt').css('left','-100%');
		$('.work-wrapper').show();

	});

	$('.work-return').click(function(){
		$('.work-belt').css('left','0%');
		$('.work-wrapper').hide(700);
	});

}

function workLoad() {
	$.ajaxSetup ({ cache: true });

	$('.thumb-unit').click(function() {

		var newTitle = $(this).find('strong').text(),
			newFolder = $(this).data('folder'),
			spinner = '<div class="loader">Loading...</div>',
			newHTML = '/work/'+ newFolder +'.html';

		$('.project-load').html(spinner).load(newHTML);
		$('.project-title').text(newTitle);
	});
}

function clientDisplay() {
	$('.client-unit').first().addClass('active-client');
	$('.client-logo').first().addClass('active-client');

	$('.client-logo').on('click', function() {
		var pos = $(this).parent().children().index(this);
		console.log(pos);

		$('.client-unit').removeClass('active-client').eq(pos).addClass('active-client');
		$(this).siblings().removeClass('active-client');
		$(this).addClass('active-client');

	});



}