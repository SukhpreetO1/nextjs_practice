"use client"
import { React, Image, AVATAR_ABOUT_IMAGE } from '@/app/api/routes/page';

const About = () => {
  return (
    <>
      <section>
        <div className='about_content text-justify mx-10 mb-8'>
          <div className="about_heading">
            <p className='heading text-5xl mb-6 font-bold text-center'>About</p>
          </div>
          <div className="images_and_content flex">
            <div className="about_content mx-16 text-xl font-light leading-loose">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, incidunt quos, eaque voluptas voluptates voluptate fugit ea enim est, aliquam nisi. Sapiente pariatur impedit, voluptates accusantium aliquam voluptate rem incidunt sit temporibus quo cumque totam suscipit tempore dolore officiis repellendus molestiae voluptas in veniam labore? Reiciendis facere quia aliquam. Eius, necessitatibus at laboriosam nostrum amet consectetur temporibus libero soluta similique aperiam! Quaerat illum doloribus omnis ratione deleniti sed inventore consectetur vero voluptate? Labore rem facere voluptatum, aspernatur adipisci necessitatibus sequi quia praesentium laudantium. Repellendus excepturi similique aut minima voluptatibus impedit, autem, unde aliquid eum atque distinctio laborum necessitatibus corporis. Facilis nulla facere vel nam tenetur at, mollitia, expedita pariatur totam libero fugiat. Aut saepe pariatur ea alias nesciunt animi porro accusamus unde. Quidem quasi earum voluptatibus. Voluptatibus facere aperiam, distinctio quo tempora voluptatem asperiores autem obcaecati, quas consequuntur ex rem eos exercitationem veritatis est reprehenderit quis blanditiis sit iste porro. Reiciendis dolore possimus iusto fuga asperiores iure</p>
            </div>

            <div className="about_image">
              <Image src={AVATAR_ABOUT_IMAGE} width={0} height={0} alt='avatar_about' className='about_avatar_image' layout="responsive" quality={80}/>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About