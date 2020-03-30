package com.example.web.app.dao.model;

import java.util.Date;

public class User {
    private Integer id;
    private String name;
    private String numberPhone;
    private Date birthday;
    private String vk;
    private String about;
    private String hobby;

    public void setVk(String vk) {
        this.vk = vk;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public String getVk() {
        return vk;
    }

    public String getAbout() {
        return about;
    }

    public String getHobby() {
        return hobby;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getNumberPhone() {
        return numberPhone;
    }

    public void setNumberPhone(String numberPhone) {
        this.numberPhone = numberPhone;
    }

    public Long getTimeOfBirthday() {
        return birthday.getTime();
    }
}