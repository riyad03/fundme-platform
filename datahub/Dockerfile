FROM eclipse-temurin:17-jre

WORKDIR /app

COPY target/datahub-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8086

CMD [ "java","-jar","app.jar" ]