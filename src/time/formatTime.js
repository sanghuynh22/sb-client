import moment from "moment";

export const formatDate = (date) => {
	const createdAt = moment(date);

	if (createdAt.diff(moment(), "days") > -7) {
		return createdAt.fromNow();
	} else if (createdAt.year() === moment().year()) {
		return createdAt.format("MMM D [at] h:mm a");
	} else {
		return createdAt.format("MMM D, YYYY [at] h:mm a");
	}
};
