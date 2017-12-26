package com.lennart.model;

import org.apache.commons.lang3.time.DateUtils;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by LennartMac on 27/11/2017.
 */
public class ImageDbService {

    private Connection con;

    public void storeImageLinkInDb(String superMarket, String imageLink, int rotation) throws Exception {
        initializeDbConnection();

        Statement st = con.createStatement();
        st.executeUpdate("INSERT INTO image_urls (entry, supermarket, image_url, rotation, date) VALUES ('" + (getHighestIntEntry() + 1) + "', '" + superMarket + "', '" + imageLink +  "', '" + rotation + "', '" + getCurrentDateTime() + "')");
        st.close();

        closeDbConnection();
    }

    public List<Image> retrieveImagesFromDb(String superMarket) throws Exception {
        List<Image> images = new ArrayList<>();

        initializeDbConnection();

        Statement st = con.createStatement();

        String sql = ("SELECT * FROM image_urls WHERE supermarket = '" + superMarket + "' ORDER BY entry DESC;");
        ResultSet rs = st.executeQuery(sql);

        while(rs.next()) {
            Image image = new Image(rs.getString("supermarket"), rs.getString("image_url"), rs.getInt("rotation"),
                    getFrontendDate(rs));
            images.add(image);
        }

        st.close();
        rs.close();
        closeDbConnection();

        return images;
    }

    private int getHighestIntEntry() throws Exception {
        Statement st = con.createStatement();
        String sql = ("SELECT * FROM image_urls ORDER BY entry DESC;");
        ResultSet rs = st.executeQuery(sql);

        if(rs.next()) {
            int highestIntEntry = rs.getInt("entry");
            st.close();
            rs.close();
            return highestIntEntry;
        }
        st.close();
        rs.close();
        return 0;
    }

    private String getFrontendDate(ResultSet rs) throws Exception {
        String dateStringFromDb = rs.getString("date");

        String[] dateAsArray = dateStringFromDb.split("-");

        String dayInitial = dateAsArray[2];
        String monthInitial = dateAsArray[1];

        String dayToReturn;
        String monthToReturn = "";

        if(dayInitial.charAt(0) == '0') {
            dayToReturn = dayInitial.substring(1, 2);
        } else {
            dayToReturn = dayInitial.substring(0, 2);
        }

        switch(monthInitial) {
            case "01":
                monthToReturn = "januari";
                break;
            case "02":
                monthToReturn = "februari";
                break;
            case "03":
                monthToReturn = "maart";
                break;
            case "04":
                monthToReturn = "april";
                break;
            case "05":
                monthToReturn = "mei";
                break;
            case "06":
                monthToReturn = "juni";
                break;
            case "07":
                monthToReturn = "juli";
                break;
            case "08":
                monthToReturn = "augustus";
                break;
            case "09":
                monthToReturn = "september";
                break;
            case "10":
                monthToReturn = "oktober";
                break;
            case "11":
                monthToReturn = "november";
                break;
            case "12":
                monthToReturn = "december";
                break;
        }

        return dayToReturn + " " + monthToReturn;
    }

    private String getCurrentDateTime() {
        java.util.Date date = new Date();
        date = DateUtils.addHours(date, 1);
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(date);
    }

    protected void initializeDbConnection() throws Exception {
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/prikbord", "root", "Vuurwerk00");
    }

    protected void closeDbConnection() throws SQLException {
        con.close();
    }

}
