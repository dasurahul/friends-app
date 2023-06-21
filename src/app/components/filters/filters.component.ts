import { Component, Output, EventEmitter, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  name: string = '';

  filterFields: { filterName: string; nameSortType: string; gender: string } = {
    filterName: '',
    nameSortType: 'ascending',
    gender: 'male',
  };

  @Output() onNameChangedEvent = new EventEmitter<string>();
  @Output() onFilterEvent = new EventEmitter<{
    filterName: string;
    nameSortType: string;
    gender: string;
  }>();

  showModal = false;

  constructor(private renderer: Renderer2) {}

  /**
   * Scroll enable and disable functions
   */

  disableScroll = () => {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  };

  enableScroll = () => {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  };

  /**
   * Modal open and close functions
   */

  openModal = () => {
    this.showModal = true;
    this.disableScroll();
  };

  closeModal = () => {
    this.showModal = false;
    this.enableScroll();
  };

  /**
   * Handles the change event of an input element and updates the name property and emits the nameChanged event.
   * @param {Event} event - The change event object
   * @returns {void}
   */
  onChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
    this.onNameChangedEvent.emit(input.value);
  };

  /**
   * Handles the change event of filter fields and updates the property.
   * @param {Event} event - The change event object
   * @returns {void}
   */
  filterChanges = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    this.filterFields = {
      ...this.filterFields,
      [input.name]: input.value,
    };
  };

  /**
   * Emits the filter event, closes the modal, and resets the filter fields object
   * @returns {void}
   */
  filter = (): void => {
    this.onFilterEvent.emit(this.filterFields);
    this.closeModal();
    this.filterFields = {
      filterName: '',
      nameSortType: 'ascending',
      gender: 'male',
    };
  };
}
