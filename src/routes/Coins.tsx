import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    color: ${(props) => props.theme.textColor};
    margin-bottom : 10px;
    border-radius: 15px;
    border: 1px solid white;
    a{
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.35s ease-in;
    }
    &:hover{
        a{
            color: ${props => props.theme.accentColor};
        }
    }
`;


const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    font-size: 48px;
`

const Img = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 15px;
`

interface CoinInterface {
        id: string,
        name: string,
        symbol: string,
        rank: number,
        is_new: boolean,
        is_active: boolean,
        type: string,
};

interface ICoinsProps{}


function Coins({} : ICoinsProps) {
    const setterFn = useSetRecoilState(isDarkAtom);
    const setAtom = () => setterFn(prev => !prev);
    const { isLoading, data} = useQuery<CoinInterface[]>("allCoins", fetchCoins)

    return (
        <Container>
        <Helmet>
            <title>Coins</title>
        </Helmet>
        <Header>
        <Title>Coins</Title>
        <button onClick={setAtom}>Mode Btn</button>
        </Header>
        {isLoading ? <Loader>Loading...</Loader> :
            <CoinList>
                {data?.slice(0, 150).map(coin => (
                <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={{name: coin.name}} >
                        <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        {coin.name} &rarr;
                        </Link>
                </Coin>
            ))}
            </CoinList>
            }
    </Container>
    );
}

export default Coins;

// atom의 value를 바꾸는 방법 (외부적인 요인으로 value를 설정하는 법)
// 1. useSetRecoilState 사용하기 (import도 하기)
// 2. ()안에 atom변수명 넣기 (import도 하기)
// 3. 변수에 useSetRecoilState(isDarkAtom) value 받기
// 3-1. 변수는 함수로 받음 (변수가 value를 수정할 것)
// 3-2. React의 setState와 같은 방식으로 작동
// 4. <button onClick={() => setterFn(prev => !prev)}>Mode Btn</button>처럼 button의 eventlister로 넣기