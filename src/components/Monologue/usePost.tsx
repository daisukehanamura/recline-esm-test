import { useState } from "react";   

type MonologueItem = {
    id: number;
    text: string;
    timestamp: Date;
};

export const usePost = () => {
    const [post, setPosts] = useState<MonologueItem[]>([]);

    const addPost = (text: string) => {
        setPosts(
            [
                ...post,
                {
                    id: post.length + 1,
                    text: text,
                    timestamp: new Date(),
                },
            ]
        )
    };

    // 削除機能を追加
    const deletePost = (id: number) => {
        setPosts(prevPosts => prevPosts.filter(item => item.id !== id));
    };

    return { post, addPost, deletePost};
};

    
