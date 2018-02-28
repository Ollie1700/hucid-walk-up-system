# ECS Walk up and use system

## How to run
```npm install```
```npm run dev```
Project starts on ```localhost:8080```

This kicks off an npm script which runs nodemon and a gulp script which watches for SASS changes and immediately compiles it to CSS.

## Build for production
```gulp build```

This will bundle everything up in a ```dist``` folder. To remove the ```dist``` folder, just run ```gulp clean:dist```