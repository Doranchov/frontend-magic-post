import { TransactionStaffAPI } from '@/api/user/TransactionStaffAPI';

export const TransactionStaffServices = {
    createPackageToReceiver: async (user: any, data: any, httpJwt: any) => {
        return (
            await httpJwt.post(TransactionStaffAPI.CREATE_PACKAGE, data, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },

    sendPackageToGathering: async (user: any, packageId: any, httpJwt: any) => {
        return (
            await httpJwt.put(
                TransactionStaffAPI.SEND_PACKAGE_TO_GATHERING(packageId),
                {},
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                },
            )
        ).data.data;
    },

    confirmPackageFromGathering: async (user: any, packageId: any, httpJwt: any) => {
        return (
            await httpJwt.put(
                TransactionStaffAPI.CONFIRM_PACKAGE_FROM_GATHERING(packageId),
                {},
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                },
            )
        ).data.data;
    },

    confirmToReceiverSuccess: async (user: any, packageId: any, httpJwt: any) => {
        return (
            await httpJwt.put(
                TransactionStaffAPI.CONFIRM_TO_RECEIVER_SUCCESS(packageId),
                {},
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                },
            )
        ).data.data;
    },

    confirmToReceiverFail: async (user: any, packageId: any, httpJwt: any) => {
        return (
            await httpJwt.put(
                TransactionStaffAPI.CONFIRM_TO_RECEIVER_FAIL(packageId),
                {},
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                },
            )
        ).data.data;
    },
};
