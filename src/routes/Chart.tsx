import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";   // ApexCharts개요.txt참고하기
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

const ApexBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    div {
        margin-top: 1.5vh;
    }
`

interface ChartProps {
    coinId : string;
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

function Chart({coinId} : ChartProps){
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], 
            () => fetchCoinHistory(coinId),
            {
                refetchInterval: 10000,
            }
    );
    return <div>{isLoading ? "Loading Chart..." :  
    <ApexBox>
        <ApexChart 
    type="line"
    series={[
        {
            name: "Price",
            data: data?.map(price => price.close)   
        },
    ]}
    options={{
        theme:{
            mode: isDark ? "dark" : "light",
        },
        chart : {
            height : 400, 
            width: 500,
            toolbar:{         
                show:false,
            },
            background: "transparent",    
        },
        grid: {                 
            show: true,
        },
        yaxis:{               
            show: true,
            decimalsInFloat : 2,
        },
        xaxis:{                 
            labels:{            
                show:true,
            },
            axisTicks:{       
                show: true,
            },
            axisBorder: {      
                show: true,
            },
            type : "datetime",
            categories: data?.map((price) => price.time_close)
        },
        fill:{                  
            type:"gradient",
            gradient:{
                gradientToColors: ["#0be881"],
                stops: [0, 100]
            },
        },
        colors: ["#0fbcf9"],
        tooltip: {              
            y: {
                formatter: (value) => `$ ${value.toFixed(2)}`      
            }
        },
        stroke: {               
            curve: "smooth",    
            width: 5,           
        },
    }}
    />
    
    <ApexChart 
    type="candlestick" 
    options={{
        theme:{
            mode: isDark ? "dark" : "light",
        },
        chart: {
            type: 'candlestick',
            height: 400,
            toolbar:{
                show:false
            },
            background: "transparent",
        },
        title: {
            text: '',
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            decimalsInFloat : 2,
            tooltip: {
              enabled: true,
            }
        },  
    }} 
    series={[
        {
            data : 
                data?.map(function(price){
                    return {
                        x : price.time_close,
                        y : [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)]
                    }
                })
        }
    ]} 
    height={400}/>
    </ApexBox>
    }
</div>
}

export default Chart;
