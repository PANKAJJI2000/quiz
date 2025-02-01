import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/quiz", async (req, res) => {
    try {
        const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching quiz data:", error.message);
        res.status(500).json({ error: "Failed to fetch quiz data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
