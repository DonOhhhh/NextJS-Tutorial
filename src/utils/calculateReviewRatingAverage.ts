import { Review } from "@prisma/client";

export function calculateReviewRatingAverage(reviews: Review[]) {
	if (!reviews.length) return 0;
	return (
		Math.round(
			(reviews.reduce((sum, review) => sum + review.rating, 0) /
				reviews.length +
				Number.EPSILON) *
				10
		) / 10
	);
}
