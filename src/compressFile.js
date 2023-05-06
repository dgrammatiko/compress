import { readFile, writeFile } from 'node:fs/promises';
import { Zstd } from "@hpcc-js/wasm/zstd";

const zstd = await Zstd.load();
const compressionLevel = 19;

async function compressFile(file) {
  if (file.endsWith('.min.js') || file.endsWith('.min.css')) {
      try {
        const data = await readFile(file);
        await writeFile(`${file}.gz`, await zstd.compress(data, compressionLevel));
        console.log(file);
      } catch (err) {
        console.info(`Error on ${file}: ${err.code}`);
      }
  }
}

export {compressFile};
