FROM openjdk:21-oracle
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} ./app.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","./app.jar"]





