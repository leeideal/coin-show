import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory, fetchCoinToday } from "../api";
import styled from "styled-components";

const PriceBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Overview = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    margin-top: 1.5vh;
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
const CompareBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const CompareItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    margin-top: 1vh;
    span:first-child{
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 25px;
    }
    span:not(first-child){
        margin-bottom: 15px;
        font-size: 16px;
    }
`


type IPrams = {
    coinId:string;
}

interface todayData {
    0:{
        time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number,
}
}

interface IHistorical {
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number,
}


function Price(){
    const { coinId } = useParams() as IPrams;
    const {isLoading : todayLoading, data : todayData} = useQuery<todayData>(
        ["today", coinId],
        () => fetchCoinToday(coinId),
        {
            refetchInterval: 10000,
        }
    );
    const {isLoading : ohicvLoading, data : ohicvData} = useQuery<IHistorical[]>(["ohlcv", coinId], 
            () => fetchCoinHistory(coinId),
            {
                refetchInterval: 10000,
            }
    );

    function a( a : string | undefined, b : string | undefined){
        return parseInt(String(a))-parseInt(String(b))
    }

    const isLoading = ohicvLoading || todayLoading;
    return (<div>
        {isLoading? "Loading Price..." : 
        <PriceBox>
            <Overview>
                <OverviewItem>
                    <span>Today open :</span>
                    <span>{todayData?.[0].open.toFixed(2)}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Today high :</span>
                    <span>{todayData?.[0].high.toFixed(2)}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Today low :</span>
                    <span>{todayData?.[0].low.toFixed(2)}</span>
                </OverviewItem>
            </Overview>
            <CompareBox>
                <CompareItem>
                    <span>Vs 1day({ohicvData?.[13].time_open.slice(0,10)})</span>
                    <span>open : {a(todayData?.[0].open.toFixed(2), ohicvData?.[13].open.toFixed(2))}</span>
                    <span>high : {a(todayData?.[0].high.toFixed(2), ohicvData?.[13].high.toFixed(2))}</span>
                    <span>low : {a(todayData?.[0].low.toFixed(2), ohicvData?.[13].low.toFixed(2))}</span>
                    <span>close : {a(todayData?.[0].close.toFixed(2), ohicvData?.[13].close.toFixed(2))}</span>
                </CompareItem>
                <CompareItem>
                    <span>Vs 2day({ohicvData?.[12].time_open.slice(0,10)})</span>
                    <span>open : {a(todayData?.[0].open.toFixed(2), ohicvData?.[12].open.toFixed(2))}</span>
                    <span>high : {a(todayData?.[0].high.toFixed(2), ohicvData?.[12].high.toFixed(2))}</span>
                    <span>low : {a(todayData?.[0].low.toFixed(2), ohicvData?.[12].low.toFixed(2))}</span>
                    <span>close : {a(todayData?.[0].close.toFixed(2), ohicvData?.[12].close.toFixed(2))}</span>
                </CompareItem>
                <CompareItem>
                    <span>Vs 1week({ohicvData?.[7].time_open.slice(0,10)})</span>
                    <span>open : {a(todayData?.[0].open.toFixed(2), ohicvData?.[7].open.toFixed(2))}</span>
                    <span>high : {a(todayData?.[0].high.toFixed(2), ohicvData?.[7].high.toFixed(2))}</span>
                    <span>low : {a(todayData?.[0].low.toFixed(2), ohicvData?.[7].low.toFixed(2))}</span>
                    <span>close : {a(todayData?.[0].close.toFixed(2), ohicvData?.[7].close.toFixed(2))}</span>
                </CompareItem>
                
            </CompareBox>
        </PriceBox>
        }
    </div>)
}

export default Price;