From eclipse-temurin:17-jre

WORKDIR /app

copy target/manual-api-gateway-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java","-jar","app.jar"]