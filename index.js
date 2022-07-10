const fs = require("fs");
const path = require("path");

const getDirectoriesNumber = (files) => {
  return files.filter((file) => file.isDirectory()).length;
};

const getFilesNumber = (files) => {
  return files.filter((file) => file.isFile()).length;
};

const getFilesRecursively = (directory) => {
  const FILES_IN_DIRECTORY = fs.readdirSync(directory, { withFileTypes: true });
  const FOLDERS = getDirectoriesNumber(FILES_IN_DIRECTORY);
  const FILES = getFilesNumber(FILES_IN_DIRECTORY);

  fs.writeFile(
    `${directory}/info.json`,
    JSON.stringify({FOLDERS, FILES, directory}),
    function (err) {
        if (err) throw err;
    }
  );

  FILES_IN_DIRECTORY.forEach((file) => {
      if (file.isDirectory()) {
        const absolute = path.join(directory, file.name);
        getFilesRecursively(absolute);
    }
  })
};

getFilesRecursively(__dirname);