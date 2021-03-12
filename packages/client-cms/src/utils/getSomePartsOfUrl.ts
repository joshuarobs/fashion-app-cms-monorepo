/**
 * Gets the first X consecutive parts from a url string
 * e.g. if the URL is home/item/2/dashboard, and the number of parts is 2,
 * then we'll get "home/item"
 * @param url
 * @param numberOfParts
 */
function getSomePartsOfUrl(url: string, numberOfParts: number) {
  const allParts = url.split('/'); //[index]
  const parts = [];
  for (let i = 0; i < numberOfParts; i++) {
    parts.push(allParts[i]);
  }
  console.log('parts:', parts);
  return parts.join('/');
  // console.log("test", test);
}

export { getSomePartsOfUrl };
