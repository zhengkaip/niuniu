function carousel(parentObj,childObj,carouselIndex){
	var winWidth=null;
	var imgLength=null;
	var time=null;
	var Index=0;
	var Span="<span></span>";
	var spanAll="";
	reset();
	for (var i = 0; i < imgLength; i++) {
		spanAll+=Span;
	};
	$(carouselIndex).html(spanAll);
	$(carouselIndex).css({"margin-left":-($(carouselIndex).width()-15)/2})
	$(carouselIndex).find("span").eq(Index).addClass('active');
	$(carouselIndex).on('click', 'span', function(event) {
		Index=$(this).index();
		$(parentObj).stop(true).animate({left:-winWidth*Index}, 1000);
		$(carouselIndex).find("span").eq(Index).addClass('active').siblings('span').removeClass('active');
		event.preventDefault();
		/* Act on the event */
	});
	time=setInterval(carouselAnimate,3000);
	function carouselAnimate(){
		$(carouselIndex).find("span").eq(Index).addClass('active').siblings('span').removeClass('active');
		$(parentObj).stop(true).animate({left:-winWidth*Index}, 1000);
		Index++;
		if(Index==imgLength){
			Index=0;
		}
	};
	$(window).resize(function(event) {
		reset();	
		$(parentObj).css({left:-winWidth});
	});
	function reset(){
		winWidth=$(window).outerWidth()>1200?$(window).outerWidth():1200;
		imgLength=$(childObj).length;
		console.log(winWidth)
		$(parentObj).width(imgLength*winWidth);
	};
	$(parentObj).parent().hover(function() {
		clearInterval(time)
	}, function() {
		time=setInterval(carouselAnimate,3000)
	});
}

