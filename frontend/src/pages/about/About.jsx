import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { FastForward, AccessTime, SupportAgent } from '@mui/icons-material';
import './about.scss'; // Import your SCSS file
import img1 from '../../Images/shingrilla.jpg'// Image for the hotel in Skardu
import Navbar from "../../components/navbar/Navbar";

function AboutPage() {
    return (
        <div>
            <Navbar />
            <Container className="container">
                <div className='class1'>
                    <CardMedia
                        component="img"
                        alt="Hotel Shangrila, Skardu"
                        height="700"
                        image={img1} // Image for Hotel Shangrila in Skardu
                    />
                </div>
                <div className='class2'> 
                    <Typography variant="h3" gutterBottom>
                        About Hotel Shangrila, Skardu
                    </Typography>
                    <hr className="hr" />
                    <Typography variant="body1" className="body1" style={{ color: 'white' }}>
    Welcome to our state-of-the-art Hotel Shangrila in Skardu. We're dedicated to providing you with a luxurious stay and exceptional service.
</Typography>


                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} className="grid-item">
                            <Card className="card">
                                <CardHeader
                                    title="Luxurious Experience"
                                    titleTypographyProps={{ variant: 'h5' }}
                                    avatar={<FastForward fontSize="large" className="icon" />}
                                />
                                <CardContent className="card-content">
                                    Experience a luxurious stay with our world-class amenities and services.
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} className="grid-item">
                            <Card className="card">
                                <CardHeader
                                    title="Scenic Views"
                                    titleTypographyProps={{ variant: 'h5' }}
                                    avatar={<AccessTime fontSize="large" className="icon" />}
                                />
                                <CardContent className="card-content">
                                    Enjoy breathtaking views of Skardu from our hotel's prime location.
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} className="grid-item">
                            <Card className="card">
                                <CardHeader
                                    title="Exceptional Service"
                                    titleTypographyProps={{ variant: 'h5' }}
                                    avatar={<SupportAgent fontSize="large" className="icon" />}
                                />
                                <CardContent className="card-content">
                                    Our dedicated team is committed to providing exceptional service to make your stay memorable.
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default AboutPage;
