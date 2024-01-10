import { useAllToys } from '../features/toy/useAllToys';

export function useGetFilterInfo() {
    const { toys } = useAllToys();

    const categoryList = toys?.reduce((acc, cur) => {
        if (cur.category && !acc.includes(cur.category) && acc.length < 6)
            return [...acc, cur.category];
        return acc;
    }, []);

    const brandList = toys?.reduce((acc, cur) => {
        if (cur.category && !acc.includes(cur.branch) && acc.length < 6)
            return [...acc, cur.branch];
        return acc;
    }, []);

    return { categoryList, brandList } ?? {};
}
