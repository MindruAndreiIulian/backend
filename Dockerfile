FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

# Define environment variable
ENV FRONTEND_URL=http://react-service:3000
ENV APP_PORT=3001
ENV OPENAI_KEY=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
ENV VERIDION_KEY=T0U9qKCVhtiDBUdblJovoz1Af70P7TeNsYOjWJ7K8gXngbB97PGnMAo4JNiA

CMD ["npm", "start"]
