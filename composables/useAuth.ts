import axios from "axios";
import type {User, LoginPayload, RegisterPayLoad} from "@/types";


const user = ref<User | null>(null);
export const useAuth = () => {


    async function getUser(): Promise<User | null> {

        if(user.value) return user.value;

        try {
            const res = await axios.get("/api/user");
            const user = res.data;
            console.log("User data fetched:", user);

            return {
                ...user,
                created_at: new Date(user.created_at),
                updated_at: new Date(user.updated_at),
                email_verified_at: user.email_verified_at ? new Date(user.email_verified_at) : null,
                two_factor_confirmed_at: user.two_factor_confirmed_at ? new Date(user.two_factor_confirmed_at) : null,
            };
        } catch (error) {
            return null;
        }
        
    }

    async function initUser() {
        
        user.value = await getUser();
        console.log("Initializing user...", user.value);
    }

    async function login(payload: LoginPayload) {
        await axios.post("/api/login", payload);
        console.log("Login successful");
        useRouter().push("/me");
    }

    //logout
    async function logout() {
        await axios.post("/api/logout");
        user.value = null;
        useRouter().replace("/login");
    }


    async function register(payload: RegisterPayLoad) {
        await axios.post("/api/register", payload);
        
        await login({
            email: payload.email,
            password: payload.password,
        });
    }

    return {
        login,
        logout,
        register,
        initUser,
        user,
    }


};