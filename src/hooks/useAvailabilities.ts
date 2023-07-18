import axios from "axios";
import { useState } from "react";

export default function useAvailabilities() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState<
		{ time: string; available: boolean }[] | null
	>(null);

	const fetchAvailabilties = async ({
		slug,
		partySize,
		day,
		time,
	}: {
		slug: string;
		partySize: number;
		day: string;
		time: string;
	}) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:3000/api/restaurant/${slug}/availability`,
				{
					params: {
						day,
						time,
						partySize,
					},
				}
			);
			setData(response.data.availabilities);
		} catch (error: any) {
			setError(error.response.data.errorMessage);
		}
		setLoading(false);
	};

	return { loading, data, error, fetchAvailabilties };
}
