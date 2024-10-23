const express = require('express');
const app = express();
 
app.use(express.json()); // 用于解析 JSON 请求体
 
const PORT = process.env.PORT || 3000;
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const apiRoutes = require('./routes/api');
 
// ... 其他代码
 
app.use('/api', apiRoutes);
 
// ... 其他代码


app.get('/api/userinfo', (req, res) => {  
    res.json({ message: 'User info' });  
});  

app.listen(3000, () => {  
    console.log('Server is running on http://localhost:3000');  
});