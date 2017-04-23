$(function(){
	footerPosition()
	$(window).resize(function(event) {
		footerPosition()
	});
	function footerPosition(){
		var bH=$("body").height();
		var wH=$(window).height();
		if(bH<wH){
			$(".footer").css({
				"position":"absolute",
				"bottom":0,
				"left":"50%",
				"margin-left":"-600px"
			});
			$("html,body").css({
				"height":"100%"
			})
		}else{
			$(".footer").css({
				"position":"static",
				"left":0,
				"margin-left":0
			})
		}
	}
})
