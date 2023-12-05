import { PackageAPI } from '@/api/package/PackageAPI';

export const PackageServices = {
    getPackageSuccess: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_SUCCESS(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },

    getPackageFail: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_FAIL(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },

    getPackageToSend: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_SEND(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageDelivery: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_DELIVERY(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageFromGatheringInTransactionPoint: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_FROM_GATHERING(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },
};
