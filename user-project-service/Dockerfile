From eclipse-temurin:17-jre

WORKDIR /app

copy target/user-project-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 6100

CMD ["java","-jar","app.jar"]