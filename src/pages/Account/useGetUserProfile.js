import UserApi from "./userApi";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useGetUserProfile = () => {
    const { getProfile } = UserApi();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: () => getProfile()
    });

    if (isError) {
        toast.error("An error has occurred while retrieving your user information");
        console.log(isError);
        console.log(error);
    }

    return { user: data?.data.user, isLoading };
};

export default useGetUserProfile;