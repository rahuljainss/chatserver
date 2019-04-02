import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { UserInfo } from '../UserInfo';

const styles = theme => ({
    button: {
        marginLeft: theme.spacing.unit * 70,
        marginTop: theme.spacing.unit * 30,
        maxWidth: '100px', maxHeight: '50px', minWidth: '100px', minHeight: '50px'
    },
    input: {
        display: 'none',
    },
});
class ContainedButtons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }

    handleSubmit = (name, email) => {
        this.setState({ open: false });
        const { history } = this.props;
        history.push(`/user/${name}`);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpen}>
                    Start</Button>
                <div>
                    <UserInfo
                        open={open}
                        onSubmit={this.handleSubmit}
                    />
                </div>
            </>
        );
    }
}

ContainedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);