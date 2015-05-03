# Pull base image.
FROM dockerfile/nodejs

# Meta
MAINTAINER Sebastien Dubois <seb@dsebastien.net>

# Install Gulp
RUN npm install -g gulp http-server

# Build the app
WORKDIR /opt/midnight_light/

ADD package.json ./
RUN npm install
ADD gulpfile.js ./
ADD ./app ./app
RUN gulp

# Run the app
#CMD ["/bin/ls", "-al"]
CMD ["http-server", "dist"]

# Expose ports
EXPOSE 8080