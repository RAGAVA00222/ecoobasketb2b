export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ & /g, "-and-")
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "");
