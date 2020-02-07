import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const SnackBarContext = React.createContext();

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  children: PropTypes.element.isRequired,
};

class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: '',
      status: '',
    };
  }

  openSnackbar = (message, status) => {
    this.setState({
      message,
      status,
      isOpen: true,
    });
  };

  closeSnackbar = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { classes, children } = this.props;
    const { isOpen, message, status } = this.state;
    const Icon = variantIcon[status];
    return (
      <SnackBarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
        }}
      >
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isOpen}
          autoHideDuration={5000}
          onClose={this.closeSnackbar}
        >
          <SnackbarContent
            className={classes[status]}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon className={classes.icon} />
                {message}
              </span>
            }
            action={[
              <IconButton key="close" color="inherit" onClick={this.closeSnackbar}>
                <Close />
              </IconButton>,
            ]}
          />
        </Snackbar>
        {children}
      </SnackBarContext.Provider>
    );
  }
}
SnackBar.propTypes = propTypes;

export const SnackBarConsumer = SnackBarContext.Consumer;
export default withStyles(styles)(SnackBar);
