import {Component, OnInit} from '@angular/core';
import {ReviewDALService} from "../../services/review-dal.service";
import {Review} from "../../models/review.model";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  reviews: Review[] = null;
  
    constructor(private reviewDALService: ReviewDALService) {
    }
    
    ngOnInit(): void {
      this.reviewDALService.selectAllReview()
          .then(data => this.reviews = data)
          .catch(error => console.log(error));
    }
  
  deleteReview(reviewId: number) {
      const review = this.reviews.find(x => x.reviewId === reviewId);
      this.reviewDALService.deleteReview(review, () => {
          alert("Record review deleted successfully");
      });
      this.ngOnInit();
  }
}
