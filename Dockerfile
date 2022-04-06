FROM node:16.14.2

#Cria um diretório para a aplicação e define como local de trabalho
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Copia o package.json para o diretório e executa npm install para instalar dependencias
COPY package.json /usr/src/app
RUN npm install

#Copia os arquivos para o diretório de execução criado anteriormente
COPY . /usr/src/app/

#Expoe a porta 3000
EXPOSE 3000 

#Comandos para rodar a aplicação node
CMD ["npm", "start"]