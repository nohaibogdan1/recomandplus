import { Pagination } from "@/types/serverResponse";

export type Params = {
    counties: string,
    online: string,
    p: string,
}

type IBusinessPagination = {
    pagination: Pagination,
    params: Params
}

export default function BusinessPagination({ params, pagination }: IBusinessPagination) {
    let link = '/campanii?';
    if (params.counties) {
        link += `counties=${params.counties}`;
    }
    if (params.online !== null) {
        link + `&online=${params.online}`;
    }

    let page: number | null = Number(params.p);
    if (Number.isNaN(Number(page))) {
        page = null;
    }
    const prevPage = page && page > 1 ? page - 1 : 0;
    const nextPage = page && pagination.hasNextPage ? page + 1 : pagination.hasNextPage ? 2 : 0;
    const prevPageLink = link + `&p=${prevPage}`;
    const nextPageLink = link + `&p=${nextPage}`;

    const prevPageDisabled = !prevPage;
    const nextPageDisabled = !nextPage;

    return (
        <div className="flex justify-center md:justify-end gap-4 bg-white py-5 px-5 rounded-md text-xs">
            <a href={prevPageLink} className={`border rounded-sm border-regal-orange text-regal-orange cursor-pointer hover:bg-regal-hover px-1 md:px-5 py-3 md:py-1 ${prevPageDisabled && 'hidden'}`}>Pagina anterioara</a>
            <a href={nextPageLink} className={`border rounded-sm border-regal-orange text-regal-orange cursor-pointer hover:bg-regal-hover  px-1 md:px-5 py-3 md:py-1 ${nextPageDisabled && 'hidden'}`}>Pagina urmatoare</a>
        </div>
    )
}