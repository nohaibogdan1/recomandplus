"use client"

import { ChangeEvent, useState } from "react"
import Problem from "./Problem";
import { ValidateRewardRes } from "@/types/serverResponse";
import Button, { ButtonVariants } from "./common/Button";

export default function RewardValidation() {
    const [text, setText] = useState("");
    const [valid, setValid] = useState(0);
    const [reward, setReward] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function handlerValidate() {
        if (loading) { return; }

        setLoading(true);
        setValid(0);
        setReward([]);
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
        setLoading(false);
    }

    return (
        <div className="flex flex-col gap-3">
            <span className="font-medium">Validare recompensă</span>
            <div className="p-5 rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
                <div className="flex flex-col gap-2">
                    <input value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} type="text" placeholder="Adresa de e-mail" className="mb-3  w-full max-w-sm px-5 py-2 border-1 border-gray-200 rounded-md bg-gray-100 active:outline-gray-500 focus:outline-gray-500" />
                    <Button onClick={handlerValidate} text="Valideaza" loading={loading} variant={ButtonVariants.PRIMARY} />
                    {valid === 1 &&
                        <>
                            <div className="text-green-500 font-medium">VALID</div>
                            <ul className="flex flex-col gap-1">
                                {reward.map(o => <li key={o} >{o}</li>)}
                            </ul>
                        </>
                    }
                    {valid === 2 && <div className="text-red-500 font-medium">INVALID</div>}
                    {error && <Problem />}
                </div>
            </div>
        </div>
    )
}