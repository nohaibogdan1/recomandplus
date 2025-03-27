import { logout } from "@/app/(platform)/login/actions";
import useUser from "@/hooks/useUser";

export default function MyAccount() {
    const { reset } = useUser();

    return (
        <div className="flex flex-col">
            <button onClick={() => { logout(); reset(); }} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Deconectare</button>
        </div>
    )
}