type MonologueProps = { 
    post: string
    post2: string
 };

const Monologue = ({post,post2} : MonologueProps) => {
    return (
        <div className="post-container">
        <h3>今日のつぶやき</h3>
        <h4>{post}</h4>
        <h4>{post2}</h4>
      </div>
    );
};

// 1. 分割代入を使わない場合
// https://typescriptbook.jp/reference/values-types-variables/object/destructuring-assignment-from-objects
// export const Monologue = (props: { post: string }) => {
//     return (
//         <div>{props.post}</div>
//     );
// };

// // 2. 型定義を別に書く場合
// type MonologueProps = {
//     post: string;
// };

export default Monologue;
