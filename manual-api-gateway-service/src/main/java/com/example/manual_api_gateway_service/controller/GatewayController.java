package com.example.manual_api_gateway_service.controller;

import com.example.manual_api_gateway_service.util.MultipartInputStreamFileResource;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GatewayController {
    private final RestTemplate restTemplate;
    String[] paths={"http://project-discovery-service:6000","http://keyword-project-service:5000","http://datahub-service:8086","http://user-service:6100"};
    public GatewayController(RestTemplate restTemplate){
        this.restTemplate=restTemplate;
    }

    @GetMapping("/projects")
    public ResponseEntity<?> routeToProjectService(@RequestParam Map<String,String> params){
        String url=paths[0]+"/projects?"+getQueryString(params);
        return restTemplate.getForEntity(url, Object.class);
    }
    @GetMapping("/campaigns/{projectid}")
    public ResponseEntity<?> routeToProjectServiceForCampaign(@PathVariable long projectid){
        String url=paths[0]+"/campaigns/"+projectid;
        return restTemplate.getForEntity(url, Object.class);
    }
    @GetMapping("/rewards/{projectid}")
    public ResponseEntity<?> routeToProjectServiceForRewards(@PathVariable long projectid){
        String url=paths[0]+"/rewards/"+projectid;
        return restTemplate.getForEntity(url, Object.class);
    }
    @GetMapping("/projects/mapPwU/{projectId}")
    public ResponseEntity<?> routeToProjectWithUser(@PathVariable long projectId){
        try {

            String url = paths[0] + "/projects/mapPwU/"+projectId;
            return restTemplate.getForEntity(url, Object.class);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error while contacting project-discovery-service: " + e.getMessage());
        }
    }
    @GetMapping("/users/{projectId}")
    public ResponseEntity<?> searchPlayer(@PathVariable long projectId){
        try {

            String url = paths[3] + "/users/"+projectId;
            return restTemplate.getForEntity(url, Object.class);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error while contacting User-service: " + e.getMessage());
        }
    }
    @PostMapping("/follow/users/{userId}/target/{targetId}")
    public ResponseEntity<Boolean> followUser(
            @PathVariable("userId") long userId,
            @PathVariable("targetId") long targetId) {
        try{
            String url=paths[3]+"/users/"+userId+"/target/"+targetId;
            return restTemplate.postForEntity(url,null ,Boolean.class);
        }catch (Exception e) {
            return ResponseEntity.status(500).body(Boolean.FALSE);
        }
    }

    @PostMapping("/users/create")
    public ResponseEntity<Boolean> createUser(@RequestBody String query){
        String url=paths[3]+"/users/create";
        try {
            System.out.println("Forwarding request to: " + url);
            System.out.println("Request body: " + query);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> requestEntity = new HttpEntity<>(query, headers);
            ResponseEntity<Boolean> response = restTemplate.postForEntity(url, requestEntity, Boolean.class);

            // Log the response from the user service
            System.out.println("User Service Response: " + response.getBody());
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            // Log any errors that occur during communication with the user service
            System.out.println("Error while calling User Service: " + e.getMessage());
            return ResponseEntity.status(500).body(false);  // Send back a failure response
        }

    }
    @PutMapping("/users/update/{userId}")
    public ResponseEntity<Boolean> updateUser(@PathVariable Long userId, @RequestBody String query){
        String url = paths[3] + "/users/update/" + userId;
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> requestEntity = new HttpEntity<>(query, httpHeaders);
            ResponseEntity<Boolean> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Boolean.class);

            System.out.println("User Service Response: " + response.getBody());
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            System.out.println("Error while calling User Service: " + e.getMessage());
            return ResponseEntity.status(500).body(false);
        }
    }
    @DeleteMapping("/users/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        String url = paths[3] + "/users/delete/" + userId;
        try {
            restTemplate.delete(url);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            System.out.println("Error while calling User Service: " + e.getMessage());
            return ResponseEntity.status(500).body("Failed to delete user");
        }
    }


    @GetMapping("/questions/{projectid}")
    public ResponseEntity<?> routeToProjectServiceForQuestions(@PathVariable long projectid){

        String url=paths[0]+"/questions/"+projectid;
        return restTemplate.getForEntity(url, Object.class);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody String query){
        try {


            String url = paths[3] + "/users/login";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity(query, headers);
            ResponseEntity<?> response = restTemplate.postForEntity(url, entity, String.class);
            return  ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        }catch (Exception e){
            System.out.println("Error while calling User Service: " + e.getMessage());
            return ResponseEntity.status(500).body(false);
        }
    }
    @PostMapping("/campaigns")  // Without trailing slash
    public ResponseEntity<?> campaignPost(@RequestBody String body){
        try {
            // Log the request body
            System.out.println("Gateway received campaign request: " + body);

            String url = paths[0] + "/campaigns";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(body, headers);

            // Log what we're sending to the project discovery service
            System.out.println("Forwarding to " + url + " with body: " + body);

            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            // Log the response
            System.out.println("Received response from project service: " + response.getStatusCodeValue() + " " + response.getBody());

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            System.out.println("Error while calling Project Service: " + e.getMessage());
            e.printStackTrace(); // Add stack trace for more details
            return ResponseEntity.status(500).body(false);
        }
    }

    @PostMapping(value = "/projects/uploads/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> forwardCreateProject(
            @RequestParam("name") String name,
            @RequestParam("creatorId") Long creatorId,
            @RequestParam("title") String title,
            @RequestParam("donationsGoal") Double donationsGoal,
            @RequestParam("tag") String tag,
            @RequestParam("slogan") String slogan,
            @RequestParam("description") String description,
            @RequestParam(value = "videoFile", required = false) MultipartFile videoFile,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) {
        try {
            String url = paths[0] + "/projects/uploads/"; // Your project service URL

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("name", name);
            body.add("creatorId", creatorId.toString());
            body.add("title", title);
            body.add("donationsGoal", donationsGoal.toString());
            body.add("tag",tag);
            body.add("slogan", slogan);
            body.add("description", description);

            // Wrap MultipartFile to Resource for RestTemplate
            if (videoFile != null && !videoFile.isEmpty()) {
                body.add("videoFile", new MultipartInputStreamFileResource(videoFile));
            }

            if (imageFile != null && !imageFile.isEmpty()) {
                body.add("imageFile", new MultipartInputStreamFileResource(imageFile));
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            System.out.println("Error while calling Project Service: " + e.getMessage());
            return ResponseEntity.status(500).body(false);
        }
    }

    @DeleteMapping("projects/delete/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable Long projectId){
        try {
            String url = paths[0] + "/projects/delete/"+projectId;
            restTemplate.delete(url); // Just make the DELETE request

            return ResponseEntity.ok(true);
        }catch (Exception e){
            System.out.println("Error while calling Project Service: " + e.getMessage());
            return ResponseEntity.status(500).body(false);
        }
    }
    /*
    @GetMapping("/projects/batch")
    public ResponseEntity<?> routeToProjectService(@RequestParam Map<String,String> params){
        String url=paths[0]+"/projects/batch?"+getQueryString(params);
        return restTemplate.getForEntity(url, Object.class);
    }*/
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
    /*@GetMapping("/donations")
    public ResponseEntity<?> routeToDataHub(){
        String test="this a test to datahub";
        String url=paths[2]+"/donations/test";
        return restTemplate.getForEntity(url, Object.class);
    }*/

    /**for testing**/
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
