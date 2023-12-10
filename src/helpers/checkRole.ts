import Role from '@/constants/roles';

export const checkRole = (roleId: any) => {
    if (roleId === Role.ADMIN_ROLE) {
        return 'Lãnh đạo công ty';
    } else if (roleId === Role.CUSTOMER_ROLE) {
        return 'Khách hàng';
    } else if (roleId === Role.GATHERING_MANAGER_ROLE) {
        return 'Trưởng điểm tại điểm tập kết';
    } else if (roleId === Role.GATHERING_STAFF_ROLE) {
        return 'Nhân viên tại điểm tập kết';
    } else if (roleId === Role.TRANSACTION_MANAGER_ROLE) {
        return 'Trưởng điểm tại điểm giao dịch';
    } else if (roleId === Role.TRANSACTION_STAFF_ROLE) {
        return 'Nhân viên tại điểm giao dịch';
    }
};
