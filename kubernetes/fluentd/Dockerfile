FROM fluent/fluentd:v1.17-debian-arm64-1

USER root

# Install the Redis plugin for Fluentd
RUN gem install fluent-plugin-redis --no-document

USER fluent