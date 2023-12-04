$(document).ready(function() {

	rearrangeElements();
	
	$(window).orientationchange(function() {
	
		rearrangeElements();
	
	});
	
	function rearrangeElements() {
	
		var windowHeight = window.innerHeight;

		var windowWidth = window.innerWidth;
	
		if(windowHeight / windowWidth < 1) {
	
	//	if(windowHeight / windowWidth > 1) {
	
			$("#sideNav").css({
				width: "30%"
			});
	
			$("#main").css({
				width: "70%",
				left: "30%"
			});
	
			$("#main #header").css({
				width: "70%",
				left: "30%"
			});
	
		}
	
		else {
	
			$("#sideNav").css({
				width: "0%"
			});
	
			$("#main").css({
				width: "100%",
				left: "0%"
			});
	
			$("#main #header").css({
				width: "100%",
				left: "0%"
			});
	
		}
		
	}

});