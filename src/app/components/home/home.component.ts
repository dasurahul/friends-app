import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { Friend } from '../../models/friend.model';
import { sortArrayOfObjects } from '../../shared/utils/arrayUtils';

import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  allCharacters: Friend[] = [];
  filteredCharacters: Friend[] = [];

  constructor(private httpService: HttpService, private router: Router) {}

  /**
   * Initializes the component and fetches the friend list by making a GET request
   * @returns {void}
   */
  ngOnInit(): void {
    this.loading = true;
    this.httpService.get(environment.backendURL + '/friends').subscribe(
      (response) => {
        // console.table(response?.data);
        this.allCharacters = response?.data;
        this.filteredCharacters = response?.data;
        this.loading = false;
      },
      (error) => {
        this.router.navigate(['/error']);
      }
    );
  }

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
