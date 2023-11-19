package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "users")
@Table(name = "users")
public class User {
    @Id
    private String email;
    private String userName;
    private String pwdHash;
}