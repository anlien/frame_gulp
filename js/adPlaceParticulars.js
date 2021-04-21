require({	
	paths:{
		'jquery':'libs/jquery-1.7.2.min'
	}	
},['./build/template','jquery'],function(template,$){	
	
	$(function(){
		$("#wrap").append(template('client/commonPart',{}));		
	})
});	