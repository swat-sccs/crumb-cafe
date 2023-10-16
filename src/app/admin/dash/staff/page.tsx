'use client';
import { Grid, Avatar, Container, Typography, Chip } from '@mui/material';
import styles from './page.module.css';
import LabelAvatar from '../../../components/labelAvatar';
import { DataGrid, GridRowsProp, GridColDef, gridClasses } from '@mui/x-data-grid';

import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

//Gonna need hella work
// https://mui.com/x/react-data-grid/editing/

export default function Home() {
  const theme = useTheme();
  const data: GridRowsProp = [
    {
      id: 1,
      first: 'Dan',
      last: 'World',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'success',
    },
    {
      id: 2,
      first: 'Sam',
      last: 'is Awesome',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'success',
    },
    {
      id: 4,
      first: 'Can',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'warning',
    },
    {
      id: 5,
      first: 'Ran',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'success',
    },
    {
      id: 6,
      first: 'Man',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'success',
    },
    {
      id: 7,
      first: 'Flan',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'success',
    },
    {
      id: 8,
      first: 'Zam',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'error',
    },
    {
      id: 9,
      first: 'Bam',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'warning',
    },
    {
      id: 10,
      first: 'Lam',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'success',
    },
    {
      id: 11,
      first: "Ma'am",
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'error',
    },
    {
      id: 12,
      first: 'Tam',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'success',
    },
    {
      id: 13,
      first: 'Pam',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
      status: 'success',
    },
    {
      id: 14,
      first: 'DAMN',
      last: 'is Amazing',
      avatar:
        'https://img2.cgtrader.com/items/2043784/1926cfc19b/large/star-wars-phase-1-clone-trooper-helmet-3d-model-1926cfc19b.jpg',
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
        return (
          <>
            <Avatar src={params.row.avatar} />
          </>
        );
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

  return (
    <Container className={styles.topBar} sx={{ backgroundColor: '', width: '100vw' }}>
      <LabelAvatar title="Staff" />

      <Grid container sx={{ marginTop: '2%;', height: '80%' }}>
        <DataGrid
          rows={data}
          columns={labels}
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
