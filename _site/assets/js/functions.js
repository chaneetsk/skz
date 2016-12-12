$( document ).ready(function() {

 	smoothScroll(1000);
 	workBelt();
 	workLoad();
 	clientDisplay();

 	sendEmail();

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
	$('.client-mobile-nav span').first().addClass('active-client');

	$('.client-logo, .client-mobile-nav span').on('click', function() {
		var pos = $(this).parent().children().index(this);
		console.log(pos);

		$('.client-unit').removeClass('active-client').eq(pos).addClass('active-client');
		$(this).siblings().removeClass('active-client');
		$(this).addClass('active-client');

	});


	$('.client-control-next').click(function(){

		var curActiveClient = $('.clients-belt').find('.active-client'),
		position = $('.clients-belt').children().index(curActiveClient),

		clientNum = $('.client-unit').length;

		//console.log(curActiveClient, position, clientNum);

		if(position < clientNum - 1) {
			$('.active-client').removeClass('active-client').next().addClass('active-client');
		} else {
			$('.client-unit').removeClass('active-client').first().addClass('active-client');
			$('.client-logo').removeClass('active-client').first().addClass('active-client');
		}
	});

	$('.client-control-prev').click(function() {

		var curActiveClient = $('.clients-belt').find('.active-client'),
		position = $('.clients-belt').children().index(curActiveClient);

		if(position === 0) {
			$('.client-unit').removeClass('active-client').last().addClass('active-client');
			$('.client-logo').removeClass('active-client').last().addClass('active-client');
		} else {
			$('.active-client').removeClass('active-client').prev().addClass('active-client');
		}


	});
}

function sendEmail() {
	$('#submit-btn').click(function(){

		$('.notification').empty();

		var valid = true;
		var emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
		var inputVal = $('#form-email').val();

		var msgJson = {
			"name": $('#form-name').val(),
			"email": $('#form-email').val(),
			"message": $('#form-msg').val()
		}

		if(!emailReg.test(inputVal)) {
			$('.notification').append('<span>invalid email address</span><br/>');
			valid = false;
		}

		$.each(msgJson, function(index,value){
			if(value.length === 0) {
				$('.notification').append('<span>'+index+' is required</span><br/>');
				valid = false;
			}
		});

		if(valid === true) {
			$.ajax({
				type: "POST",
				url: "http://www.sanjeet.com.au/mailApi/mail.php",
				crossDomain: true,
				data: JSON.stringify(msgJson),
				contentType: 'application/json',
				complete: function(reObj,txtStatus) {
					//console.log(reObj.responseText);
				},
				success: function(data,txtStatus,reObj) {
					console.log(reObj.responseText);
					$('.message-sent').html('<span style="color: green">'+ reObj.responseText +'</span>').animate({opacity:0},1500,function(){
						$('.message-sent').empty();
						$('.message-sent').css({"font-size":"3em","opacity":"1"});
					});
				}
			});
			//console.log(valid);
			//console.log(msgJson);
			
			//console.log(JSON.stringify(msgJson));
		}

		$('#form-name').val("");
		$('#form-email').val("");
		$('#form-msg').val("");
	});
	
}

/*
function smoothScroll(duration) {

	var jump = function(e) {

		if (location.host == "127.0.0.1:4000" && location.pathname == "/" ) {
			if(e) {
				e.preventDefault();
				var target = $(this).attr("href");
			} else {
				var target = location.hash;
			}
			console.log(target);
			var result = target.split('#');
			var result = "#".concat(result[1]);
			console.log(result);
			
			$('html,body').animate({
				scrollTop: $(result).offset().top
			},duration,function(){
				
			});
		} else {
			e.preventDefault();
			var target = $(this).attr("href");
			window.location.href = target;
			console.log(target);
			
		}
	}

	
	$('a[href*=#]').on('click',jump);

	 if (location.hash){
            setTimeout(function(){
                $('html, body').scrollTop(0).show()
                jump()
            }, 0);
        }else{
          $('html, body').show()
     }


}

function smoothScroll(duration) {
	$('a[href*=#]').on('click', function(e) {
		e.preventDefault();
		//console.log(this);
		if (location.host == "127.0.0.1:4000" && location.pathname == "/" ) {
			// e.preventDefault();
			console.log("inside");
			
			var target = $(this).attr("href");

			//var target = $($(this).attr("href"));
		} else {
			console.log("outside");
			var target = $(this).attr("href");
		}
	
		//var target = $($(this).attr("href"));
		//var target = location.hash;
		//console.log("clicked");
		console.log(target);
		
		if (target.length>0) {
			//e.preventDefault();
			$('html, body').animate({
				scrollTop: $(target).offset().top
			},duration,function() {
				location.hash = target;
			});
		}
	});
}
*/