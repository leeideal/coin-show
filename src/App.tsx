import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from 'react-query/devtools'
import {darkTheme, lightTheme} from "./theme";
import { useState } from "react";


const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
    box-sizing: border-box;
}

body{
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
}

a{
    text-decoration: none;
    color:inherit;  
}
`

function App(){
  const [isDark, setIsDark] = useState(false)
  const toggleDark = () => setIsDark(current => !current)
  return  <>
  <ThemeProvider theme={isDark? darkTheme: lightTheme}>
      <GlobalStyle/ >
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
  </ThemeProvider>
  </> 
}

export default App;


// 다크모드 만들기
// 0. Index.tsx에 있던 ThemeProvider를 state사용을 위해 App.tsx로 옮김
// 1. const [isDark, setIsDark] = useState(false)로 state 만들기
// 2. <ThemeProvider theme={isDark? darkTheme: lightTheme}>로 상태에 따라 theme 바꿔주기
// 3. const toggleDark = () => setIsDark(current => !current)로 state함수 만들어주기
// 3-1. setIsDark()함수의 =>기준 좌측인자는 항상 최근 값을 인자로 받음
// 4. <button onClick={toggleDark}>Toggle Mode</button>로 button을 누를때마다 state가 바뀜



// 버튼에 위치 바꾸기 (App.tsx에 있는 toggleDark함수 기능을 Coins.tsx에 있는 Toggle Mode 버튼으로 보내기)
// 1. Coins.tsx는 <Router/>안에 있어서, <Router toggleDark={toggleDark}/>로 props보내주기
// 2. Router.tsx에 toggleDark함수 호출
// 2-1. interface로 함수를 설명할때는 함수가 어떻게 생겼는지 명시해야함
// 2-2. toggleDark함수 위에 마우스를 두면 설명이 뜨는데, 그걸 복붙하기 -> interface IRouterProps {toggleDark: () => void;}
// 2-3. function Router({toggleDark}:IRouterProps) { ~ 처럼 props 설명해주기
// 3. Coins.tsx에 toggleDark함수 넘기기
// 3-1. {<Coins toggleDark={toggleDark}/>}로 Coins.tsx로 넘기기
// 3-2. interface IRouterProps {toggleDark: () => void;}로 type 설명
// 3-3. function Coins({toggleDark} : ICoinsProps) { ~ 로 props 설명
// 3-4. <button onClick={toggleDark}>Toggle Mode</button>처럼 쓰면 됨
// 정리 : App에 있는 toggleDark가 Router를 거쳐 Coins로 감




// 버튼으로 ApexChart에 optinos mode까지 바꾸기
// 1. <Router isDark={isDark}/>로 state값을 라우터로 보내기
// 2. Router.tsx에 interface로 isDark의 type를 알려주고, <Coin isDark={isDark}/>로 Coin.tsx로 isDark props를 보냄
// 3. Coin.tsx에 interface로 isDark의 type를 알려주고
// 3-1. function Coin({isDark} : ICoinProps) { ~ 로 Coin컴포넌트에 isDark props 주기
// 4. <Route path="chart" element={<Chart isDark={isDark} coinId={coinId as string} />} />를 통해서 Chart.tsx로 isDark props 보내기
// 5. Chart.tsx에서 interface로 isDark의 type를 알려주고, Chart({coinId, isDark} : ChartProps){ ~ 로 isDark props를 보냄
// 6. options={{theme:{mode: isDark? "dark" : "light",}를 통해서 isDark의 값에 따라 달라지게 함
// 정리 : App에 있는 isDark가 Router와 Coin을 거쳐서 Chart로 감