package com.lennart.controller;

import com.lennart.model.Image;
import com.lennart.model.ImageDbService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Configuration
@EnableAutoConfiguration
@RestController
public class Controller extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Controller.class);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Controller.class, args);
    }

    @RequestMapping(value = "/postImageUrl", method = RequestMethod.POST)
    public void postImageUrl(@RequestBody Object[] adData) throws Exception {
        String superMarket = (String) adData[0];
        String imageLink = (String) adData[1];
        int rotation = (int) adData[2];

        new ImageDbService().storeImageLinkInDb(superMarket, imageLink, rotation);
    }

    @RequestMapping(value = "/getImages", method = RequestMethod.POST)
    public @ResponseBody List<Image> sendImagesToClient(@RequestBody String superMarket) throws Exception {
        return new ImageDbService().retrieveImagesFromDb(superMarket);
    }
}
