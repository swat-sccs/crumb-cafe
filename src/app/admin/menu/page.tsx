'use client';
import {
  Grid,
  Avatar,
  Container,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Button,
  Checkbox,
  ListItemText,
  ListItemIcon,
  FormControlLabel,
  List,
  ListItem,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { grey, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/dishes', fetcher);
  const theme = useTheme();
  console.log(data);

  /*
  {
    "_id": "pancakes",
    "friendlyName": "Pancakes",
    "basePrice": 1,
    "tags": [
        "food"
    ],
    "categories": [
        "breakfast"
    ],
    "isOrderable": true,
    "isArchived": false,
    "options": [
        {
            "_id": "toppings",
            "friendlyName": "toppings",
            "allowMultipleSelections": true,
            "allowNoSelection": true,
            "options": [
                {
                    "_id": "syrup",
                    "friendlyName": "maple syrup",
                    "extraPrice": 0,
                    "allowQuantity": false,
                    "dependencies": []
                },
                {
                    "_id": "berries",
                    "friendlyName": "berries",
                    "extraPrice": 1,
                    "allowQuantity": false,
                    "dependencies": []
                }
            ],
            "dependencies": []
        }
    ],
    "dependencies": [],
    "__v": 0
}

  */

  const RenderCards = () => {
    if (isLoading == false) {
      return data.dishes.map((option: any) => (
        <>
          <Grid item xs={3}>
            <Card sx={{ minWidth: '50%', minHeight: '20%' }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={option.friendlyName}
                subheader={'$' + Number.parseFloat(option.basePrice).toFixed(2)}
              />
              <Divider variant="middle" />
              <CardContent>
                <List>
                  <OptionsComponent options={option.options} sx={{ ml: '5%' }} />
                </List>

                <Divider />
                <Typography variant="body1" color="text.secondary" sx={{ mt: '5%' }}>
                  <FormControlLabel
                    control={<Checkbox checked={option.isOrderable}></Checkbox>}
                    label="Orderable"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={option.isArchived}></Checkbox>}
                    label="Archived"
                  />
                </Typography>

                <Typography variant="body2" color="text.secondary"></Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      ));
    } else {
      return <div>Loading...</div>;
    }
  };

  const OptionsComponent = (props: any) => {
    const options = [];
    const specific = [];

    for (const optionType of props.options) {
      for (const subOption of optionType.options) {
        specific.push(
          <>
            <ListItem>
              <ListItemIcon>
                <Avatar>{subOption.friendlyName.charAt(0)}</Avatar>
              </ListItemIcon>
              <ListItemText
                primary={subOption.friendlyName}
                secondary={'$' + Number.parseFloat(subOption.extraPrice).toFixed(2)}
              />
            </ListItem>
          </>,
        );
      }
    }

    return <>{specific}</>;
  };

  return (
    <Container className={styles.topBar} sx={{ backgroundColor: '', width: '100vw' }}>
      <LabelAvatar title="Menu" />

      <Grid
        container
        direction="row"
        sx={{ height: '85vh', mt: '2%', overflowY: 'scroll' }}
        spacing={2}
      >
        <RenderCards></RenderCards>
      </Grid>
    </Container>
  );
}
