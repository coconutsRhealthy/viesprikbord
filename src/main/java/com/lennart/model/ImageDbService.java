package com.lennart.model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by LennartMac on 27/11/2017.
 */
public class ImageDbService {

    protected Connection con;

    public void storeImageLinkInDb(String superMarket, String imageLink, int rotation) throws Exception {
        initializeDbConnection();

        Statement st = con.createStatement();
        st.executeUpdate("INSERT INTO image_urls (entry, supermarket, image_url, rotation) VALUES ('" + (getHighestIntEntry() + 1) + "', '" + superMarket + "', '" + imageLink +  "', '" + rotation + "')");
        st.close();

        closeDbConnection();
    }

    public List<Image> retrieveImagesFromDb() throws Exception {
        List<Image> images = new ArrayList<>();

        initializeDbConnection();

        Statement st = con.createStatement();
        String sql = ("SELECT * FROM image_urls ORDER BY entry DESC;");
        ResultSet rs = st.executeQuery(sql);

        while(rs.next()) {
            Image image = new Image(rs.getString("supermarket"), rs.getString("image_url"), rs.getInt("rotation"));
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

    protected void initializeDbConnection() throws Exception {
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/prikbord", "root", "");
    }

    protected void closeDbConnection() throws SQLException {
        con.close();
    }

}
