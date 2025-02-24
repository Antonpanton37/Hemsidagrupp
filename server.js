const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Endpoint för att ta emot kön, ålder, pace och hälsotillstånd
app.post('/calculate', (req, res) => {
    const { age, gender, pace, healthCondition } = req.body;

    // Validering
    if (!age || isNaN(age) || !pace || isNaN(pace) || !gender) {
        return res.status(400).json({ error: 'Fyll i alla fält korrekt' });
    }

    // Om användaren har ett hälsotillstånd, returnera varning istället för beräkning
    if (healthCondition !== "") {
        return res.json({ warning: "Vi rekommenderar att du kontaktar en läkare innan du tränar." });
    }

    // Exempel: Enkel beräkning baserad på kön och pace  HÄR SKA VI LÄGGA IN PET-värdet 
    let result;
    if (gender === "male") {
        result = pace * 0.9 + age * 0.2;
    } else if (gender === "female") {
        result = pace * 1.1 + age * 0.15;
    } else {
        result = pace * 1.0 + age * 0.18;
    }

    res.json({ result });
});

// Starta servern
app.listen(port, () => {
    console.log(`Backend körs på http://localhost:${port}`);
});
