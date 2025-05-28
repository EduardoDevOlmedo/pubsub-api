import express from "express";
import bodyParser from "body-parser";
import { handlePubSubMessage } from "./pubsubHandler";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "*",
}));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/analize-text", async (req, res) => {
    try {
        const result = await handlePubSubMessage(req.body);
        res.status(200).send(result);
    } catch (err) {
        console.error("Error handling message", err);
        res.status(500).send("Error");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
