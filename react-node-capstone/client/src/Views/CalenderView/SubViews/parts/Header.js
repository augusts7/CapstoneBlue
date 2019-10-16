import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from "./Menu";
import Progress from "./progress";
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ContainerHeader(props) {
    const classes = useStyles();

    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        if (!anchor) {
            setAnchor(event.currentTarget);
        } else {
            setAnchor(null);
        }
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const handleOptionClick = (key) => {
        props.onMenuOptionClick(key);
    };

    let style = props.style;

    return (
        <div className={classes.root}>
            <AppBar style={style} position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

                        <MenuIcon onClick={handleClick} />

                        <Menu onClose={handleClose} onClick={handleOptionClick} anchor={anchor} menuOptions={props.menuOptions} />

                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>

                    <Button onClick={props.action.onClick} color="inherit">{props.action.name}</Button>
                </Toolbar>
                <Progress show={props.isLoading || false} />
            </AppBar>
        </div>
    );
}
