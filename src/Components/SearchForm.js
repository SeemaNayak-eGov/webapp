import React from "react";
import {Grid, withStyles, Button, Paper, Select, FormControl, InputLabel} from "@material-ui/core";
import SearchResult from "./SearchResult.js";
import axios from "axios";


const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'left',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
    buttonLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgrey',
    color: 'white'
  }
});

axios.create(
  {baseURL: window.location.origin}
);

class SearchForm extends React.Component {

  constructor(props) {
  super(props);
   this.handleSearchForm = this.handleSearchForm.bind(this);
    this.state = {
      modules: [],
      languages: [],
      fetchResult: false,
      chosenModule: "",
      searchData: [],
      chosenLanguage: "",
    };

  }

  componentDidMount = () => {
    axios.post('egov-mdms-service/v1/_search?tenantId=pb', {
      "RequestInfo": {
        "apiId": "Rainmaker",
        "ver": ".01",
        "ts": "",
        "action": null,
        "did": "1",
        "key": "",
        "msgId": "654654|en_IN"
      },
      "MdmsCriteria": {
        "tenantId": "pb",
        "moduleDetails": [
                  {
                    "moduleName": "common-masters",
                    "masterDetails": [{"name": "StateInfo"
                  }
            ]
          }
        ]
      }
    }).then((response) => {
      const mdmsRes = response.data.MdmsRes['common-masters'].StateInfo[0];

      let modules = mdmsRes.localizationModules.map((modul) => {
        return {
          key: modul.label,
          value: modul.value
          };
      });

      let language = mdmsRes.languages.map((lan) => {
        return {
          key: lan.label,
          value: lan.value
        };
      });

      this.setState({
        modules: modules,
        languages: language});
    })
  };

  handleSearchForm = () => {
    let url = 'localization/messages/v1/_search?tenantId=pb';
    if (this.state.chosenModule)
      url = url + "&module=" + this.state.chosenModule;
    if (this.state.chosenLanguage)
      url = url + "&locale=" + this.state.chosenLanguage;
    else {
      url = url + '&locale=en_IN';
    }

    axios.post(url, {
      "RequestInfo": {
        "apiId": "Rainmaker",
        "ver": ".01",
        "ts": "",
        "action": "_search",
        "did": "1",
        "key": "",
        "msgId": "20170310130900|en_IN",
        "authToken": null
      }
    }).then((response) => {
      this.setState({
        searchData: response.data.messages,
        fetchResult: true});
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const {modules=[], languages=[], searchData=[], fetchResult={}} = this.state;
    const {classes} = this.props;

    let searchResult;
    if (fetchResult)
      searchResult = <SearchResult searchData={searchData}/>
    else {
      searchResult = null;
    }
    return (<div>
      <Grid item="item" xs={12}>
        <Paper className={classes.root} elevation={3} >
          <form>
            <br/>
            <h1>Localisation Search</h1>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Module</InputLabel>
              <Select  onChange={(e) => {
                  this.setState({chosenModule: e.target.value});
                }} native="native" labelId="demo-simple-select-label"
          id="demo-simple-select" inputProps={{
                  name: 'module' }}>
                <option aria-label="None" value=""/> {
                  modules.map((modul) => {
                    return <option value={modul.value} key={modul.key}>{modul.value}</option>
                  })
                }
              </Select>
            </FormControl> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select onChange={(e) => {
                  this.setState({chosenLanguage: e.target.value});
                }} native="native" labelId="demo-simple-select-label"
          id="demo-simple-select" inputProps={{
                  name: 'locale',
                }}>
                <option aria-label="None" value=""/> {
                  languages.map((locale) => {
                    return <option value={locale.value} key={locale.key}>{locale.value}</option>
                  })
                }
              </Select>
            </FormControl>
            <br/><br/>
            <Button onClick={this.handleSearchForm} variant="contained" className={classes.buttonLayout}>
              Search
            </Button>
            <br/><br/>
          </form>
        </Paper>
      </Grid> {searchResult}
    </div>);
  }
}

export default  withStyles (styles) (SearchForm);
