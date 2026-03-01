import axios, { AxiosError } from "axios";

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("Auth middleware running...");
    const {user, initUser} = useAuth();

    await initUser();

    if(!user.value) {
        return navigateTo("/login");
    }

    // try {
    //     await axios.get("/api/user");
    // } catch (error) {
    //     if (error instanceof AxiosError && error.response?.status === 401) {
    //         return navigateTo("/login");
    //     }
    // }
    
})
