import type { PageLoad } from './$types';
import { listCharacters } from '$lib/core/api/rick-and-morty';

export const load: PageLoad = async ({ fetch, url }) => {
    // Usamos el operador ?. para evitar errores si url o searchParams no están listos
    const query = url.searchParams?.get('name') ?? '';
    const page = url.searchParams?.get('page') ?? '1';

    const filters = {
        name: query,
        page: parseInt(page) || 1,
        status: url.searchParams?.get('status') ?? undefined,
        species: url.searchParams?.get('species') ?? undefined,
        gender: url.searchParams?.get('gender') ?? undefined
    };

    try {
        const result = await listCharacters(fetch, filters);
        return {
            characters: result.characters ?? [],
            total: result.total ?? 0,
            pagination: result.pagination,
            filters: result.filters,
            query
        };
    } catch (error) {
        console.error(error);
        return {
            characters: [],
            total: 0,
            query,
            error: 'Error al cargar los personajes.'
        };
    }
};