import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { Friend } from '../../models/friend.model';

import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.css'],
})
export class FriendDetailsComponent implements OnInit {
  loading: boolean = false;
  friendName: string = '';
  friendDetails?: Friend;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
  ) {}

  /**
   * Initializes the component and retrieves the friend details based on the route parameter
   * @returns {void}
   */
  ngOnInit(): void {
    this.loading = true;
    this.friendName = this.route.snapshot.params['name'];
    this.httpService
      .get(environment.backendURL + '/friends/' + this.friendName)
      .subscribe(
        (response) => {
          // console.log(response?.data);
          this.friendDetails = response?.data;
          this.loading = false;
        },
        (error) => {
          this.router.navigate(['/page-not-found']);
        }
      );
  }
}
