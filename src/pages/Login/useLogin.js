import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import login from "./loginApi";
import { toast } from "react-toastify";

const useLogin = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: (data) => login(data),
        onSuccess: (data) => {
            const token = data?.data.data.access_token;
            navigate("/");
            window.localStorage.setItem("access_token", token);
            toast.success(data.data.message);
        },
        onError: (data) => {
            toast.error(data.response.data.reason);
        }
    });

    return { mutate, isPending };
};

export default useLogin;