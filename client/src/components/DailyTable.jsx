import React, { useState, useEffect }  from "react";
import {
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
import axios from "axios";
import { finalClick } from "scenes/dashboard";
import config from "config";
import * as XLSX from "xlsx";

const DailyTable = () => {
  const url = `${config.urls.BACKEND_SERVER_DAILY}${finalClick}`;

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        const hour = date.getHours(); // returns the hour (0-23)
        const formattedDate = `${day}/${month}/${year}-${hour}:00`;
        return formattedDate;
      },
      minWidth: isMobile ? "50px" : "70px"
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
    XLSX.writeFile(workBook,"GünlükTüketim.xlsx")
  }
  
  return (
    <TableContainer component={Table}>
      <Button onClick={downloadExcel}>Excel olarak indir!</Button>
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

export { DailyTable };
