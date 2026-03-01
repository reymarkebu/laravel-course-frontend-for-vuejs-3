import { AxiosError } from "axios";
import { FormKitNode } from "@formkit/core";

export const useInvalidForm = () => {
    function handleInvalidForm(err: any, node?: FormKitNode) {
        if(err instanceof AxiosError && err.response?.status == 422 ) {
            node?.setErrors([], err.response.data.message);
        }
    }

    return {
        handleInvalidForm,
    }
}