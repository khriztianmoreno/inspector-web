import blobService from '../../helpers/azure-blob-storage/azure-blob-storage';

const IMAGE_CONTAINER = 'images';

export function uploadFromBase64(base64Image, name, contentType) {
  return (
    blobService.Writer.addFromString(
      IMAGE_CONTAINER,
      base64Image,
      name,
      {
        contentEncoding: 'base64',
        contentType,
      }
    )
  );
}

export function parseBase64Image(base64WebImage) {
  const base64Exp = /data:(.+);base64,([\s\S]+)/gm;
  const values = base64Exp.exec(base64WebImage);
  if (values !== null) {
    return {
      contentType: values[1],
      content: values[2],
    };
  }
  return values;
}

export function generateName(user, contentType) {
  const prefix = user.customer.localId;
  const timestamp = new Date().getTime();
  const extension = /image\/(.*)/.exec(contentType)[1];

  return `${prefix}-${timestamp}.${extension}`;
}
