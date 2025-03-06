import React, { useEffect, useState } from 'react';
import './MonologueForm.css';

type MonologueItem = {
    id: number;
    text: string;
    timestamp: Date;
};
const MonologueForm = () => {
    const [post, setPost] = useState<MonologueItem[]>([]);
    const [inputText, setInputText] = useState<string>(''); 

    const inputRef = React.useRef<HTMLInputElement>(null);
    const postsContainerRef = React.useRef<HTMLDivElement>(null);

    // useRefを使用する
    // ↓ 以下の3つの要素で構成されています
    // 1. inputRef.current  // RefオブジェクトのDOM参照
    // 2. ?.               // オプショナルチェーン演算子
    // 3. focus()          // DOM APIのメソッド
    useEffect(() => {
        if (inputText === '') {
            inputRef.current?.focus();
            console.log('フォーカスが移動しました');
        }
    }, [inputText]);

    // useEffectの学習,初回表示時
    // 第二引数に空の配列を渡すことで、初回表示時のみ実行される
    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            const parsedPosts = JSON.parse(savedPosts).map((post: any) => (
                {...post,
                    timestamp: new Date(post.timestamp)
                }
            ));
            setPost(parsedPosts);
        }
        console.log('投稿が追加されました');
    }, []);

    // useEffectの学習,投稿が追加された時
    // 第二引数にpostを渡すことで、postが更新された時のみ実行される
    useEffect(() => {
        if (post.length > 0) {
        localStorage.setItem('posts', JSON.stringify(post));
        console.log('ローカルストレージに保存:', post);
        }
    }, [post]);

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
                        ref={inputRef}
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
