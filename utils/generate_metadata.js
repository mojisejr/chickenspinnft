const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const basePath = process.cwd();
const buildDir = `${basePath}/build/json`;
const inputDir = `${basePath}/build/images`;
const {
  format,
  namePrefix,
  description,
  baseUri,
} = require(`${basePath}/src/config.js`);
const console = require("console");
const { randomInt } = require("crypto");
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
const metadataList = [];

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
};

const getImages = (_dir) => {
  try {
    return fs
      .readdirSync(_dir)
      .filter((item) => {
        let extension = path.extname(`${_dir}${item}`);
        if (extension == ".png" || extension == ".jpg") {
          return item;
        }
      })
      .map((i) => {
        return {
          filename: i,
          path: `${_dir}/${i}`,
        };
      });
  } catch {
    return null;
  }
};

const loadImgData = async (_imgObject) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${_imgObject.path}`);
    resolve({ imgObject: _imgObject, loadedImage: image });
  });
};

const draw = (_imgObject) => {
  let w = canvas.width;
  let h = canvas.height;
  ctx.drawImage(_imgObject.loadedImage, 0, 0, w, h);
};

const addRarity = () => {
  const str = randomStatusFor(3);
  const agi = randomStatusFor(3);
  const vit = randomStatusFor(3);
  const int = randomStatusFor(3);

  const rarityObject = [
    {
      trait_type: "STR",
      value: str,
    },
    {
      trait_type: "AGI",
      value: agi,
    },
    {
      trait_type: "VIT",
      value: vit,
    },
    {
      trait_type: "INT",
      value: int,
    },
  ];

  console.log("random status object", rarityObject);

  return rarityObject;
};

const randomStatusFor = (rarity) => {
  //0 = common
  //1 = rare
  //2 = epic
  //3 = legendary
  //4 = dark
  switch (rarity) {
    case 0: {
      return randomIntFromInterval(1, 3);
    }
    case 1: {
      return randomIntFromInterval(1, 5);
    }
    case 2: {
      return randomIntFromInterval(2, 7);
    }
    case 3: {
      return randomIntFromInterval(2, 9);
    }
    case 4: {
      return randomIntFromInterval(3, 9);
    }
  }
};

//random number
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const isNeighborColor = (color1, color2, tolerance) => {
  return (
    Math.abs(color1.r - color2.r) <= tolerance &&
    Math.abs(color1.g - color2.g) <= tolerance &&
    Math.abs(color1.b - color2.b) <= tolerance
  );
};

const saveMetadata = (_loadedImageObject) => {
  let shortName = _loadedImageObject.imgObject.filename.replace(
    /\.[^/.]+$/,
    ""
  );

  let tempAttributes = [];
  tempAttributes.push(addRarity());

  let tempMetadata = {
    name: `${namePrefix} #${shortName}`,
    description: description,
    image: `${baseUri}/${shortName}.png`,
    edition: Number(shortName),
    attributes: tempAttributes,
    hash_tags: ["PunkKub", "PunkKubNFT", "BITKUB", "Pixel art"],
    compiler: "PunkKub Compiler V1.0",
  };

  fs.writeFileSync(
    `${buildDir}/${shortName}.json`,
    JSON.stringify(tempMetadata, null, 2)
  );
  metadataList.push(tempMetadata);
};

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
};

const startCreating = async () => {
  const images = getImages(inputDir);
  if (images == null) {
    console.log("Please generate collection first.");
    return;
  }
  let loadedImageObjects = [];
  images.forEach((imgObject) => {
    loadedImageObjects.push(loadImgData(imgObject));
  });
  await Promise.all(loadedImageObjects).then((loadedImageObjectArray) => {
    loadedImageObjectArray.forEach((loadedImageObject) => {
      draw(loadedImageObject);
      saveMetadata(loadedImageObject);
      console.log(
        `Created metadata for image: ${loadedImageObject.imgObject.filename}`
      );
    });
  });
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

buildSetup();
startCreating();
