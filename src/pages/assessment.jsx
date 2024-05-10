import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Typography, Grid, Paper, Stack } from '@mui/material';


import { useParams } from 'react-router-dom';
import { useGetRoomDetail } from 'src/sections/rooms/view/useRooms';

const sampleQuestions = [
    {
        question: 'What is your name?',
        options: ['Alice', 'Bob', 'Charlie', 'David'],
    },
    {
        question: 'Describe your favorite programming language.',
        options: ['Python', 'JavaScript', 'Java', 'C++'],
    },
    {
        question: 'How many hours do you spend on coding per week?',
        options: ['0-10', '10-20', '20-30', '30+'],
    },
];

const AssessmentPage = () => {
    const { slug } = useParams();
    const { room, isLoading } = useGetRoomDetail(slug);

    const questions = useMemo(
        () => (room?.questions?.length ? room.questions : sampleQuestions),
        [room]
    );

    const [assessmentData, setAssessmentData] = useState({
        questions: [],
        answers: {},
    });

    useEffect(() => {
        const initialAnswers = questions.reduce((acc, _, index) => {
            acc[`answer${index + 1}`] = '';
            return acc;
        }, {});

        setAssessmentData({
            questions,
            answers: initialAnswers,
        });
    }, [questions]);

    const handleSelectAnswer = (questionIndex, selectedOption) => {
        setAssessmentData((prev) => ({
            ...prev,
            answers: { ...prev.answers, [`answer${questionIndex + 1}`]: selectedOption },
        }));
    };

    const handleSubmit = () => {
        console.log(`Submitted answers for ${room?.name || 'Sample Room'}:`, assessmentData.answers);
        alert('Assessment submitted!');
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    const optionButtonStyle = {
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius: 2,
        minWidth: '120px',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
        },
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, mx: 'auto', maxWidth: { xs: '100%', md: '80%', lg: '60%' }, mt: 8 }}>
            {/* Header with icons and welcoming message */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    paddingBottom: 4,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}
                    >
                        Welcome to the Assessment: {room?.name || 'Sample Room'}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                    <Typography
                        variant="subtitle1"
                        sx={{ textAlign: 'center', color: 'text.secondary' }}
                    >
                        Best of luck! Read each question carefully and have fun!
                    </Typography>
                </Box>
            </Box>

            {/* Question and Options */}
            <Grid container direction="column" spacing={9}>
                {assessmentData.questions.map((questionObj, index) => (
                    <Grid item key={index}>
                        <Typography variant="h6">{questionObj.question}</Typography>
                        <Stack spacing={2} direction="row" sx={{ flexWrap: 'wrap', gap: 2, mt: 1 }}>
                            {questionObj.options.map((option, optIndex) => {
                                const isSelected = assessmentData.answers[`answer${index + 1}`] === option;

                                return (
                                    <Paper
                                        key={optIndex}
                                        onClick={() => handleSelectAnswer(index, option)}
                                        elevation={isSelected ? 12 : 4}
                                        sx={{
                                            ...optionButtonStyle,
                                            bgcolor: isSelected ? 'rgba(0, 123, 255, 0.2)' : 'background.paper',
                                            color: isSelected ? 'primary.contrastText' : 'text.primary',
                                            backdropFilter: isSelected ? 'blur(10px)' : 'none',
                                            border: isSelected ? '2px solid rgba(0, 123, 255, 0.3)' : 'none',
                                        }}
                                    >
                                        <Typography>{`${String.fromCharCode(65 + optIndex)}. ${option}`}</Typography>
                                    </Paper>
                                );
                            })}
                        </Stack>
                    </Grid>
                ))}
            </Grid>

            {/* Submit Button */}
            <Box mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ px: { xs: 2, md: 4 }, py: { xs: 1, md: 2 } }}
                >
                    Submit Assessment
                </Button>
            </Box>
        </Box>
    );
};

export default AssessmentPage;
