package com.lennart.model;

/**
 * Created by lpo21630 on 14-12-2017.
 */
public class Image {

    private String superMarket;
    private String imageLink;
    private int rotation;
    private String date;

    public Image() {

    }

    public Image(String superMarket, String imageLink, int rotation, String date) {
        this.superMarket = superMarket;
        this.imageLink = imageLink;
        this.rotation = rotation;
        this.date = date;
    }

    public String getSuperMarket() {
        return superMarket;
    }

    public void setSuperMarket(String superMarket) {
        this.superMarket = superMarket;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public int getRotation() {
        return rotation;
    }

    public void setRotation(int rotation) {
        this.rotation = rotation;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
