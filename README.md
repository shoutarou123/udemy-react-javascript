１．Propsはコンポーネントに渡す引数のようなもの

２．Propsは通常親から子へ渡すもの
App.jsx → ColofulMessage.jsx

※ しかしpropsに関数を親から子へ渡して、子から親にデータを渡すことで逆方向の受け渡しもできる
例）
<App.jsx>
import ColorfulMessage from "./ColorfulMessage";

const App = () => {
  const handleMessageChange = (newMessage) => {
    alert(`受け取ったメッセージ: ${newMessage}`);
  };

  return <ColorfulMessage sendMessage={handleMessageChange} />;
};

export default App;
<!-- ****************************************************************************** -->
<ColofulMessage.jsx>
const ColorfulMessage = (props) => {
  return (
    <button onClick={() => props.sendMessage("子からのメッセージ！")}>
      メッセージを送る
    </button>
  );
};

export default ColorfulMessage;

<!-- ****************************************************************************** -->
childrenとは親コンポーネントで囲われたpropsを子で受け取るときの名称として記述するもの
<App.jsx>
import { ColorfulMessage } from "./components/ColorfulMessage";

export const App = () => {

  const onClickButton = () => alert();
  
  return (
    <>
      <h1 style={{ color: "red" }}>ほげ</h1>
      <ColorfulMessage color="blue">お元気ですか？</ColorfulMessage> <!-- colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) -->
      <ColorfulMessage color="green">元気です</ColorfulMessage> <!-- colorという好きな名前でpropsを渡す greenという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) -->
      <button onClick={onClickButton}>ボタン</button>
    </>
  );
};


<ColorfulMessage.jsx>
export const ColorfulMessage = (props) => {
  <!-- 引数なので好きな名前で受け取れる 今回はpropsという名前で受け取る -->
  <!-- 引数のpropsの中身は{color: 'blue', message: 'お元気ですか？'} -->

  const { color, children} = props;
  <!-- prppsからcolorとchildrenを取り出すと後の記述でpropsという記述が不要になる -->

  const contentStyleA = {
    color: color,
    <!-- propsの中のcolorを使用している 省略記法によりcolorだけの1文字にすることも可能-->
    fontSize: "18px"
  };
  return (
   <>
    <p style={contentStyleA}>{children}</p>
   </>
   
  )
}

<!-- ****************************************************************************** -->

<ColorfulMessage.jsx>
export const ColorfulMessage = ({ color, children}) => {
  <!-- 上記の引数内で分割代入することによりconst { color, children} = props; の記述を不要にすることもできる -->
  const contentStyleA = {
    color: color,
    fontSize: "18px"
  };
  return (
   <>
    <p style={contentStyleA}>{children}</p>
   </>
   
  )
}

<!-- ****************************************************************************** -->
Reactから提供されているuse系全てに共通する事項：関数コンポーネントの1番上の階層でしか呼べない
Reactはバッチ処理といって、すぐに反映するのではなく、関数が終わってからまとめて処理をする
<App.jsx>
import { useState } from "react";
import { ColorfulMessage } from "./components/ColorfulMessage";

export const App = () => {
  const [num, setNum] = useState(0);
  const onClickCountUp = () => {
    setNum(num + 1); <!-- ここですぐ処理せず、関数が終わってからまとめて処理するので、下で同じ実装をしても1つの処理しか行われない -->
    setNum(num + 1);
  };
  
  return (
    <>
      <h1 style={{ color: "red" }}>ほげ</h1>
      <ColorfulMessage color="blue">お元気ですか？</ColorfulMessage> {/* colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) */}
      <ColorfulMessage color="green">元気です</ColorfulMessage> {/* colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) */}
      <button onClick={onClickCountUp}>カウントアップボタン</button>
      <p>{num}</p>
    </>
  );
};

<!-- ****************************************************************************** -->
Reactはバッチ処理といって、すぐに反映するのではなく、関数が終わってからまとめて処理をする
<App.jsx>
import { useState } from "react";
import { ColorfulMessage } from "./components/ColorfulMessage";

export const App = () => {
  const [num, setNum] = useState(0);
  const onClickCountUp = () => {
    setNum(num + 1); <!-- ここで処理するのではなく、関数が終わってからまとめて処理をするので、ボタン押しても1ずつしか更新されない -->
    setNum(num + 1);
  };
  
  return (
    <>
      <h1 style={{ color: "red" }}>ほげ</h1>
      <ColorfulMessage color="blue">お元気ですか？</ColorfulMessage> {/* colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) */}
      <ColorfulMessage color="green">元気です</ColorfulMessage> {/* colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) */}
      <button onClick={onClickCountUp}>カウントアップボタン</button>
      <p>{num}</p>
    </>
  );
};

<!-- ****************************************************************************** -->
<App.jsx>
import { useState } from "react";
import { ColorfulMessage } from "./components/ColorfulMessage";

export const App = () => {
  const [num, setNum] = useState(0);
  const onClickCountUp = () => {
    setNum((prev) => prev + 1); <!-- set関数の引数に関数を入れると引数に現在のnumの値が入る。引数なので名称は好きなものを指定することはできる。これにより今現在の値を使用することができ、処理もこの時に行われる -->
    setNum((prev) => prev + 1); <!-- よって2ずつ値が更新される  -->
  };
  
  return (
    <>
      <h1 style={{ color: "red" }}>ほげ</h1>
      <ColorfulMessage color="blue">お元気ですか？</ColorfulMessage> {/* colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) */}
      <ColorfulMessage color="green">元気です</ColorfulMessage> {/* colorという好きな名前でpropsを渡す blueという文字列を渡す(数字でもオブジェクトでも関数でも渡せる) */}
      <button onClick={onClickCountUp}>カウントアップボタン</button>
      <p>{num}</p>
    </>
  );
};

<!-- ****************************************************************************** -->