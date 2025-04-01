import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:9000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to BloomBlog API' });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create post endpoint
app.post('/api/posts', async (req, res) => {
  try {
    const { title, slug, content, featuredImage, status, userId } = req.body;

    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Validate required fields
    if (!title || !slug || !content) {
      return res.status(400).json({
        error: 'Missing required fields: title, slug, and content are required'
      });
    }
    
    // Validate userId is provided
    if (!userId) {
      return res.status(400).json({
        error: 'userId is required to create a post'
      });
    }

    // Check if slug is unique
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (existingPost) {
      return res.status(400).json({
        error: 'A post with this slug already exists'
      });
    }

    // Validate user exists if userId is provided
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(400).json({
          error: 'Invalid userId: User not found'
        });
      }
    } else {
      // If userId is not provided, return a specific error message
      return res.status(400).json({
        error: 'userId is required to create a post'
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        featuredImage,
        status: status || 'draft',
        userId
      },
      include: {
        author: true
      }
    });

    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'A post with this slug already exists'
      });
    }
    res.status(500).json({
      error: 'Failed to create post. Please try again.'
    });
  }
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});