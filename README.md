# Minimal React Application
This is a simple web application that has a Java backend and a React-based frontend. The backend uses a simple H2 database (stored in a file).
The main page contains a minimal example of a D3 bar chart.

## Running
First, you need to build the frontend. Go to `src/main/resources/frontend` folder and run (npm and node are required):
```
make dependencies
```

While working on the frontend it is better to turn on the development mode, since it will refresh your browser after
each change in the source code:
```
make run_webui_dev_server
```

If you need to add a new dependency, you should modify `src/main/resources/frontend/package.json`. After that remove
old dependencies by removing `src/main/resources/frontend/webui/node_modules` folder. Rerun:
```
make dependencies
```

To run the backend use the following options (Java 8 is required):
```
server minimal-react.yaml
```

## Configuration
Configuration options are stored in `minimal-react.yaml`

| Option            | Description |
| ----------------- | ------- |
| version | version number |
| dbFolder | path to the database file |
| dbUser   | database user name |
| dbPassword | database password |

## API endpoint

| URL            | Method | Description | 
| ----------------- | ------ | ----------- |
| /info | GET | information about the API |
| /booking | GET | list of all bookings in JSON |
| /booking | POST | adding a new booking |
| /booking/{id} | GET | getting a particular booking by Id |