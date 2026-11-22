sudo systemctl status docker
 sudo systemctl start docker
nano Dockerfile

FROM jenkins/jenkins:lts

# Switch to root user to install tools
USER root

# Install Docker inside Jenkins container
RUN apt-get update && apt-get install -y docker.io

# Switch back to Jenkins user
USER jenkins

nano docker-compose.yml

version: '3.8'

services:
  jenkins:
    build: .
    image: program5-jenkins:latest
    container_name: jenkins-ci
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  jenkins_home:

   ls
docker compose build
docker compose up -d
docker ps
docker logs jenkins-ci
docker exec jenkins-ci cat /var/jenkins_home/secrets/initialAdminPassword
http://localhost:8080

docker images
 docker compose down
 docker rmi program5-jenkins:latest
docker images

