function inventorySortItem(inventorySort: any, inventory: any[]) {
  const items = [...inventory];
  switch (inventorySort) {
    case "Latest":
      return inventory;
    case "Oldest":
      return inventory;
    case "Name (A-Z)":
      return items?.sort((a: any, b: any) =>
        a.inventoryName.localeCompare(b.inventoryName)
      );
    case "Name (Z-A)":
      return items
        ?.sort((a: any, b: any) =>
          a.inventoryName.localeCompare(b.inventoryName)
        )
        .reverse();
    case "Highest Price":
      return items
        ?.sort(
          (a: any, b: any) => a.inventorySellingPrice - b.inventorySellingPrice
        )
        .reverse();
    case "Lowest Price":
      return items?.sort(
        (a: any, b: any) => a.inventorySellingPrice - b.inventorySellingPrice
      );
    case "Highest Quantity":
      return items
        ?.sort((a: any, b: any) => a.inventoryQuantity - b.inventoryQuantity)
        .reverse();
    case "Lowest Quantity":
      return items?.sort(
        (a: any, b: any) => a.inventoryQuantity - b.inventoryQuantity
      );
    default:
      return items;
  }
}

function capitalizeFirstLetter(string: string) {
  const word = string.split(" ");
  return word
    .map((item: string) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
}

function addCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function truncateString(string: string, maxLength: number) {
  if (string.length > maxLength) {
    return string.slice(0, maxLength - 3) + "...";
  } else {
    return string;
  }
}

export { capitalizeFirstLetter, inventorySortItem, addCommas, truncateString };
