echo Downloading Java...
curl -sL https://github.com/shyiko/jabba/raw/master/install.sh | bash -s -- --skip-rc && . ~/.jabba/jabba.sh
jabba install adoptiumjdk@17.0.8=tgz+https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.8.1%2B1/OpenJDK17U-jdk_x64_linux_hotspot_17.0.8.1_1.tar.gz
jabba use adoptiumjdk@17.0.8
echo Java is installed.
java -version
npm install
clear
node -r dotenv/config src/index.js