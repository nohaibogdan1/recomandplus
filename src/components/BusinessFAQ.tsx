"use client";

import FAQBox from "@/components/FAQBox";
import { useState } from "react";
import Button from "./common/Button";

const businessQuestions = [
    {
        question: "În ce situații utilizatorii primesc recompensă",
        answer: "Orice utilizator, la început, primește o recompensă. Apoi, când un utilizator recomandă și persoana care a primit recomandarea face o achiziție atunci utilizatorul primește încă o dată recompensa"
    },
    {
        question: "Cum funcționează sistemul de recomandări?",
        answer: "Utilizatorii pot recomanda afacerea ta. Când o persoană nouă ajunge printr-o recomandare primește recompensă și o poate folosi la achiziționare. După achiziționare recomandatorul primește recompensa de asemenea."
    }, {
        question: "Cine stabilește recompensele?",
        answer: "Tu, ca afacere, îți alegi tipurile de recompense pe care dorești să le oferi. Acestea trebuie să fie clare și atractive."
    }, {
        question: "Pot modifica recompensele după publicare?",
        answer: "Da, dar modificările vor intra în vigoare doar pentru utilizatorii care vor primi recompense din acel momente. Utilizatorii care au recompense dinaintea modificării vor folosi acele recompense."
    }, {
        question: "Cum sunt validate recomandările?",
        answer: "Recomandările sunt validate când o persoană nouă achiziționează efectiv un serviciu, iar tu confirmi acest lucru din contul de afacere."
    }, {
        question: "Ce obligații am ca afacere parteneră?",
        answer: "Să oferi recompensele promise, să menții informațiile actualizate și să validezi rapid utilizarea acestora."
    }, {
        question: "Ce se întâmplă dacă nu respect regulamentul?",
        answer: "Poți primi avertismente sau, în cazuri grave, contul tău poate fi suspendat."
    }, {
        question: "Primesc în mod obligatoriu un anumit număr de clienți?",
        answer: "Nu. Platforma nu garantează un număr minim de clienți."
    }]

export default function BusinessFAQ() {
    const [expanded, setExpanded] = useState(false);

    const [qs, setQs] = useState(businessQuestions.slice(0, 4));

    const toggleExpansion = () => {
        setExpanded(!expanded);
        if (expanded) {
            setQs(businessQuestions.slice(0, 4));
        } else {
            setQs(businessQuestions);
        }
    };


    return (
        <div className="mt-20 px-5 md:px-10 lg:px-0 flex md:px-10 lg:mt-50 w-full max-w-5xl mx-auto flex-col">
            <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0  text-center">Întrebări frecvente</h3>
            <div className="flex flex-col gap-2 w-full mt-9 max-w-5xl mx-auto">
                {qs.map(q => <FAQBox key={q.question} q={q.question} ans={q.answer} />)}
            </div>
            <div className="mt-4 self-center">
                <Button onClick={toggleExpansion} text={`Vezi mai ${expanded ? "puțin" : "mult"}`} />
            </div>
        </div>
    )
}