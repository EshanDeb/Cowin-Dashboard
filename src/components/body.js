import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import CreditCardSharpIcon from '@material-ui/icons/CreditCardSharp';

const useStyles = makeStyles((theme) => ({
    root1: {
        flexGrow: 1,
        marginTop: '3%',
        maxWidth: "80%",
        marginLeft: "10%",

    },
    root2: {
        alignSelf: 'center',
        flexGrow: 1,
        marginTop: '3%',
        maxWidth: "100%"
    },
    paper: {
        background: '#11b5e4',
        padding: theme.spacing(2),
        margin: 'auto',
        textAlign: "center"
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: '120px',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    heading: {
        minWidth: '30%',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: 'start'
    },
    subheading: {
        minWidth: '30%',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        marginLeft: '5%',
        textAlign: 'start'
    },
    card_title: {
        fontSize: theme.typography.pxToRem(12.5),
    },
    card: {
        backgroundColor: '#197278',
        minWidth: '130px'
    },
    accordian: {
        backgroundColor: '#90e0ef',
    }
}));

const Body = () => {
    const classes = useStyles();
    const [states, setStates] = useState([]);
    const [district, setDistrict] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        document.body.style.backgroundColor = "#ade8f4"
        const fetchData = async () => {
            await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
                .then(res => {
                    setStates(res.data.states);
                })
        };
        fetchData();
    }, []);

    const handleChange = async (e) => {
        console.log(e.target.value);
        await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${e.target.value}`)
            .then(res => {
                setDistrict(res.data.districts);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const getData = async (e) => {
        console.log(e.target.value);

        let today = new Date().toISOString().slice(0, 10).split('-');

        await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${e.target.value}&date=${today[2]}-${today[1]}-${today[0]}`)
            .then(res => {
                setData(res.data.centers);
            })
            .catch(e => {
                console.log(e);
            })
    }


    return (
        <div className={classes.root}>
            <div className={classes.root1}>
                <Paper className={classes.paper} variant="outlined" square>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography className={classes.title} variant="h5" noWrap >
                                Select Your State and District
                        </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="state-selector">Select State</InputLabel>
                                <Select
                                    labelId="select-state"
                                    id="state-selector"
                                    onChange={handleChange}
                                    defaultValue=""
                                >
                                    {
                                        states.map(state => (
                                            <MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="district-name-selector">Select District</InputLabel>
                                <Select
                                    labelId="select-district-name"
                                    id="district-name-selector"
                                    defaultValue=""
                                    onChange={getData}
                                >
                                    {
                                        district.map(d => (
                                            <MenuItem key={d.district_id} value={d.district_id}>{d.district_name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
            <div className={classes.root2}>
                <Paper className={classes.paper} variant="outlined" square>
                    <ul>
                        <Accordion expanded='false' style={{ backgroundColor: '#ade8f4', color: 'black' }}>
                            <AccordionSummary
                                expandIcon={<CreditCardSharpIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                justify='space-between'
                            >
                                <Typography className={classes.heading}><i>Center Name</i></Typography>
                                <Typography className={classes.subheading}>Center address</Typography>
                                <Typography className={classes.subheading}>Center Block and Pincode</Typography>
                            </AccordionSummary>
                        </Accordion>
                        {
                            data.map(c => (
                                <Accordion key={c.center_id} className={classes.accordian}>
                                    <AccordionSummary
                                        expandIcon={c.fee_type === 'Free' ? <MonetizationOnIcon style={{ color: 'red' }} /> : <MoneyOffIcon style={{ color: 'green' }} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        justify='space-between'
                                    >
                                        <Typography className={classes.heading}>{c.name}</Typography>
                                        <Typography className={classes.subheading}>{c.address !== 'Address Text' ? c.address : ''}</Typography>
                                        <Typography className={classes.subheading}>{c.block_name !== 'Not Applicable' ? c.block_name + ',' : ''}{c.pincode}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            {
                                                c.sessions.map(s => (
                                                    <Grid item key={s.session_id}>
                                                        <Card variant="outlined" className={classes.card} style={{ backgroundColor: s.available_capacity === 0 ? '#ffb3b3' : '#b3ffd9' }}>
                                                            <CardContent>
                                                                <Typography className={classes.card_title} gutterBottom>
                                                                    {s.date}
                                                                </Typography>
                                                                <Typography gutterBottom>
                                                                    {s.available_capacity}
                                                                </Typography>
                                                                <Typography gutterBottom>
                                                                    {s.vaccine}
                                                                </Typography>
                                                                <Typography className={classes.card_bottom}>
                                                                    +{s.min_age_limit}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }
                    </ul>
                </Paper>
            </div>
        </div >
    )
}

export default Body
