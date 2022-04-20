# Final Project Documentation

# README ⇒ How to run the project

**Download the project from github repo link:**

using SSH:

```
git clone git@github.com:longvision/todo-app-react-spring-boot-jpa.git
```

or using HTTP:

```
git clone https://github.com/longvision/todo-app-react-spring-boot-jpa.git
```

**Run the Backend:**

Create the project **.jar** executable file ignoring the test folder.

```bash
mvn clean install -Dmaven.test.skip=true
```

Run the below command to create and lauch the server and the database using docker automatically: (\*certify that you have docker installed in your machine)

```
docker-compose up
```

Now the server and DB will be inside the docker container named ‘backend’.

Test the connection to the server accessing http://localhost:8080

```docker
curl http://localhost:8080/projects
```

**Backend is ready for using the APIs!!**

**Run the Frontend:**

1. Run yarn install or npm install inside the ./fronend folder. (\*certify that you have node and npm or yarn installed in your machine)

```
yarn install
```

1. Run the following command to start using:

```
yarn dev
```

1. Access the website at:

```
http://localhost:3000
```

# Architecture:

1. Frontend:
   1. Used next.js (a react.js framework that runs its own server and generates html **dynamically**) to display pages that are SEO friendly. Also used javascript but with typescript together.
   2. The frontend APIs are on the `src/api` folder. For the todo feature, there is a todo-api.ts
   3. The main features are inside the `src/pages/tasks` folder. Where we can find the person, the projects and the tasks feature.
   4. There is a index component that lists all tasks. A new component for each feature to add new items. And a [featureId] component for each feature that enable to see the specific details of a particular item.
2. The Backend:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/919991ce-b6b3-4e9b-8916-c3136cfb4893/Untitled.png)

1. It is possible to perform the following tasks in the backend.
2. It was chosen Java Spring-boot JPA as backend framework.

# Documentation:

**Important files that was created for this project:**

1. Create a **docker-compose.yaml** file to generate the database and server containerization

```yaml
version: "3.1"
services:
  app:
    container_name: springboot-postgresql
    image: springboot-postgresql
    build: ./
    ports:
      - "8080:8080"
    depends_on:
      - tododb
  tododb:
    image: postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=tododb
```

1. Create a **Dockerfile** to build the container

```yaml
FROM adoptopenjdk/openjdk11:alpine-jre
ADD target/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
```

1. Create the **application.properties** file to generate the connection between the server and the database.

```java
spring.datasource.url=jdbc:postgresql://tododb:5432/tododb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=create
```

1. Dont forget to include the postgres dependency in the **pom.xml** file.
