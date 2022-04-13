export class Review {
    reviewId: number = -1;
    restaurantId: number = -1;
    userId: number = -1
    reviewRating: number = 0;
    reviewDetail: string = "";
    
    constructor(restaurantId?: number,
                userId?: number,
                reviewRating?: number,
                reviewDetail?: string) {
        this.restaurantId = restaurantId;
        this.userId = userId;
        this.reviewRating = reviewRating;
        this.reviewDetail = reviewDetail;
    }
}
