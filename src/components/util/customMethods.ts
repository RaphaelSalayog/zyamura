function inventorySortItem(inventorySort: any, inventory: any[]) {
  const items = [...inventory];
  switch (inventorySort) {
    case "Latest":
      return inventory;
    case "Oldest":
      return items?.reverse();
    case "Name (A-Z)":
      return items?.sort((a: any, b: any) => a.name.localeCompare(b.name));
    case "Name (Z-A)":
      return items
        ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
        .reverse();
    case "Highest Price":
      return items
        ?.sort((a: any, b: any) => a.sellingPrice - b.sellingPrice)
        .reverse();
    case "Lowest Price":
      return items?.sort((a: any, b: any) => a.sellingPrice - b.sellingPrice);
    case "Highest Quantity":
      return items?.sort((a: any, b: any) => a.quantity - b.quantity).reverse();
    case "Lowest Quantity":
      return items?.sort((a: any, b: any) => a.quantity - b.quantity);
    default:
      return items;
  }
}

function posSortItem(inventory: any[]) {
  const items = [...inventory];

  return items?.sort((a, b) =>
    a.quantity === 0 ? 1 : b.quantity - a.quantity
  );
}

function capitalizeFirstLetter(string: string) {
  const word = string.split(" ");
  return word
    .map((item: string) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
}

function addCommas(number: number = 0) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function truncateString(string: string, maxLength: number) {
  if (string.length > maxLength) {
    return string.slice(0, maxLength - 3) + "...";
  } else {
    return string;
  }
}

function onKeyDownTypeNumber(event: any, type: string) {
  if (
    event.key === "e" ||
    event.key === "-" ||
    event.key === "+" ||
    (type == "quantity" && event.key === ".")
  ) {
    event.preventDefault();
  }
}

function generateUniqueId(existingIds: string[]) {
  let randomId;

  do {
    // Generate a random component
    const randomPart = Math.floor(Math.random() * 9000000000) + 1000000000; // Random number
    // const randomPart = Math.random().toString(36).substring(2, 10); // Random text number

    // Combine the random component with a prefix for clarity
    randomId = `${randomPart}`;
  } while (existingIds.includes(randomId)); // Check for uniqueness

  return randomId;
}

export {
  capitalizeFirstLetter,
  inventorySortItem,
  addCommas,
  truncateString,
  onKeyDownTypeNumber,
  generateUniqueId,
  posSortItem,
};
