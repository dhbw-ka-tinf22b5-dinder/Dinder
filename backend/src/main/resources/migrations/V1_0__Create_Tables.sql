create schema if not exists dinder;
SET search_path TO dinder;

CREATE TABLE users
(
    email     VARCHAR(255) NOT NULL PRIMARY KEY,
    user_name VARCHAR(255) NULL,
    pwd_hash  VARCHAR(255) NULL
);

CREATE TABLE advertisement
(
    advertisement_id SERIAL             NOT NULL PRIMARY KEY,
    title            VARCHAR(255)       NULL,
    price            float8             NOT NULL,
    location         VARCHAR(255)       NULL,
    postal_code      INT                NOT NULL,
    description      VARCHAR(255)       NULL,
    image            VARCHAR(16384)     NULL,
    creator_email    VARCHAR(255)       NOT NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    creation_time    timestamp          NULL
);

CREATE TABLE chat
(
    id INT NOT NULL PRIMARY KEY,
    advertisement_id INT          NOT NULL REFERENCES advertisement (advertisement_id) ON DELETE CASCADE ON UPDATE CASCADE,
    contractor_email VARCHAR(255) NOT NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(advertisement_id, contractor_email)
);

CREATE TABLE chat_messages
(
    message_id   INT          NOT NULL PRIMARY KEY,
    message      VARCHAR(255) NULL,
    date_time    timestamp    NULL,
    sender_email VARCHAR(255) NOT NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE swipe_information
(
    swipe_time       timestamp    NULL,
    users_email       VARCHAR(255) NOT NULL REFERENCES users (email),
    advertisement_id INT          NOT NULL REFERENCES advertisement (advertisement_id),
    PRIMARY KEY (users_email, advertisement_id)
);