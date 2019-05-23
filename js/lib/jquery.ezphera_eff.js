/**
 * EzEffect v1.0.0 - html5 canvas, particles system 
 * http://ezphera.net
 *
 * Copyright 2015, Ezphera - http://ezphera.net 
 * Written while listening to music
 *
 * 
 */
 ;(function($){
 	var plugin = {};

	var defaults = {
		// GENERAL
		createCanvas : false,
		canvasSelector : 'canvas',
		canReset : false,

		// PARTICLES
		particlesType : "Images", // Can be Shapes
		particlesColor : "#FFF",
		particlesShape : "Circles", // Circles and  Boxes and Random
		particlesAlpha : 1,
		particlesSize : {
			min : 0.2,
			max : 0.4
		},
		particlesVel : {
			X : {
				min : 0.02,
				max : 0.2
			},
			Y : {
				min : 0.2,
				max : 0.8
			}
		},
		toPath : true,
		forceParticles : "Gravity", // can be "Attraction", "Repulsion", "Gravity", "Brownian" and "SimpleBrownian"
		numParticles : 10,
		particlesImages : "https://dl.dropboxusercontent.com/u/89553044/plugins-ezphera/ez-effects/images/gota.png",

		// MOUSE
		mouseImage : "https://dl.dropboxusercontent.com/u/89553044/plugins-ezphera/ez-effects/images/logo_ezphera.png",
		forceMouse : "None", // Can be "Attraction" and "Repulsion"
		mouseForceX : 2,
		mouseForceY : 100,

		// BACKGROUND 
		bgType : "none", // Can be "None","Color","Image"
		bgColor : "#ccc",
		bgImage : "https://dl.dropboxusercontent.com/u/89553044/plugins-ezphera/ez-effects/images/bkglluvia.jpg", // Url http://...
		bgAlpha : 1,

		// FOREGROUND
		fgType : "none", // Can be "None","Color","Image"
		fgImage : "",
		fgColor : "#ccc",
		fgAlpha : 1,

		
		// CALLBACKS
		mouseUpdate: function() {
			
		},
		particleUpdate: function(){
			this.rotation=SPP.MathUtils.toRadian(this.velocity.getAngle()-90);
		}
	}
	$.fn.EzEffect = function(options){

		if(this.length == 0) return this;

		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){$(this).EzEffect(options)});
			return this;
		}

		// create a namespace to be used throughout the plugin
		var effects = {};
		// set a reference to our effects element
		var el = this;
		plugin.el = this;

		/**
		 * Makes particles effects responsive
		 */
		// first get the original window dimens (thanks alot IE)
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		
		effects.animate = true;
		//animate();


				/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Initializes namespace settings to be used throughout plugin
		 */
		var init = function(){
			$(window).resize(resizeCanvas);

			effects.tempHeight = el.height();
			effects.mouse;
			el.mousemove(function(e){
					var offset = $(this).offset();
					effects.mouse.x = (e.pageX - offset.left);
					effects.mouse.y = (e.pageY - offset.top);
					
			});
			// merge user-supplied options with the defaults
			effects.settings = $.extend({}, defaults, options);
			// store the original canvas
			effects.canvas = el.children(effects.settings.canvasSelector);
			// check if a canvas exist
			if(effects.canvas.length < 1) effects.settings.createCanvas = true;
			// check the selected Particle strength...
			switch(effects.settings.forceParticles){
				case "Gravity":
					effects.forceParticles = SPP.Force;
					break;
				case "Attraction":
					effects.forceParticles = SPP.Attraction;
					break;
				case "Repulsion":
					effects.forceParticles = SPP.Repulsion;
					break;
				case "Brownian":
					effects.forceParticles = SPP.Brownian;
					break;
				case "SimpleBrownian":
					effects.forceParticles = SPP.SimpleBrownian;
					break;
				default :
					effects.forceParticles = SPP.Force;
					break;					 
			}
			//check the selected mouse strength
			switch(effects.settings.forceMouse){
				case "Attraction":
					effects.forceMouse = SPP.Attraction;
					break;
				case "Repulsion":
					effects.forceMouse = SPP.Repulsion;
					break;	

			}
			
			// perform all DOM / CSS modifications

			setup();
		}

		var setup = function(){
			if(effects.settings.createCanvas) el.append("<canvas id='EzEffect_canvas'>Your borwser does not suport html5 canvans!</canvas>");
			effects.canvas = el.children(effects.settings.canvasSelector).get(0);
			effects.context = effects.canvas.getContext("2d");
			effects.particleSystem = new SPP.ParticleSystem();
			effects.mouse=new SPP.Vector2D();
		    effects.zone=new SPP.Zone();
		    effects.zone.boundary=new SPP.Rectangle(0,0,effects.canvas.width,effects.canvas.height);

		    resizeCanvas();
			if(effects.animate){
				animate();
			}
			effects.particleSystem.start();
			initBackground();

			effects.particlesImages = effects.settings.particlesImages.split(",").map(String);
			effects.texture = [];

			for (var i = 0; i < effects.particlesImages.length; i++) {
		    	effects.texture[i] = new Image();
				//texture.src = "images/arrow.png";
				effects.texture[i].src = effects.particlesImages[i];
			};
			$(effects.texture).load(function(){
				initParticles();
			});
			

		}
		var resizeCanvas = function(){
			effects.canvas.width = el.innerWidth();
			effects.canvas.height = el.innerHeight();

		    effects.zone.boundary.width=effects.canvas.width;
		    effects.zone.boundary.height=effects.canvas.height;
		    if(effects.settings.canReset){
		    	el.resetParticles();
		    }
		}
		var animate = function(){
				effects.animationID=requestAnimationFrame(animate);
				effects.context.clearRect(0, 0, effects.canvas.width, effects.canvas.height);
				effects.particleSystem.render();
				if(effects.tempHeight != el.height()){
					effects.tempHeight = el.height();
					resizeCanvas();
				}
				effects.animate = false;
		}

		var initBackground = function(){
			/*effects.bg = effects.particleSystem.createParticle(SPP.ShapeBox);
			effects.bg.init(0,0,0,effects.canvas.width,effects.canvas.height,"rgba(0,0,0,0)", effects.context);*/
			switch(effects.settings.bgType){
				case "None":
					effects.bg = effects.particleSystem.createParticle(SPP.ShapeBox);
					effects.bg.init(0,0,Infinity,effects.canvas.width,effects.canvas.height,"rgba(0,0,0,0)", effects.context);
					break;
				case "Image":
					/*effects.bgImage = new Image();
					effects.bgImage.src = effects.settings.bgImage;
					effects.bg = effects.particleSystem.createParticle(SPP.SpriteImage);
					effects.bg.init(0,0,Infinity,effects.bgImage,effects.context);
					effects.bg.alpha = effects.settings.bgAlpha;*/
					el.css({'background' : 'url('+effects.settings.bgImage+')', 'background-size':'cover','background-attachment': 'fixed', 'background-position': 'center'});
					break;
				case "Color":
					effects.bg = effects.particleSystem.createParticle(SPP.ShapeBox);
					effects.bg.init(0,0,Infinity,effects.canvas.width,effects.canvas.height,effects.settings.bgColor, effects.context);
					effects.bg.alpha = effects.settings.bgAlpha;
					break;		

			}

			/*Init mouse image*/

			effects.mouseImageTexture = new Image();
			effects.mouseImageTexture.src = effects.settings.mouseImage;
				
			effects.mouseImage = effects.particleSystem.createParticle(SPP.SpriteImage);
			effects.mouseImage.init(0, 0, Infinity, effects.mouseImageTexture, effects.context);
			effects.mouseImage.scale = 0.6;
			effects.mouseImage.onUpdate = mouseUpdate;
		}

		var initParticles = function(){

			effects.numParticles = [];

			for ( var i = 0; i < effects.settings.numParticles; i++)
			{
				if(effects.settings.particlesType == "Shapes"){
					switch(effects.settings.particlesShape){

						case "Circles":
							effects.numParticles[i] = effects.particleSystem.createParticle(SPP.ShapeArc);
							effects.numParticles[i].init(getRandomInt(2,effects.canvas.width -2), Math.random()*effects.canvas.width*0.5,Infinity,getRandomFloat(1,5), effects.settings.particlesColor , effects.context);
							break; 
						case "Boxes":
							effects.numParticles[i] = effects.particleSystem.createParticle(SPP.ShapeBox);
							effects.numParticles[i].init(getRandomInt(2,effects.canvas.width -2), Math.random()*effects.canvas.width*0.5,Infinity,getRandomFloat(1,5),getRandomFloat(1,5), effects.settings.particlesColor , effects.context);
							break;

						default:
							effects.numParticles[i] = effects.particleSystem.createParticle(SPP.ShapeArc);
							effects.numParticles[i].init(getRandomInt(2,effects.canvas.width -2), Math.random()*effects.canvas.width*0.5,Infinity,getRandomFloat(1,5), effects.settings.particlesColor , effects.context);
							break;	
					}

					

				}
				else if(effects.settings.particlesType == "Images"){
					effects.numParticles[i] = effects.particleSystem.createParticle(SPP.SpriteImage);
					effects.numParticles[i].init(getRandomInt(2,effects.canvas.width -2), Math.random()*effects.canvas.width*0.5,Infinity, effects.texture[getRandomInt(0, effects.texture.length -1 )], effects.context);
				    effects.numParticles[i].scale = getRandomFloat(effects.settings.particlesSize.min,effects.settings.particlesSize.max);
				}
		        
				effects.numParticles[i].zone= effects.zone;
				/*BrownianForce can be: "SPP.Force"--> gravity*/
				effects.brownianForce = effects.particleSystem.createForce(effects.forceParticles);
		        //brownianForce.init(0.5, Math.random()*2+1);
		        effects.brownianForce.init(getRandomFloat(effects.settings.particlesVel.X.min, effects.settings.particlesVel.X.max), getRandomFloat(effects.settings.particlesVel.Y.min, effects.settings.particlesVel.Y.max));
		        effects.numParticles[i].addForce("effects.brownianForce",effects.brownianForce);
		        if(effects.settings.forceMouse != "None"){
		        	effects.forceMouseVal=effects.particleSystem.createForce(effects.forceMouse);
					effects.forceMouseVal.init(effects.mouse, effects.settings.mouseForceX,effects.settings.mouseForceY);
		    		effects.numParticles[i].addForce("effects.forceMouseVal", effects.forceMouseVal);}
				//p.scale = Math.random()*0.1;
				if(effects.settings.toPath){
					effects.numParticles[i].onUpdate=effects.settings.particleUpdate;
				}
				effects.numParticles[i].alpha = effects.settings.particlesAlpha;
				//numParticles[i].addForce("lForce",lForce);
			}
			initForeGround();
			effects.settings.canReset = true;

		}
		var initForeGround = function(){
			effects.fgImage = new Image();
			effects.fgImage.src = effects.settings.fgImage;

			effects.fg = effects.particleSystem.createParticle(SPP.ShapeBox);
			effects.fg.init(0,0,Infinity,effects.canvas.width,effects.canvas.height,"rgba(0,0,0,0)", effects.context);
			switch(effects.settings.fgType){
				case "None":
					effects.fg = effects.particleSystem.createParticle(SPP.ShapeBox);
					effects.fg.init(0,0,Infinity,effects.canvas.width,effects.canvas.height,"rgba(0,0,0,0)", effects.context);
					break;
				case "Image":
					effects.fg = effects.particleSystem.createParticle(SPP.SpriteImage);
					effects.fg.init(0,0,Infinity,effects.fgImage,effects.context);
					effects.fg.alpha = effects.settings.fgAlpha;
					effects.fg.scale = 2;
					break;
				case "Color":
					effects.fg = effects.particleSystem.createParticle(SPP.ShapeBox);
					effects.fg.init(0,0,Infinity,effects.canvas.width,effects.canvas.height,effects.settings.fgColor, effects.context);
					effects.fg.alpha = effects.settings.fgAlpha;
					break;		

			}

		}

		var getRandomFloat = function(min,max){
			return (Math.random() * (max - min) + min);
		}

		var getRandomInt = function(min,max){
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}


		var mouseUpdate = function(){
			this.position.x = effects.mouse.x;
			this.position.y = effects.mouse.y;
			effects.settings.mouseUpdate();
		}

		el.resetParticles = function(settings){
			if (settings != undefined) options = settings;
			if(effects.bg != null){
			effects.bg.reset;}
		    effects.fg.reset;
		   
		    effects.mouseImage.reset();
			for (var i = 0; i < effects.numParticles.length; i++) {
				
				effects.numParticles[i].reset;
				
			};
			init();
			//initBackground();
	    	//initParticles();
		}

		init();

		// returns the current jQuery object
		return this;
	}	

 })(jQuery);