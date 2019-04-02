import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, InputAdornment } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PersonIcon from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import {
    Dialog, DialogContent
} from '@material-ui/core';
import * as yup from 'yup';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        height: '100%',
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const Schema = yup.object({
    name: yup.string().required().label('Name'),
    email: yup.string().email().required().label('Email Address'),

});
const propTypes = {
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

class UserInfo extends React.Component {
    state = {
        errors: {},
        touched: {},
        email: '',
        name: '',
    };

    handleBlur = index => () => {
        const { touched } = this.state;
        touched[index] = true;
        this.setState({
            touched,
        }, () => this.handleValidate());
    }

    handleValidate = () => {
        const {
            name,
            email,
        } = this.state;

        Schema.validate({
            name,
            email,
        }, { abortEarly: false })
            .then(() => {
                this.handleErrors(null);
            })
            .catch((errors) => {
                this.handleErrors(errors);
            });
    }

    handleErrors = (errors) => {
        const parsedErrors = {};
        if (errors) {
            errors.inner.forEach((error) => {
                parsedErrors[error.path] = error.message;
            });
        }

        this.setState({
            errors: parsedErrors,
        });
    }

    handleChange = field => (e) => {
        this.setState({
            [field]: e.target.value,
        }, this.handleValidate);
    }

    getError = (field) => {
        const { errors, touched } = this.state;

        if (!touched[field]) {
            return null;
        }

        return errors[field] || '';
    }

    hasErrors = () => {
        const { errors } = this.state;
        return Object.keys(errors).length !== 0;
    }

    isTouched = () => {
        const { touched } = this.state;
        return Object.keys(touched).length !== 0;
    }
    handle = () => {
        const {
            name,
            email,
        } = this.state;

        const { onSubmit } = this.props;
        onSubmit(name, email);
        this.setState({ name: '', email: '' })
    }

    render() {
        const {
            classes,
            open,
        } = this.props;

        const {
            name,
            email,
        } = this.state;

        return (
            <Dialog
                open={open}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent>
                    <main className={classes.main}>
                        <CssBaseline />
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                User Information
                            </Typography>
                            <TextField
                                label="Name"
                                style={{ margin: 8 }}
                                type="text"
                                value={name}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange('name')}
                                onBlur={this.handleBlur('name')}
                                error={!!this.getError('name')}
                                helperText={this.getError('name')}
                            />
                            <TextField
                                label="Email-Address"
                                style={{ margin: 8 }}
                                type="text"
                                value={email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange('email')}
                                onBlur={this.handleBlur('email')}
                                error={!!this.getError('email')}
                                helperText={this.getError('email')}
                            />
                            <Button
                                className={classes.submit}
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={this.hasErrors() || !this.isTouched()}
                                onClick={this.handle}
                            >
                                START
                            </Button>
                        </Paper>
                    </main>
                </DialogContent>
            </Dialog >
        );
    }
}
UserInfo.propTypes = propTypes;

export default withStyles(styles)(UserInfo);