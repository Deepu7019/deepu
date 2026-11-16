mkdir prog4
cd prog4
npm init -y
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Git + Docker Integration!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
npm install express
# Stage 1 Build Stage
FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# Stage 2 Runtime Stage
FROM node:18-slim
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["node", "index.js"]
sudo docker build -t prog4 .
sudo docker run -d -p 3000:3000 --name prog4-container prog4
git hub
nano .gitignore
node_modules/
git init
git add .
git status
git commit -m "Initial commit"
git branch -M main

git remote add origin https://github.com/YOUR_USERNAME/prog4.git
or 
git remote set-url origin https://github.com/kmkavyasri/program4_devops-p4-.git

git remote -v
git push -u origin main
