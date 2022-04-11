export const converFileToBase64 = (file: Blob): string => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
  return reader.result as string;
};
