import multer from 'multer';

const upload = multer({ dest: 'public/assets/images/blogs' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async function handler(req, res) {
  try {
    upload.single('image')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Failed to upload image' });
      } else if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      const imageName = req.file.filename;

      res.status(200).json({ imageName });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}