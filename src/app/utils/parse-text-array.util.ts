export function parseArrayAsText(arrayAsText: string): string[] {
  const array = arrayAsText
    .replace(/\"/g, '')
    .replace(/\'/g, '')
    .replace(/\\/g, '')
    .replace('[', '')
    .replace(']', '')
    .split(',');
  console.log(array);
  return array;
}
