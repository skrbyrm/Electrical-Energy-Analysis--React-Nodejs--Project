import React, { useState, useEffect }  from "react";
import {
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../state/index";
import axios from "axios";
import { finalClick } from "scenes/dashboard";
import config from "config";


const HourlyData = () => {
  const url = `${config.urls.BACKEND_SERVER_HOURLY}${finalClick}`;

  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const [data, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setDetail(response.data);

    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      headerName: "ssno",
      field: "ssno",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Tesis",
      field: "facility",
      flex: 2,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "İlçe",
      field: "district",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Tarih",
      field: "date",
      flex: 1,
      cellRenderer:(params) => {
        const dateString = params.value;
        const date = new Date(dateString);
        const splitDate = date.substring(date.indexOf("-") + 1);
        const day = splitDate.getDate();
        const month = splitDate.getMonth() + 1;
        const year = splitDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      },
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Aktif SD",
      field: "active",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Endüktif SD",
      field: "inductive",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Kapasitif SD",
      field: "capacitive",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Aktif Tüketim",
      field: "active_cons",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Endüktif Tüketim",
      field: "inductive_cons",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Kapasitif Tüketim",
      field: "capacitive_cons",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    
  ];

  return (
    <DataGrid
    loading={isLoading || !data}
    getRowId={(row) => row.date}
    rows={(data && data) || []}
    columns={columns}
    rowCount={(data && data.length) || 0}
    rowsPerPageOptions={[20, 50, 100]}
    pagination
    page={page}
    pageSize={pageSize}
    onPageChange={(newPage) => setPage(newPage)}
    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
    components={{ Toolbar: DataGridCustomToolbar }}
  />
  );
};

export default HourlyData;
