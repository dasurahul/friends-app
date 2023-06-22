import { Component } from '@angular/core';
import * as data from '../assets/data.json';
import { Friend } from './models/friend.model';
import { sortArrayOfObjects } from './shared/utils/arrayUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'friends-app';
  friendsData: { characters: Friend[]; extras: Friend[] } = data;
  friends: Friend[] = this.friendsData.characters;
  extras: Friend[] = this.friendsData.extras;
  allCharacters: Friend[] = [...this.friends, ...this.extras];
  filteredCharacters: Friend[] = this.allCharacters;

  /**
   * Filters the characters based on the value received from the input field
   * @param {string} name - The value received from input field.
   * @returns {void}
   */
  onNameChange = (name: string): void => {
    this.filteredCharacters = this.allCharacters.filter((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  /**
   * Filters the characters based on the filter fields object
   * @param {{filterName: string, nameSortType: string, gender: string}} data - The object containing filter fields
   * @returns {void}
   */
  onFilterData = (data: {
    filterName: string;
    nameSortType: string;
    gender: string;
  }): void => {
    this.filteredCharacters = this.allCharacters.filter((character) => {
      return (
        character.name.toLowerCase().includes(data.filterName) &&
        (data.gender === '' || character.gender.toLowerCase() === data.gender)
      );
    });
    sortArrayOfObjects(this.filteredCharacters, data.nameSortType);
  };
}
