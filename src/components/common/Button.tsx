import Image from "next/image";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    loading?: boolean;
}

export default function Button({ text, loading, ...props }: ButtonProps) {
    return (
        <button className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2 flex justify-center" {...props}>
            <div className="relative">
                {loading && <Image
                    src="/loading.svg"
                    alt="Next.js logo"
                    width={20}
                    height={20}
                    priority
                    className="animate-spin absolute -left-7"
                />}
                {text}
            </div>
        </button>
    )
}