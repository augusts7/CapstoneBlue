import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


class RegisterView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "value": 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }

    handleChange(index) {
        this.setState({ "value": index });
    }

    handleChangeIndex(index) {
        this.setState({ "value": index });
    }

    render() {

        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        Item One
        </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        Item Two
        </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        Item Three
        </TabPanel>
                </SwipeableViews>
            </div>
        );
    }
}

export default RegisterView;
