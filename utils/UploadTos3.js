const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const s3 = new S3({
  region: process.env.BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  Bucket: process.env.BUCKET_NAME,
});

console.log(process.env.BUCKET_NAME)
console.log(process.env.AWS_SECRET_KEY)
console.log(process.env.AWS_ACCESS_KEY)
console.log(process.env.BUCKET_REGION)

const UploadToS3 = (req, res, next) => {
  // Access the file path directly from req.file
  const filePath = req.file.path;

  // Create a read stream from the file path
  const fileStream = fs.createReadStream(filePath);

  // Define upload parameters
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Body: fileStream,
    Key: req.file.filename, // Use req.file.filename instead of image[0][0].filename
    ContentType: req.file.mimetype,
  };

  console.log(s3)
  // Upload the file to S3
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.error("Error uploading file to S3:", err);
      return next(err); // Pass error to the error handler middleware
    }
    console.log("File uploaded successfully:", data);
    next(); // Proceed to the next middleware
  });
};

module.exports = UploadToS3;
