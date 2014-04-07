$(function() {
  $.getJSON('http://ws.audioscrobbler.com/2.0/?method=event.getinfo&event=3817349&api_key=22707255549691ea043a7771c96c7d31&format=json', function(data) {
    var target = $('#fujirock');
    var src = $('<li><dl><dt><a><img /></a></dt><dd></dd></dl></li>');
    var artist_data = data.event.artists.artist;
    var len = artist_data.length;
    for(var i = 0; i < len; i++){
      var item = src.clone();

      var link_artist = artist_data[i].replace(/ /g, '+');
      var link = '/'+ link_artist;

      item = src.clone();

      var artist_id = artist_data[i].replace(/ /g, "").replace(/\./, "");
      item.attr('id' ,artist_id);

      item.find('a:first').attr('href',link);
      item.find('dd:first').text(artist_data[i]);
      target.append(item);
      imageload(artist_data[i]);
    };
});
$.getJSON('http://ws.audioscrobbler.com/2.0/?method=event.getinfo&event=3775159&api_key=22707255549691ea043a7771c96c7d31&format=json', function(data) {
    var target = $('#summersonic');
    var src = $('<li><dl><dt><a><img /></a></dt><dd></dd></dl></li>');
    var artist_data = data.event.artists.artist;
    var len = artist_data.length;
    for(var i = 0; i < len; i++){
      var item = src.clone();

      var link_artist = artist_data[i].replace(/ /g, '+');
      var link = '/'+ link_artist;

      item = src.clone();

      var artist_id = artist_data[i].replace(/ /g, "").replace(/\./, "");
      item.attr('id' ,artist_id);

      item.find('a:first').attr('href',link);
      item.find('dd:first').text(artist_data[i]);
      target.append(item);
      imageload(artist_data[i]);
    };
});
$.getJSON('http://ws.audioscrobbler.com/2.0/?method=event.getinfo&event=3776892&api_key=22707255549691ea043a7771c96c7d31&format=json', function(data) {
    var target = $('#sonicmania');
    var src = $('<li><dl><dt><a><img /></a></dt><dd></dd></dl></li>');
    var artist_data = data.event.artists.artist;
    var len = artist_data.length;
    for(var i = 0; i < len; i++){
      var item = src.clone();

      var link_artist = artist_data[i].replace(/ /g, '+');
      var link = '/'+ link_artist;

      item = src.clone();

      var artist_id = artist_data[i].replace(/ /g, "").replace(/\./, "");
      item.attr('id' ,artist_id);

      item.find('a:first').attr('href',link);
      item.find('dd:first').text(artist_data[i]);
      target.append(item);
      imageload(artist_data[i]);
    };
});

});

function imageload(name) {
  var key = name;
  $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+key+'&api_key=22707255549691ea043a7771c96c7d31&format=json',function(data){
      var target = $('ul');
      var image = data.artist.image[2]['#text'];
      var replace_key = key.replace(/ /g, "").replace(/\./, "");
      target.find('#'+replace_key+' img').attr('src', image);
      });
};
