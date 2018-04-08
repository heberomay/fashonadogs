$(document).ready(function(){
	var token=1;
	var textOne='.text-banner-0';
	var par=true;
	var load=false;
			setInterval(function(){
				if(par){
					$('.banner-container img:eq(1)').css({'marginLeft':'100%'});
					$('.banner-container img:eq(1)').attr('src','img/banner/'+token+'.png');
					textTwo='.text-banner-'+token;
					$('.banner-container img:eq(1)').load(function(){
						load=true;
					});
						if(load){
							$('.banner-container img:eq(1)').animate({
								marginLeft:'0%'
							},1000).delay(3000);
							$(textOne).animate({
								opacity:'0'
							},500).delay(3000);
							$('.banner-container img:eq(0)').animate({
								marginLeft:'-100%'
							},1000).delay(3000);
							$(textTwo).animate({
								opacity:'1'
							},500).delay(3500);
					        textOne=textTwo
							token=token+1
							par=false;
							if(token>2){
							   token=0;
							   textOne='.text-banner-2';
							};
							load=false;
						}
				}else{
					$('.banner-container img:eq(0)').css({'marginLeft':'100%'});
					$('.banner-container img:eq(0)').attr('src','img/banner/'+token+'.png');
					textTwo='.text-banner-'+token;
					$('.banner-container img:eq(0)').load(function(){
						load=true;
					});
					if(load){
						$('.banner-container img:eq(0)').animate({
							marginLeft:'0%'
						},1000).delay(3000);
						$(textOne).animate({
								opacity:'0'
							},500).delay(3000);
						$('.banner-container img:eq(1)').animate({
							marginLeft:'-100%'
						},1000).delay(3000);
						$(textTwo).animate({
							opacity:'1'
						},500).delay(3500);
				        textOne=textTwo
						token=token+1
						par=true;
						if(token>2){
							token=0;
							textOne='.text-banner-2';
						};
						load=false;
					}
				}
			},5000);
	});
	
