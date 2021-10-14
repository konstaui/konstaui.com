const { promise: exec } = require('exec-sh');

const copyKitchenSink = async () => {
  await exec('rm -rf public/kitchen-sink/react/dist');
  await exec('rm -rf public/kitchen-sink/react/pages');
  await exec('mkdir public/kitchen-sink/react/dist');
  await exec('mkdir public/kitchen-sink/react/pages');
  await exec(
    'cp -r ../tailwind-mobile/kitchen-sink/react/dist/* public/kitchen-sink/react/dist'
  );
  await exec(
    'cp -r ../tailwind-mobile/kitchen-sink/react/pages/* public/kitchen-sink/react/pages'
  );
  await exec(
    'cp -r ../tailwind-mobile/kitchen-sink/vue/dist/* public/kitchen-sink/vue/dist'
  );
  await exec(
    'cp -r ../tailwind-mobile/kitchen-sink/vue/pages/* public/kitchen-sink/vue/pages'
  );
};

copyKitchenSink();
