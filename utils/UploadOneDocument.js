const multer = require('multer');

// Function to create Multer middleware for file uploads
const FileUpload = () => {
  // Define storage configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Specify the destination directory
    },
    filename: (req, file, cb) => {
      // Generate a unique filename (you can customize this)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  return upload.single('documentfile'); 
};

module.exports = FileUpload;
