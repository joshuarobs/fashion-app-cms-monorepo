/**
 * Truncates a string to a limit of number of characters.
 *
 * Source:
 * https://stackoverflow.com/questions/25972904/truncate-text-to-fit-in-3-lines-and-show-three-dots-in-end-in-html
 * @param string
 * @param size
 */
function truncateString(string: string, size: number) {
  return string.length > size ? string.slice(0, size - 1) + '…' : string;
}

export { truncateString };
