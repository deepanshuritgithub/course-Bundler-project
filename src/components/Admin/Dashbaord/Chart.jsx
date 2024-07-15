import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,

  //ab ye saari chiz jo import kre hai use kha hongii , es chartJS pe register method hai usme saari pass krne hai upar se 

} from "chart.js";

//ab react chartjs se actual chart import krte hai 
import {Line, Doughnut} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
);


export function LineChart() {

    //esme labels ki array bana rha hu sabse phle 
    // const labels = ["abc","abc2","abc3","abc4"];
    const labels = getLastYearMonths();
    //ab options bnane hai jo ki hm pass krenge chart mai 
    const options = {
        responsive: true,
        plugins: {
            legend:{
                position:"bottom",
            }, 
            title:{
                display:true,
                text:"Yearly Views",
            },
        },
    };


    
    const data = {
        labels,
        datasets:[
            {
                label:"Views",
                data:[1,2,3,4],
                borderColor:"rgba(107,70,193,0.5)",
                backgroundColor:"#6b46c1",
            },

        ],
    };


  return <Line options={options} data={data} />

}



export function 
DoughnutChart() {

    
    const data = {
        labels:["Subscribed","Not Subscribed"],
        datasets:[
            {
                //so total users hmmne kitne diya hai qty = 23  ,23 total users hai  , so not subscribed 20 , so subscribed 3 
                label:"Views",
                data:[3,20],
                borderColor:["rgb(62, 12, 171","rgb(214, 43,129)"],
                backgroundColor:["rgba(62, 12, 171, 0.3","rgba(214, 43,129, 0.3)"],
                borderwidth:1,
            },

        ],
    };
    return <Doughnut data={data} />
}




//for a line chart x axis work edit 
//niche bna rha hai es lia function keyword ki help se 
function getLastYearMonths(){
    const labels =[];

    const months=[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];



    const currentMonth = new Date().getMonth();//yha milega mujhe month jo ki hogaa 0 se 11 ke beech mai, 0 mtlb january 
    // console.log(currentMonth); // 0 to 6 = total 7 ho gye 
    const remainMonth = 11-currentMonth;  // left 5 
    for(let i = currentMonth; i < months.length; i--) {  //july to 11
        const element = months[i];
        labels.unshift(element);
        if(i === 0) break;
    }

    // console.log(labels);


                        //5
    for(let i = 11; i > currentMonth; i--) {
        if(i === currentMonth) break;
        const element = months[i];
        labels.unshift(element);
        
    }
    // console.log(labels);
    return labels;

}