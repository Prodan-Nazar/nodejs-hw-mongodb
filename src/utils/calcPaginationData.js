const calcPaginationData = ({ total, page, perPage }) => {
    if (page < 1) page = 1;
    if (perPage < 1) perPage = 1;

    const totalPages = Math.ceil(total / perPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
};

export default calcPaginationData;
