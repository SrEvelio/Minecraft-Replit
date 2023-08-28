echo Downloading Java...
curl -sL https://github.com/shyiko/jabba/raw/master/install.sh | bash -s -- --skip-rc && . ~/.jabba/jabba.sh
jabba install openjdk@1.17.0
echo Java is installed.
java -version
npm install
clear
node -r dotenv/config index.js