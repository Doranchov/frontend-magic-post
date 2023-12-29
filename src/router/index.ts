import Role from '@/constants/roles';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/CommonLayout.vue'),
            children: [
                // home page
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/HomeView.vue'),
                    meta: {
                        role: [
                            Role.ADMIN_ROLE,
                            Role.CUSTOMER_ROLE,
                            Role.GATHERING_MANAGER_ROLE,
                            Role.GATHERING_STAFF_ROLE,
                            Role.TRANSACTION_MANAGER_ROLE,
                            Role.TRANSACTION_STAFF_ROLE,
                        ],
                        requiresAuth: false,
                    },
                },

                // about page

                {
                    path: 'about',
                    name: 'about',
                    component: () => import('@/views/AboutView.vue'),
                    meta: {
                        role: [
                            Role.ADMIN_ROLE,
                            Role.CUSTOMER_ROLE,
                            Role.GATHERING_MANAGER_ROLE,
                            Role.GATHERING_STAFF_ROLE,
                            Role.TRANSACTION_MANAGER_ROLE,
                            Role.TRANSACTION_STAFF_ROLE,
                        ],
                        requiresAuth: false,
                    },
                },
            ],
        },
        {
            path: '/',
            component: () => import('@/layouts/DefaultLayout.vue'),
            children: [
                // admin routes
                {
                    path: 'admin/gathering',
                    children: [
                        {
                            path: 'account',
                            name: 'admin-gathering-account',
                            component: () => import('@/views/admin/ManageGatheringAccountView.vue'),
                            meta: {
                                role: [Role.ADMIN_ROLE],
                                requiresAuth: true,
                            },
                        },

                        {
                            path: 'goods',
                            name: 'admin-gathering-goods',
                            component: () => import('@/views/admin/ManageGatheringGoodsView.vue'),
                            meta: {
                                role: [Role.ADMIN_ROLE],
                                requiresAuth: true,
                            },
                        },
                    ],
                },

                {
                    path: 'admin/transaction',
                    children: [
                        {
                            path: 'account',
                            name: 'admin-transaction-account',
                            component: () => import('@/views/admin/ManageTransactionAccountView.vue'),
                            meta: {
                                role: [Role.ADMIN_ROLE],
                                requiresAuth: true,
                            },
                        },

                        {
                            path: 'goods',
                            name: 'admin-transaction-goods',
                            component: () => import('@/views/admin/ManageTransactionGoodsView.vue'),
                            meta: {
                                role: [Role.ADMIN_ROLE],
                                requiresAuth: true,
                            },
                        },
                    ],
                },

                // customer routes

                {
                    path: 'search',
                    name: 'search',
                    component: () => import('@/views/customer/SearchGoodsView.vue'),
                    meta: {
                        role: [Role.CUSTOMER_ROLE],
                        requiresAuth: true,
                    },
                },

                // manager routes

                {
                    path: 'manage/gathering',
                    children: [
                        {
                            path: 'account',
                            name: 'manager-gathering-account',
                            component: () => import('@/views/manager/gathering/ManageAccountView.vue'),
                            meta: {
                                role: [Role.GATHERING_MANAGER_ROLE],
                                requiresAuth: true,
                            },
                        },

                        {
                            path: 'goods',
                            name: 'manager-gathering-goods',
                            component: () => import('@/views/manager/gathering/ManageGoodsView.vue'),
                            meta: {
                                role: [Role.GATHERING_MANAGER_ROLE],
                                requiresAuth: true,
                            },
                        },
                    ],
                },

                {
                    path: 'manage/transaction',
                    children: [
                        {
                            path: 'account',
                            name: 'manager-transaction-account',
                            component: () => import('@/views/manager/transaction/ManageAccountView.vue'),
                            meta: {
                                role: [Role.TRANSACTION_MANAGER_ROLE],
                                requiresAuth: true,
                            },
                        },

                        {
                            path: 'goods',
                            name: 'manager-transaction-goods',
                            component: () => import('@/views/manager/transaction/ManageGoodsView.vue'),
                            meta: {
                                role: [Role.TRANSACTION_MANAGER_ROLE],
                                requiresAuth: true,
                            },
                        },
                    ],
                },

                // staff routes

                {
                    path: 'staff/gathering',
                    children: [
                        {
                            path: 'goods',
                            name: 'staff-gathering-goods',
                            component: () => import('@/views/staff/gathering/OrderStats.vue'),
                            meta: {
                                role: [Role.GATHERING_STAFF_ROLE],
                                requiresAuth: true,
                            },
                        },
                    ],
                },

                {
                    path: 'staff/transaction',
                    children: [
                        {
                            path: 'goods',
                            name: 'staff-transaction-goods',
                            component: () => import('@/views/staff/transaction/OrderStats.vue'),
                            meta: {
                                role: [Role.TRANSACTION_STAFF_ROLE],
                                requiresAuth: true,
                            },
                        },

                        {
                            path: 'create-package',
                            name: 'staff-transaction-package',
                            component: () => import('@/views/staff/transaction/CreateOrderView.vue'),
                            meta: {
                                role: [Role.TRANSACTION_STAFF_ROLE],
                                requiresAuth: true,
                            },
                        },

                        {
                            path: 'store',
                            name: 'store',
                            component: () => import('@/views/staff/transaction/GoodsWarehouseView.vue'),
                            meta: {
                                role: [Role.TRANSACTION_STAFF_ROLE],
                                requiresAuth: true,
                            },
                        },
                    ],
                },

                //profile page
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('@/views/ProfileView.vue'),
                    meta: {
                        role: [
                            Role.ADMIN_ROLE,
                            Role.CUSTOMER_ROLE,
                            Role.GATHERING_MANAGER_ROLE,
                            Role.GATHERING_STAFF_ROLE,
                            Role.TRANSACTION_MANAGER_ROLE,
                            Role.TRANSACTION_STAFF_ROLE,
                        ],
                        requiresAuth: true,
                    },
                },

                // register page

                {
                    path: 'register',
                    name: 'register',
                    component: () => import('@/views/RegisterView.vue'),
                    meta: {
                        role: [
                            Role.ADMIN_ROLE,
                            Role.CUSTOMER_ROLE,
                            Role.GATHERING_MANAGER_ROLE,
                            Role.GATHERING_STAFF_ROLE,
                            Role.TRANSACTION_MANAGER_ROLE,
                            Role.TRANSACTION_STAFF_ROLE,
                        ],
                        requiresAuth: false,
                    },
                },

                // login page
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/LoginView.vue'),
                    meta: {
                        role: [
                            Role.ADMIN_ROLE,
                            Role.CUSTOMER_ROLE,
                            Role.GATHERING_MANAGER_ROLE,
                            Role.GATHERING_STAFF_ROLE,
                            Role.TRANSACTION_MANAGER_ROLE,
                            Role.TRANSACTION_STAFF_ROLE,
                        ],
                        requiresAuth: false,
                    },
                },

                // print page
                {
                    path: 'print/:packageId',
                    name: 'print',
                    component: () => import('@/views/PrintView.vue'),
                    meta: {
                        role: [Role.TRANSACTION_STAFF_ROLE],
                        requiresAuth: true,
                    },
                },

                // not found
                {
                    path: 'not-found',
                    name: 'not-found',
                    component: () => import('@/views/NotFoundView.vue'),
                    meta: {
                        role: [
                            Role.ADMIN_ROLE,
                            Role.CUSTOMER_ROLE,
                            Role.GATHERING_MANAGER_ROLE,
                            Role.GATHERING_STAFF_ROLE,
                            Role.TRANSACTION_MANAGER_ROLE,
                            Role.TRANSACTION_STAFF_ROLE,
                        ],
                        requiresAuth: true,
                    },
                },
            ],
        },
    ],
});

export default router;
