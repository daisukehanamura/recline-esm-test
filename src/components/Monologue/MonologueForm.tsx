import React, { useState } from 'react';
import './MonologueForm.css';

type MonologueItem = {
    id: number;
    text: string;
    timestamp: Date;
};
const MonologueForm = () => {
    const [post, setPost] = useState<MonologueItem[]>([]);
    const [inputText, setInputText] = useState<string>(''); 

    const addPost = (text: string) => {
        setPost([
            ...post,
            {
                id: post.length,
                text: text,
                timestamp: new Date(),
            },
        ]);
    }

    // 追加: フォームのsubmit処理
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // デフォルトのフォーム送信を防止
        if (inputText.trim()) {  // 空文字でない場合のみ投稿
            addPost(inputText);
            setInputText('');  // 投稿後、入力フィールドをクリア
        }
    };

    const handleDelete = (id: number) => {
        setPost(post.filter((item) => item.id !== id));
    };

    return (
        <div className="monologue-container">
            <form onSubmit={handleSubmit} className="monologue-form">
                <div className="input-container">
                    <input 
                        type="text" 
                        value={inputText} 
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="投稿内容を入力してください"
                        className="text-input"
                    />
                    <button type="submit" className="submit-button">投稿</button>
                </div>
            </form>
            <div className="posts-container">
                {post.map((item) => (
                    <div key={item.id} className="post-item">
                        <p className="post-text">{item.text}</p>
                        <div className="post-footer">
                            <span className="timestamp">
                                {item.timestamp.toLocaleString()}
                            </span>
                            <button 
                                onClick={() => handleDelete(item.id)}
                                className="delete-button"
                            >
                                削除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MonologueForm;
