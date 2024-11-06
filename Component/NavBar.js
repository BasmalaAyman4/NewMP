import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import localFont from "next/font/local";
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Environment from "@/Environment";
import logoutimg from "../assets/images/logout.png";
import Popover from "@mui/material/Popover";
import logo from "../assets/images/logo.png";
import Image from "next/image";
import login from "../assets/images/login.svg";
import search from "../assets/images/search.svg";
import homeimg from "../assets/images/home.png";
import shopimg from "../assets/images/shop.png";
import bestimg from "../assets/images/best-seller.png";
import dealimg from "../assets/images/dealOfDay.png";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
const zain = localFont({
  src: [
    {
      path: "../public/Zain-Regular.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});
const PlaywriteDEGrund = localFont({
  src: [
    {
      path: "../public/PlaywriteDEGrund-Regular.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});

const NavBar = () => {
  const [category, setCategory] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [serachValue, setserachValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useSession();
  const [showResponsive, setShowResponsive] = useState(false);
  const handleCloseResponsive = () => setShowResponsive(false);
  const handleShowResponsive = () => setShowResponsive(true);
 
  console.log(session);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDropdownOpen((prevState) => !prevState);
  };
  useEffect(() => {
  
    axios
      .get(`${Environment.baseURL}/api/ItemTypes`, {
        headers: {
          "Content-Type": "application/json",
          langCode: locale == "ar" ? "1" : "2",
          webOrMob: 2,
        },
      })
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [locale]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/Search?search=${serachValue}`);
      setIsOpen(false);
    }
  };
  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  };
  const { locale, locales, push } = useRouter()
  const router = useRouter()
  const { pathname, asPath, query } = router
  const handleLanguageChange = (locale) => {

    push({ pathname, query }, asPath, { locale: locale })
  }
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await import(`../public/locales/${locale}/home.json`);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [locale]);
  return (
    <>
   
      <div className={`${styles.lang__respons} `} >
        {
          locales
          .filter(l => l !== locale) 
          .map(l => (
            <div className={`${locale == "ar"
                ? zain.className
                : PlaywriteDEGrund.className
              }`}
              key={l}>
              <span className={`${styles.lang__name}`} key={l} onClick={() => handleLanguageChange(l)}>{l}</span>

            </div>
          ))
        }
        </div>
      <Navbar className={`${styles.nav}`}>
    
          <Navbar.Brand
            href="/"
            className={` ${PlaywriteDEGrund.className} ${styles.logo__title}`}
          >
            Mehrail PM{" "}
           
          </Navbar.Brand>
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className={` ${PlaywriteDEGrund.className}`}>
                Mehrail PM
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            {
              isClient ?
                <div className={` pe-3 ${zain.className} ${styles.first__row}`}>
              
              
               {
                    locales
                    .filter(l => l !== locale) 
                    .map(l => (
                      <div className={`${
                          locale == "ar"
                            ? zain.className
                            : PlaywriteDEGrund.className
                        }`}
                        key={l}>
                        <span className={`${styles.lang__name}`} key={l} onClick={() => handleLanguageChange(l)}>{l}</span>

                      </div>
                    ))
                  } 
              </div>
             :
             ''
                }
              <div
                className={` pe-3 ${styles.second__row} ${
                  locale == "ar" ? zain.className : PlaywriteDEGrund.className
                }`}
              >
               
              {isClient ? (
                <ul className={`${styles.nav__list}`}>
                  <li className={`${styles.nav__item}`}>
                    <Link href="/" className={`${styles.nav__link}`}>
                      {translations.homee}
                    </Link>
                  </li>
                  <li
                    className={`${styles.nav__item} ${styles.shop}`}
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <p className={`${styles.nav__link}`}>
                      {translations.shopee}
                    </p>
                    {isDropdownOpen ? (
                      <Popover
                      dir={locale == 'ar'?'rtl':'ltr'}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <div
                          className={`${styles.dropdowncontent} ${locale == "ar"
                              ? zain.className
                              : PlaywriteDEGrund.className
                            }`}
                        >
                          <div className={`${styles.column__body}`}>
                            {category.map((cat) => (
                              <Link
                                href={`/${cat.typeId}?page=1&subCategoryId=`}
                                key={cat.typeId}
                                className={`${styles.navlink__category}`}
                              >
                                {cat.typeName}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              ) : (
                ""
              )}
               
              <Link href="/">
                <Image
                  alt=""
                  src={logo}
                  quality={100}
                  width={100}
                  height={70}
                  className={styles.logo}
                  priority={false}
                />
              </Link>
              {isClient ? (
                <ul className={`${styles.nav__list}`}>
                  <li className={`${styles.nav__item}`}>
                    <Link
                      href="/BestSelling?page=1"
                      className={`${styles.nav__link}`}
                    >
                      {" "}
                      {translations.bestSell}
                    </Link>
                  </li>
                  <li className={`${styles.nav__item}`}>
                    <Link
                      href="/DealOfDay?page=1"
                      className={`${styles.nav__link}`}
                    >
                      {translations.contact}
                    </Link>
                  </li>
                </ul>
              ) : (
                ""
              )}
              </div>
            <div className=" d-flex align-items-center justify-content-end flex-grow-1 pl-5">
              <div className={`${styles.search__body}`}>
                <Image
                  alt=""
                  src={search}
                  width={30}
                  height={25}
                  className={`${styles.svg}`}
                  onClick={toggleMenu}
                />
                {isOpen && (
                  <div
                    className={`${styles.InputContainer} ${isOpen ? styles.open : styles.closed
                      }`}
                   
                  >
                    <input
                      placeholder={`${translations.search}`}
                      id="input"
                      className={styles.input}
                      name="text"
                      type="text"
                      value={serachValue}
                      onChange={(e) => setserachValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Link href={`/Search?search=${serachValue}`}>
                      <label
                        className={styles.labelforsearch}
                        htmlFor="input"
                      >
                        <svg
                          className={styles.searchIcon}
                          viewBox="0 0 512 512"
                        >
                          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                        </svg>
                      </label>
                    </Link>
                  </div>
                )}
              </div>
              {session?.data2?.token ? (
                <Image
                  alt=""
                  src={logoutimg}
                  width={30}
                  height={30}
                  className={`${styles.svg} mt-1`}
                  onClick={handleSignOut}
                />
              ) : (
                <Link prefetch={false} href={"/Login"}>
                  <Image
                    alt=""
                    src={login}
                    width={30}
                    height={25}
                    className={`${styles.svg}`}
                  />
                </Link>
              )}

            </div>
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
       
      </Navbar>
      {isClient ? (
        <footer className={`${styles.footer} sticky__foot ${locale == "ar" ? zain.className : PlaywriteDEGrund.className
          }`} >
          <Row className={`${styles.footer__row}`}>
            <Col>
              <Link href='/'>
                <Image alt="" src={homeimg} width={30} height={30} />
                <p>{translations.homee}</p>
              </Link>
            </Col>
            <Col onClick={() => setShowResponsive(!showResponsive)}>
              <Image alt="" src={shopimg} width={30} height={30} />
              <p> {translations.shopee}</p>
            </Col>
            <Offcanvas  show={showResponsive} onHide={handleCloseResponsive} placement='end' name='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>{translations.shopee}</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className={`${styles.column__body__responsive}`}>
                  {category.map((cat) => (
                    <Link
                      href={`/${cat.typeId}?page=1&subCategoryId=`}
                      key={cat.typeId}
                      className={`${styles.navlink__category}`}
                      onClick={() => setShowResponsive(false)}
                    >
                      {cat.typeName}
                    </Link>
                  ))}
                </div>
              </Offcanvas.Body>
            </Offcanvas>
            <Col>
              <Link href='/BestSelling?page=1'>
                <Image alt="" src={bestimg} width={30} height={30} />
                <p>{translations.bestSell}</p>
              </Link>
            </Col>
            <Col>
              <Link href='/DealOfDay?page=1'>
                <Image alt="" src={dealimg} width={30} height={30} />
                <p>{translations.contact}</p>
              </Link>
            </Col>
          </Row>
        </footer>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
