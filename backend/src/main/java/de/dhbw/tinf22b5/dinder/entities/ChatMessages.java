package de.dhbw.tinf22b5.dinder.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table
public class ChatMessages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int messageId;

    private String message;
    private Instant dateTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "swipe_id", nullable = false)
    private SwipeInformation swipeid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "sender_email", nullable = false)
    private Users senderEmail;

    public Users getSenderemail() {
        return senderEmail;
    }

    public void setSenderemail(Users senderemail) {
        this.senderEmail = senderemail;
    }

    public SwipeInformation getSwipeid() {
        return swipeid;
    }

    public void setSwipeid(SwipeInformation swipeid) {
        this.swipeid = swipeid;
    }
}