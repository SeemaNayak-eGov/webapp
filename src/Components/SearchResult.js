import React from "react";

import {Grid, withStyles, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer} from "@material-ui/core";


const styles = theme => ({
  table: {
    minWidth: 650,
  },
  root: {
   width: '100%',
   marginTop: theme.spacing.unit * 3,
   overflowX: 'auto',
 },
 row: {
   '&:nth-of-type(odd)': {
     backgroundColor: theme.palette.background.default,
   },
 },
 head: {
    backgroundColor: 'silver',
  },
  body: {
    fontSize: 14,
  },
  cell: {
    width: '250px',
  }
});

class SearchResult extends React.Component {

  render() {
    const {searchData=[], classes} = this.props;
    return (<div>
    <Grid item="item" xs={12}>
    <Paper className={classes.root}>
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead className={classes.head}>
          <TableRow >
            <TableCell align="center" >Module</TableCell>
            <TableCell align="center" >Locale</TableCell>
            <TableCell align="center" >Message</TableCell>
            <TableCell align="center" >Code</TableCell>
          </TableRow>
          </TableHead>
          <TableBody className="tablebody">{searchData.map((row) => (
            <TableRow className={classes.row} key={row.module}>
              <TableCell align="center" component="th" scope="row"  className={classes.cell}>{row.module}
                </TableCell>
                  <TableCell align="center">{row.locale}</TableCell>
                  <TableCell align="center">{row.message}</TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                </TableRow>))}
              </TableBody>
            </Table>
      </TableContainer>
    </Paper>
    </Grid>
    </div>);
  }
}

export default withStyles (styles) (SearchResult);
