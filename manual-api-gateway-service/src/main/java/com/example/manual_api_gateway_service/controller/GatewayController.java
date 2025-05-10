package com.example.manual_api_gateway_service.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GatewayController {
    private final RestTemplate restTemplate;
    String[] paths={"http://project-discovery-service:6000","http://keyword-project-service:5000","http://datahub-service:8086"};
    public GatewayController(RestTemplate restTemplate){
        this.restTemplate=restTemplate;
    }

    @GetMapping("/projects/batch")
    public ResponseEntity<?> routeToProjectService(@RequestParam Map<String,String> params){
        String url=paths[0]+"/projects/batch?"+getQueryString(params);
        return restTemplate.getForEntity(url, Object.class);
    }
    /*@PostMapping("/analyze")
    public ResponseEntity<?> routeToKeywordService(@RequestBody Map<String,Object> body){
        /*String url=paths[1]+"/analyze";
        return restTemplate.postForEntity(url,body,Object.class);
    }*/
    @PostMapping("/analyze")
    public ResponseEntity<?> routeToKeywordService(@RequestBody Map<String,Object> body){
        System.out.println(body.get("query"));
        String url=paths[1]+"/analyze";
        return restTemplate.postForEntity(url,body,Object.class);
    }
    @GetMapping("/donations")
    public ResponseEntity<?> routeToDataHub(){
        String test="this a test to datahub";
        String url=paths[2]+"/donations/test";
        return restTemplate.getForEntity(url, Object.class);
    }
    
    @GetMapping("/test")
    public String test1(){
        return "Get test success";
    }
    @PostMapping("/hello")
    public String Hello(){
        return "Post Hello success";
    }
    private String getQueryString(Map<String,String> params){
        return params.entrySet().stream().map(e->e.getKey()+"="+e.getValue()).collect(Collectors.joining("&"));
    }

    // New endpoint to route to project discovery service's test endpoint
    @GetMapping("/projects/test")
    public ResponseEntity<?> routeToProjectDiscoveryTest() {
        try {
            String url = paths[0] + "/projects/test";
            System.out.println("Attempting to forward request to: " + url);
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            System.out.println("Received response from project-discovery-service: " + response.getStatusCode());
            return response;
        } catch (RestClientException e) {
            System.err.println("Connection error with project discovery service: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to connect to project discovery service");
            errorResponse.put("details", e.getMessage());
            errorResponse.put("target", paths[0] + "/projects/test");

            return ResponseEntity.status(502).body(errorResponse);
        } catch (Exception e) {
            System.err.println("Unexpected error in gateway: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Internal gateway error");
            errorResponse.put("details", e.getMessage());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }


}
