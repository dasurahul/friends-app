export function sortArrayOfObjects(arr: any[], order: string): void {
  if (order === 'ascending') {
    arr.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  } else if (order === 'descending') {
    arr.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0));
  } else {
    console.error(
      "Invalid sorting order. Please specify 'ascending' or 'descending'."
    );
  }
}
