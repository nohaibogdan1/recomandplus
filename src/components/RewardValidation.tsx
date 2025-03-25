"use client"

import { ChangeEvent, useState } from "react"

export default function RewardValidation() {
    const [text, setText] = useState("");
    const [res, setRes] = useState<{ valid: boolean, reward: string }>();
    const [err, setErr] = useState("");

    async function handlerValidate() {
        console.log("text", text);
        const response = await fetch('/api/recompense/validare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ validationText: text }),
        });

        const result = await response.json();

        if (response.ok) {
            if (result.valid) {
                // setShow(false);
            }
        }

    }

    return (
        <>
            <span className="font-bold">Validare recompensa</span>
            <div className="p-5 rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
                <div className="flex flex-col">
                    <input value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} type="text" placeholder="Adresa de e-mail sau telefon" className="mb-3  w-full max-w-sm px-5 py-2 border-1 border-gray-200 rounded-md bg-gray-100 active:outline-gray-500 focus:outline-gray-500" />
                    <button onClick={handlerValidate} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Valideaza</button>
                </div>
            </div>
        </>
    )
}