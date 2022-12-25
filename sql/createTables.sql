create database this;
select this;
create table projetos (
					   proj_id int AUTO_INCREMENT primary key,
					   title varchar(255)
					   );
                       
create table proj_description (
								id int auto_increment primary key,
								proj_id int,
                                language int,
                                description varchar(255)
                                );
create table proj_stack (
						  id int auto_increment primary key,
                          proj_id int,
                          stack varchar(255)
                          );
create table images (
						  id int auto_increment primary key,
						  proj_id int,
                          url varchar(255)
                          );

create table strings (
						  id int auto_increment primary key,
                          string_name varchar(45),
                          string_data varchar(255),
                          );

create table tastes (
								id int auto_increment primary key,
								taste varchar(255),
                                language int,
                                );

insert into projetos (title) values ("This")
insert into proj_description (proj_id, language, description) values (1, 0, "This Project is used to showcase my skills");
insert into proj_description (proj_id, language, description) values (1, 1, "Esse projeto é usado para demonstrar minhas habilidades");
insert into proj_stack (proj_id, stack) values (1, "react/js");
insert into proj_stack (proj_id, stack) values (1, "nodejs");
insert into proj_stack (proj_id, stack) values (1, "mysql");
insert into this.tastes (taste, language) values ("I like anime!", 0);
insert into this.tastes (taste, language) values ("Eu gosto de anime!", 1);
insert into this.strings (string_name, string_data, language) values ("Teste",0);
insert into this.strings (string_name, string_data, language) values  ("Teste",1);
insert into images (proj_id, path) values (1, "/img/1.png");

insert into this.strings (string_name, string_data, language) values ("title_1", "Projetos", 1);
insert into this.strings (string_name, string_data, language) values ("title_1", "Projects", 0);

insert into this.strings (string_name, string_data, language) values ("title_2", "Tecnologias", 1);
insert into this.strings (string_name, string_data, language) values ("title_2", "Technologies", 0);

insert into this.strings (string_name, string_data, language) values ("title_3", "Línguas", 1);
insert into this.strings (string_name, string_data, language) values ("title_3", "Languages", 0);