export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters: string = atob(b64Data);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray as Uint8Array);
  }

  return new Blob(byteArrays as BlobPart[], {type: contentType});
}

export const calculateTime = (totalDuration: number, currentTime: number): number => {
  return (100*currentTime)/totalDuration
}

export const validateYoutubeUrl = (url: string): boolean => {
  let pattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  return pattern.test(url)
}

export const getYoutubeUrlId = (url) => {
  return url.split('v=')[1].split('&')[0]
}