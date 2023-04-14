# dist
rm -rf dist
mkdir dist
cd ./dist
mkdir main
mkdir sample
mkdir demo
mkdir workbench
cp -r ../micro-main/dist/* ./main/
cp -r ../micro-sample/dist/* ./sample/
cp -r ../micro-demo/dist/* ./demo/
cp -r ../micro-workbench/dist/* ./workbench/

# build
cd ..
rm -rf build
mkdir build
cd ./build
mkdir main
mkdir sample
mkdir demo
mkdir workbench
cp -r ../micro-main/dist ./main/
cp -r ../micro-sample/dist ./sample/
cp -r ../micro-demo/dist ./demo/
cp -r ../micro-workbench/dist ./workbench/
cp -r ../micro-main/conf ./main/
cp -r ../micro-sample/conf ./sample/
cp -r ../micro-demo/conf ./demo/
cp -r ../micro-workbench/conf ./workbench/
cp ../micro-main/Dockerfile ./main/
cp ../micro-sample/Dockerfile ./sample/
cp ../micro-demo/Dockerfile ./demo/
cp ../micro-workbench/Dockerfile ./workbench/