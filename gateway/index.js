const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));

// Proxy routes
app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL || 'http://localhost:5001',
  changeOrigin: true,
  logLevel: 'debug'
}));

app.use('/api/movies', createProxyMiddleware({
  target: process.env.MOVIE_SERVICE_URL || 'http://localhost:5002',
  changeOrigin: true,
  logLevel: 'debug'
}));

app.use('/api/reviews', createProxyMiddleware({
  target: process.env.REVIEW_SERVICE_URL || 'http://localhost:5003',
  changeOrigin: true,
  logLevel: 'debug'
}));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Cineverse Gateway' });
});

app.listen(PORT, () => {
  console.log(`[Gateway] API Gateway running on port ${PORT}`);
});
