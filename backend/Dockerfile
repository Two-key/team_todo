# backend/Dockerfile

FROM ruby:3.1.4

WORKDIR /app
RUN apt-get update -qq && \
    apt-get install -y build-essential default-mysql-client libpq-dev nodejs yarn
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install
COPY . .
CMD ["bin/rails", "server", "-b", "0.0.0.0"]

