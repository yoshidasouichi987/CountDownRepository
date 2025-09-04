import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
//app.use('/slides1', express.static('slides1'));
app.get('/api/files/:slideNum', (req, res) => {
  const slideNum = req.params.slideNum;
  const dirPath = `slides${slideNum}`; 
  
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      res.json(files);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.json([]);
  }
});
//localhostでなく0.0.0.0でサーバをリスンする
app.listen(PORT, '0.0.0.0' ,() => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//    https://special-zebra-pj9ggrgqrppgc76vq-3000.app.github.dev/