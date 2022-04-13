echo Downloading Java...
curl -sL https://github.com/shyiko/jabba/raw/master/install.sh | bash -s -- --skip-rc && . ~/.jabba/jabba.sh
jabba install adopt@1.8-0
echo Java is installed.
java -version
npm i
node index