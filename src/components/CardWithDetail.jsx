"use client";
import { React, Image } from '@/app/api/routes/page';

const CardWithDetail = ({ image_src, image_name, content, index }) => {
    const isEven = index % 2 === 0;

    return (
        <>
            <div>
                <div className="dashboard_card_section flex mx-8">
                    <div className={`dashboard_images mt-10 mr-8 ${isEven ? 'order-1' : 'order-2'}`}>
                        <Image src={image_src} width={0} height={0} alt={image_name} className='dashboard_home_images' layout="responsive" quality={80}/>
                    </div>
                    <div className={`dashboard_content mt-10 text-justify mr-8 text-xl font-light w-full lg:w-3/4 ${isEven ? 'order-2' : 'order-1'}`}>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardWithDetail
