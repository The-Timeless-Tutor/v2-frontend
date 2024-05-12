import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
  Button
} from '@mui/material';

const CreateSessionForm = ({ open, handleToggle }) => {
  const [sessionDetails, setSessionDetails] = useState({
    title: '',
    description: '',
    start_time: '',
    password: '',
    private: false
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSessionDetails({ ...sessionDetails, [name]: value });
  };

  const handleSwitchChange = (event) => {
    setSessionDetails({ ...sessionDetails, private: event.target.checked });
  };

  const handleSubmit = () => {
    console.log('Submitting:', sessionDetails);
    handleToggle(); // Close modal after submit
  };

  return (
    <Dialog open={open} onClose={handleToggle}>
      <DialogTitle>Create a New Session</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Meeting Title"
          type="text"
          fullWidth
          variant="standard"
          value={sessionDetails.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={2}
          variant="standard"
          value={sessionDetails.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="start_time"
          label="Start Time"
          type="datetime-local"
          fullWidth
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={sessionDetails.start_time}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password (Optional)"
          type="text"
          fullWidth
          variant="standard"
          value={sessionDetails.password}
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Switch checked={sessionDetails.private} onChange={handleSwitchChange} />}
          label="Private Session"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSessionForm;
