# Camunda Integration Guide

Camunda provides a standalone BPM engine that can orchestrate workflows for this project.

## 1. Install Camunda

1. Download the latest Camunda Platform distribution from [camunda.com](https://camunda.com/download/).
2. Extract the archive and run the startup script:
   ```bash
   ./start.sh     # or ./camunda.sh depending on the package
   ```
3. Camunda will start on port **8080** with a web UI at [http://localhost:8080](http://localhost:8080).

## 2. Model a Process

Use the Camunda Modeler application to design BPMN diagrams. Save the BPMN file and deploy it using the Camunda web UI or REST API.

## 3. Connect the Go API

1. Add a new package under `api/camunda` that defines a client for the Camunda REST API.
2. Implement helper functions to start a process instance and query task status. Example skeleton:
   ```go
   package camunda

   import (
       "net/http"
       "os"
   )

   var baseURL = os.Getenv("CAMUNDA_URL")

   func StartProcess(key string, vars map[string]interface{}) error {
       // send POST /process-definition/key/{key}/start
       return nil
   }
   ```
3. Call these helpers from your route handlers when an event should trigger a workflow.

## 4. Configuration

Set `CAMUNDA_URL` in your environment to the REST endpoint (e.g. `http://localhost:8080/engine-rest`).

## 5. Next Steps

Integrate process events with your existing candidate flows. Persist Camunda process instance IDs in your database so you can correlate candidates with workflow progress.
