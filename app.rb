#!/usr/bin/ruby
# -*- coding: utf-8 -*-

require 'sinatra'
require 'sinatra/reloader'
require 'open-uri'
require 'uri'
require 'rexml/document'
require 'rubygems'
require 'google/api_client'
require 'trollop'

get '/' do
  erb :index
end

get '/:name' do
  song_array = []

  begin
    #setlistからXMLを取得
    song = REXML::Document.new(open("http://api.setlist.fm/rest/0.1/search/setlists?artistName=#{params[:name]}"))
    song2 = REXML::Document.new(open("http://api.setlist.fm/rest/0.1/search/setlists?artistName=#{params[:name]}&p=2"))
    rescue OpenURI::HTTPError,URI::InvalidURIError
      puts "no data at setlist.fm"
      url = URI.escape(params[:name])
      jpsong = REXML::Document.new("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{url}&api_key=22707255549691ea043a7771c96c7d31")
      jpsong.elements.each('lfm/toptracks/track') do |e|
        song_array << e.elements['name'].text
      end
  end

  #アーティストの最新ライブ動向
  #song.elements.each('setlists/setlist/sets/set') do |d|
  #end

  #setlistからXMLをパース
  begin
    song.elements.each('setlists/setlist/sets/set/song') do |e|
       song_array << e.attributes["name"]
    end
    song2.elements.each('setlists/setlist/sets/set/song') do |e|
       song_array << e.attributes["name"]
    end
    rescue NoMethodError
      puts 'NoMethod'
  end

  #配列中の曲の回数をカウント
  count = Hash.new(0)
  song_array.each do |c|
    count[c] += 1
  end
  count_sort = count.sort_by{|key,val| -val}
  p count_sort

  #YouTubeにて曲のIDを取得
  def get_service
    client = Google::APIClient.new(
      :key =>'AIzaSyD--VtPKQU9ac1SeY4XMdYkWivGkMuSvLM',
      :authorization => nil,
      :application_name => 'prefes',
      :application_version => '1.0.0'
    )
    youtube = client.discovered_api('youtube', 'v3')
    return client, youtube
  end

  def main(search)
    opts = Trollop::options do
      opt :q, 'Search Term', :type => String, :default => search
      opt :max_results, 'Max results', :type => :int, :default => 1
    end

    client, youtube = get_service
    begin
      # Call the search.list method to retrieve results matching the specified
      search_response = client.execute!(
        :api_method => youtube.search.list,
        :parameters => {
        :part => 'snippet',
        :q => opts[:q],
        :maxResults => opts[:max_results]
        }
      )

      return search_response.data.items[0]['id']['videoId']

    rescue Google::APIClient::TransmissionError => e
      puts e.result.body
    end
  end

  #曲のYouTubeIdを取得する
  begin
 # topsong = "#{params[:name]} "+ count_sort[0][0]
 # @data = main(topsong)

  count_sort[0..4].each do |s|
    othersong = "#{params[:name]} "+ s[0]
    s << main(othersong)
    p s #ここで曲ランキン表示
  end
  rescue NoMethodError,Faraday::SSLError
    puts 'NoMethod'
  end
  @setlist = count_sort

  erb :artist
end
