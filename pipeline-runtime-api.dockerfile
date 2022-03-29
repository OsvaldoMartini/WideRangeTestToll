ARG VERSION
FROM test-subject-selector-api-build:${VERSION} as build

FROM openjdk:11-jdk

EXPOSE 443

WORKDIR /app

COPY --from=build /build/target/subject-selector-api.jar ./api.jar

COPY ./server.crt .

COPY ./server.key .

RUN ls -al

RUN chmod +x api.jar

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=default", "-jar", "api.jar"]
