import React from "react";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Restaurant {
	id: number;
	name: string;
	images: string[];
	description: string;
	slug: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			id: true,
			name: true,
			images: true,
			description: true,
			slug: true,
		},
	});

	if (!restaurant) throw new Error();

	return restaurant;
};

async function RestaurantDetails({ params }: { params: { slug: string } }) {
	const { slug, name, description, images } = await fetchRestaurantBySlug(
		params.slug
	);
	return (
		<>
			<div className="bg-white w-[70%] rounded p-3 shadow">
				<RestaurantNavBar slug={slug} />
				<Title name={name} />
				<Rating />
				<Description description={description} />
				<Images images={images} />
				<Reviews />
			</div>
			<div className="w-[27%] relative text-reg">
				<ReservationCard />
			</div>
		</>
	);
}

export default RestaurantDetails;
