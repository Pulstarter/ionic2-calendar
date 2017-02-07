import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: 'app-calendar.html'
})
export class AppCalendarComponent {

  @Input() firstDayOfWeek = 1;
  @Input() month;
  @Input() year;
  @Input() locale = "es";

  cal_days_labels = [];
  cal_months_labels = [];
  cal_days_in_month = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  cal_current_date = new Date();

  weeks = [];
  weekCells = [];

  ngOnInit() {

    this.month = (isNaN(this.month) || this.month == null) ? this.cal_current_date.getMonth() : this.month;
    this.year = (isNaN(this.month) || this.year == null) ? this.cal_current_date.getFullYear() : this.year;
    this.localization();

    if ( this.firstDayOfWeek === 1 ) {
      let day = this.cal_days_labels[ 0 ];
      this.cal_days_labels.shift();
      this.cal_days_labels.push(day);
    }

    this.prepareCalendar();
  }

  onClickBackwards() {
    this.month--;
    if ( this.month < 0 ) {
      this.month = 11;
      this.year--;
    }
    this.prepareCalendar();
  }

  onClickForward() {
    this.month++;
    if ( this.month > 11 ) {
      this.month = 0;
      this.year++;
    }
    this.prepareCalendar();
  }

  prepareCalendar() {
    var firstDay = new Date(this.year, this.month, 1);
    var monthLength = this.cal_days_in_month[ this.month ];

    /** Día de inicio **/
    var startingDay = firstDay.getDay();
    if ( this.firstDayOfWeek === 1 ) {
      startingDay--;
    }

    /** Sólo para Febrero **/
    if ( this.month == 1 ) {
      if ( (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0 ) {
        monthLength = 29;
      }
    }

    var day = 1;
    this.weeks = [];
    this.weekCells = [];

    for ( var i = 0; i < 9; i++ ) {
      for ( var j = 0; j <= 6; j++ ) {
        if ( day <= monthLength && (i > 0 || j >= startingDay) ) {
          this.weekCells.push(day);
          day++;
        } else {
          this.weekCells.push(null);
        }
      }

      this.weeks.push(this.weekCells);
      this.weekCells = [];

      if ( day > monthLength ) {
        break;
      }
    }

  }

  localization() {
    switch (this.locale) {

      case 'es':
        this.cal_days_labels = [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ];
        this.cal_months_labels = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
        break;

      default:
        this.cal_days_labels = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
        this.cal_months_labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    }
  }

}
