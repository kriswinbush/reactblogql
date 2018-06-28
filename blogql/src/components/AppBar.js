import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { AppContext } from '../context/AppProvider';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
const styles = {
    root: {
        flexGrow: 1,
      },
      flex: {
        flex: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
      list: {
        width: 250,
      },
}
class AppBarComponent extends Component {

    render() {
        const { classes } = this.props;
        return (
            <AppContext.Consumer>
            {appCtx => (<Grid container spacing={0} className={classes.root}>
                <Grid item xs={12}>

                    <AppBar position="static">
                        <Toolbar>
                            <IconButton 
                                onClick={() => {
                                    appCtx.toggleDrawer(true)
                                }} 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="Menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                            Painted Blog
                            </Typography>
                            <Button component={Link} to={'/login'} color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>

                </Grid>
                <Grid item xs={12}>
                <Drawer anchor="left" open={appCtx.sideDrawerOpen} onClose={() => { appCtx.toggleDrawer(false)}}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={ () => { appCtx.toggleDrawer(false)}}
                        onKeyDown={ () => {appCtx.toggleDrawer(false)}}
                    >
                        <MenuList>
                            <MenuItem component={Link} to={'/'} onClick={ () => appCtx.toggleDrawer(false)} >
                                <ListItemIcon className={classes.icon}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
                            </MenuItem>
                            <MenuItem component={Link} to={'/blog'} onClick={ () => appCtx.toggleDrawer(false)} >
                                <ListItemIcon className={classes.icon}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Blog" />
                            </MenuItem>
                        </MenuList>
                    </div>
                </Drawer>
                </Grid>
            </Grid>)}
            </AppContext.Consumer>
        )
    }
}

export default compose(
    withStyles(styles)
)(AppBarComponent);