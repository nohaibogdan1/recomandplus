"use client"

import { ChangeEvent, useState } from "react"
import Problem from "./Problem";
import { ValidateRewardRes } from "@/types/serverResponse";

export default function RewardValidation() {
    const [text, setText] = useState("");
    const [valid, setValid] = useState(0);
    const [reward, setReward] = useState<string[]>([]);
    const [error, setError] = useState(false);

    async function handlerValidate() {
        const response = await fetch('/api/recompense/validare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ validationText: text }),
        });

        const result = await response.json() as ValidateRewardRes;

        if (response.ok) {
            if (result.valid) {
                setValid(1);
                setReward(result.reward)
            } else {
                setValid(2);
            }
        } else {
            if (response.status === 500) {
                setError(true);
                setTimeout(() => setError(false), 3000);
            }
        }
    }

    return (
        <>
            <span className="font-bold">Validare recompensa</span>
            <div className="p-5 rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
                <div className="flex flex-col gap-2">
                    <input value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} type="text" placeholder="Adresa de e-mail sau telefon" className="mb-3  w-full max-w-sm px-5 py-2 border-1 border-gray-200 rounded-md bg-gray-100 active:outline-gray-500 focus:outline-gray-500" />
                    <button onClick={handlerValidate} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Valideaza</button>
                    {valid === 1 &&
                        <>
                            <div className="text-green-500 font-bold">VALID</div>
                            <ul className="flex flex-col gap-1">
                                {reward.map(o => <li key={o} >{o}</li>)}
                            </ul>
                        </>
                    }
                    {valid === 2 && <div className="text-red-500 font-bold">INVALID</div>}
                    {error && <Problem />}
                </div>
            </div>
        </>
    )
}