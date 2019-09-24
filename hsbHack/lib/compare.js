const fs = require("fs");
const { promisify } = require("util");
const fsMakeDir = promisify(fs.mkdir);
const fsExists = promisify(fs.exists);
const PNG = require("pngjs").PNG;
const pixelmatch = require("pixelmatch");

const readImg = path =>
  new Promise((res, rej) => {
    const img = fs
      .createReadStream(path)
      .on("error", e => {
        console.log("köttbulle", e);

        return rej(e);
      })
      .on("err", rej)
      .pipe(new PNG())
      .on("parsed", _ => {
        res(img);
      });
  });

module.exports = {
  setup: async () => {
    const opt = { recursive: true };
    await fsMakeDir(`./hsbHack/baseline`, opt);
    await fsMakeDir(`./hsbHack/current`, opt);
    await fsMakeDir(`./hsbHack/diff`, opt);
  },
  compare: async filename => {
    const baselinePath = `hsbHack/baseline/${filename}`;
    const currentPath = `hsbHack/current/${filename}`;
    const diffPath = `hsbHack/diff/${filename}`;

    if (!(await fsExists(currentPath))) {
      throw "Image did not exist" + currentPath;
    }

    if (!(await fsExists(baselinePath))) {
      console.warn(`Didn't find baseline, new test? ${baselinePath}`);
      return 0;
    }
    const currentImg = await readImg(currentPath).catch(err => {
      console.error(`Didn't find image ${path}`);
    });

    const baselineImg = await readImg(baselinePath);

    if (!currentImg || !baselineImg) {
      return;
    }

    var diff = new PNG({
      width: currentImg.width,
      height: currentImg.height
    });

    const pixelmatchOutput = pixelmatch(
      currentImg.data,
      baselineImg.data,
      diff.data,
      currentImg.width,
      currentImg.height,
      {
        threshold: 0.1
      }
    );

    diff.pack().pipe(fs.createWriteStream(diffPath));
    return pixelmatchOutput;
  }
};
