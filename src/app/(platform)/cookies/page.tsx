export default function CookiesPage() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-5 px-4">
            <h1 className="text-3xl font-medium text-gray-900 mb-6">
                Politica privind utilizarea cookie-urilor
            </h1>

            <p className="mb-4">
                Această pagină explică modul în care platforma <strong>RecomandPlus</strong> utilizează fișierele de tip cookie și tehnologii similare.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-2">Ce sunt cookie-urile?</h2>
            <p className="mb-4">
                Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău atunci când vizitezi un site. Ele permit funcționarea eficientă a site-ului și îmbunătățesc experiența ta de navigare.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-2">Tipuri de cookie-uri folosite</h2>
            <ul className="list-disc list-inside mb-4 space-y-2">
                <li>
                    <strong>Cookie-uri esențiale:</strong> Necesare pentru funcționarea corectă a site-ului (ex: autentificare, securitate).
                </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-2">Modificări ale politicii</h2>
            <p className="mb-4">
                Ne rezervăm dreptul de a actualiza această politică. Ultima actualizare: <strong>27 martie 2025</strong>.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
            <p className="mb-4">
                Pentru întrebări legate de cookie-uri, ne poți contacta la <a href="mailto:suport@example.com" className="text-blue-600 underline">suport@example.com</a>.
            </p>
        </div>
    )
}