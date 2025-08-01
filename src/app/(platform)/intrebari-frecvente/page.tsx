const usersQuestions = [{
    question: "Cum pot recomanda o afacere?", answer: "Accesează pagina afacerii din platformă și folosește opțiunea „Recomandă mai departe” pentru a trimite linkul prietenilor tăi."
}, {
    question: "Ce primesc dacă cineva folosește recomandarea mea?", answer: "Dacă recomandarea ta este folosită și duce la o achiziție, vei primi o recompensă conform ofertei afacerii respective."
}, {
    question: "Unde pot vedea recompensele mele?", answer: "Toate recompensele acumulate apar în contul tău, în secțiunea „Recompense”."
}, {
    question: "Cum pot folosi o recompensă?", answer: "După ce o recompensă este disponibilă, poți alege să o folosești direct din aplicație sau la fața locului, în funcție de specificul afacerii."
}, {
    question: "Ce se întâmplă dacă nu primesc recompensa?", answer: "Contactează echipa de suport în maximum 48 de ore și vom verifica imediat situația."
}, {
    question: "Pot face mai multe recomandări?", answer: "Da! Poți recomanda oricâte afaceri dorești și poți acumula recompense din fiecare recomandare validată.",
}, {
    question: "Există un termen de valabilitate pentru recomandări?", answer: "Nu, atât timp cât campania este în desfășurare."
}, {
    question: "Trebuie să plătesc pentru a folosi platforma?", answer: "Nu. Platforma este gratuită pentru utilizatori."
}];

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


export default function FaqPage() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-5 px-4">
            <div className="text-md font-medium">Întrebări frecvente pentru Utilizatori</div>

            {usersQuestions.map((q, i) =>
                <div key={q.question} className="mt-5 flex flex-col gap-3">
                    {i + 1}. {q.question} <br />
                    {q.answer}
                </div>)}

            <div className="text-md font-medium mt-10">Întrebări frecvente pentru Afacerile partenere</div>

            {businessQuestions.map((q, i) =>
                <div key={q.question} className="mt-5 flex flex-col gap-3">
                    {i + 1}. {q.question} <br />
                    {q.answer}
                </div>)}
        </div>
    )
}