import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const DialogBox = (hotelId) => {
  const [openDialog, setOpenDialog] = useState(false);

  // Set the state to true when you want to open the dialog
  const triggerDialog = () => {
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      {/* Button or any other element that triggers the dialog */}
      <Button onClick={triggerDialog}>Open Dialog</Button>

      {/* The Dialog component */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the content of the dialog. You can customize it as needed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
