const path = require('path');
const fs = require('fs-extra');
const blogDirectoryPath = './src/pages/blog';
const templatePath = path.resolve(`./src/templates`);

exports.createPages = ({boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  fs.readdir(blogDirectoryPath, function (err, files) {
    if (err) {
      console.error("Error reading blog files: ", err);
    } else {
      files.forEach(function (file) {
        fs.readJSON(`${blogDirectoryPath}/${file}`, function (err, jsonFile) {
          if (err) {
            console.error("Error creating JSON File: ", err);
          } else {
            createPage({
              path: `blog/${jsonFile.path}`,
              component: `${templatePath}/${jsonFile.templateKey}.js`,
              context: jsonFile
            });
          }
        })
      })
    }
  })
};

exports.onCreatePage = ({page, boundActionCreators}) => {
  const {createPage, deletePage} = boundActionCreators;
  return new Promise(resolve => {

    const path = page.path.split("/").filter(v => (v.length !== 0));
    const isPathHome = path.length === 0;
    const oldPage = Object.assign({}, page);

    if (isPathHome) {
      fs.readdir(blogDirectoryPath, function (err, files) {
        if (err) {
          console.error("Error reading blog files: ", err);
        } else {
          const blogJsonFilesPromises = files.map(function (file) {
            return new Promise((_resolve, _reject) => fs.readJSON(`${blogDirectoryPath}/${file}`,
              function (err, jsonFile) {
                if (err) {
                  _reject(console.error("Error creating JSON File: ", err))
                } else {
                  return _resolve(jsonFile);
                }
              }));
          });

          Promise.all(blogJsonFilesPromises).then((blogFiles) => {
            createPage({
              path: `/`,
              component: `${templatePath}/home.js`,
              context: blogFiles.reduce((result, value) => {
                result[value.path] = value;
                return result;
              }, {})
            })
          })
        }
      });

      deletePage(oldPage)
    }
    resolve();
  });
};