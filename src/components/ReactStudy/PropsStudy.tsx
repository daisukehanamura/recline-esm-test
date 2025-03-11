type MonologueProps = { 
    post: string
    post2: string
 };

 // Propsの勉強
const PropsStudy = ({post,post2} : MonologueProps) => {
    return (
        <div className="post-app">
        <h3>今日のつぶやき</h3>
        <h4>{post}</h4>
        <h4>{post2}</h4>
      </div>
    );
};

export default PropsStudy;
