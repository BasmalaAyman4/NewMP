import React,{useContext} from 'react'
import localFont from "next/font/local";
import { LanguageContext } from '@/LanguageContext';
import styles from '../../styles/Home.module.css'
import Card from '../Global/Card';
const zain = localFont({
    src: [
      {
        path: "../../public/Zain-Regular.ttf",
        weight: "600",
        style: "normal",
      },
    ],
  });
  const PlaywriteDEGrund = localFont({
    src: [
      {
        path: "../../public/PlaywriteDEGrund-Regular.ttf",
        weight: "600",
        style: "normal",
      },
    ],
  });
const FeaturedProduct = ({reacentlyAdded}) => {
    console.log(reacentlyAdded)
    const { translations, lang, dir, code } = useContext(LanguageContext);

  return (
    <>
<section  className={` ${ styles.feature__sec} ${
                            code == "AR"
                              ? zain.className
                              : PlaywriteDEGrund.className
                          }`} dir={dir}>
    <h2 className={`${styles.feature__title}`}> {translations.featured}</h2>
    <div className={`${styles.cards}`}>
                        {
                            reacentlyAdded?.map(prod => (
                              <Card prod={prod} />
                              
                            ))
                        }
                    </div>
 
</section>
    </>
  )
}

export default FeaturedProduct