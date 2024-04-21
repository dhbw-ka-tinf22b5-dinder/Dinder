create schema if not exists dinder;
SET search_path TO dinder;

CREATE TABLE users
(
    email    VARCHAR(255) NOT NULL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    pwd_hash  VARCHAR(255) NOT NULL,
    UNIQUE (user_name)
);

CREATE TABLE advertisement
(
    advertisement_id SERIAL       NOT NULL PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    price            float8       NOT NULL,
    location         VARCHAR(255) NULL,
    postal_code       INT          NOT NULL,
    description      VARCHAR(255) NULL,
    image            VARCHAR(255) NULL,
    advertiser       VARCHAR(255) NOT NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    contractor       VARCHAR(255) NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    creation_time     timestamp    NULL
);

CREATE TABLE swipe_information
(
    swipe_id         SERIAL       NOT NULL PRIMARY KEY,
    swipe_time       timestamp    NOT NULL,
    contractor_email VARCHAR(255) NOT NULL REFERENCES users (email),
    advertisement_id INT          NOT NULL REFERENCES advertisement (advertisement_id),
    UNIQUE (contractor_email,advertisement_id)
);

CREATE TABLE chat_messages
(
    message_id   SERIAL       NOT NULL PRIMARY KEY,
    message      VARCHAR(255) NULL,
    date_time    timestamp    NOT NULL,
    swipe_id     INT          NOT NULL REFERENCES swipe_information (swipe_id) ON DELETE CASCADE  ON UPDATE CASCADE,
    sender_email VARCHAR(255) NOT NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE
);

