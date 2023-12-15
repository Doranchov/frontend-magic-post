import { PointAPI } from '@/api/point/PointAPI';
import { http } from '@/utils/http';

export const PointServices = {
    getGatheringPoint: async () => {
        return (await http.get(PointAPI.LIST)).data.data;
    },
};
