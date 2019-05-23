jQuery(document).ready(function($){	
	$(document).on("contextmenu",function(e){
       return false;
    });
	var controller = new ScrollMagic.Controller();

	function classRangeToggle( trigger, element, classToAdd, duration, offset )
	{
		var scene = new ScrollMagic.Scene(
		{
			triggerElement: trigger, 
			triggerHook: "onLeave",
			duration: duration,
			offset: offset
		})
		.setClassToggle( element, classToAdd )
		.addTo(controller);

		return scene;
	}

	function CrearEscena(seccion, pinId, slideId = "#slideTipo1"){
		//slideId = $(pinId).find(slideId).eq(0);
		var cantidad = $(/*pinId + " > " + */slideId).find(".slide").length;
		//alert("Encontramos "+cantidad+" slides en " + slideId);
		var scene = new ScrollMagic.Scene(
		{
			triggerElement: seccion, 
			triggerHook: "onLeave",
			duration: cantidad > 1 ? (cantidad * 500) - 200 : 800
		})
		.setPin(pinId)
		.addTo(controller);
		var frames = [];
		frames[1] = classRangeToggle( seccion, slideId, "slide_1", 500, 0 );
		//famesQueEs[1].on( "leave", function(e) { if ( e.scrollDirection == "REVERSE" ) { $('#slideQueEs').addClass( "showframe1pre" ); } });
		//famesQueEs[1].on( "enter", function(e) { if ( e.scrollDirection == "FORWARD" ) { $('#slideQueEs').removeClass( "showframe1pre" ); } });
		if(cantidad > 1)
		{
			$offset = 0;
			for($i = 2; $i <= cantidad; $i++)
			{
				$offset += 500;
				frames[$i] = classRangeToggle( seccion, slideId, "slide_"+ $i, $i == cantidad ? 0 : 500, $offset );
			}
		}
		return frames;
	}
	var Escena1 = CrearEscena("#Seccion-Uno","#firstPin", "#slideQueEs");
	var Escena2 = CrearEscena("#Seccion-Dos", "#pinTwo", "#slideTipo1");
	var Escena3 = CrearEscena("#Seccion-Tres", "#pinThree", "#slideTipo1");
	var Escena4 = CrearEscena("#Seccion-Cuatro", "#pinFour", ".slider4");
	var Escena5 = CrearEscena("#Seccion-Cinco", "#pinFive", "#slideTipo1");
	var Escena6 = CrearEscena("#Seccion-Seis", "#pinSix", "#slideTipo1");

	function imagesArr(folder, cant, numIni){
		var images = []; 
		for (var i = 0; i < cant; i++) {
			images[i] = folder+(numIni+i)+".png";
		}
		return images;
	}
	$('.menuTiposIdentificacion .content a').on('click', function(e){
		e.preventDefault();
			var folder = "";
			var sectorId = $(this).data('sector');
			var cant = parseInt($(this).data('cant'));
			var numIni = parseInt( $(this).data('num-ini'));
			var imagenes = [];
			if(sectorId == 1){
				folder = "imagenes/tipos-de-identificacion/horeca/identificacion-horeca000";
				}
			if(sectorId == 2){
				folder = "imagenes/tipos-de-identificacion/textil/identificacion-textil000";
				}
			if(sectorId == 3){
				folder = "imagenes/tipos-de-identificacion/transporte/identificacion-transporte000";
				}
			if(sectorId == 4){
				folder = "imagenes/tipos-de-identificacion/salud/identificacion-salud000";
				}
			if(sectorId == 4.1){
				folder = "imagenes/tipos-de-identificacion/salud/que-es/que-es-salud000";
			}	
			imagenes = imagesArr(folder, cant, numIni);	
			$.fancybox( imagenes,{openEffect	: 'elastic',
    			closeEffect	: 'elastic', loop : false, crossDomain: true,
    			helpers		: {
					title	: null,
					buttons	: {}
				}

		});	
			console.log(cant + "  " + numIni );	

	});
	$('.fancybox').fancybox({width:'80%',height:'100%',scrollOutside:false,});
	$('.jugar').fancybox({width:1300,height:800, minHeight:800,scrollOutside:false});
	$('.ver-video').fancybox({
				helpers : {
			        media: true
			    },
				openEffect	: 'elastic',
    			closeEffect	: 'elastic',
    			scrollOutside:false,
    			width       : 1024,
    			height 		: 768,
    			maxHeight	: 768,
    			scrolling   : 'no'});
	$('#item a').on('click', function(){
		$.fancybox.close();
	});
	
	$('.identificacion-botones a').on('click',function(e){
			e.preventDefault();
			var sectorId = $(this).data('sector');
			if(sectorId == 1){
				$('.menuTiposIdentificacion.horeca').show('drop','','slow');
				}
			if(sectorId == 2){
				$('.menuTiposIdentificacion.textil').show('drop','','slow');
				}
			if(sectorId == 3){
				$('.menuTiposIdentificacion.transporte').show('drop','','slow');
				}
			if(sectorId == 4){
					$('.menuTiposIdentificacion.salud').show('drop','','slow');
					/*var cant = parseInt($(this).data('cant'));
					var numIni = parseInt( $(this).data('num-ini'));
					var imagenes = imagesArr("imagenes/tipos-de-identificacion/salud/identificacion-salud000", cant, numIni);	
					$.fancybox( imagenes,{openEffect	: 'elastic',
		    			closeEffect	: 'elastic', loop : false, crossDomain: true,
		    			helpers		: {
							title	: null,
							buttons	: {}
						}

					});*/	
				}	
			if(sectorId == 5){
				$('.menuTiposIdentificacion.consumo-masivo').show('drop','','slow');
			}
			if(sectorId == 6){
				$('.menuTiposIdentificacion.agro').show('drop','','slow');
			}
    	

	});
	$('.casos-botones a').on('click',function(e){

			
			var folder = "";
			var sectorId = $(this).data('sector');	
			if(sectorId != 4){e.preventDefault();}		
			var cant = parseInt($(this).data('cant'));
			var numIni = parseInt( $(this).data('num-ini'));
			if(sectorId == 1){
				folder = "imagenes/casos/horeca/casos-horeca000";
				}
			if(sectorId == 2){
				folder = "imagenes/casos/textil-confeccion/casos-textil000";
				}
			if(sectorId == 3){
				folder = "imagenes/casos/transporte/casos-transporte000";
				}
			if(sectorId == 4){
				folder = "imagenes/casos/salud/casos-salud000";
				}	

			if(sectorId == 5){
				//$('.menuTiposIdentificacion.consumo-masivo').show('drop','','slow');
			}
			if(sectorId == 6){
				//$('.menuTiposIdentificacion.consumo-masivo').show('drop','','slow');
			}
			imagenes = imagesArr(folder, cant, numIni);	
			$.fancybox( imagenes,{openEffect	: 'elastic',
    			closeEffect	: 'elastic', loop : false, crossDomain: true,
    			helpers		: {
					title	: null,
					buttons	: {}
				}

			});
    	

	});
	$('.menuTiposIdentificacion a.cerrar').on('click',function(e){
		e.preventDefault();
		$('.menuTiposIdentificacion').hide('drop','','slow');
	});
	
	function sceneGotoFrame( frameNum )
	{
			//console.log("ir a escena "+frameNum);
			controller.scrollTo( Escena1[frameNum], false );
		
	}

	$('.nav-btn, .navigationSlider').on('click',function(e){
		e.preventDefault();
		var arr = [];
		switch($(this).data("escena"))
		{
			case 1:
				arr = Escena1;
				break;
			case 2:
				arr = Escena2;
				break;
			case 3:
				arr = Escena3;
				break;
			case 4:
				arr = Escena4;
				break;
		}
		controller.scrollTo( arr[$(this).data("frame")], false );
	});

	$('#botonesSectores #boton-casos').on('click',function(){
		controller.scrollTo( sceneSector[$(this).data("frame")], false );
		//sceneGotoFrame($(this).data("frame"));
	});
	// $('#navigationSlider1 .navigationSlider, .menu2 .navigationSlider, .menu3 .navigationSlider, .menu4 .navigationSlider').on('click',function(){
	// 	sceneGotoFrame($(this).data("frame"));
	// });
	$('#navigationLoAyuda .navigationSlider').on('click',function(){
		controller.scrollTo( sceneLoAyuda[$(this).data("frame")], false );
		//console.log("scroll numero " + controller.scrollPos() );
	});
	$('a[href^="#"]').on('click', function(event) {
	    var target = $(this.getAttribute('href'));
	    var selector = this.getAttribute('href');
	    if( target.length ) {
	        event.preventDefault();
	        var scrollPosTo = target.offset().top;
	        scrollToPosition(target);
	    }
	});
	function scrollToPosition(element,duracion){
		var pos = element.offset().top;
		$('html, body').stop().animate({
            //scrollTop: target.offset().top
            scrollTop: pos
        }, 100, "linear",function(){
        	if(pos != element.offset().top){
        		scrollToPosition(element,100);
        	}
        });
	}


	//Cambiar textos dinamicamente
	var textJson = "";
	/*$.getJSON("js/textos-analitica.json?callback=?",function(json){
  		console.log(json);
	});*/
	
	$( window ).scroll(function() {
		var scrollPosition = $(window).scrollTop();
		if(scrollPosition >= 500 ){
			$('#logoSection').addClass('logoVisible');
		}else{
			$('#logoSection').removeClass('logoVisible');
		}
		
  		
  			
	});
	// $( window).resize(function() {
 //  		//sameHeigth($('#contentLoAyuda'));
 //  		loAyudaPosAndSize($('#contentLoAyuda'));
  		

	// });
	// function loAyudaPosAndSize(element){
	// 	var elWidth = element.width();
	// 	element.css({'height': elWidth,'margin-top' : -elWidth/2});
	// 	var offsetContentCircle = $('#pinLoAyuda').offset().top - $('#contentLoAyuda').offset().top;
 //  		if(offsetContentCircle > 100){
 //  			$('#contentLoAyuda .contentText').css({'margin-top':offsetContentCircle + 'px'});
	// 		$('#contentLoAyuda .gradientFooter').css({'bottom':(offsetContentCircle - 20) + 'px'});
	// 		$('#contentLoAyuda #navigationLoAyuda').css({'bottom': offsetContentCircle + 'px'});
 //  		}
	// 	else{
			
	// 			$('#contentLoAyuda .gradientFooter').css({'bottom':'86px'});
	// 			$('#contentLoAyuda #navigationLoAyuda').css({'bottom': '100px'});
			
				
	// 	}
		
	// 	if (window.screenTop && window.screenY) {
 //    		$('#contentLoAyuda .gradientFooter').css({'bottom':'0px'});
	// 		$('#contentLoAyuda #navigationLoAyuda').css({'bottom': '50px'});
	// 	}

	// }
	// loAyudaPosAndSize($('#contentLoAyuda'));

	/*folder = "imagenes/casos/horeca/estudio-madurez-sectorial/";
	$.ajax({
	  url : folder,
	  crossDomain: true,
	  contentType : 'text/plain',
	  context: document.body,
	  success: function(data){
	  	
	  	
	  } 
	});*/
	
});	
