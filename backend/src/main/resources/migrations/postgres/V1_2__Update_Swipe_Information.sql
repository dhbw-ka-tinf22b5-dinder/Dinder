SET search_path TO dinder;

alter table swipe_information
    add column swipe_state int not null default 1;