**Download the project from github repo link:**

using SSH:

```
git clone git@github.com:longvision/todo-app-springboot-react.git
```

or using HTTP:

```
git clone https://github.com/longvision/todo-app-springboot-react.git
```

**Run the Backend:**

Create the project **.jar** executable file ignoring the test folder.

Enter the backend folder:

```
cd backend
```

Run the following command:

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

1. Run yarn install or npm install inside the ./fronend folder. (certify that you have node and npm or yarn installed in your machine)

```
yarn install
```

1. Run the following command to start using:

```
yarn dev
```
