import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";

const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 8
  },
  table: {
    minWidth: 600,
    textSize: 14
  },
  base1: {
    fontWeight: "bold"
  },
  base: {
    fontSize: "14px"
  },
  act: {
    display: "flex"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  heads: {
    fontSize: "40px",
    textAlign: "center"
  },
  cell: {
    textAlign: "center",
    fontSize: "20px"
  }
});

class SampleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick = data => {
    const { onSubmit } = this.props;
    onSubmit(data);
  };

  render() {
    const { classes, data } = this.props;
    return (
      <>
        <Paper>
          <Table className={classes.root}>
            <AppBar color="primary" className={classes.heads}>
              Users List
            </AppBar>
            <TableBody className={classes.table}>
              {data.map(user => (
                <TableRow
                  hover
                  className={classes.row}
                  onClick={() => {
                    this.handleClick(user);
                  }}
                >
                  <TableCell className={classes.cell}>{user.name}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}
SampleTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(String).isRequired
};

export default withStyles(styles)(SampleTable);
