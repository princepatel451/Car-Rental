import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndPoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Provide backward compatibility for @imagekit/nodejs v7 SDK
imagekit.upload = function (options) {
  if (imagekit.files && typeof imagekit.files.upload === 'function') {
    return imagekit.files.upload(options);
  }
  throw new Error("ImageKit files.upload method not available");
};

imagekit.url = function (opts = {}) {
  const endpoint = opts.urlEndpoint || process.env.IMAGEKIT_URL_ENDPOINT || '';
  const cleanEndpoint = endpoint.replace(/\/+$/, '');
  const path = (opts.path || opts.src || '').replace(/^\/+/, '');
  if (!opts.transformation || opts.transformation.length === 0) {
    return `${cleanEndpoint}/${path}`;
  }
  if (imagekit.helper && typeof imagekit.helper.buildTransformationString === 'function') {
    const tr = imagekit.helper.buildTransformationString(opts.transformation);
    return tr ? `${cleanEndpoint}/${path}?tr=${tr}` : `${cleanEndpoint}/${path}`;
  }
  return `${cleanEndpoint}/${path}`;
};

export default imagekit;