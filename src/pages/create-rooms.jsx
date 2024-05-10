import React, { useState } from 'react';
import {
    TextField,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Select,
    MenuItem,
    FormControl,
    Container,
    Button,
    Chip,
    InputLabel,
    OutlinedInput,
    Box,
    Typography,
    Input
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import roomIcon from '@iconify/icons-mdi/home-group';
import categoryIcon from '@iconify/icons-mdi/tag-multiple';
import lockIcon from '@iconify/icons-mdi/lock';
import lockOpenIcon from '@iconify/icons-mdi/lock-open';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import arrowBackIcon from '@iconify/icons-mdi/arrow-left'
import { useGetCategories, useCreateRoom } from 'src/sections/rooms/view/useRooms';


const theme = createTheme({
    palette: {
        primary: {
            main: '#F99E1F', // Set the primary color for other buttons
        },
        createRoom: {
            main: '#ffba5abd', // Set the primary color for "Create Room" button
        },
    },
});

const CreateRoom = () => {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [coverImage, setCoverImage] = useState(null);

    const { createNewRoom } = useCreateRoom();
    const { categories, isLoading } = useGetCategories();


    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setCoverImage(file);
        } else {
            console.error('Image exceeds the size limit of 5MB.');
        }
    };





    const handleSubmit = (event) => {
        event.preventDefault();
        if (!termsChecked || groupName.trim() === '' || selectedCategories.length === 0) {
            console.error('All required fields must be completed.');
            return;
        }

        // Create the data object to pass to the API
        const roomData = {
            name: groupName,
            description,
            private: isPrivate,
            category: { id: selectedCategories[0] }, // Simplified for demo purposes
            coverImage,
        };

        createNewRoom(roomData);
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategories(Array.isArray(value) ? value : value.split(','));
    };

    const handleChipDelete = (chipToDelete) => {
        setSelectedCategories((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const MenuProps = {
        PaperProps: {
            style: { maxHeight: 240 },
        },
    };

    const glassStyle = {
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '2rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        width: '100%',
        maxWidth: '800px',
        margin: 'auto',
    };

    const dynamicGridItem = {
        width: '100%',
        maxWidth: '500px',
        margin: 'auto',
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ py: 3 }}>
                {/* Add back button */}

                <Box sx={glassStyle}>
                    {/* Use Iconify arrow icon and label */}
                    <Button
                        component={Link}
                        to="/rooms"
                        variant="outlined"
                        color="primary"
                        startIcon={<Icon icon={arrowBackIcon} width={24} height={24} />} // Add Iconify arrow icon here
                        sx={{ mb: 2, textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
                    >
                        Return to Rooms
                    </Button>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} direction="column" alignItems="center">
                            <Grid item style={dynamicGridItem}>
                                <Typography variant="h5" gutterBottom>
                                    <Icon icon={roomIcon} fontSize={24} style={{ marginRight: '0.5rem' }} />
                                    Create a New Room
                                </Typography>
                            </Grid>

                            <Grid item style={dynamicGridItem}>
                                <Box
                                    sx={{
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                        backdropFilter: 'blur(5px)',
                                        WebkitBackdropFilter: 'blur(5px)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 'bold', mb: 2 }}
                                        align="center"
                                    >
                                        Upload Cover Image (max 5MB)
                                    </Typography>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="cover-image"
                                        type="file"
                                        onChange={handleCoverImageChange}
                                    />
                                    <label htmlFor="cover-image">
                                        <Button variant="contained" color="createRoom" component="span" sx={{ mb: 1 }}>
                                            Choose Cover
                                        </Button>
                                    </label>
                                    {coverImage ? (
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {coverImage.name}
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            No file chosen
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>




                            <Grid item style={dynamicGridItem}>
                                <TextField
                                    label="Group Name"
                                    placeholder="Enter an exciting group name"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item style={dynamicGridItem}>
                                <TextField
                                    label="Description"
                                    placeholder="Describe your room in an engaging way"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item style={dynamicGridItem}>
                                <FormControl fullWidth margin="normal" variant="outlined">
                                    <InputLabel id="select-categories-label">
                                        <Icon icon={categoryIcon} fontSize={18} style={{ marginRight: '0.5rem' }} />
                                        Select Categories
                                    </InputLabel>
                                    <Select
                                        labelId="select-categories-label"
                                        multiple
                                        value={selectedCategories}
                                        onChange={handleCategoryChange}
                                        input={<OutlinedInput label="Select Categories" />}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => selected.map((id) => {
                                            // Find the category name using the selected id
                                            const category = categories.find((c) => c.id === id);
                                            return category ? category.name : '';
                                        }).join(', ')}
                                    >
                                        {!isLoading && categories
                                            ? categories.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))
                                            : null}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item style={dynamicGridItem}>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selectedCategories.map((categoryId) => {
                                        // Find the category object by its ID
                                        const category = categories.find((c) => c.id === categoryId);

                                        // Return the Chip component with the corresponding name, or an empty string if not found
                                        return (
                                            <Chip
                                                key={categoryId}
                                                label={category ? category.name : ''}
                                                sx={{ margin: 0.5, borderRadius: 1 }}
                                                onDelete={() => handleChipDelete(categoryId)}
                                            />
                                        );
                                    })}
                                </Box>
                            </Grid>

                            <Grid item style={dynamicGridItem}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isPrivate}
                                                onChange={() => setIsPrivate(!isPrivate)}
                                                icon={<Icon icon={lockOpenIcon} fontSize={24} />}
                                                checkedIcon={<Icon icon={lockIcon} fontSize={24} style={{ color: 'primary.main' }} />}
                                            />
                                        }
                                        label={isPrivate ? 'This room is private now.' : 'Make this room private'}
                                    />
                                </FormGroup>
                            </Grid>

                            <Grid item style={dynamicGridItem}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />}
                                        label="I commit to upholding the values and respect of this platform.."
                                    />
                                </FormGroup>
                            </Grid>

                            <Grid item style={dynamicGridItem}>
                                <Button type="submit" variant="contained" color="createRoom" fullWidth>
                                    Create Room
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default CreateRoom;