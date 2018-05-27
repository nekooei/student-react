import React, {Component} from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import JalaliUtils from 'material-ui-pickers-jalali-utils';
import jMoment from 'moment-jalaali';
import {DatePicker } from 'material-ui-pickers';


jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });


class PersianDatePicker extends Component {

  render() {

    return (
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <div className="picker">
          <DatePicker
            clearable
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            {...this.props}
            animateYearScrolling={false}
          />
        </div>
      </MuiPickersUtilsProvider>
      );
  }
}


export default PersianDatePicker;
