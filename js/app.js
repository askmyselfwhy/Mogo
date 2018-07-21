let prevTL = {
	top: 0,
	left: 0
};
let mapOpened = false;
let menuOpened = false;
window.onload = function() {
	addHandlers();
	initGoogleMap();
	initWorksGrid();
};
function initWorksGrid() {
	$('.work').hover(function(e) {
		let type = e.type;
		let x = e.originalEvent.movementX;
		let y = e.originalEvent.movementY;

		let overlay = $(this).find('.overlay')[0];
		let oHeight = $(overlay).height();
		let oWidth = $(overlay).width();
		let left = 0;
		let top = 0;
		if (Math.abs(x) > Math.abs(y) && x > 0) {
			left = -oWidth;
		} else if (Math.abs(x) > Math.abs(y) && x < 0) {
			left = oWidth;
		} else if (Math.abs(y) > Math.abs(x) && y > 0) {
			top = -oHeight;
		} else if (Math.abs(y) > Math.abs(x) && y < 0) {
			top = oHeight;
		}
		// else if (y === x && x === 0) {
		// 	top = -prevTL.top;
		// 	left = -prevTL.left;
		// }
		prevTL.top = top;
		prevTL.left = left;
		$(overlay).css('opacity', '0.9');
		switch (type) {
			case 'mouseenter':
				$(overlay).css({
					top: top + 'px',
					left: left + 'px'
				});
				$(overlay).animate(
					{
						top: '0px',
						left: '0px'
					},
					250,
					function() {}
				);
				break;
			case 'mouseleave':
				$(overlay).animate(
					{
						opacity: 0,
						top: -top + 'px',
						left: -left + 'px'
					},
					250,
					function() {}
				);
				break;
		}
	});
}
function initGoogleMap() {
	var mapOptions = {
		center: new google.maps.LatLng(51.5, -0.12),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
}
function addHandlers() {
	let links = $('#navbar .scroll-link');
	$.map(links, (item) => {
		let id = $(item).html();
		let element = $(`#${id}`)[0];
		$(item).on('click', function(event) {
			event.preventDefault();
			$(element).goTo();
		});
	});
	$('#toTop').on('click', function(event) {
		$('#home').goTo();
	});
}

window.onscroll = function() {
	myFunction();
};

var navbar = document.getElementById('navbar');
var sticky = navbar.offsetTop;

function myFunction() {
	if (window.pageYOffset >= sticky) {
		$('#toTop').addClass('visible');
	} else {
		$('#toTop').removeClass('visible');
	}
	if (window.pageYOffset >= sticky) {
		navbar.classList.add('sticky');
	} else {
		navbar.classList.remove('sticky');
	}
}

(function($) {
	$.fn.goTo = function() {
		let navbar = $('#navbar');
		let scrollAmount;
		if ($(navbar).hasClass('sticky')) {
			scrollAmount = $(this).offset().top + 'px';
		} else {
			scrollAmount = $(this).offset().top - navbar.innerHeight() + 'px';
		}
		$('html, body').animate(
			{
				scrollTop: scrollAmount
			},
			'slow'
		);
		return this;
	};
})(jQuery);

function openModal(event) {
	$('#modal')[0].style.zIndex = '1000';
	let slideIndex = $(event.target).closest('.work').data('slide');
	$('#modalCarousel .carousel-indicators img').get(slideIndex).classList.add('active');
	$('#modalCarousel .carousel-inner .carousel-item').get(slideIndex).classList.add('active');
	$('#modal').animate(
		{
			opacity: 1
		},
		500
	);
}

function closeModal() {
	$('#modal').animate(
		{
			opacity: 0
		},
		500,
		function() {
			$('#modal')[0].style.zIndex = '-1';
			let carousel = $('#modalCarousel');
			$(carousel).find('.carousel-indicators img').removeClass('active');
			$(carousel).find('.carousel-inner .carousel-item').removeClass('active');
		}
	);
}

function toogleMap() {
	if (mapOpened) {
		$('#googleMap').css('display', 'none');
		$('#mapText').html('open map');
		$('#map').animate(
			{
				minHeight: 200 + 'px'
			},
			500
		);
	} else {
		$('#googleMap').css('display', 'block');
		$('#mapText').html('close map');
		$('#map').animate(
			{
				minHeight: $('#map').height() + $('#googleMap').height() + 'px'
			},
			500
		);
	}
	mapOpened = !mapOpened;
}

function toggleMenu() {
	let menu = $('#menu-btn');
	if (menuOpened) {
		$('#navbar-nav').animate(
			{
				opacity: 0.1
			},
			200,
			function() {
				$('#navbar-nav').removeClass('show');
			}
		);
	} else {
		$('#navbar-nav').addClass('show');
		$('#navbar-nav').animate(
			{
				opacity: 1
			},
			200
		);
	}
	menuOpened = !menuOpened;
}
