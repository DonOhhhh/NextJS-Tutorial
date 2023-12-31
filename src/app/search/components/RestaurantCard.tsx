import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import { Cuisine, PRICE, Location, Review } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Restaurant {
	id: number;
	name: string;
	main_img: string;
	price: PRICE;
	cuisine: Cuisine;
	location: Location;
	slug: string;
	reviews: Review[];
}

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
	const renderRatingText = () => {
		const rating = calculateReviewRatingAverage(restaurant.reviews);
		if (4 < rating) return "Awesome";
		else if (3 < rating && rating <= 4) return "Good";
		else if (0 < rating && rating <= 3) return "Average";
		else return "";
	};

	return (
		<div className="border-b flex pb-5 ml-4">
			<img
				src={restaurant.main_img}
				alt=""
				className="w-44 h-36 rounded"
			/>
			<div className="pl-5">
				<h2 className="text-3xl">{restaurant.name}</h2>
				<div className="flex items-start">
					<div className="flex mb-2">
						<Stars reviews={restaurant.reviews} />
					</div>
					<p className="ml-2 text-sm">{renderRatingText()}</p>
				</div>
				<div className="mb-9">
					<div className="font-light flex text-reg">
						<Price price={restaurant.price} />
						<p className="mr-4 capitalize">
							{restaurant.cuisine.name}
						</p>
						<p className="mr-4 capitalize">
							{restaurant.location.name}
						</p>
					</div>
				</div>
				<div className="text-red-600">
					<Link href={`/restaurant/${restaurant.slug}`}>
						View more information
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RestaurantCard;
