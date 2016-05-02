"use strict";

var app = (function(calendarUi) {
  var calendarUi = calendarUi || new CalendarUi();
  var currentCalendar = "";
  
  function drawCalendar(chosenCalendar) {
    try
    {
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
      
      var calendarElem = document.getElementById("calendar");
      while(calendarElem.firstChild) { //clear out the rows in the calendar
        calendarElem.removeChild(calendarElem.firstChild);
      }
      calendarElem.appendChild(calendar);
    } catch (ex) {
      console.log(ex);
    }
  }
  
  function init() {
    setToday();
    
    document.getElementById("today").onclick = function() {
      setToday();
    };
    
    document.getElementById("prevArrow").onclick = function() {
      var currentCal = new Date(currentCalendar);
      currentCal.setMonth(currentCal.getMonth() - 1);
      currentCalendar = currentCal;
      drawCalendar(currentCal);
    };
    
    document.getElementById("nextArrow").onclick = function() {
      var currentCal = new Date(currentCalendar);
      currentCal.setMonth(currentCal.getMonth() + 1);
      currentCalendar = currentCal;
      drawCalendar(currentCal);
    };
    
    function setToday() {
      var today = new Date();
      var current = new Date(currentCalendar);
      //If we are currently on the same month and year when we click "Today," we don't need to update UI
      if(current.getMonth() !== today.getMonth() || current.getFullYear() !== today.getFullYear()) {        
        currentCalendar = today;
        drawCalendar(today);
      }
    }
  }
  
  return {
    init: init
  };
})();
app.init();