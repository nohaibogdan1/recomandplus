import { logout } from "@/app/(platform)/login/actions";
import Button from "@/components/common/Button";
import useUser from "@/hooks/useUser";

export default function MyAccount() {
    const { reset } = useUser();

    return (
        <div className="flex flex-col">
            <Button onClick={() => { logout(); reset(); }} text="Deconectare" />
        </div>
    )
}