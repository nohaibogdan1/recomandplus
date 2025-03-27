export default function PrivacyPolicyPage() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-5 px-4">
            <h1 className="text-3xl font-bold mb-6">Politică de Confidențialitate</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Cine suntem</h2>
                <p>
                    Această platformă este operată de Nohai Bogdan PFA, cu sediul in judetul Neamt, localitatea Margineni, strada Nucului nr 15, înregistrat la ANAF cu codul de înregistrare fiscală [CUI-ul PFA-ului]. Ne angajăm să protejăm
                    confidențialitatea utilizatorilor noștri.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Ce date colectăm</h2>
                <p>
                    Colectăm doar datele strict necesare pentru crearea și gestionarea contului tău:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Adresă de email (pentru autentificare)</li>
                    <li>Informații legate de autentificare (sesiune, token)</li>
                </ul>
                <p>
                    Pe lângă datele legate de utilizatori (email, informații de autentificare), colectăm și stocăm imagini ale afacerilor (ex: poze ale locațiilor sau ale produselor/serviciilor) care sunt încărcate de către afaceri pe platformă. Aceste imagini sunt stocate pe serverele Vercel, un furnizor de hosting de încredere.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Cum folosim datele</h2>
                <p>
                    Datele tale sunt folosite exclusiv pentru:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Crearea contului</li>
                    <li>Autentificare și menținerea sesiunii active</li>
                    <li>Comunicări legate de cont (ex: emailuri de conectare)</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Cookie-uri</h2>
                <p>
                    Folosim <strong>cookie-uri esențiale</strong> doar pentru a păstra sesiunea activă în timpul utilizării
                    platformei. Nu folosim cookie-uri de tracking sau pentru scopuri comerciale.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Cu cine partajăm datele</h2>
                <p>
                    Nu partajăm datele tale cu terți. Datele sunt stocate securizat prin serviciile furnizate de Supabase.
                </p>
                <p>
                    Informațiile legate de afaceri, inclusiv imagini, sunt generate pe pagini dinamice, folosind Next.js, și sunt găzduite pe platformele Vercel.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Drepturile tale</h2>
                <p>
                    Ai dreptul să:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Accesezi datele tale</li>
                    <li>Le modifici sau ștergi</li>
                    <li>Îți retragi consimțământul privind utilizarea contului</li>
                </ul>
                <p className="mt-2">
                    Pentru orice solicitare, ne poți contacta la <a href="mailto:contact@platforma.ro" className="text-blue-600 underline">contact@platforma.ro</a>.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">7. Modificări</h2>
                <p>
                    Putem actualiza această politică. Orice modificare va fi anunțată pe platformă.
                </p>
            </section>
        </div>
    )
}