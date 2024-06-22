echo Downloading Java...
curl -sL https://github.com/shyiko/jabba/raw/master/install.sh | bash -s -- --skip-rc && . ~/.jabba/jabba.sh
jabba install adoptiumjdk@21.0.3=tgz+https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.3%2B9/OpenJDK21U-jdk_x64_linux_hotspot_21.0.3_9.tar.gz
jabba use adoptiumjdk@21.0.3
echo Java is installed.
java -version
npm install
clear
node -r dotenv/config src/index.js