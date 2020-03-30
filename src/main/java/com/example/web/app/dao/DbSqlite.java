package com.example.web.app.dao;

import com.example.web.app.dao.model.User;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class DbSqlite implements InitializingBean {
    private Logger log = Logger.getLogger(getClass().getName());

    private static String dbPath = "webappp-example.db";

    @Override
    public void afterPropertiesSet() throws Exception {
        initDb();
    }

    public void initDb() {
        try {
            Class.forName("org.sqlite.JDBC");
            try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath)) {
            }
        } catch (ClassNotFoundException | SQLException ex) {
            log.log(Level.WARNING, "База не подключена", ex);
        }
    }

    public Boolean execute(String query) {
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
             Statement stat = conn.createStatement()) {
            return stat.execute(query);
        } catch (SQLException ex) {
            log.log(Level.WARNING, "Не удалось выполнить запрос", ex);
            return false;
        }
    }

    public User selectUserById(int id) {
        String query = "select * from USER where id = " + id;
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
             Statement stat = conn.createStatement()) {
            ResultSet resultSet = stat.executeQuery(query);
            User user = new User();
            user.setId(resultSet.getInt("id"));
            user.setBirthday(resultSet.getDate("birthday"));
            user.setName(resultSet.getString("name"));
            user.setNumberPhone(resultSet.getString("phone_number"));
            user.setAbout(resultSet.getString("about"));
            user.setHobby(resultSet.getString("hobby"));
            user.setVk(resultSet.getString("vk"));
            return user;
        } catch (SQLException ex) {
            log.log(Level.WARNING, "Не удалось выполнить запрос", ex);
            return new User();
        }
    }

    public Boolean createNewUser(User user) {
        String query = "insert into USER (name, phone_number, birthday, vk, about, hobby) " +
                "values ('"
                + user.getName() + "','"
                + user.getNumberPhone() + "','"
                + user.getTimeOfBirthday() + "','"
                + user.getVk() + "','"
                + user.getAbout() + "','"
                + user.getHobby()
                + "');";
        System.out.println(query);
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath)) {
            Statement stat = conn.createStatement();
            Boolean bool = stat.execute(query);
            System.out.println(bool);
            return bool;
        } catch (SQLException ex) {
            log.log(Level.WARNING, "Не удалось выполнить запрос", ex);
            return false;
        }
    }

}