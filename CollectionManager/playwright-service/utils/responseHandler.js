const responseHandler = (searchResult, searchQuery) => {
  console.log(searchQuery);

  function getTeam(title, brand, description) {
    return (
      title.includes(searchQuery) ||
      brand.includes(searchQuery) ||
      description.includes(searchQuery)
    );
  }

  function formatISODateTime(timestamp) {
    const date = new Date(timestamp);
    const pad = (num) => String(num).padStart(2, "0");
    const padMs = (num) => String(num).padStart(3, "0");

    // Get local date and time components
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Month is 0-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const milliseconds = padMs(date.getMilliseconds());

    // Get timezone offset and format it as ±HH:mm
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? "+" : "-";
    const timezoneOffset = `${dif}${pad(Math.floor(Math.abs(tzo) / 60))}:${pad(
      Math.abs(tzo) % 60
    )}`;

    // Assemble and return the final ISO string with local timezone offset
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffset}`;
  }

  return (
    searchResult.items
      // .filter((f) =>
      //   getTeam(f.title, f.brand_title, f.item_box.accessibility_label)
      // )
      .map((res) => {
        return {
          title: res.title,
          team: searchQuery,
          size: res.size_title,
          brand: res.brand_title,
          price: res.total_item_price.amount,
          url: res.url,
          photos: res.photo?.thumbnails?.map((p) => p.url),
          status: res.status,
          user: res.user.profile_url,
          favorite_count: res.favourite_count,
          description: res.item_box.accessibility_label,
          posted_at: formatISODateTime(res.photo?.high_resolution?.timestamp),
        };
      })
  );
};

export default responseHandler;
