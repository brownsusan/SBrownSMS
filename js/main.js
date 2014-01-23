var seeking = true;
var videoDuration = 0;
var username = '';
var chatRef = new Firebase('https://sweltering-fire-8726.firebaseio.com/');

var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {

	if (error) {
		// an error occurred while attempting login
	} else if (user) {
		// user authenticated with Firebase
		username = user.username;
		$('#github-login').hide();
		$('#twitter-login').hide();
		$('.message-input-container').show();
		$('.chat-login-memo').hide();
		$('#logout').show();
	} else {
		// user is logged out
		$('#logout').hide();
		$('.message-input-container').hide();
		$('.chat-login-memo').show();
		$('#github-login').show();
		$('#twitter-login').show();

		$("#github-login").click(function() {
			auth.login('github');
			username = user.username;
		})

		$("#twitter-login").click(function() {
			auth.login('twitter');
			username = user.username;
		})
	}

});

$('#logout').click(function() {
	auth.logout();
});

$('#message-button').click(function(e) {
	var text = $('#message_input').val();
	chatRef.push({
		text : text,
		username : username
	});
	$('#message_input').val('');
});

chatRef.limit(40).on('child_added', function(snapshot) {

	var message = snapshot.val();

	var messageHtml = '<div class="message">' + '<span class="message-name">' + message.username + '</span>' + '<p class="message-content">' + message.text + '</p>' + '</div>';

	$(messageHtml).appendTo($('.message-container'));

	$('.message-container')[0].scrollTop = $('.message-container')[0].scrollHeight;
});

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

	$('#volume').change(function() {

		var videoVolume = $(this).val() / 100;

		flash.setVolume(videoVolume);

	});
	//TEST RECORDING
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
