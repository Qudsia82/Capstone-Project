import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
        const result = response.data;
        res.render("index.ejs", { content: result.joke,category: "Programming", type: "single"});
    }
    catch (error) {
        console.error("Error Message: " + error.message);
    }
});

app.post("/submit", async (req, res) => {
    try {
        const category = req.body["category"];
        const type = req.body["type"];
        if (type === "single") {
            const response = await axios.get("https://v2.jokeapi.dev/joke/" + category + "?type=" + type);
            const result = response.data.joke;
            res.render("index.ejs", { content: result, category, type });
        }
        if (type === "twopart") {
            const response = await axios.get("https://v2.jokeapi.dev/joke/" + category + "?type=" + type);
            const result1 = response.data.setup;
            const result2 = response.data.delivery;
            res.render("index.ejs", { content1: result1, content2: result2, category, type });
        }

    }
    catch (error) {
        console.error("Error Message: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
