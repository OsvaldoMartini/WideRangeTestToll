FROM maven:3-jdk-11
WORKDIR /
ADD target/subject-selector-api.jar //
EXPOSE 8080
ENTRYPOINT [ "java", "-Dspring.profiles.active=default", "-jar", "/subject-selector-api.jar"]
