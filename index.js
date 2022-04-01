import express from 'express';
import fetch from 'node-fetch';
import uniqolor from 'uniqolor';

const app = express();

const mainStyle = `
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 1440px;
`;

const containerStyle = `
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;

const cardStyle = `
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const imgUrl = 'https://picsum.photos/200/300';
const textUrl = 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1';

app.get('/', async function (req, res) {
  const response = await fetch(textUrl);
  const text = await response.json();

  const card = `
    <div style="${cardStyle}">
      <image src="${imgUrl}" alt="image" width="250" height="300"></image>
      <p style="font-size: 12px; color: ${uniqolor.random().color}">
        ${text}
      </p>
    </div>
  `;

  const cards = Array.from({length: 10}, (_) => card).join(' ');

  const template = `
    <div style="${mainStyle}">
      <h1>Random images/text/color<h1>
      <div style="${containerStyle}">
        ${cards}
      </div>
    </div>
  `;
  
  res.send(template);
})

app.listen(3000);
console.log('listening on port 3000');
