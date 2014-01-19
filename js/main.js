var seeking = true;
var videoDuration = 0;

function flashReady() {
	var cameras = flash.getCameras();
	var mics = flash.getMicrophones();

	for (var i = 0, j = cameras.length; i < j; i++) {

		$('#cameras').append($('<option>', {
			'value' : i,
			'text' : cameras[i]
		}));

	}

	for (var i = 0, j = mics.length; i < j; i++) {

		$('#mics').append($('<option>', {
			'value' : i,
			'text' : mics[i]
		}));

	}

	flash.connect('rtmp://localhost/SMSServer');

	$('#start-playing').click(function() {

		flash.stopPlaying();

		var filename = $('#playback-title').val();
		flash.startPlaying(filename);
	});

	$("#play-pause").on("click", function() {
		flash.playPause();
	});

	$('#seek-bar').mousedown(function() {
		seeking = false;
	});

	$('#seek-bar').mouseup(function() {
		seeking = true;

		var videoPercent = $(this).val() / 100;
		var videoTime = videoPercent * videoDuration;

		flash.setTime(videoTime);
	});

	$(".record").on("click", function() {
		console.log('record');
	});

	$('#volume').change(function() {

		var videoVolume = $(this).val() / 100;

		flash.setVolume(videoVolume);

	});

	$('#start-recording').click(function() {

		var filename = $('#recording-title').val();
		var cameraIndex = $('#cameras').val();
		var microphoneIndex = $('#mics').val();

		flash.startRecording(filename, cameraIndex, microphoneIndex);

	});

	$('#stop-recording').click(function() {
		flash.stopRecording();
	});

}

function getDuration(duration) {
	videoDuration = duration;
}

function seekTime(time) {
	if (seeking) {
		var videoPercent = (time / videoDuration) * 100;
		$('#seek-bar').val(videoPercent);
	}
}

function connected() {
	var filename = $('#playback-title').val();
	flash.startPlaying(filename);
}
