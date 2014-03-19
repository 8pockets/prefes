//・最初の１つだけ、nameを取得する。
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

//最初の動画を埋め込みさせるためのscript
function firstvideo(){
	location.hash = $('ul#video_list li:eq(0)').attr('id');
	var id = location.hash.substring(1);
	$('#'+id).addClass('current');
	var youtubeUrl = 'http://www.youtube.com/v/'+ id +'?enablejsapi=1&playerapiid=ytplayer&color=white&showinfo=0&theme=light';
	var params = { allowScriptAccess: "always" };
	var atts = { id: "myytplayer" };
	var flashvars = {};
	swfobject.embedSWF(youtubeUrl,"ytapiplayer", "700", "500", "8", null, flashvars, params, atts);
};

var ytplayer;

//プレーヤーは、準備が整うと onYouTubePlayerReady を呼び出す。
function onYouTubePlayerReady(player){
  ytplayer = document.getElementById("myytplayer");
  ytplayer.playVideo();
  ytplayer.addEventListener('onStateChange', 'onYouTubePlayerStateChange');
};

//プレイヤーの状態が変わったら実行される
function onYouTubePlayerStateChange(state){
  if(state === 0){
    if($('ul#video_list li').length > 1){
      var current = $('ul li.current');
      if(current){
        var newId = $(current).next('li').attr('id');
      }else{
        var newId = $('ul li:first').attr('id');
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

$(window).load(function catchvideoid(){
	// Search parameter
	var artistname = location.pathname;
	$('ul#video_list li').each(function(i){
		var q = $('ul#video_list li').eq(i).find('span').text();
		var requestword = artistname +' '+ q;
		loadid(requestword,i);
	});
});

function loadid(requestword,i){
	var base = 'https://www.googleapis.com/youtube/v3/search?';		
	// Developer key
	var mykey = 'AIzaSyDrNRBt63fppaODVZ9aYKkWDIMRtfckRvw';	
	// URL
	var url = base + 'part=snippet&q=' + requestword +  '&maxResults=1&key='+ mykey;
	$.ajax({
	    type:"GET",
	    url:url,
	    dataType: "json",
	    success:function(data){
	        var base = data.items[0];
	        var videoId = base.id.videoId;
	        var thumb = base.snippet.thumbnails.default.url;
	        $('ul#video_list > li').eq(i).attr('id', videoId);
	        var videoHash = '#'+videoId;
	        $('ul#video_list > li').eq(i).find('a').attr('href', videoHash);
	        $('ul#video_list > li').eq(i).find('img').attr('src', thumb);
	    },
	    error :function(XMLHttpRequest,textStatus){
	        console.log(textStatus);
	    }
	});
};

////曲がクリックされたら再生させるー＞動いてない////
$('ul#video_list > li').click(function(){
	var id = $(this).prev('id');
	console.log(id);
	console.log('active!');
	alert('active');
	loadVideo(id);
});
