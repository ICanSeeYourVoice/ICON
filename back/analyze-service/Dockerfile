FROM openjdk:21-oracle
ARG JAR_FILE=build/libs/analyze-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} ./app.jar
EXPOSE 8083
ENTRYPOINT ["java","-jar","./app.jar"]


