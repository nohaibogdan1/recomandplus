export default function Toggle({
  checked,
  handleChange,
  label,
}: {
  checked: boolean;
  handleChange: () => void;
  label: string;
}) {
  return (
    <button
      className="flex items-center space-x-2 w-full"
      onClick={handleChange}
    >
      <div
        data-state={checked ? "checked" : "unchecked"}
        className="peer inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-regal-orange data-[state=unchecked]:bg-gray-200"
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className="pointer-events-none block h-3 w-3 rounded-full bg-white shadow-lg ring-0 transition-transform duration-150 ease-in-out data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        ></span>
      </div>
      <label className=" cursor-pointer">{label}</label>
    </button>
  );
}
