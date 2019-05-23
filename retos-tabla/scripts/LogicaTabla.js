jQuery(document).ready(function($){
	//Reto Tabla 1
	var interactsIndex = [];
	while(interactsIndex.length < 4){
		var rand = Math.floor(Math.random() * 12);
		if(!interactsIndex.includes(rand))
		{
			interactsIndex.push(rand);
		}
	}
	$(".tabla_reto1 .tabla_reto td[data-resp]").each(function(index){
		var resp = interactsIndex.includes(index) ? "" : $(this).data("resp");
		var extraInfo = interactsIndex.includes(index) ? "" : "readonly";
		var inputType = $(this).data("type") != null ? $(this).data("type") : "Text";
		var $newInput = $('<input type="'+inputType+'" name="index' +index+'" value="'+resp+'" '+ extraInfo+'>');
		var $prefix = $(this).data("suffix") != null ? $('<span class="suffix">'+$(this).data("suffix")+'</span>') : null;
		$(this).append($newInput,$prefix);
		//}
	});
	$(".tabla_reto1 .btnVerificar").on("click", function(){
		//alert("click en el boton");
		$(".tabla_reto1 .tabla_reto td[data-resp]").each(function(){
			var input = $(this).children("input:not([readonly])");
			var valor = input.val();
			var resp = $(this).data("resp");
			if(valor < resp)
			{
				input.parent().removeClass("numeroMayor").addClass("numeroMenor").removeClass("correct");
			}
			else if(valor > resp)
			{
				input.parent().addClass("numeroMayor").removeClass("numeroMenor").removeClass("correct");
			}
			else
			{
				input.parent().addClass("correct").removeClass("numeroMenor").removeClass("numeroMayor");
			}
		});
	});

	//Reto 2
	$(".tabla_reto2 .tabla_reto td[data-selected]").on("click",function(){
		var selected = $(this).data("selected");
		if(selected == false)
		{
			$(this).data("selected", true);
			$(this).text("Si?");
		}
		else{
			$(this).data("selected", false);
			$(this).text("No?");
		}
		var input = $("td[data-preg="+$(this).data("preg")+"] input");
		input.val(!selected ? 0 : "").prop("readonly",selected);
		setTotalValue();
	});
	$( ".tabla_reto2 .tabla_reto input[type='text']" ).on("change paste keyup",function(){
		setTotalValue();
	});
	setTotalValue();
	function setTotalValue()
	{
		var sumaTotal = 0;
		$(".tabla_reto2 .tabla_reto input[type='text']").each(function(){
			if($(this).val() != "")sumaTotal += parseInt($(this).val());
			//alert("valor es: " + $(this).val());
		});
		$(".totalSuma").text(sumaTotal);
		if(sumaTotal > 100)
		{
			$(".totalSuma").addClass("numeroMayor").removeClass("numeroMenor").removeClass("correct");
		}
		else if(sumaTotal < 100){
			$(".totalSuma").removeClass("numeroMayor").addClass("numeroMenor").removeClass("correct");
		}
		else 
		{
			$(".totalSuma").addClass("correct").removeClass("numeroMenor").removeClass("numeroMayor");
		}
	}
});