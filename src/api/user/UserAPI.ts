export const UserAPI = {
    UPDATE: (userId: any) => `/user/${userId}`,

    USER_BY_PHONE: (phoneNumber: any) => `/user/phone/${phoneNumber}`,

    USER_BY_ID: (userId: any) => `/user/${userId}`,

    CREATE_MANAGER: `/user/admin/create-manager`,

    UPDATE_MANAGER: (managerId: any) => `/user/admin/edit/${managerId}`,

    DELETE_MANAGER: (managerId: any) => `/user/admin/delete/${managerId}`,

    LIST_GATHERING_MANAGER_ACCOUNT: (page: any) => `/user/admin/gathering-manager?page=${page}`,

    LIST_TRANSACTION_MANAGER_ACCOUNT: (page: any) => `/user/admin/transaction-manager?page=${page}`,
};
