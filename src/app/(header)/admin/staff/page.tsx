'use client';
import { Grid, Avatar, Container, Typography, Chip } from '@mui/material';
import styles from './page.module.css';
import LabelAvatar from '../../components/labelAvatar';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  gridClasses,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridCsvExportOptions,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

//Gonna need hella work
// https://mui.com/x/react-data-grid/editing/

export default function Home() {
  const theme = useTheme();
  const data: GridRowsProp = [
    {
      id: 1,
      first: 'SUS',
      last: 'MC.sus',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'success',
    },
    {
      id: 2,
      first: 'Sam',
      last: 'is Awesome',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'success',
    },
    {
      id: 4,
      first: 'Can',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'warning',
    },
    {
      id: 5,
      first: 'Ran',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'success',
    },
    {
      id: 6,
      first: 'Man',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'success',
    },
    {
      id: 7,
      first: 'Flan',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'success',
    },
    {
      id: 8,
      first: 'Zam',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'error',
    },
    {
      id: 9,
      first: 'Bam',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'warning',
    },
    {
      id: 10,
      first: 'Lam',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'success',
    },
    {
      id: 11,
      first: "Ma'am",
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'error',
    },
    {
      id: 12,
      first: 'Tam',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'success',
    },
    {
      id: 13,
      first: 'Pam',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'success',
    },
    {
      id: 14,
      first: 'DAMN',
      last: 'is Amazing',
      avatar: 'https://i.pinimg.com/originals/42/16/45/4216450c3b5c529af3b41411179378db.png',
      status: 'error',
    },
  ];

  const labels: GridColDef[] = [
    {
      field: 'user',
      headerName: 'User',
      headerClassName: styles.header,
      editable: true,
      width: 100,
      renderCell: (params) => {
        return <Avatar src={params.row.avatar} />;
      },
    },
    { field: 'first', headerName: 'First', width: 100, editable: true },
    { field: 'last', headerName: 'Last', width: 150, editable: true },
    {
      field: 'onboarding',
      headerName: 'Random Label ',
      editable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Chip color={params.row.status} label={params.row.status} variant="outlined"></Chip>
          </>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            fileName: 'StaffData',
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <LabelAvatar title="Staff" />

      <Grid container sx={{ marginTop: '2%;', height: '85vh' }}>
        <DataGrid
          rows={data}
          columns={labels}
          slots={{ toolbar: CustomToolbar }}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          pageSizeOptions={[10, 15, 25, 50]}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: grey[900],
            },
          }}
        />
      </Grid>
    </Container>
  );
}
