FROM openjdk:21-oracle
ARG JAR_FILE=build/libs/common-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} ./app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","./app.jar"]
