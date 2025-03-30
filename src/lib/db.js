// Database service using Prisma
import prisma from './prisma.js';
import { v4 as uuidv4 } from 'uuid';

export class DatabaseService {
  constructor() {
    // Prisma client is imported from prisma.js
  }

  // Create a new post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await prisma.post.create({
        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId
        }
      });
    } catch (error) {
      console.log("Database service :: createPost :: error", error);
      throw error;
    }
  }

  // Update an existing post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await prisma.post.update({
        where: { slug },
        data: {
          title,
          content,
          featuredImage,
          status
        }
      });
    } catch (error) {
      console.log("Database service :: updatePost :: error", error);
      throw error;
    }
  }

  // Delete a post
  async deletePost(slug) {
    try {
      await prisma.post.delete({
        where: { slug }
      });
      return true;
    } catch (error) {
      console.log("Database service :: deletePost :: error", error);
      return false;
    }
  }

  // Get a single post by slug
  async getPost(slug) {
    try {
      return await prisma.post.findUnique({
        where: { slug },
        include: { author: true }
      });
    } catch (error) {
      console.log("Database service :: getPost :: error", error);
      return null;
    }
  }

  // Get all posts with optional filter for active status
  async getPosts(active = true) {
    try {
      return await prisma.post.findMany({
        where: active ? { status: 'active' } : {},
        include: { author: true },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.log("Database service :: getPosts :: error", error);
      return [];
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;