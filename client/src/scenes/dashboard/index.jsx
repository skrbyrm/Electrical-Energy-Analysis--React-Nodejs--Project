import React, { useState, useEffect }  from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import Papa from "papaparse";
import { DownloadOutlined } from "@mui/icons-material";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, TablePagination, Paper
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import StatBox from "components/StatBox";
import usePagination from "components/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { getMe } from "../../state/index";
import config from "config";
import axios from "axios";

let finalClick = {};
let rowData = [];


const Dashboard = () => {
  const theme = useTheme();

  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
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

  useEffect(() => {
    getdetail();
  }, []);

  const getdetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(config.urls.BACKEND_SERVER_SUMMARY);
      setdetail(response.data);

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

  
  const count = data ? data.filter((row) => row.penalized === true).length : 0;

  function getTwoDaysAgo() {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    return twoDaysAgo ;
  }

  const countDate = data ? data.filter((row) => {
    const date = new Date(row.date);
    return ( getTwoDaysAgo().getTime() > date.getTime());
  }).length : 0;

  const handleClick = (ssno) => {
    rowData = data.find(row => row.ssno === ssno);
    finalClick = rowData.ssno;
    console.log(finalClick);
    navigate("/detail");

  }

  let [page, setPage] = useState(1);
  const PER_PAGE = 15;

  const count_page = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Anasayfa" subtitle="Detay sayfasına gitmk için ilgili sayacın SSNO'suna tıklayın! " />
        <Box>
          <Button
            onClick={() => {
              const csv = Papa.unparse(data);
              const link = document.createElement("a");
              link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
              link.download = "data.csv";
              document.body.appendChild(link);
              link.click();
            }}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
  
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Toplam Sayaç Sayısı"
          value={data && data.length}
          description="*****"
          icon={
            <FlashOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Cezada olan Sayaç Sayısı"
          value={data && count}
          description="*****"
          icon={
            <FlashOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Bilgi Alınamayan Sayaç Sayısı"
          value={data && countDate}
          description="*****"
          icon={
            <FlashOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 8"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              fontSize: isMobile ? "12px" : "inherit",
              padding: isMobile ? "8px" : "inherit",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <div style={{ overflow: 'auto', maxHeight: '1000px' }}>
            <TableContainer component={Table}>
            <Pagination
              count={count_page}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
              <Table>
                <TableHead style={{ backgroundColor: `${theme.palette.secondary[700]}`, overflow: 'auto', position: 'sticky', top: '0' }}>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.field}>{column.headerName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_DATA.currentData().map(row => (
                    <TableRow key={row.ssno}>
                      {columns.map(column => (
                        <TableCell key={column.field} style={{ backgroundColor: column.field === 'penalized' ? row[column.field] ? 'rgb(205,92,92)' : 'rgb(154,205,50)' : null, borderRadius: '80%' }}>
                          {column.field === 'ssno' ?
                            <button onClick={() => handleClick(row.ssno)}
                              style={{
                                backgroundColor: "#4CAF50",
                                color: theme.palette.background.alt
                              }}
                            >{row[column.field]}</button>
                            : column.cellRenderer ? column.cellRenderer(row[column.field]) : row[column.field]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export { Dashboard, finalClick, rowData};

// /${finalClickInfo.value}
