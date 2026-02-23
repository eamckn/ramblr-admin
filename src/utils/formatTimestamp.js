const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const month = date.toLocaleString("default", { month: "long" });
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);

  let hours = String(date.getHours());
  const minutes = String(date.getMinutes()).padStart(2, "0");
  let suffix;

  if (hours === "0") {
    // Midnight
    hours = "12";
    suffix = "a.m.";
  } else if (hours === "12") {
    // Noon
    suffix = "p.m.";
  } else if (Number(hours) > 12) {
    // Between noon and midnight
    hours = String(Number(hours) % 12);
    suffix = "p.m.";
  } else {
    // Morning hours
    suffix = "a.m.";
  }

  return `${hours}:${minutes} ${suffix}`;
};

export { formatDate, formatTime };
