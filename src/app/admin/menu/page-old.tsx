'use client';
import { Grid, Checkbox, Container, Typography, Chip } from '@mui/material';
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
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridEventListener,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import useSWR from 'swr';

import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

//Gonna need hella work
// https://mui.com/x/react-data-grid/editing/

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/dishes', fetcher);
  const theme = useTheme();
  console.log(data);

  const columns: GridColDef[] = [
    {
      field: 'friendlyName',
      headerName: 'Name',
      headerClassName: styles.header,
      editable: true,
      width: 150,
    },
    {
      field: 'categories',
      headerName: 'Categories',
      editable: true,
      width: 150,
    },
    {
      field: 'basePrice',
      headerName: 'Base Price',
      editable: true,
      width: 100,
    },
    {
      field: 'options',
      valueGetter: ({ row }) => {
        const specific = [];

        for (const key in row.options) {
          for (const suboption of row.options[key]['options']) {
            console.log(suboption.friendlyName);
            specific.push(suboption.friendlyName);
          }

          return specific;
        }
      },
      renderCell: (row: any) => {
        const specific = [];
        const chips = [];

        for (const key in row.row.options) {
          for (const suboption of row.row.options[key]['options']) {
            console.log(suboption.friendlyName);
            specific.push(suboption.friendlyName);

            chips.push(
              <>
                <Chip label={suboption.friendlyName} />
              </>,
            );
          }
        }
        console.log(chips);
        return chips;
      },
      headerName: 'Options',
      editable: false,
      width: 500,
    },
    {
      field: 'isArchived',
      headerName: 'Archived?',
      editable: true,
      width: 100,
      renderCell: (params: any) => {
        return <Checkbox checked={params.row.isArchived} />;
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
            fileName: 'CrumbCafeMenu',
          }}
        />
      </GridToolbarContainer>
    );
  }
  const saveData = (props: any) => {
    let changedField = props.field;
    console.log(changedField);
    console.log(props.row[changedField]);
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const RenderList = () => {
    if (isLoading == false) {
      return (
        <>
          <Grid container sx={{ marginTop: '2%;', height: '85vh' }}>
            <DataGrid
              editMode="row"
              onRowEditStop={handleRowEditStop}
              getRowId={(row) => row._id}
              rows={data.dishes}
              columns={columns}
              disableRowSelectionOnClick={true}
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
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Container className={styles.topBar} sx={{ backgroundColor: '', width: '100vw' }}>
      <LabelAvatar title="Menu" />
      <RenderList />
    </Container>
  );
}
