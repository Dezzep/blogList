const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connection to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
.then(() =>)

app.use('/api/blogs', blogRouter);
