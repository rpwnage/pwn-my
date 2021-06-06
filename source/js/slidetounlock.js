const end = window.innerWidth * 0.8 - 77.5;
let amount = 0;

const startJb = (isSupported) => {
	amount++;
	if(amount <= 1) {
		console.log("t");
		document.getElementById("interact").innerHTML = `<div class='jbBox'>${isSupported ? "Jailbreaking..." : "This Device is Unsupported"}</div>`;
		if(isSupported) {
			pwnMe();
		}
	}
};

$(function() {

	$("#slider").draggable({
		axis: 'x',
		containment: 'parent',
		drag: function(event, ui) {
			if (ui.position.left >= end) {
				$("#well").fadeOut();
				setTimeout(() => {startJb(false)}, 2000);
				return;
			} 
		},
		stop: function(event, ui) {
			if (ui.position.left < end) {
				$(this).animate({
					left: 0
				})
			}
		}
	});
	
	// The following credit: http://www.evanblack.com/blog/touch-slide-to-unlock/
	
	$('#slider')[0].addEventListener('touchmove', function(event) {
	    event.preventDefault();
	    var el = event.target;
	    var touch = event.touches[0];
	    curX = touch.pageX - this.offsetLeft - 73;
	    if(curX <= 0) return;
	    if(curX > end){
	    	$('#well').fadeOut();
			setTimeout(() => {startJb(true)}, 2000);
			return;
	    }
	   	el.style.webkitTransform = 'translateX(' + curX + 'px)'; 
	}, false);
	
	$('#slider')[0].addEventListener('touchend', function(event) {	
	    this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
	    this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
	    this.style.webkitTransform = 'translateX(0px)';
	}, false);

});