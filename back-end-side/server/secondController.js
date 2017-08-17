const aws = require('aws-sdk');
const config = require('../config');

aws.config.update({
  accessKeyId: config.amazonAccessID,
  secretAccessKey: config.amazonAccessKey
})



const sign = (filename, filetype) => {
  let s3 = new aws.S3();

  let params = {
    Bucket: 'facebook-clone01',
    Key: filename,
    Expires: 60,
    ContentType: filetype
  };

  return s3.getSignedUrl('putObject', params)
}

const getSignedURL = (req, res) => {
  let { filename, filetype } = req.body;
  if (filename && filetype) {
    let signedURL = sign(filename, filetype)
    res.send({
      url: signedURL
    })
  }
}

module.exports  = {getSignedURL}
