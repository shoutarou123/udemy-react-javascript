export const ColorfulMessage = (props) => {
  // 引数なので好きな名前で受け取れる 今回はpropsという名前で受け取る
  // 引数のpropsの中身は{color: 'blue', message: 'お元気ですか？'}

  const { color, children} = props; // prppsからcolorとchildrenを取り出すと後の記述でpropsという記述が不要になる
  console.log("-------ColorfulMessage-------");
  const contentStyleA = {
    color: color, // propsの中のcolorを使用している
    fontSize: "18px"
  };
  return (
   <>
    <p style={contentStyleA}>{children}</p>
   </>
   
  )
}