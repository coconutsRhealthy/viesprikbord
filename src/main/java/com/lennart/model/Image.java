package com.lennart.model;

/**
 * Created by lpo21630 on 14-12-2017.
 */
public class Image {

    private String superMarket;
    private String imageLink;
    private int rotation;

    public Image() {

    }

    public Image(String superMarket, String imageLink, int rotation) {
        this.superMarket = superMarket;
        this.imageLink = imageLink;
        this.rotation = rotation;
    }

    public String getSuperMarket() {
        return superMarket;
    }

    public void setSuperMarket(String superMarket) {
        this.superMarket = superMarket;
    }
}
