const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

const DATA_FILE = path.join(__dirname, "cases.json");

// Helper to read/write data
function getCases() {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    } catch (e) {
        return [];
    }
}

function saveCase(newCase) {
    const cases = getCases();
    cases.push(newCase);
    fs.writeFileSync(DATA_FILE, JSON.stringify(cases, null, 2));
}

const REPERTORY_FILE = path.join(__dirname, "data/repertory.json");
const MATERIA_MEDICA_FILE = path.join(__dirname, "data/materia_medica.json");

let repertory = {};
let materiaMedica = {};

// Load Large Repertory
if (fs.existsSync(REPERTORY_FILE)) {
    try {
        const rawData = fs.readFileSync(REPERTORY_FILE);
        repertory = JSON.parse(rawData);
        console.log(`Loaded ${Object.keys(repertory).length} repertory rubrics.`);
    } catch (e) {
        console.error("Error loading repertory:", e);
    }
}

// Load Materia Medica
if (fs.existsSync(MATERIA_MEDICA_FILE)) {
    try {
        const mmData = fs.readFileSync(MATERIA_MEDICA_FILE);
        materiaMedica = JSON.parse(mmData);
        console.log(`Loaded Materia Medica for ${Object.keys(materiaMedica).length} remedies.`);
    } catch (e) {
        console.error("Error loading Materia Medica:", e);
    }
}

app.get("/symptoms", (req, res) => {
    res.json(Object.keys(repertory));
});

// Endpoint to list all remedies
app.get("/remedies", (req, res) => {
    res.json(Object.keys(materiaMedica).sort());
});

// Endpoint to get MM details
app.get("/remedy/:name", (req, res) => {
    const remedyName = req.params.name;
    // Find case-insensitive match
    const key = Object.keys(materiaMedica).find(k => k.toLowerCase() === remedyName.toLowerCase());

    if (key) {
        res.json({ name: key, details: materiaMedica[key] });
    } else {
        res.status(404).json({ error: "Remedy not found" });
    }
});

app.post("/analyze", (req, res) => {
    const symptoms = req.body.symptoms || [];
    let scores = {};
    symptoms.forEach(inputSymptom => {
        const lowerInput = inputSymptom.toLowerCase().trim();

        // exact match
        if (repertory[lowerInput]) {
            const remedyMap = repertory[lowerInput];
            for (let remedy in remedyMap) {
                scores[remedy] = (scores[remedy] || 0) + remedyMap[remedy];
            }
        } else {
            // partial match
            Object.keys(repertory).forEach(key => {
                if (key.includes(lowerInput) || lowerInput.includes(key)) {
                    const remedyMap = repertory[key];
                    for (let remedy in remedyMap) {
                        scores[remedy] = (scores[remedy] || 0) + (remedyMap[remedy] * 0.5); // lower weight
                    }
                }
            });
        }
    });

    // Remove remedies with very low scores (optional, but good for cleanup)
    // For now, keep all
    res.json(scores);
});

app.post("/save", (req, res) => {
    saveCase(req.body);
    res.json({ status: "saved" });
});

app.get("/cases", (req, res) => {
    res.json(getCases());
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));