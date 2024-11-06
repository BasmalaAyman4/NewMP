import React from 'react'

import Carousel from 'react-bootstrap/Carousel';

import styles from '../../styles/Home.module.css'
import Image from 'next/image';
const Banner = ({bannerHome}) => {
    console.log(bannerHome,'gfdgftg')
  return (
    <>
    {
      bannerHome.length==0?
      ''
      :
   
      <Carousel>
       
         
            {
              bannerHome?.map((bannerItem, index) => (
                <Carousel.Item >
                  <Image alt='' src={bannerItem.bannerLink} className={`${styles.banner}`}
                    quality={100}
                    width={800}
                    height={800}
                    sizes="100vw"
                    loader={() => bannerItem.bannerLink}
                    priority
                  />
                </Carousel.Item>
              ))
            }
        

      </Carousel>
       }
    </>
  )
}

export default Banner