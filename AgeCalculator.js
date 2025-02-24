import { useState } from "react";
import "./index.css"; // Importera CSS för styling

function AgeCalculator() {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [pace, setPace] = useState("");
    const [healthCondition, setHealthCondition] = useState("");
    const [result, setResult] = useState(null);
    const [warning, setWarning] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!age || isNaN(age) || !pace || isNaN(pace) || !gender) {
            alert("Fyll i alla fält korrekt!");
            return;
        }

        if (healthCondition !== "") {
            setWarning("Vi rekommenderar att du kontaktar en läkare innan du tränar.");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ age: Number(age), gender, pace: Number(pace), healthCondition }),
            });

            const data = await response.json();
            setResult(data.result);
        } catch (error) {
            console.error("Fel vid hämtning av data", error);
        }
    };

    return (
        <div>
            <h1>Springkalkylator</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ange din ålder" required />
                
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Välj kön</option>
                    <option value="male">Man</option>
                    <option value="female">Kvinna</option>
                    <option value="other">Annat</option>
                </select>
                
                <input type="number" value={pace} onChange={(e) => setPace(e.target.value)} placeholder="Ange din pace (min/km)" required />
                
                <select value={healthCondition} onChange={(e) => setHealthCondition(e.target.value)}>
                    <option value="">Inga hälsoproblem</option>
                    <option value="heart_disease">Hjärt- och kärlsjukdomar</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="cold">Förkylning</option>
                    <option value="respiratory_disease">Andningssjukdom</option>
                    <option value="kidney_disease">Njursjukdom</option>
                </select>
                
                <button type="submit">Beräkna</button>
            </form>

            {warning && <h2>{warning}</h2>}
            {result !== null && <h2>Beräknat resultat: {result}</h2>}
        </div>
    );
}

export default AgeCalculator;
