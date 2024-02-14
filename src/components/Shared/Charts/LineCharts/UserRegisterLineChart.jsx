import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

import { getCurrentDateCategories } from "../../../../libs/getCurrentDateCategories";

const options = {
    legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",  
    },
    colors: ["#3b82f6", "#3b82f6"],
    chart: {
        height: 335,
        type: "line",
        toolbar: {
            autoSelected: "pan",
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        x: {
            show: true,
            format: "dd MMMM yyyy",
            formatter: function (val, _index) {
                const currentDate = new Date();
                return new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    val
                ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            },
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1366,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ],
    stroke: {
        width: [5, 6],
        colors: ["#3b82f6"],
        fillOpacity: 1,
        strokeOpacity: 1,
        curve: "smooth",
    },
    grid: {
        xaxis: {
            lines: {
                show: false,
            },
        },
        yaxis: {
            lines: {
                show: false,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 12,
        colors: "#3b82f6",
        strokeColors: ["#3b82f6", "#3b82f6"],
        strokeWidth: 1,
        strokeOpacity: 0.7,
        strokeDashArray: 0,
        fillOpacity: 0.4,
        borderWidth: 2,
        discrete: [],
        hover: {
            size: undefined,
            sizeOffset: 5,
        },
    },
    xaxis: {
        type: "category'",
        categories: getCurrentDateCategories(),
        axisBorder: {
            show: false,
            color: "#93c5fd",
            height: 1,
            offsetX: 0,
            offsetY: 10,
        },
        labels: {
            show: true,
            rotate: -45,
            rotateAlways: true,
            formatter: function (val, index) {
                const date = new Date(val);
                return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                });
            },
        },

        axisTicks: {
            show: false,
        },
        crosshairs: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    yaxis: {
        title: {
            text: "Total Registered",
            style: {
                fontSize: "17px",
                color: "#4b5563",
            },
        },
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        labels: {
            show: false,
        },
    },
};

const UserRegisterLineChart = () => {
    const [state, setState] = useState({
        series: [
            {
                name: "User Registered",
                data: [
                    20, 10, 30, 50, 12, 13, 22, 14, 32, 23, 45, 11, 22, 13, 21,
                    14, 22, 10, 25, 31, 12, 72, 11, 14, 12, 10, 15,
                ],
            },
        ],
    });

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white pl-8 pr-2 pt-7.5 pb-5 shadow-default sm:px-7.5 xl:col-span-8">
            <div className="pt-4">
                <h1 className="text-gray-800 font-semibold text-xl">
                    User registration - February 2024
                </h1>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="line"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserRegisterLineChart;
