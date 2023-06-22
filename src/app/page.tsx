import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export interface RestaurantCardType {
	id: number;
	name: string;
	main_img: string;
	slug: string;
	cuisine: Cuisine;
	location: Location;
	price: PRICE;
}

const prisma = new PrismaClient();

const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
	const restaurants = await prisma.restaurant.findMany({
		select: {
			id: true,
			name: true,
			main_img: true,
			cuisine: true,
			slug: true,
			location: true,
			price: true,
		},
	});
	return restaurants;
};

export default async function Home() {
	const restaurants = await fetchRestaurant();
	return (
		<main>
			<Header />
			<div className="py-3 px-36 mt-10 flex flex-wrap">
				{restaurants.map((restaurant) => {
					return <RestaurantCard restaurant={restaurant} />;
				})}
			</div>
		</main>
	);
}
