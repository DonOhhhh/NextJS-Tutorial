export const convertToDisplayTime = (time: string) => {
	// Date 객체를 생성합니다.
	let date = new Date(`1970-01-01T${time}`);

	// 옵션 객체를 생성하여 시간 포맷을 설정하세요.
	const options = {
		timeStyle: "short" as "short",
		timeZone: "GMT",
	};

	// 해당 시간대의 시간 포맷을 얻습니다.
	const formattedTime = new Intl.DateTimeFormat("en", options).format(date);
	return formattedTime;
};
