function firstvideo(){location.hash=$("ul#video_list li:eq(0)").attr("id");var a=location.hash.substring(1);$("#"+a).addClass("current");var b="http://www.youtube.com/v/"+a+"?enablejsapi=1&playerapiid=ytplayer&color=white&showinfo=0&theme=light",c={allowScriptAccess:"always"},d={id:"myytplayer"},e={};swfobject.embedSWF(b,"ytapiplayer","700","500","8",null,e,c,d)}function onYouTubePlayerReady(){ytplayer=document.getElementById("myytplayer"),ytplayer.playVideo(),ytplayer.addEventListener("onStateChange","onYouTubePlayerStateChange")}function onYouTubePlayerStateChange(a){if(0===a){if($("ul#video_list li").length>1){var b=$("ul li.current");if(b)var c=$(b).next("li").attr("id");else var c=$("ul li:first").attr("id")}$("ul#video_list li").removeClass("current"),$("#"+c).addClass("current"),loadVideo(c)}}function loadVideo(a){location.href="#"+a,ytplayer.loadVideoById(a)}function loadid(a,b){var c="https://www.googleapis.com/youtube/v3/search?",d="AIzaSyDrNRBt63fppaODVZ9aYKkWDIMRtfckRvw",e=c+"part=snippet&q="+a+"&maxResults=1&key="+d;$.ajax({type:"GET",url:e,dataType:"json",success:function(a){var c=a.items[0],d=c.id.videoId,e=c.snippet.thumbnails.default.url;$("ul#video_list > li").eq(b).attr("id",d);var f="#"+d;$("ul#video_list > li").eq(b).find("a").attr("href",f),$("ul#video_list > li").eq(b).find("img").attr("src",e)},error:function(a,b){console.log(b)}})}$(function(){var a="https://www.googleapis.com/youtube/v3/search?",b=location.pathname,c=$("ul#video_list li:first-child").find("span").text(),d=b+" "+c,e="AIzaSyDrNRBt63fppaODVZ9aYKkWDIMRtfckRvw",f=a+"part=snippet&q="+d+"&maxResults=1&key="+e;$.ajax({type:"GET",url:f,dataType:"json",success:function(a){var b=a.items[0],c=b.id.videoId,d=b.snippet.thumbnails.default.url;$("ul#video_list li:first-child").attr("id",c),$("ul#video_list li:first-child").find("img").attr("src",d),firstvideo()},error:function(a,b){console.log(b)}})});var ytplayer;$(window).load(function(){var a=location.pathname;$("ul#video_list li").each(function(b){var c=$("ul#video_list li").eq(b).find("span").text(),d=a+" "+c;loadid(d,b)})}),$("ul#video_list > li").click(function(){var a=$(this).prev("id");console.log(a),console.log("active!"),alert("active"),loadVideo(a)});