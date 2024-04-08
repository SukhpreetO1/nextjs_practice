import { useEffect, useState } from "react"
import Chart from 'chart.js/auto';

function LineChart() {
    const [usersData, setUsersData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/users');
            const responseData = await response.json();
            setUsersData(responseData.data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (usersData) {
            const userCreationData = usersData.reduce((accumulator, user) => {
                const timestamp = user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000;
                const createdAtDate = new Date(timestamp).toLocaleDateString();
                accumulator[createdAtDate] = (accumulator[createdAtDate] || 0) + 1;
                return accumulator;
            }, {});

            const labels = Object.keys(userCreationData);
            const data = Object.values(userCreationData);

            var ctx = document.getElementById('userChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        label: "Number of Users Created",
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                        fill: false,
                    }]
                }
            });
        }
    }, [usersData]);

    return (
        <>
            <div className='border border-gray-400 pt-0 rounded-xl w-2/5 h-80 shadow-xl my-4'>
                <canvas id='userChart' className="w-3/4 h-96"></canvas>
            </div>
        </>
    )
}

export default LineChart;