# Use a imagem oficial do Node.js
FROM node:18-alpine

# Cria e define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "server.js"]