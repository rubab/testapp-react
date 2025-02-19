import React, { useState, useEffect } from "react";
import { Container, AppBar, Toolbar, Typography, Paper } from "@mui/material";
import { fetchPlots } from "./api";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FileUploadButton from "./FileButton";

const App = () => {
  const [plots, setPlots] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const getPlots = async (page, pageSize) => {
    const data = await fetchPlots(page, pageSize);
    setPlots(data);
  };

  useEffect(() => {
    getPlots(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'batch', headerName: 'Batch' },
    { field: 'city', headerName: 'City' },
    {
      field: 'society',
      headerName: 'Society',
      type: 'number',
    },
    {
      field: 'block',
      headerName: 'Block',
      type: 'text'
    },
    {
      field: 'marla',
      headerName: 'Marla',
      type: 'number',
    },
    ,
    {
      field: 'plot_size',
      headerName: 'Plot Size',
      type: 'number',
    },
    ,
    {
      field: 'price',
      headerName: 'price',
      type: 'number',
    },
    ,
    {
      field: 'status',
      headerName: 'Status',
      type: 'text'
    },
  ];

  return (
    <Container maxWidth="md">
        <Toolbar>
          <img
            src="/logo.png" // Path to the image in the public folder
            alt="Villas.pk"
            style={{ width: '30%' }}
          />
        </Toolbar>
      <img
        src="/banner-image.png" // Path to the image in the public folder
        alt="Banner"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Paper elevation={0}>
        <FileUploadButton onUploadSuccess={getPlots} />
        <Typography variant="h4"></Typography>
        <Typography variant="body1"></Typography>
        <Paper>
          <DataGrid
            rows={plots.data}
            columns={columns}
            paginationMode="server"
            rowCount={plots?.total || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </Paper>
    </Container>
  );
};

export default App;
