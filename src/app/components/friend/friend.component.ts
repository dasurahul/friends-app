import { Component, Input } from '@angular/core';
import { Friend } from '../../types/friend.type';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent {
  @Input() friend?: Friend;
}
