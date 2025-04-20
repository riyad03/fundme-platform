package com.example.manual_api_gateway_service.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class GatewayController {
    private final RestTemplate restTemplate;
    String[] paths={"http://localhost:8082","http://localhost:8083"};
    public GatewayController(RestTemplate restTemplate){
        this.restTemplate=restTemplate;
    }

    @GetMapping("/projects")
    public ResponseEntity<?> routeToProjectService(@RequestParam Map<String,String> params){
        String url=paths[0]+"/projects?"+getQueryString(params);
        return restTemplate.getForEntity(url, Object.class);
    }
    @PostMapping("/analyze")
    public ResponseEntity<?> routeToKeywordService(@RequestBody Map<String,Object> body){
        String url=paths[1]+"/analyze";
        return restTemplate.postForEntity(url,body,Object.class);
    }
    private String getQueryString(Map<String,String> params){
        return params.entrySet().stream().map(e->e.getKey()+"="+e.getValue()).collect(Collectors.joining("&"));
    }


}
