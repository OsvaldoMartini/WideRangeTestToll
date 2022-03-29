ARG VERSION
FROM maven:3-jdk-11

WORKDIR /build

COPY ./subject-selector-api/src ./src
COPY ./subject-selector-api/pom.xml .
COPY ./subject-selector-api/settings.xml .
COPY ./subject-selector-api/settings-security.xml .

RUN mvn clean package -s settings.xml -B -f pom.xml

