import axios from "axios";
import type { PaginatedResponse, Link, RawLink } from "~~/types";
import type { Ref } from "vue";

interface UseLinksOptions {
    queries?: Ref<Record<string, string | number>>;
}

export const useLinks = ({ queries = ref({}) }: UseLinksOptions = {}) => {
    const slug = "api/links";
    const paginatedData = ref<PaginatedResponse<Link> | null>(null);
    const item = ref<Link | null>(null);

    function adapter(link: RawLink): Link {
        return {
            ...link,
            created_at: new Date(link.created_at),
            updated_at: new Date(link.updated_at),
        };
    }

    //get all links
    async function index(qs?: Record<string, string | number>) {
        qs = { ...queries.value, ...qs };
        // @ts-expect-error page is number and that's ok
        const q = new URLSearchParams(qs).toString();
        const { data } = await axios.get<PaginatedResponse<RawLink>>(
            `/${slug}?${q}`
        );
        return (paginatedData.value = {
            ...data,
            data: data.data.map((i) => adapter(i)),
        });
    }
    watch(queries, index, { deep: true });

    //find one link by id
    async function find(id: string | number) {
        const { data } = await axios.get<RawLink>(`/${slug}/${id}`);
        return (item.value = adapter(data));
    }

    //create a new link
    async function create(payload: Partial<Link>) {
        const { data } = await axios.post<RawLink>(`/${slug}`, payload);
        return (item.value = adapter(data));
    }

    //update an existing link
    async function update(id: string | number, payload: Partial<Link>) {
        console.log("Updating link with id:", id, "and payload:", payload);
        const { data } = await axios.put<RawLink>(`/${slug}/${id}`, payload);
        return (item.value = adapter(data));
    }

    //delete an existing link
    async function destroy(id: string | number) {
        await axios.delete(`/${slug}/${id}`);
    }

    return {
        find,
        create,
        update,
        destroy,
        index,
        data: paginatedData,
        link: item,
    }
}
