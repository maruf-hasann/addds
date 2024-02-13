import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

import { getCurrentDateCategories } from "../../../../libs/getCurrentDateCategories";

const options = {
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        markers: {
            width: 22,
            height: 22,
            strokeWidth: 0,
            radius: 22,
        },
        offsetX: 0,
        offsetY: 6,
    },
    colors: ["#3C50E0", "#80CAEE", "#e879f9", "#f472b6", "#8b5cf6"],
    chart: {
        height: 335,
        type: "line",
        dropShadow: {
            enabled: true,
            color: "#623CEA14",
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },
        toolbar: {
            show: false,
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
        width: [2, 2, 2, 3, 4],
        curve: "smooth",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
        xaxis: {
            lines: {
                show: true,
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
    markers: {
        size: 12,
        colors: ["#3C50E0", "#80CAEE", "#e879f9", "#f472b6", "#8b5cf6"],
        strokeColors: ["#3C50E0", "#80CAEE", "#e879f9", "#f472b6", "#8b5cf6"],
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
            text: "Count Register",
            style: {
                fontSize: "17px",
                color: "#334155",
            },
        },
        min: 0,
        max: 100,
    },
};

const UserStatisticsLineChart = () => {
    const [state, setState] = useState({
        series: [
            {
                name: "Requested",
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45, 23, 11, 22, 27, 13, 22, 23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },

            {
                name: "Rejected",
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: "Completed",
                data: [18, 12, 30, 48, 12, 13, 22, 14, 32, 23, 45, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: "Fake",
                data: [22, 14, 30, 50, 12, 13, 22, 14, 32, 23, 45, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
    });

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white pl-8 pr-6 pt-7.5 pb-5 shadow-default sm:px-7.5 xl:col-span-8">
            <div className="pt-4 pb-5">
                <h1 className="text-gray-800 font-semibold text-xl">
                    User registration Statistic - February 2024
                </h1>
            </div>

            <div id="chartTwo" className="-ml-5">
                <ReactApexChart
                    options={options}
                    series={state.series}
                    type="line"
                    height={490}
                />
            </div>
        </div>
    );
};

export default UserStatisticsLineChart;
