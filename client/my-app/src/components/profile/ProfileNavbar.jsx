import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Profile from './Profile'
import TimeLine from './TimeLine'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function ProfileNavbar({id,name,email,phone,work}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigate = useNavigate()
    const [active, setActive] = useState('inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500')
    const [count, setCount] = useState(0)
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Profile" style={{
                            color:"white"
                        }} {...a11yProps(0)} />
                        <Tab label="TimeLine" style={{
                            color:"white"
                        }}  {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Profile id={id} name={name} phone={phone} email={email} work={work}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TimeLine />
                </TabPanel>

            </Box>


        </>

    )
}

export default ProfileNavbar