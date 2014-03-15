var ytplayer = '';

function onYouTubePlayerReady(player){
  ytplayer = document.getElementById("myytplayer");
  ytplayer.playVideo();
  ytplayer.addEventListener('onStateChange', 'onYouTubePlayerStateChange');
};

function onYouTubePlayerStateChange(state){
  if(state === 0){
    //$('li').find('.current').next().addClass('current');

   // document.getElementsByClassName('current')
  }

};
