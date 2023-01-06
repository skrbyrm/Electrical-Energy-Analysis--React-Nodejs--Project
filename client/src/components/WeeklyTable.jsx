import React, { useState, useEffect }  from "react";
import {
  useTheme,
  useMediaQuery,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../state/index";
import axios from "axios";
import { finalClick} from "scenes/dashboard";
import config from "config";

const WeeklyTable = () => {
  const url = `${config.urls.BACKEND_SERVER_WEEKLY}${finalClick}`;

  const theme = useTheme();

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

  const [data, setdetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getdetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setdetail(response.data);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdetail();
  }, []);

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
        const date = new Date(params);
        const month = date.getMonth() + 1; // returns the month (0-11), so we add 1 to get the actual month number
        const day = date.getDate(); // returns the day of the month (1-31)
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      },
      minWidth: isMobile ? "50px" : "70px"
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
    {
      headerName: "Endüktif Oran",
      field: "inductive_ratio",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Kapasitif Oran",
      field: "capacitive_ratio",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Ceza",
      field: "penalized",
      flex: 1, 
      cellRenderer: (params) => {
        if (params) {
          return 'Cezada!';
        } else if (!params) {
          return 'Yok';
        }
        return '';
      },
      cellStyle: (params) => {
        if (params.value) {
          return { backgroundColor: 'red' };
        }
        return null;
      },
      minWidth: isMobile ? "50px" : "70px",
    }
    
    
    ];


    return (
      <TableContainer component={Table}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.date}>
                {columns.map(column => (
                  <TableCell key={column.field} style={{ backgroundColor: column.field === 'penalized' ? row[column.field] ? 'rgb(205,92,92)' : 'rgb(154,205,50)' : null, borderRadius: '80%' }}>
                  {column.cellRenderer ? column.cellRenderer(row[column.field]) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  

export default WeeklyTable;
