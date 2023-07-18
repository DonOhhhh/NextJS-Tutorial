"use client";

import React, { useState } from "react";
import { partySize as partySizes, times } from "../../../../data";
import ReactDatePicker from "react-datepicker";
import useAvailabilities from "@/hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { convertToDisplayTime } from "@/utils/convertToDisplayTime";

const ReservationCard = ({
	openTime,
	closeTime,
	slug,
}: {
	openTime: string;
	closeTime: string;
	slug: string;
}) => {
	const { data, loading, error, fetchAvailabilties } = useAvailabilities();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [time, setTime] = useState(openTime);
	const [partySize, setPartySize] = useState(2);
	const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

	const handleChange = (date: Date | null) => {
		if (date) {
			setDay(date.toISOString().split("T")[0]);
			return setSelectedDate(date);
		}
		return setSelectedDate(null);
	};

	const handleClick = () => {
		fetchAvailabilties({
			slug,
			day,
			time,
			partySize,
		});
	};

	const filterTimeByOpenWindow = () => {
		const openTimes: typeof times = [];
		let isOpened = false;
		times.forEach((time) => {
			if (!isOpened && time.time === openTime) {
				isOpened = true;
			}
			if (isOpened) openTimes.push(time);
			if (isOpened && time.time === closeTime) {
				isOpened = false;
			}
		});
		return openTimes;
	};

	return (
		<div className="fixed w-[15%] bg-white rounded p-3 shadow">
			<div className="text-center border-b pb-2 font-bold">
				<h4 className="mr-7 text-lg">Make a Reservation</h4>
			</div>
			<div className="my-3 flex flex-col">
				<label htmlFor="">Party size</label>
				<select
					name=""
					className="py-3 border-b font-light"
					id=""
					value={partySize}
					onChange={(e) => setPartySize(parseInt(e.target.value))}
				>
					{partySizes.map((size, i) => (
						<option key={i} value={size.value}>
							{size.label}
						</option>
					))}
				</select>
			</div>
			<div className="flex justify-between">
				<div className="flex flex-col w-[48%]">
					<label htmlFor="">Date</label>
					<ReactDatePicker
						selected={selectedDate}
						onChange={handleChange}
						className="py-3 border-b font-light text-reg w-24"
						dateFormat={`MMMM d`}
						wrapperClassName="w-[48%]"
					/>
				</div>
				<div className="flex flex-col w-[48%]">
					<label htmlFor="">Time</label>
					<select
						name=""
						id=""
						className="py-3 border-b font-light"
						value={time}
						onChange={(e) => setTime(e.target.value)}
					>
						{filterTimeByOpenWindow().map((time, i) => (
							<option key={i} value={time.time}>
								{time.displayTime}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="mt-5">
				<button
					className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
					onClick={handleClick}
					disabled={loading ? true : false}
				>
					{loading ? (
						<CircularProgress color="inherit" />
					) : (
						"Find a Time"
					)}
				</button>
			</div>
			{data && data.length ? (
				<div className="mt-4">
					<p className="text-reg">Select a Time</p>
					<div className="flex flex-wrap mt-2">
						{data.map(({ time, available }, i) =>
							available ? (
								<Link
									key={i}
									className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
									href={`/reserve/${slug}?date=${day}T${time}&partySize=${partySize}`}
								>
									<p className="text-sm font-bold">
										{convertToDisplayTime(time)}
									</p>
								</Link>
							) : (
								<p
									key={i}
									className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"
								/>
							)
						)}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ReservationCard;
