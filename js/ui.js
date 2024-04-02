
	
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

	
  function autoCompleteEvt(searchArea){
    let input  = document.querySelector(searchArea).querySelector('input');
		let autocompleteLayer = document.querySelector('.layer-autocomplete');
		let seEvt = false;

		function setKeydown (event) {
				// 눌린 키가 화살표 위쪽 키(키 코드 38)인지 확인
				if (event.keyCode === 38) {
						// 이전 아이템으로 포커스를 이동
						let currentItem = document.activeElement;
						let previousItem = currentItem.previousElementSibling;
						if (previousItem && previousItem.classList.contains('autocomplete-item')) {
								event.preventDefault(); // 화살표 위쪽 키의 기본 동작 방지
								previousItem.focus();
						}
				}
				// 눌린 키가 화살표 아래쪽 키(키 코드 40)인지 확인
				else if (event.keyCode === 40) {
						// 다음 아이템으로 포커스를 이동
						let currentItem = document.activeElement;
						let nextItem = currentItem.nextElementSibling;
						if (nextItem && nextItem.classList.contains('autocomplete-item')) {
								event.preventDefault(); // 화살표 아래쪽 키의 기본 동작 방지
								nextItem.focus();
						}
				}
		}					

			input.addEventListener('keyup', function(){
				this.value.length > 0 ? autocompleteLayer.style.display = 'block' : autocompleteLayer.style.display = 'none';

				setTimeout(function(event){
					if(autocompleteLayer.style.display  == 'none') return;					
					event.preventDefault(); 
					if(seEvt) return;
					autocompleteLayer.addEventListener('keydown', setKeydown);
					seEvt = true;
					autocompleteLayer.querySelectorAll('a').forEach(function(el){
						el.addEventListener('click', function(){
							input.value = '';
							input.value = this.innerText;
							autocompleteLayer.style.display = 'none'
						})
					});

					}, 100, event);
			});


			input.addEventListener('keydown', function(){
				if (event.keyCode === 40) {
				  setTimeout(function(event){
						if(autocompleteLayer.style.display  == 'none') return;
							autocompleteLayer.querySelector('a').focus();
					}, 100, event);
				}
			});


			//기타 닫기
			document.addEventListener('click', function(event) {
				var targetElement = event.target;
				function closeLayer() {
					autocompleteLayer.style.display = 'none'
				}
				
				if (!targetElement.closest('.layer-autocomplete')) {
						closeLayer(); 
				}
		});			
  }
		
	function allChk(allcheck){
		$(allcheck).each(function(){
			var name = $(this).attr('name');
			var _this = $(this);
			_this.on('change', function(){
				if($(this).prop("checked")){
					$('[name='+name+']').prop("checked", true);
				}else{
					$('[name='+name+']').prop("checked", false);
				}
			});
			$('[name='+name+']').on('change', function(){
				var total= $('[name='+name+']').not(_this).length;
				var chked= $('[name='+name+']:checked').not(_this).length;

				if(chked == total){
					 _this.prop("checked", true);
				}else{
					_this.prop("checked", false);
				}
			});
		});
	}
	

	function commaInput(inputs){
		const numericInputs = document.querySelectorAll(inputs);

		numericInputs.forEach(function(input) {
				input.addEventListener('input', function(event) {
						let value = event.target.value;
						value = value.replace(/\D/g, '');
						value = addCommas(value);
						event.target.value = value;
				});
		});

		function addCommas(value) {
				return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
	}
	

	$(function(){
		layerMenu();
		selectOpen();
		lnbMenu();
		// datepicker();
		tooltip()
	});
	