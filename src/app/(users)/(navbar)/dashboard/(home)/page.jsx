"use client";
import { React, CardWithDetail, useState, useEffect } from "@/app/api/routes/page";

const DashboardHome = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        const images = await response.json();
        setImageData(images.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        {imageData.map((image, index) => (
          <div key={index} className={`section_${index + 1}`}>
            <CardWithDetail image_src={image.download_url} image_name={image.author} content={image.author} index={index} />
          </div>
        ))}
      </section>
    </>
  );
};

export default DashboardHome;
