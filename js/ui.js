
	
	function lnbMenu(){
		$('.lnb li a, .gnb-menu li a').on('click', function(){
			if($(this).parent().hasClass('open')){
				$(this).next().slideUp(function(){
					$(this).parent().removeClass('open');
				});
			}else{
				$(this).parent().addClass('open');
				$(this).next().slideDown();
			}
		});		
	}
	
	function layerMenu(){
		$('.layer-wrap button, .layer-wrap a').on('click', function(e){
			let $wrap = $(this).parents('.layer-wrap');
			let $layer = $(this).siblings('.menu-layer');
			let $btn = $(this);
			let top =  $wrap.offset().top + $btn.outerHeight();
			let l =  $wrap.get(0).getBoundingClientRect().left;
			let t =  $wrap.get(0).getBoundingClientRect().top + $btn.outerHeight() + 5;				
	
			if($layer.is(':hidden')){
	
				if($wrap.hasClass('select-layer')){
					$layer.css('min-width', $wrap.outerWidth());
	
					if(top + $layer.outerHeight() + 10 >= document.body.scrollHeight) t = t-($layer.outerHeight() + $btn.outerHeight() + 15);
					$layer.css({
						"top": t + "px",
						"left": l + "px"
					});
				}
				
				$layer.show();
				$btn.addClass('on');
					
				$layer.find('a, button').on('click', function(){
					if(!$(this).parent().hasClass('has-menu')){
							$layer.hide();
							$btn.removeClass('on');
							$('body').off('click.temp');
							gnbClose();
						}
				});
	
				setTimeout(function(){
					$('body').off('click.temp');
					$('body').on('click.temp', function(e){
						if($btn.get(0) == e.target || $(e.target) == $layer || $(e.target).parents() ==$layer) return;
						if(!$layer.has(e.target).length){
							$layer.hide();
							$btn.removeClass('on');
							$('body').off('click.temp');
							gnbClose();
						}
					});
				});
	
				$(this).parents('*').on('scroll', function(){
					$layer.hide();
					$btn.removeClass('on');
				});
			}else{
				if(!$(this).parent().hasClass('has-menu')){
					$layer.hide();
					$btn.removeClass('on');
					gnbClose();
				}
			}
	
			$(window).on('scroll resize', function(){
				$('body').off('click.temp');
				$layer.hide();
				$btn.removeClass('on');
				gnbClose();
			});
		});


		function gnbClose(){
			$('.gnb-menu li').removeClass('open');
			$('.gnb-menu li ul').hide();
		}
		
	}
	
	function selectOpen(){
		$(document).on('click', '.select-option a', function(){
			let val = $(this).text();
			$(this).parents('li').siblings().removeClass('on');
			$(this).parents('li').addClass('on');
			$(this).parents('.select-layer').find('.btn-select').text(val);
		});
	}

	function datepicker(){
		$(".input-date .date").datepicker({
			keyboardNavigation: false,
			forceParse: false,
			calendarWeeks: true,
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm",
			language: "kr",
		});
	}

	function tooltip(){
		$(document).on('mouseover', '.tooltip-wrap.floating .ico-noti', function(){
			let $layer = $(this).next('.tooltip-layer');
			let left = $(this).offset().left;
			let top = $(this).offset().top;
			if($(this).parents('.employee-search-detail-wrapper').length > 0){
				top = $(this).offset().top - $(window).scrollTop();
			}
			$layer.css({top:top + 30, left:left - 50})
			
		});
	}
		
	
	
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
	
	$(function(){
		layerMenu();
		selectOpen();
		lnbMenu();
		// datepicker();
		tooltip()
	});
	