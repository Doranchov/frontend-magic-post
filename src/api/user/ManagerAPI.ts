export const ManagerAPI = {
    LIST_GATHERING_STAFF: (page: any) => `/user/manager/gathering-staff?page=${page}`,

    LIST_TRANSACTION_STAFF: (page: any) => `/user/manager/transaction-staff?page=${page}`,

    CREATE_STAFF: `/user/manager/create-staff`,

    EDIT_STAFF: (staffId: any) => `/user/manager/edit/${staffId}`,

    DELETE_STAFF: (staffId: any) => `/user/manager/delete/${staffId}`,
};
