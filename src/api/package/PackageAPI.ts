export const PackageAPI = {
    // staff transaction
    LIST_SHIPPING: (page: any) => `/package/staff/transaction/shipping?page=${page}`,
    LIST_SUCCESS: (page: any) => `/package/staff/transaction/success?page=${page}`,
    LIST_FAIL: (page: any) => `/package/staff/transaction/fail?page=${page}`,
    LIST_SEND: (page: any) => `/package/staff/transaction/send?page=${page}`,
    LIST_DELIVERY: (page: any) => `/package/staff/transaction/delivery?page=${page}`,

    // staff gathering
    LIST_SEND_GATHERING: (page: any) => `/package/staff/gathering/send?page=${page}`,
    LIST_DELIVERY_GATHERING: (page: any) => `/package/staff/gathering/delivery?page=${page}`,

    //manager transaction
    LIST_FROM_GATHERING: (page: any) => `/package/manager/transaction/from?page=${page}`,
    LIST_TO_GATHERING: (page: any) => `/package/manager/transaction/to?page=${page}`,

    // manager gathering
};
