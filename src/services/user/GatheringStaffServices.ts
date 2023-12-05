import { GatheringStaffAPI } from '@/api/user/GatheringStaffAPI';

export const GatheringStaffServices = {
    confirmPackageFromTransaction: async (user: any, packageId: any, httpJwt: any) => {
        return (
            await httpJwt.put(
                GatheringStaffAPI.CONFIRM_PACKAGE_FROM_TRANSACTION(packageId),
                {},
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                },
            )
        ).data;
    },

    confirmPackageFromGathering: async (user: any, packageId: any, httpJwt: any) => {
        return (
            await httpJwt.put(
                GatheringStaffAPI.CONFIRM_PACKAGE_FROM_GATHERING(packageId),
                {},
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                },
            )
        ).data;
    },

    sendPackageToTransaction: async (user: any, packageId: any, httpJwt: any) => {
        return (
            await httpJwt.put(
                GatheringStaffAPI.SEND_PACKAGE_TO_TRANSACTION(packageId),
                {},
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                },
            )
        ).data;
    },

    sendPackageToGathering: async (user: any, packageId: any, httpJwt: any) => {
        return (
            await httpJwt.put(
                GatheringStaffAPI.SEND_PACKAGE_TO_GATHERING(packageId),
                {},
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                },
            )
        ).data;
    },
};
