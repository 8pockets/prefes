//・最初の１つだけ、nameを取得する。
//serach.list API叩いて。
$(function init_v3(){
	var base = 'https://www.googleapis.com/youtube/v3/search?';	
	// Search parameter
	var artistname = location.pathname;
	var q = $('ul#video_list li:first-child').find('span').text();
	var requestword = artistname +' '+ q;
	
	// Developer key
	var mykey = 'AIzaSyDrNRBt63fppaODVZ9aYKkWDIMRtfckRvw';
	
	// URL
	var url = base + 'part=snippet&q=' + requestword +  '&maxResults=1&key='+ mykey;
	
	$.ajax({
	    type:"GET",
	    url:url,
	    dataType: "json",
	    success:function(data){
	        console.log(data.items[0]);
	        var base = data.items[0];
	        var videoId = base.id.videoId;
	        var thumb = base.snippet.thumbnails.default.url;
	        $('ul#video_list li:first-child').attr('id', videoId);
	        $('ul#video_list li:first-child').find('img').attr('src', thumb);
	        firstvideo();
	    },
	    error :function(XMLHttpRequest,textStatus){
	        console.log(textStatus);
	    }
	});

});

//最初の動画を再生させるためのscript

function firstvideo(){
	location.hash = $('ul#video_list li:first-child').attr('id');
	var id = location.hash.substring(1);
	$('#'+id).addClass('current');
	var youtubeUrl = 'http://www.youtube.com/v/'+ id +'?enablejsapi=1&playerapiid=ytplayer';
	var params = { allowScriptAccess: "always" };
	var atts = { id: "myytplayer" };
	var flashvars = {};
	swfobject.embedSWF(youtubeUrl,"ytapiplayer", "700", "356", "8", null, flashvars, params, atts);
	console.log(youtubeUrl);
};


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
//・２個目以降取得して、serach.list API叩いて出来たらリンクを表示。
