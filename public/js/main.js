var ytplayer = '';

function onYouTubePlayerReady(player){
  ytplayer = document.getElementById("myytplayer");
  ytplayer.playVideo();
  ytplayer.addEventListener('onStateChange', 'onYouTubePlayerStateChange');
};

function onYouTubePlayerStateChange(state){
  if(state === 0){
    console.log('video end');
  }

};
