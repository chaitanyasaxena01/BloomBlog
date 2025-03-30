import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import databaseService from "../../lib/db";
import storageService from "../../lib/storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [error, setError] = useState("");
    
    const submit = async (data) => {
        try {
            setError(""); // Clear any previous errors
            console.log('Form data:', data);
            if (post) {
                console.log('Updating existing post:', post.$id);
                const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;
                console.log('File upload result:', file);
                
                if (file === false) {
                    setError("Failed to upload image. Please make sure you are logged in and try again.");
                    return;
                }

                if (file) {
                    console.log('Deleting old featured image:', post.featuredImage);
                    await storageService.deleteFile(post.featuredImage);
                }

                const updateData = {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                };
                console.log('Update data:', updateData);
                const dbPost = await databaseService.updatePost(post.slug, updateData);
                console.log('Update result:', dbPost);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image || !data.image[0]) {
                    console.error('Featured image is required');
                    setError("Featured image is required");
                    return;
                }
                
                console.log('Uploading new file:', data.image[0]);
                const file = await storageService.uploadFile(data.image[0]);
                console.log('File upload result:', file);
                
                if (file === false) {
                    setError("Failed to upload image. Please make sure you are logged in and try again.");
                    return;
                }

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const createData = { 
                        ...data, 
                        userId: userData?.$id 
                    };
                    console.log('Create post data:', createData);
                    const dbPost = await databaseService.createPost(createData);
                    console.log('Create post result:', dbPost);

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {error && <div className="w-full mb-4 p-2 bg-red-100 text-red-600 rounded-lg">{error}</div>}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}