//
// For guidance on how to create filters see:
// https://docs.nowprototype.it/0.11.4/nunjucks/filters
//

const prototypeCore = require('nowprototypeit')
const addFilter = prototypeCore.views.addFilter

// Add your filters here


const { DateTime } = require("luxon");
const moment = require('moment')

addFilter('formatMonth', (number) => {
	var date = moment().month(number -1)
	return date.format('MMMM')
})

addFilter('daysAgoDayNumeric', (number) => {
	var date = moment().subtract(number,"days").format("D")
	return date
})

addFilter('daysAgo', (number) => {
	var date = moment().subtract(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysAgoNumeric', (number) => {
	var date = moment().subtract(number,"days").format("D M YYYY")
	return date
})

addFilter('monthsAgoNumeric', (number) => {
	var date = moment().subtract(number,"days").format("M")
	return date
})

addFilter('monthsInFutureNumeric', (number) => {
	var date = moment().add(number,"months").format("M")
	return date
})

addFilter('yearsAgo', (number) => {
	var date = moment().subtract(number,"days").format("YYYY")
	return date
})

addFilter('daysInFuture', (number) => {
	var date = moment().add(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysInFutureShort', (number) => {
	var date = moment().add(number,"days").format("D MMM YYYY")
	return date
})

addFilter('daysInPast', (number) => {
	var date = moment().subtract(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysInPastShort', (number) => {
	var date = moment().subtract(number,"days").format("D MMM YYYY")
	return date
})

addFilter('whichDay',function (value) {
  const options = { weekday: 'long' }; // Format such as 'Monday', 'Tuesday', etc.
  const formatter = new Intl.DateTimeFormat('en-GB', options); // Localised datetime formatter
  const currentDate = new Date();

  let targetDate;

  switch (value) {
	  case 'today':
      targetDate = currentDate;
      break;
	  case 'tomorrow':
      targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() + 1);
      break;
	  case 'yesterday':
      targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() - 1);
      break;
	  default:
	    const offset = parseInt(value, 10); // Convert the input to a base-10 integer
	    if (!isNaN(offset)) {
        targetDate = new Date(currentDate);
        targetDate.setDate(currentDate.getDate() + offset); // Apply the offset
	    } else {
        return 'Error';
	    }
	}

	// {{ 'today' | whichDay }}
	// {{ 'tomorrow' | whichDay }}
	// {{ 'yesterday' | whichDay }}
	// {{ '-2' | whichDay }}
	// {{ '+3' | whichDay }}

  return formatter.format(targetDate);
})



addFilter('push', (array, item) => {
	array.push(item)
	return array
})

addFilter('cleanArray', (array) => {
	return array.filter(item => {
		return (item && (item !==""))
	})
})

addFilter('days', (value) => {
	let val = parseFloat(value, 10)
	if(val == 1) {
		return val + ' day'
	} else {
		return val + ' days'
	}
})

addFilter('rule6StatusColour', status => {
  switch(status) {
    case 'Ready to review':
      return 'govuk-tag--blue'
    case 'Rejected':
      return 'govuk-tag--red'
    case 'Approved':
      return 'govuk-tag--green'
	case 'Withdrawn':
      return 'govuk-tag--pink'
  }
})

addFilter('rule6StatementStatusColour', status => {
  switch(status) {
    case 'Ready to review':
      return 'govuk-tag--blue'
    case 'Rejected':
      return 'govuk-tag--red'
    case 'Accepted':
      return 'govuk-tag--green'
  }
})

addFilter('interestedPartyCommentStatusColour', status => {
  switch(status) {
	case 'Ready to review':
	  return 'govuk-tag--blue'
	case 'Rejected':
	  return 'govuk-tag--red'
	case 'Accepted':
	case 'Shared':	
	  return 'govuk-tag--green'
	case 'Withdrawn':
      return 'govuk-tag--pink'
  }
})

addFilter('appealStatusColour', status => {
	if(status.indexOf('open') > -1) {
		return 'govuk-tag--yellow'
	}
	if(status == 'Transferred') {
		return 'govuk-tag--grey'
	}
	if(status == 'Decision issued') {
		return 'govuk-tag--green'
	}
})

addFilter('appealStatusColourAlternative', status => {
	if(status.indexOf('Awaiting') > -1) {
		return 'govuk-tag--yellow'
	}
	if(status == 'Decision issued') {
		return 'govuk-tag--green'
	}
})

addFilter('appealStatusText', status => {
	if(status == 'Awaiting LPAQ') {
		return 'LPAQ'
	}
	if(status == 'LPAQ ready to review') {
		return 'LPAQ'
	}
	if(status == 'Statements and IP comments open') {
		return 'Statements and IP comments'
	}
	if(status == 'Statements and IP comments closed') {
		return 'Statements and IP comments'
	}
	if(status == 'Statements and IP comments ready to share') {
		return 'Statements and IP comments'
	}
	if(status == 'Final comments open') {
		return 'Final comments'
	}
	if(status == 'Final comments closed') {
		return 'Final comments'
	}
	if(status == 'Final comments ready to share') {
		return 'Final comments'
	}
	if(status == 'Proof of evidence and witnesses open') {
		return 'Proof of evidence and witnesses'
	}
	if(status == 'Proof of evidence and witnesses closed') {
		return 'Proof of evidence and witnesses'
	}
	if(status == 'Proof of evidence and witnesses ready to share') {
		return 'Proof of evidence and witnesses'
	}
	return status

})

addFilter('day', (isoDateString, part) => {
	if(!isoDateString) {
		return isoDateString
	}

	return DateTime.fromISO(isoDateString).day
})

addFilter('month', (isoDateString, part) => {
	if(!isoDateString) {
		return isoDateString
	}

	return DateTime.fromISO(isoDateString).month
})

addFilter('year', (isoDateString, part) => {
	if(!isoDateString) {
		return isoDateString
	}

	return DateTime.fromISO(isoDateString).year
})

addFilter('hour', (isoDateString, part) => {
	return DateTime.fromISO(isoDateString).hour
})

addFilter('minute', (isoDateString, part) => {
  return DateTime.fromISO(isoDateString).minute
})

addFilter('isoDateFromTimeInput', (object) => {
  let hour, minute

  hour = Number(object?.hour)
  minute = Number(object?.minute)

  const isoDateString = DateTime.now()
  	.set({ hour: hour, minute: minute, second: 0, millisecond: 0 })
  	.toISO();

  return isoDateString
})