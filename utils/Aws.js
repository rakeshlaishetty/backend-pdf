const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_REGION'
});

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload a document to AWS S3 and get the URL
async function uploadToS3AndGetUrl(filePath, bucketName) {
  try {
    // Read the document file
    const fileContent = fs.readFileSync(filePath);

    // Specify the parameters for uploading the document
    const params = {
      Bucket: bucketName,
      Key: `documents/${Date.now()}_${filePath}`, // Change the Key as per your requirement
      Body: fileContent,
      ACL: 'public-read' // Make the document publicly accessible
    };

    // Upload the document to AWS S3
    const uploadResult = await s3.upload(params).promise();

    // Generate the URL of the uploaded document
    const documentUrl = uploadResult.Location;

    return documentUrl;
  } catch (error) {
    console.error('Error uploading document to AWS S3:', error);
    throw error;
  }
}

const documentFilePath = '/path/to/document.pdf'; // Specify the path to the document file
const bucketName = 'your-s3-bucket-name'; // Specify your S3 bucket name

uploadToS3AndGetUrl(documentFilePath, bucketName)
  .then(documentUrl => {
    console.log('Document uploaded successfully. URL:', documentUrl);
  })
  .catch(error => {
    console.error('Error:', error);
  });
