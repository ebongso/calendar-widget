"use strict";

var CalendarUi = function() {
  var daysLength = DAYS.length;
  
  function monthYearRow(mo, year) {
    var tr = document.createElement("tr");
    var monthYearTd = document.createElement("td");
    monthYearTd.setAttribute("colspan", daysLength); //span across all columns
    monthYearTd.setAttribute("align", "center");
    monthYearTd.innerHTML = MONTH[mo] + " " + year;
    tr.appendChild(monthYearTd);
    return tr;
  };
  
  function daysRow() {
    var tr = document.createElement("tr");
    for(var i = 0; i < daysLength; i++) {
      var td = document.createElement("td");
      td.innerHTML = DAYS[i];
      tr.appendChild(td);
    }
    return tr;
  };
  
  function datesRows(cells, highlight, todaysDate) {
    var cellsLength = cells.length;
    var datesTrs = document.createDocumentFragment();
    for(var i = 0; i < cellsLength;) { //loop all dates of the month
      var tr = document.createElement("tr");
      for(var j = 0; j < daysLength && i < cellsLength; j++) { //loop the days in a week
        var td = document.createElement("td");
        
        //The following if statement is for dates that do not start from Sunday
        if(j == cells[i].day) { //Fill in the date when it gets to the cell
          td.innerHTML = cells[i].date;
          
          if(highlight && todaysDate == cells[i].date) { //highlight today
            td.setAttribute("style", "background-color: #6666FF;");
          }
          
          i++; //only increment date after it's filled into the cell
        }
        tr.appendChild(td);
      }
      datesTrs.appendChild(tr);
    }
    return datesTrs;
  };
  
  return {
    createMonthYearRow: monthYearRow,
    createDaysRow: daysRow,
    createDatesRows: datesRows
  };
};