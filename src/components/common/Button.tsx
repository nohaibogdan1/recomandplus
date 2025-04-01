import Image from "next/image";

export enum ButtonVariants {
    "PRIMARY" = "Primary",
    "SECONDARY" = "Secondary"
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    loading?: boolean;
    variant?: ButtonVariants;
    iconWidth?: number;
    iconHeight?: number;
}

export default function Button({ text, loading, variant, className, iconWidth = 20, iconHeight = 20, ...props }: ButtonProps) {
    return (
        <button className={`cursor-pointer w-50 rounded-md text-sm font-bold py-2 flex justify-center 
            ${variant === ButtonVariants.PRIMARY ? "bg-regal-orange text-white" :
                variant === ButtonVariants.SECONDARY ? "bg-white border border-gray-300" : "bg-gray-100"} ${className}`} {...props}>
            <div className="relative">
                {loading && <Image
                    src="/loading.svg"
                    alt="Next.js logo"
                    width={iconWidth}
                    height={iconHeight}
                    priority
                    className="animate-spin absolute -left-7"
                />}
                {text}
            </div>
        </button>
    )
}