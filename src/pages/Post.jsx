import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../lib/db";
import storageService from "../lib/storage";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databaseService.deletePost(post.slug).then((status) => {
            if (status) {
                storageService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-6 relative border rounded-xl p-2 shadow-md overflow-hidden">
                    <img
                        src={storageService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full max-h-[500px] object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-primary-500" className="mr-3 hover:bg-primary-600 transition-colors">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="hover:bg-red-600 transition-colors" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-8">
                    <h1 className="text-3xl font-bold text-secondary-800 font-display">{post.title}</h1>
                </div>
                <div className="browser-css prose prose-lg max-w-none prose-headings:font-display prose-headings:text-secondary-800 prose-p:text-secondary-600">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}