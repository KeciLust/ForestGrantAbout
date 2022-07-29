new WOW().init();

$(document).ready(function(){
	backToTop();
	// form masks maskedinput
	$("input[type='tel']").mask("+7 (999) 999-99-99");
	// end form masks maskedinput

	let window_width = $( window ).width();

	if (window_width <= 1024) {
		$('.js-info-menu').appendTo('.js-header-menu');
		$('.js-geo').appendTo('.js-header-menu');
	}

	//открыть меню
	$('body').on('click', '.js-burger', function(){
		$(this).toggleClass('open');
		$('.js-mobile-menu').toggleClass('open');
	});

	if (window_width <= 1024) {
		$('body').on('click', '.js-menu-list-open', function(){
			$('.js-mobile-menu').addClass('open_menu')
			$(this).parents('.js-menu-block').find('.js-menu-list').addClass('open')
		});
		$('body').on('click', '.js-menu-sublist-open', function(){
			$(this).parents('.menu_item').addClass('open_submenu')
			$('.js-mobile-menu').addClass('opensub')
		});
		$('body').on('click', '.js-return-menu', function(){
			if ($('.js-mobile-menu').hasClass('opensub')) {
				$('.js-mobile-menu').removeClass('opensub')
				$('.menu_item').removeClass('open_submenu')
			} else {
				$('.js-mobile-menu').removeClass('open_menu')
				$('.js-menu-list').removeClass('open')
			}
		});
	} else {
		$('body').on('click', '.js-open-menu', function(){
			let catalogType = $(this).data('menu');
			if ($(this).hasClass('open')) {
				$('.js-open-menu').removeClass('open');
				$('.js-menu-block').removeClass('open');
			} else {
				$('.js-open-menu').removeClass('open');
				$('.js-menu-block').removeClass('open');
				$(this).toggleClass('open');
				$('.js-menu-block[data-menu="'+catalogType+'"]').toggleClass('open');
			}

		});
	}
	//открыть меню

	//открыть/закрыть popup обратной связи
	$('body').on('click', '.js-open-callback', function(){
		$('.js-callback-popup').addClass('open');
	});
	$('body').on('click', '.js-popup-callback-close', function(){
		$('.js-callback-popup').removeClass('open');
	});
	//открыть/закрыть popup  обратной связи

	//плавный переход по якорю
	//let headerHeight = 40;
	// if (window_width <= 480) {
	// 	headerHeight = 85;
	// }
	/*$(".js-product-anchors").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top - headerHeight;
		$('body,html').animate({scrollTop: top}, 1500);
	});*/
	//плавный переход по якорю

	//sliders
	let indexSwiper = new Swiper('.js-swiper-index', {
		slidesPerView: 1,
		spaceBetween: 0,
		slidesPerGroup: 1,
		loop: false,
		loopFillGroupWithBlank: true,
		pagination: {
			el: '.swiper-index-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-index-next',
			prevEl: '.swiper-index-prev',
		},
	});
	let categoriesSwiper = new Swiper('.js-swiper-categories', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		loop: false,
		navigation: {
			nextEl: '.swiper-categories-next',
			prevEl: '.swiper-categories-prev',
		},
	});
	let catalogImagesSwiper = new Swiper('.js-swiper-catalog-product', {
		slidesPerView: 1,
		spaceBetween: 0,
		slidesPerGroup: 1,
		loop: false,
		loopFillGroupWithBlank: true,
		navigation: {
			nextEl: '.swiper-catalog-images-next',
			prevEl: '.swiper-catalog-images-prev',
		},
	});
	//end sliders

	let productThumbs = new Swiper('.js-product-thumbs', {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	let productSlider = new Swiper('.js-product-slider', {
		spaceBetween: 10,
		navigation: {
			nextEl: '.swiper-product-next',
			prevEl: '.swiper-product-prev',
		},
		thumbs: {
			swiper: productThumbs
		}
	});

	$('.after_text_link').click(function() {
		$('body,html').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
		return false;
	});

});
//end (document).ready

/* Подняться наверх */
function backToTop() {
	var toTop =  $("#to-top"), toTopLink = $('#to-top a');
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				toTop.fadeIn();
			} else {
				toTop.fadeOut();
			}
		});
		toTopLink.click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 500);
			return false;
		});
	});
};
/* Подняться наверх */

/*форма*/
function feedbackForm(form){
	let url = form.action,
		data = $(form).serialize(),
		this_form = $(form);
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'json',
		data: data,
		success:function(result){
			console.log(result);
			if(result.status == 'success'){
				$(this_form).parents('.js-feedback').find('.js-error').removeClass('active').html('');
				$(this_form).parents('.js-feedback').find('.js-success').addClass('active').html(result.message);
				$(this_form).hide();
				$(this_form)[0].reset();
			}else{
				$(this_form).parents('.js-feedback').find('.js-success').removeClass('active').html('');
				$(this_form).parents('.js-feedback').find('.js-error').addClass('active').html(result.message);
			}
		}
	});
	event.preventDefault();
}
/*форма*/
