FROM ruby:2.2.1
MAINTAINER 8pockets <8pockets@gmail.com>

RUN apt-get update && \
    apt-get install -y net-tools

# ENV
ENV APP_HOME /prefes
ENV HOME /root

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY Gemfile* $APP_HOME/
COPY . $APP_HOME

RUN gem update --system
RUN gem install bundler
RUN bundle install

# Start server
EXPOSE 4567
CMD ["foreman","start","-d","/root/sinatra"]
