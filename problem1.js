let daysSelected = {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: false,
    saturday: false,
    sunday: false,
};

let hoursToAdd = { begin: '9:00', end: '10:00' };

let openingHours = {
    monday: [
        { begin: '13:00', end: '18:00' },
        { begin: '10:30', end: '12:00' },
    ],
    tuesday: [
        { begin: '10:00', end: '12:00' },
        { begin: '13:00', end: '18:00' },
    ],
    wednesday: [
        { begin: '10:00', end: '12:00' },
        { begin: '13:00', end: '19:30' },
    ],
    thursday: [
        { begin: '10:00', end: '12:00' },
        { begin: '13:00', end: '18:00' },
    ],
    friday: [],
    saturaday: [],
    sunday: [],
};

const addTime = (daysSelected, hoursToAdd) => {
    Object.keys(openingHours).forEach(day => {
        if (daysSelected[day]) {
            if (openingHours[day].length === 0) {//Ici On n'a pas de risque de collisions car le tableau est initialement vide.
                openingHours[day].push(hoursToAdd);
            } else {
                let timeZoneRequestedIsAvailable = checkIfTimeZoneRequestedIsAvailable(day);
                if (timeZoneRequestedIsAvailable) {
                    openingHours[day].push(hoursToAdd);
                }
            }
        }
        sortDateTimeZones(openingHours[day]);
    });
}

const sortDateTimeZones = (dayHours) => {
    if (dayHours.length) {
        dayHours.sort((a, b) => {
            const aBegin = convertTimeToNumber(a.begin);
            const bBegin = convertTimeToNumber(b.begin);
            return aBegin - bBegin;
        });
    }
};

const checkIfTimeZoneRequestedIsAvailable = (day) => {
    let availability = true;
    openingHours[day].forEach(timeZone => {
        timeZoneBegin = convertTimeToNumber(timeZone.begin);
        timeZoneEnd = convertTimeToNumber(timeZone.end);
        hoursToAddBegin = convertTimeToNumber(hoursToAdd.begin);
        hoursToAddEnd = convertTimeToNumber(hoursToAdd.end);
        if (
            // IF ONE OF THESE CONDITIONS IS VERIFIED THEN THE REQUESTED TIME IS NOT AVAILABLE 
            (hoursToAddBegin < timeZoneEnd && hoursToAddBegin > timeZoneBegin) ||
            (hoursToAddEnd > timeZoneBegin && hoursToAddBegin < timeZoneBegin) ||
            (hoursToAddBegin < timeZoneEnd && hoursToAddEnd >= timeZoneEnd) ||
            (hoursToAddBegin >= timeZoneBegin && hoursToAddEnd <= timeZoneEnd) ||
            (hoursToAddBegin <= timeZoneBegin && hoursToAddEnd >= timeZoneEnd)
        ) {
            availability = false;
        }
    });
    return availability;
};

//This Method converts the string '18:35' to the number 18.35
const convertTimeToNumber = (time) => {
    const timeFormat = time.split(':');
    const aHours = +timeFormat[0];
    const aMinutes = +timeFormat[1];
    const finalForm = aHours + aMinutes / 100;
    return finalForm;
};

addTime(daysSelected, hoursToAdd);
console.log(openingHours);