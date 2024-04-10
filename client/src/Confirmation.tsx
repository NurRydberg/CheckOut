import { useEffect, useState } from "react";

const Confirmation = () => {
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(""); // Tillägg för felhantering

    useEffect(() => {
        const verifySession = async () => {
            try {
                let sessionId;
                const dataFromLs = localStorage.getItem("sessionId");

                if (dataFromLs) {
                    sessionId = JSON.parse(dataFromLs);
                    const response = await fetch("http://localhost:3001/payments/verify-session", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ sessionId })
                    });

                    if (!response.ok) {
                        throw new Error('Nätverksfel vid verifiering');
                    }

                    const data = await response.json();
                    setVerified(data.verified);
                    setIsLoading(false);

                    if (data.verified) {
                        localStorage.clear();
                    }
                } else {
                    setIsLoading(false);
                    setError('Ingen session att verifiera');
                }
            } catch (error) {
                setIsLoading(false);
                setError((error as Error).message);
            }
        };
        verifySession();
    }, []); // Antaget att det inte finns ytterligare beroenden

    return (
        <>
            <h1>Confirmation</h1>
            {isLoading ? (
                <p>Laddar...</p>
            ) : verified ? (
                <h3>TACK FÖR DITT KÖP</h3>
            ) : error ? (
                <h3>Ett fel uppstod: {error}</h3>
            ) : (
                <h3>Ingen session att verifiera</h3>
            )}
        </>
    );
};

export default Confirmation;
