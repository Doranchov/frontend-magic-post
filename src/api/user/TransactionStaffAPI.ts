export const TransactionStaffAPI = {
    CREATE_PACKAGE: `/user/staff/transaction/create-package-to-receiver`,

    SEND_PACKAGE_TO_GATHERING: (packageId: any) => `/user/staff/transaction/send-package-to-gathering/${packageId}`,

    CONFIRM_PACKAGE_FROM_GATHERING: (packageId: any) =>
        `/user/staff/transaction/confirm-package-from-gathering/${packageId}`,

    CONFIRM_TO_RECEIVER_SUCCESS: (packageId: any) => `/user/staff/transaction/confirm-to-receiver-success/${packageId}`,

    CONFIRM_TO_RECEIVER_FAIL: (packageId: any) => `/user/staff/transaction/confirm-to-receiver-fail/${packageId}`,
};
