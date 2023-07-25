export const convertToDisplayDate = (day: string) => {
	const options = {
		weekday: "short" as "short",
		month: "short" as "short",
		day: "numeric" as "numeric",
		timeZone: "GMT",
	};
	return new Intl.DateTimeFormat("en-US", options).format(new Date(day));
};
