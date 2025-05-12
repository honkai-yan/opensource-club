create database if not exists opensource_club;

use opensource_club;


create table if not exists users
(
    id          int unsigned not null primary key auto_increment,
    name        varchar(20)  not null,
    password    varchar(255) not null,
    nick_name   varchar(20)  default '',
    avatar_src  text,
    sch_id      varchar(20)  not null,
    description text,

    cur_point   int unsigned default 0,
    total_point int unsigned default 0,

    join_date   date         not null,
    delete_date date         default null,
    is_deleted  bool         default false
);


create table if not exists `groups`
(
    id           int unsigned not null primary key auto_increment,
    name         varchar(20)  not null,
    description  text,
    study_dir_id int unsigned not null,
    create_date  date         not null
);

create table if not exists users_groups
(
    user_id   int unsigned                               not null,
    group_id  int unsigned                               not null,
    role      enum ('member', 'leader', 'deputy_leader') not null default 'member',
    join_date date                                       not null,
    exit_date date                                                default null,
    is_exit   bool                                                default false,
    primary key (user_id, group_id)
);


create table if not exists positions
(
    id       int unsigned not null primary key auto_increment,
    name     varchar(20)  not null,
    is_admin bool         not null
);

create table if not exists users_positions
(
    user_id      int unsigned not null,
    pos_id       int unsigned not null,
    appoint_date date         not null,
    primary key (user_id, pos_id)
);


create table if not exists departments
(
    id   int unsigned not null primary key auto_increment,
    name varchar(20)  not null
);

create table if not exists users_departments
(
    user_id   int unsigned                               not null,
    dep_id    int unsigned                               not null,
    role      enum ('member', 'leader', 'deputy_leader') not null default 'member',
    join_date date                                       not null,
    primary key (user_id, dep_id)
);


create table if not exists study_directions
(
    id        int unsigned not null primary key auto_increment,
    leader_id int unsigned not null,
    name      varchar(20)  not null
);

create table if not exists users_study_directions
(
    user_id      int unsigned not null,
    study_dir_id int unsigned not null,
    join_date    date         not null,
    primary key (user_id, study_dir_id)
);


insert into users (name, sch_id, password, join_date)
values ('颜渝韩', '2023402010608', '$2b$10$BW0v7UtAH20dBnWMTJOZQe2UxevDPQy1ZHlAdwQfIkw8i4djZClH.', curdate()),
       ('张三', '1234567890987', '$2b$10$BW0v7UtAH20dBnWMTJOZQe2UxevDPQy1ZHlAdwQfIkw8i4djZClH.', curdate()),
       ('李四', '2143658709123', '$2b$10$BW0v7UtAH20dBnWMTJOZQe2UxevDPQy1ZHlAdwQfIkw8i4djZClH.', curdate()),
       ('王五', '1234567890321', '$2b$10$BW0v7UtAH20dBnWMTJOZQe2UxevDPQy1ZHlAdwQfIkw8i4djZClH.', curdate()),
       ('赵六', '1236547890987', '$2b$10$BW0v7UtAH20dBnWMTJOZQe2UxevDPQy1ZHlAdwQfIkw8i4djZClH.', curdate());

insert into positions (name, is_admin)
values ('普通成员', false),
       ('干事', false),
       ('副会长', true),
       ('秘书处', true),
       ('会长', true);

insert into users_positions (user_id, pos_id, appoint_date)
values (1, 3, curdate()),
       (2, 1, curdate()),
       (3, 2, curdate()),
       (4, 4, curdate()),
       (5, 5, curdate());

insert into departments (name)
values ('外联部'),
       ('组织部'),
       ('秘书处'),
       ('宣策部'),
       ('项目竞赛部');

insert into users_departments (user_id, dep_id, role, join_date)
values (1, 5, 'leader', curdate()),
       (2, 1, 'leader', curdate()),
       (3, 2, 'member', curdate()),
       (4, 3, 'deputy_leader', curdate()),
       (5, 4, 'member', curdate());

insert into study_directions (leader_id, name)
values (1, '鸿蒙应用开发'),
       (2, 'Linux与云计算');

insert into users_study_directions (user_id, study_dir_id, join_date)
values (1, 1, curdate()),
       (2, 1, curdate()),
       (3, 1, curdate()),
       (4, 2, curdate()),
       (5, 2, curdate());

insert into `groups` (name, study_dir_id, create_date)
values ('第一组', 2, curdate()),
       ('第二组', 2, curdate()),
       ('第三组', 2, curdate()),
       ('第一组', 1, curdate()),
       ('第二组', 1, curdate()),
       ('第三组', 1, curdate()),
       ('第四组', 1, curdate()),
       ('第五组', 1, curdate()),
       ('第六组', 1, curdate()),
       ('第七组', 1, curdate()),
       ('第八组', 1, curdate());