FROM ruby:2.2.1
MAINTAINER 8pockets <8pockets@gmail.com>

RUN apt-get update && \
    apt-get install -y net-tools

# Install gems
ENV APP_HOME /prefes
ENV HOME /root
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
COPY Gemfile* $APP_HOME/
RUN gem install bundler
RUN bundle install

# Upload source
COPY . $APP_HOME

# Start server
ENV PORT 4567
EXPOSE 4567
CMD ["ruby", "app.rb"]
