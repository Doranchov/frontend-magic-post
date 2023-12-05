export const GatheringStaffAPI = {
    CONFIRM_PACKAGE_FROM_TRANSACTION: (packageId: any) =>
        `/user/staff/gathering/confirm-package-from-transaction/${packageId}`,

    CONFIRM_PACKAGE_FROM_GATHERING: (packageId: any) =>
        `/user/staff/gathering/confirm-package-from-gathering/${packageId}`,

    SEND_PACKAGE_TO_TRANSACTION: (packageId: any) => `/user/staff/gathering/send-package-to-transaction/${packageId}`,

    SEND_PACKAGE_TO_GATHERING: (packageId: any) => `/user/staff/gathering/send-package-to-gathering/${packageId}`,
};
