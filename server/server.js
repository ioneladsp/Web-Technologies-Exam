import express, { json } from "express";
import cors from "cors";
import { join, resolve } from "path";
import { initialize } from "./repository.js";
import routes from "./routes.js";

express()
  .use(
    cors({
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      optionsSuccessStatus: 200,
    })
  )
  .use(json())
  .use(express.static(join(resolve(), "public")))
  .use("/api", routes)
  .get("*", (request, response) => {
    response.sendFile(join(resolve(), "public", "index.html"));
  })
  .listen(process.env.PORT || 8080, async () => {
    try {
      await initialize();
    } catch (error) {
      console.error(error);
    }
  });
