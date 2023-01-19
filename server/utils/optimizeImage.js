const Jimp = require("jimp");
// biggest posible image size
const MaxWidth = 1600;
const MaxHeight = 900;
// Standard sizes
const Sizes = {
  xxxs: 64,
  xxs: 126,
  xs: 256,
  sm: 512,
  md: 600,
  lg: 720,
  xl: 920,
  xxl: 1280,
  xxxl: 1600,
};

function readImage(filePath) {
  return new Promise((resolve, reject) => {
    Jimp.read(filePath, (err, img) => {
      if (err) reject(err);
      resolve(img);
    });
  });
}

exports.optimizeImage = async (imagePath, { size }) => {
  try {
    const img = await readImage(imagePath);
    const { height, width } = img.bitmap;
    // if image if of max size
    if (height > MaxHeight || width > MaxWidth) {
      if (width >= height) {
        // has biggger width
        img.resize(MaxWidth, Jimp.AUTO);
      } else {
        // has bigger height
        img.resize(Jimp.AUTO, MaxHeight);
      }
    }
    // if manual size asked
    if (size && Sizes[size]) img.resize(Sizes[size], Jimp.AUTO);

    // Other optimizations
    await img.quality(70).writeAsync(imagePath);
  } catch (error) {
    console.log(error);
  }
};
