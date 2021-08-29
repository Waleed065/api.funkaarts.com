export default function formattedTitle(title: string | null): string {
    return title
      ? title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
      : "";
  }
  