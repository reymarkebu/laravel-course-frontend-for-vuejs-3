import axios from "axios";

export default defineNuxtPlugin(async () => {
    if (process.client) {
        axios.defaults.baseURL = "http://localhost:8000/";
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;

        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401 || error.response?.status === 419) {
                    // useRouter().replace("/login");
                    useAuth().logout();
                }
                return Promise.reject(error);
            }
        )
    }

    await axios.get("/sanctum/csrf-cookie");
    
});



