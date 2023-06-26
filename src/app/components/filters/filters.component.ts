import { Component, Output, EventEmitter, Renderer2 } from '@angular/core';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [LoggingService],
})
export class FiltersComponent {
  name: string = '';

  filterFields: { filterName: string; nameSortType: string; gender: string } = {
    filterName: '',
    nameSortType: 'default',
    gender: '',
  };

  @Output() onNameChangedEvent = new EventEmitter<string>();
  @Output() onFilterEvent = new EventEmitter<{
    filterName: string;
    nameSortType: string;
    gender: string;
  }>();

  showModal: boolean = false;

  constructor(
    private renderer: Renderer2,
    private loggingService: LoggingService
  ) {}

  /**
   * Scroll enable and disable functions
   */

  disableScroll = (): void => {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  };

  enableScroll = (): void => {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  };

  /**
   * Modal open and close functions
   */

  openModal = (): void => {
    this.showModal = true;
    this.disableScroll();
  };

  closeModal = (): void => {
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
    this.filterFields.filterName = input.value; // updating filterFields.filterName when updating the name property
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
    this.loggingService.log(this.filterFields);
  };

  /**
   * Emits the filter event, closes the modal
   * @returns {void}
   */
  filter = (): void => {
    this.name = this.filterFields.filterName; // updating the name property when filtering
    this.onFilterEvent.emit(this.filterFields);
    this.closeModal();
  };

  /**
   * Resets the filter fields object, name field, emits the filter event and closes the modal
   * @returns {void}
   */
  reset = (): void => {
    this.filterFields = {
      filterName: '',
      nameSortType: 'default',
      gender: '',
    };
    this.name = '';
    this.onFilterEvent.emit(this.filterFields);
    this.closeModal();
  };
}
