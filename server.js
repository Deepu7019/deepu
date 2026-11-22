kubectl version --client
 minikube version
minikube start --driver=docker
kubectl get nodes
 mkdir program8
cd program8

nano server.js
const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
    res.end("Hello from Node.js running inside Kubernetes!");
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

nano nodejs-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nodejs-app-config
data:
  server.js: |
    const http = require("http");
    const port = 3000;

    const server = http.createServer((req, res) => {
        res.end("Hello from Node.js running inside Kubernetes!");
    });

    server.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });

nano nodejs-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: program-8
  labels:
    app: nodejs
spec:
  containers:
    - name: nodejs
      image: node:18
      command: ["node", "/usr/src/app/server.js"]
      volumeMounts:
        - name: app-code
          mountPath: /usr/src/app
      ports:
        - containerPort: 3000
  volumes:
    - name: app-code
      configMap:
        name: nodejs-app-config

kubectl apply -f nodejs-configmap.yaml
kubectl apply -f nodejs-pod.yaml
kubectl get pods
kubectl describe pod program-8
kubectl port-forward pod/program-8 3000:3000
http://localhost:3000/
