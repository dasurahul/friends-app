import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Friend } from '../../models/friend.model';
import * as data from '../../../assets/data.json';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.css'],
})
export class FriendDetailsComponent implements OnInit {
  friendName: string = '';
  friendDetails?: Friend;
  friendsData: { characters: Friend[]; extras: Friend[] } = data;
  allCharacters: Friend[] = [
    ...this.friendsData.characters,
    ...this.friendsData.extras,
  ];
  constructor(private route: ActivatedRoute, private router: Router) {}

  /**
   * Initializes the component and retrieves the friend details based on the route parameter
   * @returns {void}
   */
  ngOnInit(): void {
    this.friendName = this.route.snapshot.params['name'];
    this.friendDetails = this.allCharacters.find(
      (character) => character.name === this.friendName
    );
  }
}
