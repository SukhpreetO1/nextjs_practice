"use client"
import { CardWithDetail } from '@/app/api/routes/page';
import React, { useEffect, useState } from 'react'

const SingleBlogsContent = (req) => {
    const [blog, setData] = useState([]);
    const id = req.params.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/blogs/blog_detail/${id}`);
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div>
                <CardWithDetail image_src={blog.image} image_name={blog.title} title={blog.title} content={blog.description} index="1" className="blogs_cards"/>
            </div>
        </>
    )
}

export default SingleBlogsContent