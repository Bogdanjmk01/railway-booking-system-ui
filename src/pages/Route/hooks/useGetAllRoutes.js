import RouteApi from "../api/routeApi";
import { useQuery } from "@tanstack/react-query";

const useGetAllRoutes = () => {
    const { getAllRoutes } = RouteApi();
    const { data, isLoading, isError, error  } = useQuery({
        queryFn: () => getAllRoutes(),
        queryKey: ["routes"]
    });

    if (isError) {
        console.log(error);
        console.log(isError);
    }

    return { routes: data?.data.routes, isLoading };
};

export default useGetAllRoutes;