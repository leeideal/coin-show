import { useQuery } from "react-query";
import { Routes, Route, useParams, useLocation, useMatch } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

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
    justify-content: space-between;
    align-items: center;
    color:${props => props.theme.accentColor};
    a{
        width:32px;
        height: 32px;
    }
`;

const Gostdiv = styled.div`
    width:32px;
    height: 32px;
`

const Title = styled.h1`
    font-size: 48px;
`;

const Loader = styled.span`
    text-align: center;
    font-size: 48px;
`

const Overview = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
`

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child{
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`

const Description = styled.p`
    margin: 30px 0px;
`
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;


interface ILocation {
    state:{
        name:string;
    };
}

type IPrams = {
    coinId:string;
}

interface ITag {
    id:           string;
    name:         string;
    coin_counter: number;
    ico_counter:  number;
}

interface InfoData{
    id:                 string;
    name:               string;
    symbol:             string;
    rank:               number;
    is_new:             boolean;
    is_active:          boolean;
    type:               string;
    tags:               ITag[];
    team:               object;
    description:        string;
    message:            string;
    open_source:        boolean;
    started_at:         string;
    development_status: string;
    hardware_wallet:    boolean;
    proof_type:         string;
    org_structure:      string;
    hash_algorithm:     string;
    first_data_at:      string;
    last_data_at:       string;
}

interface PriceData{
    id:                 string;
    name:               string;
    symbol:             string;
    rank:               number;
    circulating_supply: number;
    total_supply:       number;
    max_supply:         number;
    beta_value:         number;
    first_data_at:      string;
    last_updated:       string;
    quotes:             {
        USD: {
            price:                  number;
            volume_24h:             number;
            volume_24h_change_24h:  number;
            market_cap:             number;
            market_cap_change_24h:  number;
            percent_change_15m:     number;
            percent_change_30m:     number;
            percent_change_1h:      number;
            percent_change_6h:      number;
            percent_change_12h:     number;
            percent_change_24h:     number;
            percent_change_7d:      number;
            percent_change_30d:     number;
            percent_change_1y:      number;
            ath_price:              number;
            ath_date:               string;
            percent_from_price_ath: number;
        }
    }
}

interface ICoinProps{}

function Coin({} : ICoinProps) {
    const { coinId } = useParams() as IPrams;
    const {state} = useLocation() as ILocation;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const {isLoading : infoLoading, data: infoData} = useQuery<InfoData>(
        ["info", coinId], () => fetchCoinInfo(coinId))
    const {isLoading : tickerLoading, data: tickerData} = useQuery<PriceData>(
        ["tickers", coinId], () => fetchCoinTickers(coinId),
        {
            refetchInterval: 5000,
        }
    );

    const loading = infoLoading || tickerLoading;

    return <Container>
    <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
    </Helmet>
    <Header>
    <Gostdiv></Gostdiv>
    <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
    <Link to="/coin-show/">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x"/>
    </Link>
    </Header>
    {loading ? <Loader>Loading...</Loader> : (
        <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>{infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price:</span>
                    <span>{tickerData?.quotes?.USD?.price?.toFixed(3)}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Suply:</span>
                    <span>{tickerData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickerData?.max_supply}</span>
                </OverviewItem>
            </Overview>

            <Tabs>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>Chart</Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
            </Tabs>

            <Routes>
                <Route path="price" element={<Price />}/>
                <Route path="chart" element={<Chart coinId={coinId as string} />} />
            </Routes>
        </>
    )}
    </Container>
}

export default Coin;


