import moment from 'moment';

export function getFormatedDateTime(date) {
  return moment()
    .format('DD MMM YYYY | h:mm a')
    .toLocaleUpperCase();
}

export function getParsedDate(dateObject) {
  return moment(dateObject).format('DD-MM-YYYY');
}

export function getParsedTime(dateObject) {
  return moment(dateObject).format('hh:mm A');
}

export function getBetweenDates(filter) {
  let days = 0;
  if (!isNaN(filter)) {
    days = filter;
  } else if (filter === 'yesterday') {
    days = 1;
  } else if (filter === 'last_7_days') {
    days = 7;
  } else if (filter === 'last_30_days') {
    days = 30;
  }
  let dateTo = moment().format('YYYY-MM-DD');
  let dateFrom = moment().format('YYYY-MM-DD');
  if (days > 0) {
    dateFrom = moment()
      .subtract(days, 'd')
      .format('YYYY-MM-DD');
  }
  return [dateFrom, dateTo];
}

export function dateToString(date) {
  return `${moment(date).format('DD MMM YYYY', ['qj', 'en'])}`;
}

export function getCurrentYear() {
  return moment().format('YYYY');
}

export function getCurrentMonth() {
  return moment().format('M');
}

export function getCurrentMonthName() {
  return moment().format('MM');
}

export function getMonthYear(date) {
  return `${moment(date).format('MMMM YYYY')}`;
}

export function getAllDatesOfSpecificMonth(month) {
  let specificMonth = month ? month : getCurrentMonth();
  let startOfMonth = moment()
    .date(1)
    .month(specificMonth - 1);

  let endOfMonth = moment()
    .month(specificMonth - 1)
    .endOf('month');
  if (parseInt(specificMonth, 10) >= parseInt(getCurrentMonth(), 10)) {
    endOfMonth = moment();
  }

  let result = [moment({ ...startOfMonth })];

  while (endOfMonth.date() !== startOfMonth.date()) {
    startOfMonth.add(1, 'day');
    result.push(moment({ ...startOfMonth }));
  }
  return result.map(x => x.format('YYYY-MM-DD'));
}

export function timeDifference(lastDate) {
  let now = moment(new Date()); //todays date
  let end = moment(lastDate); // another date
  let duration = moment.duration(now.diff(end));
  let diffMin = duration.asMinutes();
  if (diffMin < 59) {
    return `${parseInt(diffMin)} mins ago`;
  } else {
    let diffHours = duration.asHours();
    if (diffHours < 24) {
      return `${parseInt(diffHours)} hours ago`;
    } else {
      let diffDays = duration.asDays();
      return `${parseInt(diffDays)} days ago`;
    }
  }
}
export function getFormatedDate(date) {
  return moment(date).format('DD MMM YYYY');
}

export function getTimeDiff(updatedOn) {
  let statement = { timeDifference: 0, unit: 'minute' };
  let currentDate = moment();
  let lastUpdatedOn = moment(updatedOn);
  let diffMinute = currentDate.diff(lastUpdatedOn, 'minutes');
  let diffHours = currentDate.diff(lastUpdatedOn, 'hours');
  let diffSeconds = currentDate.diff(lastUpdatedOn, 'seconds');
  if (diffMinute != 0 && diffMinute < 60 && diffHours == 0) {
    statement.timeDifference = diffMinute;
    statement.unit = diffMinute == 1 ? 'minute' : 'minutes';
  } else if (diffHours != 0 && diffHours < 24) {
    statement.timeDifference = diffHours;
    statement.unit = diffHours == 1 ? 'hour' : 'hours';
  } else if (diffSeconds > 0) {
    statement.timeDifference = diffSeconds;
    statement.unit = 'seconds';
  }
  return statement;
}
export const notificationTimeDifference = dateString => {
  let date = moment(dateString);
  let diffTime = moment().diff(date, 'days');
  // checking if it is updated at today
  if (diffTime === 0) {
    diffTime = moment().diff(date, 'hours');
    // checking if it is updated within a hour
    if (diffTime === 0) {
      diffTime = moment().diff(date, 'minutes');
      if (diffTime === 0) {
        return 'Just Now';
      } else if (diffTime == 1) {
        return `${diffTime} min ago`;
      } else {
        return `${diffTime} mins ago`;
      }
    } else if (diffTime <= 1) {
      return `${diffTime} hr ago`;
    } else {
      return `${diffTime} hr ago`;
    }
  } else if (diffTime == 1) {
    // checking if it is updated at yesterday
    return 'Yesterday';
  } else {
    return date.format('DD MMM');
  }
};
