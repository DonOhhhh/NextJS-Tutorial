import React from "react";
import fullStar from "../../../public/full-star.png";
import halfStar from "../../../public/half-star.png";
import emptyStar from "../../../public/empty-star.png";
import Image, { StaticImageData } from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";

function Stars({ reviews, rating }: { reviews: Review[]; rating?: number }) {
	const renderStars = () => {
		const stars: StaticImageData[] = [];
		const calcedRating = rating || calculateReviewRatingAverage(reviews);
		const fullStars = calcedRating | 0;
		const halfStars = Math.round(calcedRating - fullStars + Number.EPSILON);
		const emptyStars = (5 - calcedRating) | 0;
		stars.push(
			...new Array(fullStars).fill(fullStar),
			...new Array(halfStars).fill(halfStar),
			...new Array(emptyStars).fill(emptyStar)
		);
		return (
			<>
				{stars.map((star, i) => (
					<Image key={i} src={star} alt="" className="w-4 h-4 mr-1" />
				))}
			</>
		);
	};
	return <div className="flex items-center">{renderStars()}</div>;
}

export default Stars;
