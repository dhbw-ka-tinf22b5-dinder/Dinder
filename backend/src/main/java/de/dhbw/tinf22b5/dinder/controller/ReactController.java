package de.dhbw.tinf22b5.dinder.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// this is just needed so that the regex still works without being changed
@SuppressWarnings("java:S6856")
@Controller
public class ReactController {
    @GetMapping(value = {"/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/*/{y:[\\w\\-]+}", "/error"})
    public String getIndex() {
        //noinspection SpringMVCViewInspection
        return "/index.html";
    }
}