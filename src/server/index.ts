import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../build')));

// プロフィールデータのエンドポイント
app.get('/api/profile', (_: Request, res: Response) => {
  const profile = {
    name: "Your Name",
    title: "ソフトウェアエンジニア",
    description: "技術とクリエイティビティを組み合わせることが好きなエンジニアです。",
    skills: [
      "JavaScript/TypeScript",
      "React",
      "Node.js",
      "Express",
      "Git"
    ],
    interests: [
      "ウェブ開発",
      "UI/UXデザイン",
      "新技術の学習"
    ]
  };
  
  res.json(profile);
});

// その他のルートはReactアプリにフォールバック
app.get('*', (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

export {};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
