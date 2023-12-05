export const UserAPI = {
    UPDATE: (userId: any) => `/user/${userId}`,

    USER_BY_PHONE: (phoneNumber: any) => `/user/phone/${phoneNumber}`,

    USER_BY_ID: (userId: any) => `/user/${userId}`,

    CREATE_MANAGER: `/user/admin/create-manager`,

    UPDATE_MANAGER: (managerId: any) => `/user/admin/edit/${managerId}`,

    DELETE_MANAGER: (managerId: any) => `/user/admin/delete/${managerId}`,

    LIST_GATHERING_MANAGER_ACCOUNT: `/user/admin/gathering-manager`,

    LIST_TRANSACTION_MANAGER_ACCOUNT: `/user/admin/transaction-manager`,
};
