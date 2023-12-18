export const PointAPI = {
    // gathering
    LIST: `/point/gathering/`,

    // transaction
    TRANSACTION_BY_LOCATION: (location: any) => `/point/transaction/${location}`,
};
