import moment from 'moment';

function range(x, y) {
    if (x > y) {
        return [];
    }
    var d = y - x;
    return Array(d).fill().map((z, i) => i + x);
}

function yearDiff(start, end) {
    var midyears = range(start.year() + 1, end.year());

    var leap = 0;
    for (var i in midyears){
        if (moment().year(midyears[i]).isLeapYear()) {
            leap++;
        }
    }
    if (start < moment(start).month(2).date(1) && start.isLeapYear()){
        leap++;
    }
    if (end >= moment(end).month(2).date(1) && end.isLeapYear()){
        leap++;
    }

    var days = moment.duration(end.diff(start)).asDays()

    days -= leap

    var yeardiff = days / 365.

    return yeardiff
}

export default yearDiff;
