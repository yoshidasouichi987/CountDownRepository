import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
//静的公開
for (let i = 1; i <= 4; i++) { // 必要な分だけ増やす
 app.use(`/slides${i}`, express.static(path.join(process.cwd(), `slides${i}`)));
}

app.get('/slides/:num', (req, res) => {
  const num = req.params.num;
  //ディレクトリパス
  const dirPath = `slides${num}`;
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      const filePaths = files.map(f=>`${dirPath}/${f}`);
      res.json(filePaths);
    } else {
      res.status(404).json([]); 
    }
  } catch (error) {
    res.status(500).json([]);
    console.log("error /slides/num");
  }
});
//localhostでなく0.0.0.0でサーバをリスンする
app.listen(PORT, '0.0.0.0' ,() => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//    https://special-zebra-pj9ggrgqrppgc76vq-3000.app.github.dev/