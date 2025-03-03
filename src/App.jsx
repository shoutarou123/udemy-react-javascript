import { useEffect, useState } from "react";
import { ColorfulMessage } from "./components/ColorfulMessage";

export const App = () => {
  console.log("-------App-------");
  const [num, setNum] = useState(0);
  const [isShowFace, setIsShowFace] = useState(false);
  const onClickCountUp = () => {
    setNum((prev) => prev + 1);
  };
  
  const onClickToggle = () => {
    setIsShowFace(!isShowFace);
  };

  useEffect(() => {
    if (num > 0) {
      if (num % 3 === 0) {
        isShowFace || setIsShowFace(true);
      } else {
        isShowFace && setIsShowFace(false);
      }
    }
  }, [num]);


  
  

  return (
    <>
      <h1 style={{ color: "red" }}>ほげ</h1>
      <ColorfulMessage color="blue">お元気ですか？</ColorfulMessage> {/* colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) */}
      <ColorfulMessage color="green">元気です</ColorfulMessage> {/* colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) */}
      <button onClick={onClickCountUp}>カウントアップボタン</button>
      <p>{num}</p>
      <button onClick={onClickToggle}>on/off</button>
      {isShowFace && <p>!(^^)!</p>}
      
    </>
  );
};
