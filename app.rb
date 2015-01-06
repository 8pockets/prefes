#!/usr/bin/ruby
# -*- coding: utf-8 -*-

require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
#require 'rexml/document'
require 'open-uri'
require 'net/http'
require 'nokogiri'

#require 'google/api_client'
#require 'trollop'
#require 'uri'
#require 'json'
#http://qiita.com/awakia/items/bd8c1385115df27c15fa

get '/' do
  erb :index
end
get '/about' do
  erb :about
end

get '/:artist' do
  song_array = []

  #アーティストの例外処理(mbid)
  case params[:artist]
   when 'Banks'
     params[:artist] = 'faa28a33-5470-4b90-90c3-e71955d93a44'
   when 'Queen'
     params[:artist] = '0383dadf-2a4e-4d10-a46a-e9e041da8eb3'
   else
  end

begin
    #setlistからXMLを取得
    uri = "http://api.setlist.fm/rest/0.1/search/setlists?artistName=#{params[:artist]}"
    #res = Net::HTTP.get(uri)
    song = Nokogiri::XML(open(uri))
    #song = REXML::Document.new(open("http://api.setlist.fm/rest/0.1/search/setlists?artistName=#{params[:artist]}"))
#    song2 = REXML::Document.new(open("http://api.setlist.fm/rest/0.1/search/setlists?artistName=#{params[:artist]}&p=2"))
	#もしsetlistから取得出来なかった場合
    #rescue OpenURI::HTTPError,URI::InvalidURIError,REXML::ParseException
    rescue OpenURI::HTTPError
		p "No Data At Setlist.fm"
		url = URI.escape(params[:artist])
		uri = URI.parse("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{url}&api_key=22707255549691ea043a7771c96c7d31")
		res = Net::HTTP.get(uri)
		jpsong = Nokogiri::XML(res)
		song_array = jpsong.xpath("/lfm/toptracks/track").map{|e| e.content}
		@setlist = song_array
end

  #アーティストの最新ライブ動向
  #song.elements.each('setlists/setlist/sets/set') do |d|
  #end

  #setlistからXMLをパース
  begin
  p song.xpath('//setlist')
  song_array = song.xpath("//song/@name").map{|e| e.content}
  p song_array
#  	song.elements.each('setlists/setlist/sets/set/song') do |e|
#      song_array << e.attributes["name"].text
#    end
#    song2.elements.each('setlists/setlist/sets/set/song') do |e|
#      song_array << e.attributes["name"]
#    end
#    song_count = 0
#    if(song.elements['setlist/setlist/sets/set/song'] != false)
#      song.elements.each('setlists/setlist') do |d|
#        song_count += 1
#      end
#    end
#    if(song2.elements['setlist/setlist/sets/set/song'] != false)
#      song2.elements.each('setlists/setlist') do |d|
#        song_count += 1
#      end
#    end
  rescue NoMethodError
    puts 'NoMethod'
  end

  #配列中の曲の回数順にソート
  count = Hash.new(0)
  song_array.each do |c|
    count[c] += 1
  end
  count_sort = count.sort_by{|key,val| -val}

  #Topの30曲だけにする
  count_sort.each do |l|
    if count_sort.length > 30
      count_sort.pop
    end
  end

  #曲のパーセント
  song_count = song_array.count
  count_sort.each do |p|
    rate = p[1].to_f/song_count.to_f
    percent = rate*100
    p[1] = percent.round(2)
  end

# p count_sort

  @setlist = count_sort

#  #YouTubeにて曲のIDを取得
#  def get_service
#    client = Google::APIClient.new(
#      :key =>'AIzaSyD--VtPKQU9ac1SeY4XMdYkWivGkMuSvLM',
#      :authorization => nil,
#      :application_name => 'prefes',
#      :application_version => '1.0.0'
#    )
#    youtube = client.discovered_api('youtube', 'v3')
#    return client, youtube
#  end
#
#  def main(search)
#    opts = Trollop::options do
#      opt :q, 'Search Term', :type => String, :default => search
#      opt :max_results, 'Max results', :type => :int, :default => 1
#    end
#
#    client, youtube = get_service
#    begin
#      # Call the search.list method to retrieve results matching the specified
#      search_response = client.execute!(
#        :api_method => youtube.search.list,
#        :parameters => {
#        :part => 'snippet',
#        :q => opts[:q],
#        :maxResults => opts[:max_results]
#        }
#      )
#
#      return search_response.data.items[0]['id']['videoId']
#
#    rescue Google::APIClient::TransmissionError => e
#      puts e.result.body
#    end
#  end

#  #曲のYouTubeIdを取得する
#  begin
# # topsong = "#{params[:artist]} "+ count_sort[0][0]
# # @data = main(topsong)
#
#  count_sort[0..4].each do |s|
#    othersong = "#{params[:artist]} "+ s[0]
#    s << main(othersong)
#    p s #ここで曲ランキン表示
#  end
#  rescue NoMethodError,Faraday::SSLError
#    puts 'NoMethod'
#  end

  erb :artist
end
