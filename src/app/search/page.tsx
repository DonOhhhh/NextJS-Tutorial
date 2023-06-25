import React from "react";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PageProps } from "../../../.next/types/app/search/page";
import { PRICE, PrismaClient } from "@prisma/client";
import { truncate } from "fs";

export const metadata = {
	title: "Search Restaurants OpenTable",
};

export interface ISearchParams {
	city?: string;
	cuisine?: string;
	price?: PRICE;
}

const prisma = new PrismaClient();

const fetchRestaurantByCity = async (searchParams: ISearchParams) => {
	const where: any = {};
	if (searchParams.city) {
		const location = {
			name: {
				equals: searchParams.city.toLowerCase(),
			},
		};
		where.location = location;
	}

	if (searchParams.cuisine) {
		const cuisine = {
			name: {
				equals: searchParams.cuisine.toLowerCase(),
			},
		};
		where.cuisine = cuisine;
	}

	if (searchParams.price) {
		const price = {
			equals: searchParams.price,
		};
		where.price = price;
	}

	const select = {
		id: true,
		name: true,
		main_img: true,
		price: true,
		cuisine: true,
		location: true,
		slug: true,
		reviews: true,
	};

	return prisma.restaurant.findMany({
		where,
		select,
	});
};

const fetchLocations = async () => {
	return prisma.location.findMany();
};

const fetchCuisines = async () => {
	return prisma.cuisine.findMany();
};

async function Search({ searchParams }: { searchParams: ISearchParams }) {
	const restaurants = await fetchRestaurantByCity(searchParams);
	const locations = await fetchLocations();
	const cuisines = await fetchCuisines();

	return (
		<>
			<Header />
			<div className="flex py-4 m-auto w-2/3 justify-between items-start">
				<SearchSideBar
					locations={locations}
					cuisines={cuisines}
					searchParams={searchParams}
				/>
				<div className="w-5/6">
					{restaurants.length ? (
						restaurants.map((restaurant) => (
							<RestaurantCard
								restaurant={restaurant}
								key={restaurant.id}
							/>
						))
					) : (
						<p>Sorry, we found no restaurants in this area.</p>
					)}
				</div>
			</div>
		</>
	);
}

export default Search;
