import { Component } from '@angular/core';
import * as data from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'friends-app';
  friendsData = data;
  friends = this.friendsData.characters;
  extras = this.friendsData.extras;
  allCharacters = [...this.friends, ...this.extras];
  filteredCharacters = this.allCharacters;
  input = '';

  /**
   * Handles the change event of an input element.
   * @param {Event} e - The input event.
   */
  onChange = (e: Event) => {
    const input = e.target as HTMLInputElement;

    this.input = input.value;
    this.filteredCharacters = this.allCharacters.filter((character) =>
      character.name.toLowerCase().includes(input.value.toLowerCase())
    );
  };
}
