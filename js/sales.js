$.get( "https://api.myjson.com/bins/wr07f", function( data ) {
	hd=data.productos.length;
	var array=[];
    var arrayTwo=[];
	function cleanArray(originalArray, id) {
		$('.main-content').html('');
		var newArray = [];
	    var filter  = {};
		for(var i in originalArray) {
			filter[originalArray[i][id]] = originalArray[i];
		}
		for(i in filter) {
			newArray.push(filter[i]);	
		}
		for(i in newArray){
				product='<div class="product-one" id="'+newArray[i].titulo+'" onclick="showSale(this.id)">'+
						'<div>'+
							'<img src="'+newArray[i].img+'" alt="">'+
						'</div>'+
						'<h1>'+newArray[i].titulo+'</h1>'+
						'<h2>$ '+newArray[i].precio+'<div class="fa fa-2x fa-'+newArray[i].marca+'"></div></h2>'+
						'<h3>'+newArray[i].tipo+'</h3>'+
					'</div>';
			$('.main-content').append(product);		
			
		};
		return newArray;
	}
	
	for (var i=0;i<hd;i++){
			product='<div class="product-one" id="'+data.productos[i].titulo+'" onclick="showSale(this.id)">'+
					'<div>'+
						'<img src="'+data.productos[i].img+'" alt="">'+
					'</div>'+
					'<h1>'+data.productos[i].titulo+'</h1>'+
					'<h2>$ '+data.productos[i].precio+'<div class="fa fa-2x fa-'+data.productos[i].marca+'"></div></h2>'+
					'<h3>'+data.productos[i].tipo+'</h3>'+
				'</div>';
		$('.main-content').append(product);
		array.push(data.productos[i]);
	}
	
	function sexoFilter(){
		filter_=$('div.checkbox [name="sexo"]:checked');
		for (var j=0;j<filter_.length;j++){
			for(var i=0;i<array.length;i++){
				filter=filter_[j].value;
				sexo_=array[i].sexo;
				for(var k=0;k<sexo_.length;k++){
					sexo=sexo_[k];
					if(filter==sexo){
						arrayTwo.push(array[i]);
					}
				}
			}
			array=arrayTwo;
			arrayTwo=[];
		}	
		var cleaned=cleanArray(array, 'titulo');
		array=cleaned
	};
	function deporteFilter(sport){
		filter_=$('div.checkbox [name="deporte"]:checked');
		if(sport){
			for (var j=0;j<filter_.length;j++){
			for(var i=0;i<array.length;i++){
				filter=filter_[j].value;
				sexo_=array[i].deporte;
				for(var k=0;k<sexo_.length;k++){
					sexo=sexo_[k];
					if(filter==sexo){
						arrayTwo.push(array[i]);
					}
				}
			}
			array=arrayTwo;
			arrayTwo=[];
		}
		}	
		var cleaned=cleanArray(array, 'titulo');
		array=cleaned;
	};
	
	function colorFilter(color){
		if(color){
			for(var i=0;i<array.length;i++){
			last=array[i].color;
			if(color==last){
					arrayTwo.push(array[i]);
				}	
			}
			array=arrayTwo;
			arrayTwo=[];
		}	
		var cleaned=cleanArray(array, 'titulo');
		array=cleaned;
	};
	

	function ofertaFilter(){
		array=data.productos
		console.log(array)
		for(var i=0;i<array.length;i++){
		last=array[i].oferta;
		if(last){
				arrayTwo.push(array[i]);
			}	
		}
		array=arrayTwo;
		arrayTwo=[];

		console.log(array)
	
		var cleaned=cleanArray(array, 'titulo');
		array=cleaned;
	};

	function primerFiltro(check,name,prop,val){
        array=[];
		for (var i=0;i<hd;i++){
		    array.push(data.productos[i]);
	    }
		
		if(check[0]=="sexo"){
			sexoFilter();
		}else if(check[0]=="deporte" && name=="deporte"){
			$('div.checkbox [name="deporte"]').prop('checked',false);
			ident='div.checkbox [value="'+val+'"]';
			$(ident).prop('checked',true);
			setTimeout(function(){
				rect=$('div.checkbox [name="deporte"]:checked').val();
				deporteFilter(rect);
			},5);
		}else if($('div.checkbox [name="deporte"]:checked').length>0){
			rect=$('div.checkbox [name="deporte"]:checked').val();
			deporteFilter(rect);
		}else if(check[0]=="color" && name=="color"){
			$('div.checkbox [name="color"]').prop('checked',false);
			ident='div.checkbox [value="'+val+'"]';
			$(ident).prop('checked',true);
			setTimeout(function(){
				rect=$('div.checkbox [name="color"]:checked').val();
				colorFilter(rect);
			},5);
		}else if($('div.checkbox [name="color"]:checked').length>0){
			rect=$('div.checkbox [name="color"]:checked').val();
			colorFilter(rect);
		}
		return array;
	};
	
	function segundoFiltro(array,check,name,prop,val){
		if(check[0]=="deporte" && name=="deporte"){
			primerFiltro(check,name,prop,val);
		}else if(check[1]=="deporte" && name!="deporte"){
			val=$('div.checkbox [name="deporte"]:checked').val()
			deporteFilter(val);
		}else if(name=="deporte"){
			$('div.checkbox [name="deporte"]').prop('checked',false);
			ident='div.checkbox [value="'+val+'"]';
			$(ident).prop('checked',true);
			setTimeout(function(){
				rect=$('div.checkbox [name="deporte"]:checked').val();
				deporteFilter(rect);
			},5);
		}if(check[0]=="color" && name=="color"){
			primerFiltro(check,name,prop,val);
		}else if(check[1]=="color" && name!="color"){
			val=$('div.checkbox [name="color"]:checked').val();
			colorFilter(val);
		}else if(name=="color"){
			$('div.checkbox [name="color"]').prop('checked',false);
			ident='div.checkbox [value="'+val+'"]';
			$(ident).prop('checked',true);
			setTimeout(function(){
				rect=$('div.checkbox [name="color"]:checked').val();
				colorFilter(rect);
			},5);
		}
		return array;
	}
	
	function tercerFiltro(array,check,name,prop,val){
		$('.main-content').html('');
				if(check[1]=="color" && name=="color"){
					var array=primerFiltro(check);
					segundoFiltro(array,check,name,prop,val);
				}else if(check[2]=="color"){
					val=$('div.checkbox [name="color"]:checked').val()
					colorFilter(val);
				}
		return array;
	}
	$('div.checkbox [type="checkbox"]').click(function(){
		$('.main-content').html('');
		    custom=$('div.checkbox [type="checkbox"]:checked');
			var check=[];
			var filter={};
			for (var i=0;i<custom.length;i++){
				filter[custom[i].name]=custom[i].name;
			}
			for(i in filter){
				check.push(filter[i]);
			}
		if(check.length>0){
			if(check.length==1){
				name=$(this).attr('name');
				prop=$(this).prop('checked');
				val=$(this).val();
				primerFiltro(check,name,prop,val);
			}else if(check.length==2){
				name=$(this).attr('name');
				prop=$(this).prop('checked');
				val=$(this).val();
				var array=primerFiltro(check);
				segundoFiltro(array,check,name,prop,val);
			}else{
				name=$(this).attr('name');
				prop=$(this).prop('checked');
				val=$(this).val();
				var array=primerFiltro(check);
				var secondArray=segundoFiltro(array,check);			
				tercerFiltro(secondArray,check,name,prop,val);
			}
		}else{
			array=[];
			for (var i=0;i<hd;i++){
					product='<div class="product-one" id="'+data.productos[i].titulo+'" onclick="showSale(this.id)">'+
							'<div>'+
								'<img src="'+data.productos[i].img+'" alt="">'+
							'</div>'+
							'<h1>'+data.productos[i].titulo+'</h1>'+
							'<h2>$ '+data.productos[i].precio+'<div class="fa fa-2x fa-'+data.productos[i].marca+'"></div></h2>'+
							'<h3>'+data.productos[i].tipo+'</h3>'+
						'</div></a>';
				$('.main-content').append(product);
				array.push(data.productos[i]);
			}
			
			arrayTwo=[];
		}

		
		
	});
	
	/*function defectProducts(){
		var products = [
			{ titulo: 'Botín', precio: 800.44, tipo: 'Botines', img: 'http://placehold.it/225x225', marca: 'nike', sexo: ["hombre","niños"], color:"blanco", deporte:"futbol"},
			{ titulo: 'Ojotas', precio: 300.99, tipo: 'Ojotas', img: 'http://placehold.it/225x225', marca: 'adidas', sexo: ["hombre","mujeres"], color:"azul", deporte:"futbol"},
			{ titulo: 'Zapatillas', precio: 1120.00, tipo: 'Calzado', img: 'http://placehold.it/225x225', marca: 'puma', sexo: ["hombre"], color:"negro", deporte:"futbol"},
			{ titulo: 'Short', precio: 320.44, tipo: 'Vestimenta', img: 'http://placehold.it/225x225', marca: 'nike', sexo: ["hombre","niños"], color:"azul", deporte:"futbol"},
			{ titulo: 'Pantalon', precio: 360.44, tipo: 'Natación', img: 'http://placehold.it/225x225', marca: 'nike', sexo: ["hombre","niños","mujeres"], color:"negro", deporte:"natacion"}	
		];
		
		for (var i=0;i<products.length;i++){
			product='<div class="product-one" id="'+products[i].titulo+'" onclick="showSale(this.id)">'+
					'<div>'+
						'<img src="'+products[i].img+'" alt="">'+
					'</div>'+
					'<h1>'+products[i].titulo+'</h1>'+
					'<h2>$ '+products[i].precio+'<div class="fa fa-2x fa-'+products[i].marca+'"></div></h2>'+
					'<h3>'+products[i].tipo+'</h3>'+
			'</div></a>';
			$('.main-content').append(product);
			array.push(products[i]);
		}
	}
	
	if(data){
		
	};*/
});

$(document).ready(function(){
	arrayCart=localStorage.getItem('cart').split(',');
	for (var i=0;i<arrayCart.length;i++){
		list='<li><a href="">'+arrayCart[i]+'</a></li>';
		$('#cart-Storage ul').append(list);
	}
});

function showSale(title, price){
	$('.window-background').show();
	$('.window-background .modal-sale').animate({
		opacity:1
	},200);
	$('.window-background .modal-sale h4').html(title);
	$('.window-background .modal-sale h4').attr('id',title);
}


$('#acept').click(function(){
	var arrayCart=[];
	id=$('.window-background .modal-sale h4').attr('id');
	if(localStorage.cart){
        arrayCart=localStorage.cart.split(',');
		arrayCart.push(id)
	}else{
		arrayCart.push(id)
	}
	localStorage.setItem('cart',arrayCart);
	$('.window-background').hide();
	$('.window-background .modal-sale').animate({
		opacity:0
	},200);
	$('#cart-Storage ul').html('');
	for (var i=0;i<arrayCart.length;i++){
		list='<li><a href="">'+arrayCart[i]+'</a></li>';
		$('#cart-Storage ul').append(list);
	}
});

$('#cancel').click(function(){
	$('.window-background').hide();
	$('.window-background .modal-sale').animate({
		opacity:0
	},200);
});




$('.side-bar>div.list>h1').click(function(){
	punter='#'+this.id+'~div.checkbox';
	if($(punter).is(':visible')){
		$(punter).hide();
	}else{
		$(punter).show()
	};
});





event.preventDefault();
		valid=true;
		td=$('form[name="adduser"] .form-control');
		for(var i=0;i<td.length;i++){
			if(td[i].value.length==""){
				alert('El formulario contiene campos vacios');
				valid=false;
				break;
			}   
		}
		if(valid){
			var parameters = {name:$('[name="name"]').val(),lastName:$('[name="lastName"]').val(),username:$('[name="username"]').val(),email:$('[name="email"]').val(),password:$('[name="password"]').val()};
			$.get( '/register',parameters, function(data) {
				if(data=='400'){
					alert('El nombre de usuario no se encuentra disponible');
				}else{
					$('[name="adduser"]')[0].reset();
					$('.names').html('');
					for(var i=0;i<data.length;i++){
						bar='<div id="'+data[i].username+'" class="user-list" onclick="userlist(event,this.id)"><h5>'+data[i].name+'  '+data[i].lastName+'</h5></div>'
						$('.names').append(bar);
					}
				}
				   
			 });
		}