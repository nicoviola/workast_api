FROM node:latest

# Create app directory
RUN mkdir -p /home/workspace/app
WORKDIR /home/workspace/app

# Copy docker-entrypoint to workspace
COPY ./docker-entrypoint.sh .
# Copy wait-for-it to workspace
COPY ./wait-for-it.sh .

# Give execution permission
RUN ["chmod", "+x", "docker-entrypoint.sh"]
RUN ["chmod", "+x", "wait-for-it.sh"]
EXPOSE 3000