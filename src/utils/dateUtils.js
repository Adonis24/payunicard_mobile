import t from "../strings";

function translate(key) {
    return t(key)
}

const getFormattedDate = (date, prefomattedDate = false, hideYear = false) => {
    const MONTH_NAMES = [
        translate('date.january'),
        translate('date.february'),
        translate('date.march'),
        translate('date.april'),
        translate('date.may'),
        translate('date.june'),
        translate('date.july'),
        translate('date.august'),
        translate('date.september'),
        translate('date.october'),
        translate('date.november'),
        translate('date.december')
    ];

    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (prefomattedDate) {
        return `${prefomattedDate} ${hours}:${minutes}`;
    }
    if (hideYear) {
        return `${day}, ${month} ${hours}:${minutes}`;
    }
    return `${day}, ${month} ${year}, ${hours}:${minutes}`;
}

const timeAgo = (dateParam) => {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);

    const DAY_IN_MS = 86400000;
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if (seconds < 60) {
        return translate('date.minuteAgo');
    } else if (minutes < 60) {
        return `${minutes} ${translate('date.minutesAgo')}`;
    } else if (isToday) {
        return getFormattedDate(date, translate('date.today'));
    } else if (isYesterday) {
        return getFormattedDate(date, translate('date.yesterday'));
    } else if (isThisYear) {
        return getFormattedDate(date, false, true);
    }
    return getFormattedDate(date);
};

const dateToYMD = function(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m;
}

const timestamp2Date = (timestamp) => {
    return dateToYMD(new Date(timestamp * 1000))
};

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export {
    timeAgo,
    timestamp2Date,
    validateEmail
}
