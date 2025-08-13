import execSh from 'exec-sh';
import fs from 'fs';

const { promise: exec } = execSh;

const copyKitchenSink = async () => {
  // eslint-disable-next-line
  /* eslint-disable */
  for (let lib of ['react', 'vue', 'svelte']) {
    try {
      await exec(`rm -rf public/kitchen-sink/${lib}/dist`);
      await exec(`rm -rf public/kitchen-sink/${lib}/pages`);
    } catch (err) {
      console.log(err);
    }
    fs.mkdirSync(`public/kitchen-sink/${lib}/dist`);
    fs.mkdirSync(`public/kitchen-sink/${lib}/pages`);
    await exec(
      `cp -r ../konsta/kitchen-sink/${lib}/dist/* public/kitchen-sink/${lib}/dist`
    );
    await exec(
      `cp -r ../konsta/kitchen-sink/${lib}/pages/* public/kitchen-sink/${lib}/pages`
    );
  }
  /* eslint-enable */
};

copyKitchenSink();
