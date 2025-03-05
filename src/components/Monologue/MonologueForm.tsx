import React, { useState } from 'react';

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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputText} 
                    onChange={(e) => setInputText(e.target.value)}/>
                <button type="submit">投稿</button>
            </form>
            <div>
                {post.map((item) => (
                    <div key={item.id}>
                        {item.text}
                        <button onClick={() => handleDelete(item.id)}>削除</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MonologueForm;