import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useMemo } from 'react';
import { useValue } from '../../../context/ContextProvider';
import { getReservations } from '../../../actions/reservation';

const Reservations = ({ setSelectedLink, link }) => {
  const { state: { reservations }, dispatch } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (reservations.length === 0) getReservations(dispatch);
  }, []);

  // Ensure each row has a unique id
  const rowsWithIds = reservations.map((reservation, index) => ({
    ...reservation,
    id: index + 1, // Generate unique ID for each row
  }));

  const columns = useMemo(() => [
    { field: 'resId', headerName: 'Res Id', width: 250 },
    { field: 'rName', headerName: 'Buyer Name', width: 100 },
    { field: 'phone', headerName: 'Buyer Phone', width: 150 },
    //{ field: 'rPhoto', headerName: 'Photo', width: 60 },
    { field: 'gearId', headerName: 'Gear Id', width: 250 },
    { field: 'startDate', headerName: 'Start Date', width: 200 },
    { field: 'endDate', headerName: 'End Date', width: 200 },
    { field: 'totalPrice', headerName: 'Total Price', width: 110 },
    { field: 'purpose', headerName: 'Purpose', width: 200 },
    { field: 'addinfo', headerName: 'Add Info', width: 200 },
  ], []);

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textAlign: 'center',
          mt: 3,
          mb: 3,
        }}
      >
        Manage Reservations
      </Typography>
      {reservations ? (
        <DataGrid
          columns={columns}
          rows={rowsWithIds} // Use rows with unique ids
        />
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Box>
  );
};

export default Reservations;
