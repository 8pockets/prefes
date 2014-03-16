var ytplayer;

function onYouTubePlayerReady(player){
  ytplayer = document.getElementById("myytplayer");
  ytplayer.playVideo();
  ytplayer.addEventListener('onStateChange', 'onYouTubePlayerStateChange');
};

function onYouTubePlayerStateChange(state){
  if(state === 0){
    if($('ul#video_list li').length > 1){
      var current = $('ul li.current');
      if(current){
        var newId = $(current).next().find('a').attr('data-id');
      }else{
        var newId = $('ul li:first a').attr('data-id');
      }
    }
    $('ul#video_list li').removeClass('current');
    $('#'+newId).addClass('current');
    loadVideo(newId);
  }

};

function loadVideo(id){
  location.href = '#'+ id;
  ytplayer.loadVideoById(id);
};
