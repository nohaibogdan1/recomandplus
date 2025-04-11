import CheckedIcon from "../icons/CheckedIcon";

export default function Checkbox({ checked, handleChange, label }: { checked: boolean; handleChange: () => void; label: string }) {
    return (
        <label className={`flex items-center space-x-2 px-2 py-1 rounded-md ${checked ? "bg-orange-white" : "bg-none"}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="w-5 h-5 hidden"
            />
            <div className="w-[14] h-[14] flex items-center justify-center">
                <CheckedIcon className={`scale-125 text-regal-orange ${checked ? "block" : "hidden"}`} />
                <div className={`w-full h-full  border-1 border-gray-200 rounded-xs ${checked ? "hidden" : "block"}`}></div>
            </div>
            <span>{label}</span>
        </label>
    )
}