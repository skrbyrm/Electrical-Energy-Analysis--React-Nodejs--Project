import React, { useState, useEffect }  from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
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
  TableRow
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import StatBox from "components/StatBox";
import usePagination from "components/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { getMe } from "../../state/index";
import * as XLSX from 'xlsx';
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
      cellRenderer: (params) => {
        const date = new Date(params);
        const month = date.getMonth() + 1; // returns the month (0-11), so we add 1 to get the actual month number
        const day = date.getDate(); // returns the day of the month (1-31)
        const year = date.getFullYear();
        const hour = date.getHours(); // returns the hour (0-23)
        const formattedDate = `${day}/${month}/${year}-${hour}:00`;
      
        // Compare the date to the current date
        if (date < getTwoDaysAgo()) {
          return (
            <div style={{ backgroundColor: 'red', borderRadius: '5px', padding: '10px' }}>
              {formattedDate}
            </div>
          );
        } else {
          return formattedDate;
        }
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
          return (
            <div style={{ backgroundColor: 'red', borderRadius: '5px', padding: '10px' }}>
              Cezada!
            </div>
          );
        } else if (!params) {
          return (
            <div style={{ backgroundColor: '#32CD32', borderRadius: '5px', padding: '10px' }}>
              Yok
            </div>
          );
        }
      },
      minWidth: isMobile ? "50px" : "70px",
    }
    
  ];

  
  const count = data ? data.filter((row) => row.penalized === true).length : 0;

  const maxDate = data.reduce((max, row) => {
    const date = new Date(row.date);
    return (date > max) ? date : max;
  }, new Date(0));

 const month = maxDate.getMonth() + 1; // returns the month (0-11), so we add 1 to get the actual month number
 const day = maxDate.getDate(); // returns the day of the month (1-31)
 const year = maxDate.getFullYear();
 const hour = maxDate.getHours(); // returns the hour (0-23)
 const newDate = `${day}-${month}-${year}-${hour}:00`;

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

  
  const downloadExcel=()=>{
    const newData=data.map(row=>{
      delete row.tableData
      return row
    })
    const workSheet=XLSX.utils.json_to_sheet(newData)
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"tüketimler")
    //Binary string
    XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
    //Download
    XLSX.writeFile(workBook,"Özet.xlsx")
  }

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header subtitle="Detay sayfasına gitmek için ilgili sayacın SSNO'ya tıklayın! " />
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

        <StatBox
          title="Son Güncellenme"
          value={newDate} 
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
          <div style={{ maxHeight: '1000px', margin: '20px 0' }}>
            <TableContainer component={Table}>
              <Button onClick={downloadExcel}                               
              style={{
                color: theme.palette.secondary[200]
              }}>Excel olarak indir!</Button>
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
                        <TableCell key={column.field} style={{ backgroundColor: 'transparent', borderRadius: '80%' }}>
                        <div>
                          {column.field === 'ssno' ?
                            <Button onClick={() => handleClick(row.ssno)}
                              style={{
                                backgroundColor: theme.palette.secondary[200],
                                color: theme.palette.background.alt
                              }}
                            >{row[column.field]}</Button>
                            : column.cellRenderer ? column.cellRenderer(row[column.field]) : row[column.field]}
                            </div>
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
