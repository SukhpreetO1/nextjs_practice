"use client";
import { React, Image } from '@/app/api/routes/page';

const CardWithDetail = ({ image_src, image_name, content, index, title, className }) => {
    const isEven = index % 2 === 0;

    return (
        <>
            <div>
                <div className="dashboard_card_section flex mx-24 mb-8">
                    <div className={`dashboard_images mt-10 mr-8 ${isEven ? 'order-1' : 'order-2'}`}>
                        <Image src={image_src} width={0} height={0} alt={image_name} className={isEven ? `${className}_order_1` : `${className}`} layout="responsive" quality={80}/>
                    </div>
                    <div className={`dashboard_content mt-10 text-justify mr-8 text-xl font-light w-full lg:w-4/6 ${isEven ? 'order-2' : 'order-1'}`}>
                        <p className='break-words text-justify font-bold italic text-2xl leading-loose mb-4'>{title}</p>
                        <p className='break-words text-justify font-light leading-loose text-base'>{content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardWithDetail
