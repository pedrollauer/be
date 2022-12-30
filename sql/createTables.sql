create database this;
select this;
create table this.projetos (
					   proj_id int AUTO_INCREMENT primary key,
					   title varchar(255)
					   );
                       
create table this.proj_description (
				id int auto_increment primary key,
				proj_id int,
                                language int,
                                description varchar(255),
                                video varchar(255),
                                video_description varchar(255),
                                name varchar(255)
                                );
create table this.proj_stack (
						  id int auto_increment primary key,
                          proj_id int,
                          stack varchar(255)
                          );
create table this.images (
						  id int auto_increment primary key,
						  proj_id int,
                          path varchar(255)
                          );

create table this.strings (
						  id int auto_increment primary key,
                          string_name varchar(45),
                          string_data varchar(255),
                          language int
                          );

create table this.tastes (
								id int auto_increment primary key,
								taste varchar(255),
                                language int
                                );

create table this.pages(
        id int auto_increment primary key,
        name varchar(45),
        description text
);

create table this.page_strings(
        id int auto_increment primary key,
        page_id int,
        string_name varchar(45),
        string_content text
);

create table this.proj_features(
        id int auto_increment primary key,
        proj_id int,
        language int,
        feature_name varchar(45),
        feature_description text,
        feature_image varchar(255)
);

create table this.proj_dependencies(
        id int auto_increment primary key,
        proj_id int,
        language int,
        dependency_name varchar(45),
        dependency_description varchar(255) 
);

insert into this.projetos (title) values ("This")
insert into this.proj_description (proj_id, language, description) values (1, 0, "This Project is used to showcase my skills");
insert into this.proj_description (proj_id, language, description) values (1, 1, "Esse projeto é usado para demonstrar minhas habilidades");
insert into this.proj_stack (proj_id, stack) values (1, "react/js");
insert into this.proj_stack (proj_id, stack) values (1, "nodejs");
insert into this.proj_stack (proj_id, stack) values (1, "mysql");
insert into this.tastes (taste, language) values ("I like anime!", 0);
insert into this.tastes (taste, language) values ("Eu gosto de anime!", 1);
insert into this.strings (string_name, string_data, language) values ("Teste",0);
insert into this.strings (string_name, string_data, language) values  ("Teste",1);
insert into this.images (proj_id, path) values (1, "/imgages/1.png");

insert into this.strings (string_name, string_data, language) values ("title_1", "Sobre Mim", 2);
insert into this.strings (string_name, string_data, language) values ("title_1", "About Me", 1);

insert into this.strings (string_name, string_data, language) values ("title_2", "Projetos", 2);
insert into this.strings (string_name, string_data, language) values ("title_2", "Projects", 1);

insert into this.strings (string_name, string_data, language) values ("title_3", "Tecnologias", 2);
insert into this.strings (string_name, string_data, language) values ("title_3", "Technologies", 1);


insert into this.pages (name, description) values ("Home", "Main page")

insert into this.page_strings (page_id, string_name, string_content,language) values (1,"paragraph_1", "",2)
insert into this.page_strings (page_id, string_name, string_content,language) values (1,"paragraph_2", "",2)
insert into this.page_strings (page_id, string_name, string_content,language) values (1,"paragraph_3", "",2)

update this.page_strings set string_content = "Meu nome é Pedro e eu estou atualmente estudando ciência da computação na Unicamp, e trabalhando num empresa de automação como programador, onde escrevo código todo dia, principalmente em java, javascript, C e MySql. Gosto bastante de resolver problemas e estou procurando um nova oportunidade que me permita encarar novos desafios, que involvam escrever bastante código, assim como o aprendizado das novas tecnologias." where id=1;

update this.page_strings set string_content = "Estudei física por 3 anos, também na Unicamp, mas decidi partir para o lado da ciência da computação porque gosto de construir coisas, ao invés de apenas compreender como funcionam. Essa mudança de curso me deu a oportunidade de aprender a construir e de construir coisas incríveis, e esse processo é para mim um processo viciante, é como o trabalho de um escultor que vai lentamente adicionando detalhes e mais detalhes ao trabalaho, aperfeiçoando-o, e por fim acaba esquecendo-se de comer, de domir e de todos os seus outros afazeres, essa é para mim a melhor parte em ser um programador." where id=2;

update this.page_strings set string_content = "Fora programação, gosto também bastante de ler (ficção, poesia e mangás), de jogos de computador(principalmente rpgs online como World of Warcraft) e de sair para dar uma volta com os amigos para bater um papo(que não infrequentemente é sobre código)." where id=3;


insert into this.page_strings (page_id, string_name, string_content,language) values (1,"title", "Sobre mim",2)
insert into this.page_strings (page_id, string_name, string_content,language) values (1,"title", "About me",1)

insert into this.page_strings (page_id, string_name, string_content,language) values (1,"button", "Veja os meus projetos",2)
insert into this.page_strings (page_id, string_name, string_content,language) values (1,"button", "Check out my projects",1)

insert into this.page_strings (page_id, string_name, string_content,language) values (1,"profession", "Fullstack developer",2)
insert into this.page_strings (page_id, string_name, string_content,language) values (1,"profession", "Fullstack developer",1)

insert into this.page_strings (page_id, string_name, string_content,language) values (1,"hello", "Olá, me Chamo Pedro!",2)
insert into this.page_strings (page_id, string_name, string_content,language) values (1,"hello", "Hi! I'm Peter Lauer!",1)

insert into this.page_strings (page_id, string_name, string_content,language) values (1,"description", "I'm an experienced fullstack developer.",1)
insert into this.page_strings (page_id, string_name, string_content,language) values (1,"description"," Olá sou um desenvolvedor com experiência em backend e frontend.",1)

insert into this.page_strings (page_id, string_name, string_content,language) values (2,"title_1", "Projects",1)
insert into this.page_strings (page_id, string_name, string_content,language) values (2,"title_1","Projetos",2)

insert into this.page_strings (page_id, string_name, string_content,language) values (2,"sub_1", "Below are display some of the projects I worked on while I was going about learning new technologies.",1)
insert into this.page_strings (page_id, string_name, string_content,language) values (2,"sub_1","Abaixo estão mostrados alguns projetos nos quais eu trabalhei enquanto estava aprendendo novas tecnologias.",2)

insert into this.proj_features(proj_id, language, feature_name, feature_description, feature_image) values (1, 1, "Dynamic Content","Because this app is intended to be a dynamic display of all my future projects, all projects are fetched form a mysql database in a way that makes it possible to change the text for a give project simply by updating it's entry in the database.","/images/details/this/5.png")
insert into this.proj_features(proj_id, language, feature_name, feature_description, feature_image) values (1, 2, "Conteudo dinâmico","Como o objetivo do aplicativo é mostrar todos os meu projetos futuros, os dados que alimentam as páginas são coletados num bancod de dados em MYSQL, de modo que para mudar ou adicionar informações de um projeto basta atualizar o banco. ","/images/details/this/5.png");

insert into this.proj_features(proj_id, language, feature_name, feature_description, feature_image) values (1, 1, "Theme support","All the styles is this app are provided my the styledcomponents API, which makes it easier to keep track of loads of CSS code, enabling responsivity, light and dark themes, as well as a more readable code.","/images/details/this/4.png");
insert into this.proj_features(proj_id, language, feature_name, feature_description, feature_image) values (1, 2, "Suporte a temas","Todo os css da página está escrito com o uso de styled-components, sendo assim é mais fácio manter o código em CSS usando hooks para trocar o tema, atualmente existe o suporte para os temas claro e escuro.","/images/details/this/4.png");

insert into this.proj_dependencies (proj_id, language,dependency_name, dependency_description) values ( 1, 1,"node/js", "Javascript engine");
insert into this.proj_dependencies (proj_id, language,dependency_name, dependency_description) values ( 1, 2,"node/js", "Engine para javascript");

insert into this.proj_dependencies (proj_id, language,dependency_name, dependency_description) values ( 1, 1,"react/js", "javascript framework");
insert into this.proj_dependencies (proj_id, language,dependency_name, dependency_description) values ( 1, 2,"react/js", "framework para javascript");

insert into this.proj_dependencies (proj_id, language,dependency_name, dependency_description) values ( 1, 1,"styled-components", "framework for css in react");
insert into this.proj_dependencies (proj_id, language,dependency_name, dependency_description) values ( 1, 2,"react/js", "framework para css em react");

insert into this.proj_dependencies (proj_id, language,dependency_name, dependency_description) values ( 1, 1,"react-icons", "icons pack");
insert into this.proj_dependencies (proj_id, language,dependency_name, dependency_description) values ( 1, 2,"react/js", "pacote de icones");

insert into this.page_strings (page_id, string_name, string_content, language) values (3, "dependencies","Ingredientes",2)
insert into this.page_strings (page_id, string_name, string_content, language) values (3, "dependencies","Ingredients",1)