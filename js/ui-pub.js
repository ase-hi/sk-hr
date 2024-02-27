	
	// popup
	function popOpen(popup){
		var  $popup=$(popup);
		$(window).scrollTop(0)
		$('body').css('overflow', 'hidden');
		$popup.show();
	} 
	
	function popClose(popup){
		var $popup = $(popup);
		$('body').css('overflow', '');
		$popup.hide();
	} 
	