import * as React from 'react';
import { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createBudgetLine } from '../actions/budgetline'
import { getProgrammes } from '../actions/programme'

const theme = createTheme();

export default function BudgetLineCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { programmes } = useSelector(state => state.programme);
  const programmeOptions = programmes?.map((option) => ({
    value: option._id,
    label: option.name
  }))
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const programme = data.get('programme');
    const name = data.get('name');
    const currency = data.get('currency');
    const initialAmount = data.get('initialAmount');
    dispatch(createBudgetLine({ programme, name, currency, initialAmount }, navigate));
  };

  useEffect(() => {
    dispatch(getProgrammes());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/dashboard');
  //   }
  // }, [isAuthenticated, navigate])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Create BudgetLine
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="programme"
                    name="programme"
                    select
                    label="Programme"
                  >
                    {programmeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="currency"
                    required
                    fullWidth
                    id="currency"
                    label="Currency"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="initialAmount"
                    required
                    fullWidth
                    id="initialAmount"
                    label="Initial Amount"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}