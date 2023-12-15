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
    LIST_FROM_GATHERING_IN_GATHERING: (page: any) => `/package/manager/gathering/from?page=${page}`,
    LIST_TO_GATHERING_IN_GATHERING: (page: any) => `/package/manager/gathering/to?page=${page}`,

    // admin
    LIST_SEND_GATHERING_ADMIN: (page: any, managerId: any) =>
        `/package/manager/gathering/to?page=${page}&id=${managerId}`,
    LIST_DELIVERY_GATHERING_ADMIN: (page: any, managerId: any) =>
        `/package/manager/gathering/from?page=${page}&id=${managerId}`,
    LIST_SEND_TRANSACTION_ADMIN: (page: any, managerId: any) =>
        `/package/manager/transaction/to?page=${page}&id=${managerId}`,
    LIST_DELIVERY_TRANSACTION_ADMIN: (page: any, managerId: any) =>
        `/package/manager/transaction/from?page=${page}&id=${managerId}`,
};
