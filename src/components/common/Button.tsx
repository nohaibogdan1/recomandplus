import Image from "next/image";

export enum ButtonVariants {
    "PRIMARY" = "Primary",
    "SECONDARY" = "Secondary"
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    loading?: boolean;
    variant?: ButtonVariants;
}

export default function Button({ text, loading, variant, ...props }: ButtonProps) {
    return (
        <button className={`cursor-pointer w-50 rounded-md text-sm font-bold py-2 flex justify-center 
            ${variant === ButtonVariants.PRIMARY ? "bg-regal-orange text-white" : 
              variant === ButtonVariants.SECONDARY ? "bg-white border border-gray-300" :  "bg-gray-100"}
        `} {...props}>
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