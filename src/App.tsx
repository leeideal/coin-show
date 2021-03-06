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


// ???????????? ?????????
// 0. Index.tsx??? ?????? ThemeProvider??? state????????? ?????? App.tsx??? ??????
// 1. const [isDark, setIsDark] = useState(false)??? state ?????????
// 2. <ThemeProvider theme={isDark? darkTheme: lightTheme}>??? ????????? ?????? theme ????????????
// 3. const toggleDark = () => setIsDark(current => !current)??? state?????? ???????????????
// 3-1. setIsDark()????????? =>?????? ??????????????? ?????? ?????? ?????? ????????? ??????
// 4. <button onClick={toggleDark}>Toggle Mode</button>??? button??? ??????????????? state??? ??????



// ????????? ?????? ????????? (App.tsx??? ?????? toggleDark?????? ????????? Coins.tsx??? ?????? Toggle Mode ???????????? ?????????)
// 1. Coins.tsx??? <Router/>?????? ?????????, <Router toggleDark={toggleDark}/>??? props????????????
// 2. Router.tsx??? toggleDark?????? ??????
// 2-1. interface??? ????????? ??????????????? ????????? ????????? ???????????? ???????????????
// 2-2. toggleDark?????? ?????? ???????????? ?????? ????????? ?????????, ?????? ???????????? -> interface IRouterProps {toggleDark: () => void;}
// 2-3. function Router({toggleDark}:IRouterProps) { ~ ?????? props ???????????????
// 3. Coins.tsx??? toggleDark?????? ?????????
// 3-1. {<Coins toggleDark={toggleDark}/>}??? Coins.tsx??? ?????????
// 3-2. interface IRouterProps {toggleDark: () => void;}??? type ??????
// 3-3. function Coins({toggleDark} : ICoinsProps) { ~ ??? props ??????
// 3-4. <button onClick={toggleDark}>Toggle Mode</button>?????? ?????? ???
// ?????? : App??? ?????? toggleDark??? Router??? ?????? Coins??? ???




// ???????????? ApexChart??? optinos mode?????? ?????????
// 1. <Router isDark={isDark}/>??? state?????? ???????????? ?????????
// 2. Router.tsx??? interface??? isDark??? type??? ????????????, <Coin isDark={isDark}/>??? Coin.tsx??? isDark props??? ??????
// 3. Coin.tsx??? interface??? isDark??? type??? ????????????
// 3-1. function Coin({isDark} : ICoinProps) { ~ ??? Coin??????????????? isDark props ??????
// 4. <Route path="chart" element={<Chart isDark={isDark} coinId={coinId as string} />} />??? ????????? Chart.tsx??? isDark props ?????????
// 5. Chart.tsx?????? interface??? isDark??? type??? ????????????, Chart({coinId, isDark} : ChartProps){ ~ ??? isDark props??? ??????
// 6. options={{theme:{mode: isDark? "dark" : "light",}??? ????????? isDark??? ?????? ?????? ???????????? ???
// ?????? : App??? ?????? isDark??? Router??? Coin??? ????????? Chart??? ???