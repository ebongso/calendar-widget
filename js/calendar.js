"use strict";

(function() {
  var calendarUi = calendarUi || new CalendarUi();
  
  var chosenCalendar = new Date();
  //var chosenCalendar = new Date("03/01/2016");
  var today = new Date();
  var todaysDate = today.getDate();
  var dateOfTheMonth = chosenCalendar.getDate();
  var dayOfTheMonth = chosenCalendar.getDay();
  var theMonth = chosenCalendar.getMonth();
  var yearOfTheMonth = chosenCalendar.getFullYear();
  var lastDate = new Date(yearOfTheMonth, theMonth + 1, 0).getDate();
  var daysLength = DAYS.length;
  
  var cells = [];
  for(var i = 0; i < lastDate; i++, dayOfTheMonth++) {
    if(dayOfTheMonth == daysLength) {
      dayOfTheMonth = 0; //reset to Sunday
    }
    cells[i] = { date: i + 1, day: dayOfTheMonth };
  }
  
  var calendar = document.createDocumentFragment();
  calendar.appendChild(calendarUi.createMonthYearRow(theMonth, yearOfTheMonth)); //create the row with Month and Year
  calendar.appendChild(calendarUi.createDaysRow()); //create the row with Days
  
  //create the row with Dates and highlight Today
  var highlight = (todaysDate == dateOfTheMonth && today.getMonth() == theMonth && today.getFullYear() == yearOfTheMonth);
  calendar.appendChild(calendarUi.createDatesRows(cells, highlight, todaysDate));
  
  document.getElementById("calendar").appendChild(calendar);
})();