import RouteApi from "../api/routeApi";
import { useQuery } from "@tanstack/react-query";

const useGetRouteById = (id) => {
    const { getRouteById } = RouteApi();
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["route"],
        queryFn: () => getRouteById(id)
    });

    if (isError) {
        console.log(error);
        console.log(isError);
    }

    return { route: data?.data.route, routeIsLoading: isLoading };
};

export default useGetRouteById;