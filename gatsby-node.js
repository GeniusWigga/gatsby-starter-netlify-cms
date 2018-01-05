const path = require('path');
const fs = require('fs-extra');

exports.createPages = ({boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  const blogDirectorySrc = './src/pages/blog';

  fs.readdir(blogDirectorySrc, function (err, files) {
    if (err) {
      console.error("Error reading blog files: ", err);
    } else {
      files.forEach(function (file) {
        fs.readJSON(`${blogDirectorySrc}/${file}`, function (err, jsonFile) {
          if (err) {
            console.error("Error creating JSON File: ", err);
          } else {
            createPage({
              path: `blog/${jsonFile.path}`,
              component: path.resolve(`./src/templates/${jsonFile.templateKey}.js`),
              context: jsonFile
            });
          }
        })
      })
    }
  })
};
