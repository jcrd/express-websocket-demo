import express from "express"
import { WebSocketServer } from "ws"

const app = express()

app.get("/", (_, res) => {
  res.send("OK")
  console.log("http response")
})

const httpServer = app.listen(process.env.PORT || 8000, () => {
  console.log(`Running server on port: ${httpServer.address().port}`)
})

process.on("SIGINT", () => {
  httpServer.close()
})

const wss = new WebSocketServer({ noServer: true })

wss.on("connection", (_) => {
  console.log("websocket connected")
})

const upgrade = (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req)
  })
}
httpServer.on("upgrade", upgrade)
