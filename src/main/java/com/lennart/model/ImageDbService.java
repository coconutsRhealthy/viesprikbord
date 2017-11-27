package com.lennart.model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by LennartMac on 27/11/2017.
 */
public class ImageDbService {

    protected Connection con;

    public void storeImageLinkInDb(String imageLink) throws Exception {
        initializeDbConnection();

        Statement st = con.createStatement();
        st.executeUpdate("INSERT INTO image_urls (entry, image_url) VALUES ('" + (getHighestIntEntry() + 1) + "', '" + imageLink + "')");
        st.close();

        closeDbConnection();
    }

    public List<String> retrieveImageLinksFromDb() throws Exception {
        List<String> imageLinks = new ArrayList<>();

        initializeDbConnection();

        Statement st = con.createStatement();
        String sql = ("SELECT * FROM image_urls ORDER BY entry DESC;");
        ResultSet rs = st.executeQuery(sql);

        while(rs.next()) {
            imageLinks.add(rs.getString("image_url"));
        }

        st.close();
        rs.close();
        closeDbConnection();

        return imageLinks;
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
