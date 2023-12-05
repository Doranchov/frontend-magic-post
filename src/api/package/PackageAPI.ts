export const PackageAPI = {
    // staff transaction
    LIST_SUCCESS: (page: any) => `/package/staff/transaction/success?page=${page}`,
    LIST_FAIL: (page: any) => `/package/staff/transaction/fail?page=${page}`,
    LIST_SEND: (page: any) => `/package/staff/transaction/send?page=${page}`,
    LIST_DELIVERY: (page: any) => `/package/staff/transaction/delivery?page=${page}`,

    //manager transaction
    LIST_FROM_GATHERING: (page: any) => `/package/manager/transaction/from?page=${page}`,
};
