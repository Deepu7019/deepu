
mkdir -p ~/Desktop/DevOps/prog-6
cd ~/Desktop/DevOps/prog-6

export GITHUB_USER=your_github_username
export GITHUB_PAT='your_github_token'
export DOCKERHUB_USER=your_dockerhub_username


echo $GITHUB_USER
echo $DOCKERHUB_USER

npm init -y
npm install express

nano index.js

const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello! DevOps Program 6 - Docker Hub Pipeline');
});

app.get('/about', (req, res) => {
    res.send('Automated Build Pipeline using Docker Hub');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
EOF


nano Dockerfile

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
EOF


nano gitignore
node_modules/
EOF

docker build -t program-6 .

docker tag program-6 $DOCKERHUB_USER/program-6:latest

docker login -u $DOCKERHUB_USER


docker push $DOCKERHUB_USER/program-6:latest

docker tag program-6 ghcr.io/$GITHUB_USER/program-6:latest

echo $GITHUB_PAT | docker login ghcr.io -u $GITHUB_USER --password-stdin

docker push ghcr.io/$GITHUB_USER/program-6:latest

git init -b main

git remote add origin https://github.com/$GITHUB_USER/prog-6.git


git remote -v


git add .

git commit -m "Initial commit"


git push -u origin main
