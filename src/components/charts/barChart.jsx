import { useEffect, useState } from "react"
import Chart from 'chart.js/auto';

function BarChart() {
    const [blogData, setBlogData] = useState();

    useEffect(() => {
        const fetchBlogData = async () => {
            const response = await fetch('/api/blogs');
            const responseData = await response.json();
            setBlogData(responseData.data);
        };

        fetchBlogData();
    }, []);

    useEffect(() => {
        if (blogData) {
            const blogCreationData = blogData.reduce((accumulator, blog) => {
                const createdAtDate = new Date(blog.created_at).toLocaleDateString();
                accumulator[createdAtDate] = (accumulator[createdAtDate] || 0) + 1;
                return accumulator;
            }, {});            

            const labels = Object.keys(blogCreationData);
            const data = Object.values(blogCreationData);

            var ctx = document.getElementById('blogChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        label: "Number of Blogs Added",
                        borderColor: "rgb(255, 99, 71)",
                        backgroundColor: "rgba(255, 99, 71, 0.8)",
                        borderWidth: 2
                    }]
                },
                options: {
                    indexAxis: 'y',
                }
            });
        }
    }, [blogData])
    return (
        <>
            <div className='border border-gray-400 pt-0 rounded-xl w-2/5 h-80 shadow-xl my-4'>
                <canvas id='blogChart' className="w-3/4 h-96"></canvas>
            </div>
        </>
    )
}

export default BarChart;