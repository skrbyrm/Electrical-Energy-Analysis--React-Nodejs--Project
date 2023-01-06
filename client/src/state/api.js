import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BACKEND_SERVER;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "data",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: () => "/getAllSummary_data",
      providesTags: ["User"],
    }),
    getDetail: build.query({
      query: () => "/getAllSummary_data",
      providesTags: ["data"],
    }),
    getCustomers: build.query({
      query: () => "/getAllSummary_data",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "getAllSummary_data",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "/getAllSummary_data",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "/getAllSummary_data",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "/getAllSummary_data",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: () => "/getAllSummary_data",
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "/getAllSummary_data",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetDetailQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
