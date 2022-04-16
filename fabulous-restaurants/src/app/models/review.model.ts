export class Review {
    reviewId: number = -1;
    restaurantId: number = -1;
    username: string = "";
    reviewRating: number = 0;
    reviewDetail: string = "";
    
    constructor(restaurantId?: number,
                username?: string,
                reviewRating?: number,
                reviewDetail?: string) {
        this.restaurantId = restaurantId;
        this.username = username;
        this.reviewRating = reviewRating;
        this.reviewDetail = reviewDetail;
    }
}
