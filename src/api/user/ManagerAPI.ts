export const ManagerAPI = {
    LIST_GATHERING_STAFF: (page: any) => `/user/manager/gathering-staff?page=${page}`,

    LIST_TRANSACTION_STAFF: (page: any) => `/user/manager/transaction-staff?page=${page}`,

    SEARCH_GATHERING_STAFF_ACCOUNT: (page: any, name: any) =>
        `/user/manager/search/gathering-staff?page=${page}&name=${name}`,

    SEARCH_TRANSACTION_STAFF_ACCOUNT: (page: any, name: any) =>
        `/user/manager/search/transaction-staff?page=${page}&name=${name}`,

    CREATE_STAFF: `/user/manager/create-staff`,

    EDIT_STAFF: (staffId: any) => `/user/manager/edit/${staffId}`,

    DELETE_STAFF: (staffId: any) => `/user/manager/delete/${staffId}`,
};
