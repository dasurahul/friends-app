import { Component, Input } from '@angular/core';
import { Friend } from '../../models/friend.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent {
  @Input() friends?: Friend[];
}
