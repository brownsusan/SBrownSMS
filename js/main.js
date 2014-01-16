$(function(){
	connect('');
	
	
	$(".play-pause").on("click", function(){
		console.log('play-pause');
	});
	
	$(".record").on("click", function(){
		console.log('record');
	});
	
	$(".camera-select").on("click", function(){
		console.log('select camera');
	});
	
	$(".mic-select").on("click", function(){
		console.log('select mic');
	});
	
	$(".volume").on("click", function(){
		console.log('volume');
	});
});
