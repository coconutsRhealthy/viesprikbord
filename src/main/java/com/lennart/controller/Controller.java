package com.lennart.controller;

import com.lennart.model.headlinesFE.BuzzWord;
import com.lennart.model.headlinesFE.RetrieveBuzzwords;
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

    @RequestMapping(value = "/getCryptoBuzzWords", method = RequestMethod.POST)
    public @ResponseBody List<BuzzWord> sendCryptoBuzzWordsToClient(@RequestBody int numberOfHours) throws Exception {
        List<BuzzWord> buzzWords = new RetrieveBuzzwords().retrieveBuzzWordsFromDbInitialCrypto("crypto_buzzwords_new", numberOfHours);
        return buzzWords;
    }


}
