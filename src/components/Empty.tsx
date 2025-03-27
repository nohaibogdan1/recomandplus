export default function Empty({ message = "Nu s-au găsit rezultate." }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
            <svg
                className="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                />
            </svg>
            <h2 className="text-lg font-medium">{message}</h2>
        </div>
    );
}