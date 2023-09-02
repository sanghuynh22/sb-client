import moment from "moment";

export const formatDate = (date) => {
	let createdAt = moment(date);
	if (!date) createdAt = moment(new Date()).subtract(1, "hour");
	if (createdAt.diff(moment(), "days") > -7) {
		return createdAt.fromNow();
	} else if (createdAt.year() === moment().year()) {
		return createdAt.format("MMM D [at] h:mm a");
	} else {
		return createdAt.format("MMM D, YYYY [at] h:mm a");
	}
};
