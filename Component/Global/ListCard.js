import Image from "next/image";
import React ,{useEffect,useState,useContext}from "react";
import styles from '../../styles/card.module.css'
import cart from "../../assets/images/cart.svg";
import fullscreen from "../../assets/images/full-screen.png";
import heart from "../../assets/images/heart.png";
import { Tooltip } from "@mui/material";
import no from "../../assets/images/no-trolley.png";
import fullheart from '../../assets/images/fullheart.png'
import { useDispatch, useSelector } from "react-redux";
import { favAction } from "../Redux/slices/favslice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Environment from "@/Environment";
import { Col, Container, Row } from "react-bootstrap";

import localFont from "next/font/local";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { LanguageContext } from "@/LanguageContext";
import { ToastContainer, toast } from "react-toastify";
import { shimmer, toBase64 } from "@/Component/Shimmer";

import { useSession } from "next-auth/react";
import { cartActions } from "../Redux/slices/cartslice";
import noImg from '../../assets/images/Logoo.png'
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
const ListCard = ({prod}) => {
    console.log(prod)
    const [show, setShow] = useState(false);
    const { translations, lang, dir, code } = useContext(LanguageContext);
  const[prodDetails,setProdDetails]=useState({})
  const [colorImage, setColorImage] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = (itemId) => {
      setShow(true);
      axios
        .get(`${Environment.baseURL}/api/HomeV2/getItemById?ItemId=${itemId}`, {
          headers: {
            "Content-Type": "application/json",
            webOrMob: 2,
          },
        })
        .then((response) => {
          setProdDetails(response.data.data);
          setColorImage(response.data.data.reacentlyAddedDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const uniqueColors = {};
  
    if (Array.isArray(colorImage)) {
      for (const item of colorImage) {
        const colorKey = `${item.itemColor}-${item.colorHex}`;
        if (!uniqueColors[colorKey]) {
          uniqueColors[colorKey] = {
            itemColor: item.itemColor,
            colorName: item.colorName,
            colorHex: item.colorHex,
            sizes: [],
            productPic: item.productPic,
            productVedio: item.productVedio
  
          };
        }
        uniqueColors[colorKey].sizes.push({
          size: item.sizeName,
          itemSize: item.itemSize,
          qty: item.quantity,
        });
      }
  
      for (const key in uniqueColors) {
        if (uniqueColors.hasOwnProperty(key)) {
          uniqueColors[key].sizes.sort((a, b) => a.itemSize - b.itemSize);
        }
      }
    }
    const result = Object.values(uniqueColors);
    const [selectColor, setSelectColor] = useState({});
    const [firstSize, setFirstSize] = useState({});
    const handleSizeSelection = (size) => {
      setFirstSize(size);
    };
    useEffect(() => {
      setSelectColor(result[0]);
      setFirstSize(result[0]?.sizes[0]);
    }, [prodDetails]);
  
    const handleColorSelection = (color) => {
      setSelectColor(color);
      setFirstSize(color?.sizes[0]);
    };
    const [number, setNumber] = useState(1);
  
    const increaseNumber = () => {
      setNumber(number + 1);
    };
  
    const decreaseNumber = () => {
      if (number > 1) {
        setNumber(number - 1);
      }
    };
    const dispatch = useDispatch();
    function addToFav(e) {
      e.preventDefault();
      dispatch(
        favAction.addItem({
          itemCode: prod.itemCode,
          itemName: prod.itemName,
          image:prod?.mainPic,
          price: prod.dealPrice == 0 ? prod.price : prod.dealPrice,
        })
    )
    }
    const CartFav = useSelector(state => state.fav.favItem)
    const isFavorited = CartFav.some(
      (item) => item.itemCode == prod.itemCode
    );
    useEffect(() => {
      if(typeof window !== 'undefined'){
        localStorage.setItem('CartFav',CartFav.length)
      }
    }, [CartFav]);
    const deleteItm = (id) => {
      dispatch(favAction.deleteItem(id))
  }
  const CartItems = useSelector(state => state.fav.favItem)
  const CartProducts = useSelector(state => state.cart?.cartItems)
  
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
    const { data: session, status } = useSession();
  
    const addToCart = (e) => {
      e.preventDefault();
      const barCode=`'${prodDetails.itemCode}-${selectColor.itemColor}-${firstSize.itemSize}'`;

      dispatch(
        cartActions.addItem({
          itemCode: prodDetails.itemCode,
          itemColor: selectColor.itemColor,
          itemSize: firstSize.itemSize,
          quantity: number,
          img: selectColor?.productPic[0],
          price: prodDetails.dealPrice == 0 ? prodDetails.price : prodDetails.dealPrice,
          itemName: prodDetails.itemName,
          colorName: selectColor.colorName,
          size:firstSize.size,
          qty:firstSize?.qty,
          barCode:barCode
        })
      );
     
  
    /*   if (session != null) {
        axios
          .post(
            `${Environment.baseURL}/api/UserCart/addToCart`,
            {
              userId: session?.data?.id,
              itemCode: prodDetails.itemCode,
              itemColor: selectColor.itemColor,
              itemSize: firstSize.itemSize,
              quantity: number,
              price: prodDetails.dealPrice == 0 ? prodDetails.price : prodDetails.dealPrice,
            },
            {
              headers: {
                Authorization: `Bearer ${session?.data2?.token}`,
                webOrMob: 2,
              },
            }
          )
          .then((response) => {
            if (response.data.success) {
              console.log("Product Added to CartLogin");
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      } */
    };
    return (
      <>
   
       
            <div key={prod.itemCode} className={`${styles.card__list}`} dir={dir}>
              <div className={`${styles.card__body__list}`}>
              <Image
                alt=""
                src={prod?.mainPic}
                loader={() => prod?.mainPic}
                width={320} height={250}
                priority
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
              className={`${styles.card__img__list}`}
              />
              <div className={`${styles.middleimg__overlay__list}`}>
                {
                  prod.quantity==3?
                  <>
                  <div className={`${styles.status}`}>
  <span>OUT OF STOCK</span>
                  </div>
                  </>
                  :
                  ''
                }
              </div>
              
              </div>
              <div>
              <p className={`${styles.prod__para__list}`}>{prod.itemName}</p>
              <p className={`${styles.prod__para__list} ${styles.prod__desc}`}>{prod.itemDesc}</p>
              {
                prod.hasDeal?
                <>
                <del className={`${styles.prod__del__para}`}>EGP {prod.price} </del> <span className={`${styles.prod__price__para}`}>{prod.dealPrice} EGP</span>
                </>
                :
                <p className={`${styles.prod__price__para}`}>{prod.price}</p>
              }
        
<div className={`${styles.end__list}`}>
<Tooltip title="نظرة سريعة">
<button className={`${styles.end__btn__list}`} onClick={()=>handleShow(prod?.itemCode)}>
<Image
  alt=""
  src={fullscreen}
  width={20}
  height={20}
  className={`${styles.svg}`}
 
/>
</button>
</Tooltip>
<Tooltip title="اضف الي المفضلة">
<button className={`${styles.end__btn__list}`}>


 {
isFavorited ?
<Image
alt=""
src={fullheart}
width={20}
height={20}
className={`${styles.svg}`} onClick={()=>deleteItm(prod.itemCode)}/>
:
<Image
alt=""
src={heart}
width={20}
height={20}
className={`${styles.svg}`} onClick={addToFav}/>      
}  
</button>
</Tooltip>
</div>
              </div>
            </div>
            
            <Modal  show={show}
          onHide={() => setShow(false)}
          size="lg">
          <Modal.Header closeButton>
        
          </Modal.Header>
          <Modal.Body>
  <Row>
    <Col xl={6}>
    {selectColor && selectColor.productPic ? (                  
  <Image src={selectColor?.productPic?.[0]} width={300} height={300} loader={()=>selectColor?.productPic?.[0]} priority  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}/>             
                  
                  ) : (
                    <p className={`${styles.noimg__para}`}>No image or video to show</p>
                  )}
    </Col>
    <Col dir={dir} xl={6} className={`${
                              code == "AR"
                                ? zain.className
                                : PlaywriteDEGrund.className
                            } ${styles.quick__body}`}>
   <h2>{prod.itemName}</h2>
   {
                prod.hasDeal?
                <>
                <del className={`${styles.prod__del}`}>EGP{prod.price} </del> <span>{prod.dealPrice} EGP</span>
                </>
                :
                <p>{prod.price}</p>
              }
              <p>{prodDetails.itemDesc}</p>
            
                <div className={`${styles.choose__color}`}>
                  {result.map((color) => (
                    <div
                      key={color.itemColor}
                      style={{
                        backgroundColor: `#${color.colorHex}`,
                        cursor: "pointer",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      className={
                        selectColor?.itemColor == color.itemColor
                          ? `${styles.selectcolorhex} mb-2`
                          : `mb-2 boxshadow`
                      }
                      onClick={() => handleColorSelection(color)}
                    ></div>
                  ))}
                </div>
                <div className={`${styles.size__body}`}>
                  <p>{isClient ? `${translations.SizeAvailable} :` : ""}</p>
                  {selectColor?.sizes?.map((siz) => (
                    <p
                      key={siz.itemSize}
                      className={
                        firstSize?.size == siz?.size
                          ? `${styles.selectsize}`
                          : `${styles.size}`
                      }
                      onClick={() => handleSizeSelection(siz)}
                    >
                      {siz.size}
                    </p>
                  ))}
                </div>
               <div className={`${styles.add__body}`}>
                  <div className={`${styles.watch__btn}`}>
                  {firstSize?.qty >= number ? (
                    <button
                      type="button"
                      className={`${styles.button}`}
                      onClick={addToCart}
                    >
                      <span className={`${styles.button__text}`}>
                        {isClient ? `${translations.AddToCart}` : ""}
                      </span>
                      <span className={`${styles.button__icon}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          stroke="currentColor"
                          height="24"
                          fill="none"
                          className={`${styles.svg}`}
                        >
                          <line y2="19" y1="5" x2="12" x1="12"></line>
                          <line y2="12" y1="12" x2="19" x1="5"></line>
                        </svg>
                      </span>
                    </button>
                  ) : (
                    <p className={`${styles.not}`}>{isClient ? `${translations.ProductQuantityisnotAvailable}` : ''}</p>
                  )}
                  
                </div>
                <div className={`${styles.number__body}`}>
                    <button onClick={increaseNumber}>
                      <AddIcon />
                    </button>
                    <p>{number}</p>
                    <button onClick={decreaseNumber}>
                      <RemoveIcon />
                    </button>
                  </div>
                  </div>
    </Col>
  </Row>
          </Modal.Body>
          <ToastContainer/>
        </Modal>
      
      </>
    );
}

export default ListCard