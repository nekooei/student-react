/**
 * Created by milad on 3/7/18.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {getDistance, getOpenTermOfSchool, getPrice, getSchools, getTermGroups} from "../../../utils/api";
import AutoSuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import {Button, Grid, IconButton, MenuItem, Paper, TextField, withStyles} from "material-ui";
import {Close, Refresh} from "material-ui-icons";
import {cancelFetching, setFetching} from "../../../actions/fetch";
import {setHeaderSubTitle} from "../../../actions/header";
import VerticalStepper from "../../items/VerticalStepper";
import ReviewTable from "../../items/ReviewTable";


const styles = theme => ({
  suggestionTypo: {
    '&:hover': {
      cursor: 'pointer'
    },
    width: '50%'
  },
  acceptButton: {
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: 10
  },
  container: {
    flexGrow: 2,
    position: 'relative',


  },
  suggestionsContainerOpen: {
    position: 'relative',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxHeight: 150,
    overflowY: 'scroll'
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class NewService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: {
        all: [],
        suggestions: [],
        value: ''
      },
      termGroups: {
        all: [],
        suggestions: [],
        value: ''
      }
    };

  }

  renderSuggestion = (suggestion, {query, isHighlighted}) => {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </span>
            ) : (
              <strong key={String(index)} style={{fontWeight: 500}}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  };



  getSchoolSuggestionValue = suggestion => suggestion;
  getTermGroupSuggestionValue = suggestion => suggestion;

  renderInputComponent(inputProps) {
    return (
      <TextField {...inputProps}/>
    );
  }


  getSchoolSuggestions = value => {
    const inputValue = value.trim();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.schools.all.filter(school =>
      school.caption.includes(inputValue)
    ).map(school => school.caption);
  };

  getTermGroupSuggestions = value => {
    const inputValue = value.trim();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.termGroups.all.filter(termGroup =>
      termGroup.caption.includes(inputValue)
    ).map(termGroup => termGroup.caption);
  };

  onSchoolSuggestionsFetchRequested = ({value}) => {
    this.setState({
      schools: {
        ...this.state.schools,
        suggestions: this.getSchoolSuggestions(value),
        value: value
      }
    });
  };

  onTermGroupSuggestionsFetchRequested = ({value}) => {
    this.setState({
      termGroups: {
        ...this.state.termGroups,
        suggestions: this.getTermGroupSuggestions(value),
        value: value
      }
    });
  };

  onSchoolSuggestionsClearRequested = () => {
    this.setState({
      ...this.state,
      schools: {
        ...this.state.schools,
        suggestions: this.state.schools.all.map(school => school.caption),
        value: ''
      },
      schoolSelected: undefined
    });
  };

  onTermGroupSuggestionsClearRequested = () => {
    this.setState({
      ...this.state,
      termGroups: {
        ...this.state.termGroups,
        suggestions: this.state.termGroups.all.map(termGroup => termGroup.caption),
        value: ''
      },
      schoolSelected: {
        ...this.state.schoolSelected,
        termGroup: undefined
      }
    });
  };


  componentDidMount() {
    this.props.setSubtitleOfHeader('ثبت درخواست');
    this.props.setFetching();
    getSchools().then(result => {
      if (result.success) {
        this.props.cancelFetching();
        this.setState({
          schools: {
            ...this.state.schools,
            all: result.payload,
            suggestions: result.payload.map(school => school.caption)
          }
        });
      }
    })
  }


  onChangeSchool = (event, {newValue}) => {
    this.setState({
      ...this.state,
      schools: {
        ...this.state.schools,
        value: newValue
      }
    });
  };

  onChangeTermGroup = (event, {newValue}) => {
    this.setState({
      ...this.state,
      termGroups: {
        ...this.state.termGroups,
        value: newValue
      }
    });
  };

  storeSchoolInputComponent = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };

  storeTermGroupInputComponent = autosuggest => {
    if (autosuggest !== null) {
      this.termGroupInput = autosuggest.input;
    }
  };

  getSteps = () => {
    return ['انتخاب موسسه آموزشی', 'انتخاب گروه', 'پیش‌نمایش', 'پرداخت'];
  };

  selectTermGroup = (event, data) => {
    this.props.setFetching();
    this.setState({
      termGroups: {
        ...this.state.termGroups,
        value: data.suggestion
      },
      schoolSelected: {
        ...this.state.schoolSelected,
        termGroup: this.state.termGroups.all.filter(termGroup => termGroup.caption === data.suggestion)[0]
      }
    }, () => {
      getPrice(this.state.schoolSelected.id, this.state.schoolSelected.openTerm.id
        , this.state.schoolSelected.termGroup.id, this.state.schoolSelected.distance)
        .then(response => {
          if (response.success) {
            this.setState({
              priceReview: response.payload
            }, () => {
              this.props.cancelFetching();
              this.nextStep();
            })
          }
        });
    });
  };

  selectSchool = (event, data) => {
    this.props.setFetching();
    this.setState({
      schools: {
        ...this.state.schools,
        value: data.suggestion
      },
      schoolSelected: this.state.schools.all.filter(school => school.caption === data.suggestion)[0]
    }, () => {
      // must to wait state changed
      getDistance(this.state.schoolSelected.id)
        .then(response => {
          if (response.success) {
            this.setState({
              schoolSelected: {
                ...this.state.schoolSelected,
                distance: Math.round(response.payload.distanceMeter / 1000)
              }
            }, () => {
              this.getOpenTerm();
            });
          }
        });
    });

    //this.nextStep();
  };

  getOpenTerm() {
    getOpenTermOfSchool(this.state.schoolSelected.id)
      .then(response => {
        if (response.success) {
          this.setState({
            schoolSelected: {
              ...this.state.schoolSelected,
              openTerm: response.payload
            }
          }, () => {
            getTermGroups(this.state.schoolSelected.openTerm.id)
              .then(response => {
                this.props.cancelFetching();
                if (response.success) {
                  this.setState({
                    termGroups: {
                      ...this.state.termGroups,
                      all: response.payload,
                      suggestions: response.payload.map(termGroup => termGroup.caption)
                    }
                  }, () => {
                    this.nextStep();
                  });
                }

              });
          });
        } else {
          // todo: show we have no available term for this school !
        }

      });
  }

  reset = () => {
    this.setState({
      ...this.state,
      schools: {
        ...this.state.schools,
        suggestions: this.state.schools.all.map(school => school.caption),
        value: ''
      },
      schoolSelected: undefined
    }, () => {
      this.resetSteps();
    });

  };

  submitServiceRequest = () => {

  };


  close = () => {
    this.props.history.goBack();
  };

  getStepContent = (step) => {
    const { classes } = this.props;

    switch (step) {
      case 0:
        return (
          <Grid container
                direction="row"
                alignItems="center"
                justify="center">

            <Grid item xs={12}>

              <AutoSuggest
                id={'schoolSelector-‍'.concat(step)}
                theme={{
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                }}
                suggestions={this.state.schools.suggestions}
                getSuggestionValue={this.getSchoolSuggestionValue}
                onSuggestionsFetchRequested={this.onSchoolSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSchoolSuggestionsClearRequested}
                renderSuggestion={this.renderSuggestion}
                alwaysRenderSuggestions={!Boolean(this.state.schoolSelected)}
                onSuggestionSelected={this.selectSchool}
                renderInputComponent={this.renderInputComponent}
                focusInputOnSuggestionClick={false}
                inputProps={{
                  type: 'search',
                  fullWidth: true,
                  label: 'موسسه آموزشی',
                  onChange: this.onChangeSchool,
                  value: this.state.schools.value,
                  disabled: Boolean(this.props.fetching || this.state.schoolSelected),
                  inputRef: this.storeSchoolInputComponent

                }}
              />
            </Grid>


          </Grid>
        );
      case 1:
        return (
          <Grid container
                direction="row"
                alignItems="center"
                justify="center">

            <Grid item xs={12}>

              <AutoSuggest
                theme={{
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                }}
                id={'schoolSelector-‍'.concat(step)}
                suggestions={this.state.termGroups.suggestions}
                getSuggestionValue={this.getTermGroupSuggestionValue}
                onSuggestionsFetchRequested={this.onTermGroupSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onTermGroupSuggestionsClearRequested}
                renderSuggestion={this.renderSuggestion}
                alwaysRenderSuggestions={Boolean(this.state.schoolSelected) && !Boolean(this.state.schoolSelected.termGroup)}
                onSuggestionSelected={this.selectTermGroup}
                renderInputComponent={this.renderInputComponent}
                focusInputOnSuggestionClick={true}
                inputProps={{
                  type: 'search',
                  fullWidth: true,
                  label: 'گروه آموزشی',
                  onChange: this.onChangeTermGroup,
                  value: this.state.termGroups.value,
                  disabled: Boolean(this.props.fetching || (this.state.schoolSelected && this.state.schoolSelected.termGroup)),
                  inputRef: this.storeTermGroupInputComponent
                }}
              />
            </Grid>


          </Grid>
        );
      case 2:
        return (
          <Grid container
                direction="row"
                alignItems="center"
                justify="center">

            <Grid item xs={12}>

              <ReviewTable data={this.state.priceReview ? {
                'نام موسسه': this.state.priceReview.school,
                'گروه آموزشی': this.state.priceReview.groupCaption,
                'نرخ هر کیلومتر (تومان)': this.state.priceReview.priceUnit,
                'تاریخ شروع کلاس ها': `${this.state.priceReview.startDate[0]}${this.state.priceReview.startDate[1]}${this.state.priceReview.startDate[2]}${this.state.priceReview.startDate[3]}/${this.state.priceReview.startDate[4]}${this.state.priceReview.startDate[5]}/${this.state.priceReview.startDate[6]}${this.state.priceReview.startDate[7]}`,
                'تاریخ پایان کلاس ها': `${this.state.priceReview.endDate[0]}${this.state.priceReview.endDate[1]}${this.state.priceReview.endDate[2]}${this.state.priceReview.endDate[3]}/${this.state.priceReview.endDate[4]}${this.state.priceReview.endDate[5]}/${this.state.priceReview.endDate[6]}${this.state.priceReview.endDate[7]}`,
                'تعداد جلسات': this.state.priceReview.sessionCount,
                'قیمت نهایی(تومان)': this.state.priceReview.totalPrice
              } : {}}/>

            </Grid>

            <Grid item xs={12}>

              <Button raised onClick={this.submitServiceRequest} color={'primary'}>تایید</Button>
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };


  render() {
    console.log(this.state);
    return (
      <Grid container
            direction="row"
            alignItems="center"
            justify="center"
            spacing={0}>
        <Grid item
              xs={9}>

          <Paper elevation={20}>

            <Grid item xs={12}>
              <Grid container
                    direction="row"
                    alignItems="flex-end"
                    justify="space-between" spacing={40}>
                <Grid item>
                  <IconButton color={'primary'}
                              onClick={this.reset}>
                    <Refresh/>
                  </IconButton>

                </Grid>
                <Grid item>
                  <IconButton color={'secondary'}
                              onClick={this.close}>
                    <Close/>
                  </IconButton>

                </Grid>


              </Grid>

            </Grid>
            <VerticalStepper nextStep={handleNextFunc => this.nextStep = handleNextFunc}
                             reset={handleReset => this.resetSteps = handleReset}
                             getStepFunc={this.getSteps}
                             getStepContentFunc={this.getStepContent}/>
          </Paper>

        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFetching: () => dispatch(setFetching()),
    cancelFetching: () => dispatch(cancelFetching()),
    setSubtitleOfHeader: subtitle => dispatch(setHeaderSubTitle(subtitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewService));