import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Slide from "../../components/Slide/Slide";
import NewProducts from "../../components/NewProducts/NewProducts";
import Converse from "../../components/Converse/Converse";
import Vans from "../../components/Vans/Vans";
import Accessories from "../../components/Accessories/Accessories";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
function HomePage() {
  const img = useSelector(state => state.img)
  const {width} = img;
  useEffect(() => {
    //Scroll item
    const btnNext = document.querySelector(".btn-right-cv");
    const btnPre = document.querySelector(".btn-left-cv");
    const listItems = document.querySelectorAll(".list_items-cv");
    let i = 0;
    function scroll() {
      btnNext.addEventListener("click", () => {
        i++;
        if (i > 2) {
          i = 0;
        }
        listItems[0].style.transform = "translateX(" + -i * width + "px)";
        listItems[1].style.transform = "translateX(" + -i * width + "px)";
      });
      btnPre.addEventListener("click", () => {
        i--;
        if (i < 0) {
          i = 2;
        }
        listItems[0].style.transform = "translateX(" + -i * width + "px)";
        listItems[1].style.transform = "translateX(" + -i * width + "px)";
      });
    }
    scroll();
    const btnNextVans = document.querySelector(".btn-right-vans");
    const btnPreVans = document.querySelector(".btn-left-vans");
    const listItemsVans = document.querySelectorAll(".list_items-vans");
    function scroll2() {
      let i = 0;
      btnNextVans.addEventListener("click", () => {
        i++;
        if (i > 2) {
          i = 0;
        }
        listItemsVans[0].style.transform = "translateX(" + -i * width + "px)";
        listItemsVans[1].style.transform = "translateX(" + -i * width + "px)";
      });
      btnPreVans.addEventListener("click", () => {
        i--;
        if (i < 0) {
          i = 2;
        }
        listItemsVans[0].style.transform = "translateX(" + -i * width + "px)";
        listItemsVans[1].style.transform = "translateX(" + -i * width + "px)";
      });
    }
    scroll2();
    const btnNextAcc = document.querySelector(".btn-right-acc");
    const btnPreAcc = document.querySelector(".btn-left-acc");
    const listItemsAcc = document.querySelectorAll(".list_items-acc");
    function scroll3() {
      let i = 0;
      btnNextAcc.addEventListener("click", () => {
        i++;
        if (i > 2) {
          i = 0;
        }
        listItemsAcc[0].style.transform = "translateX(" + -i * width + "px)";
        listItemsAcc[1].style.transform = "translateX(" + -i * width + "px)";
      });
      btnPreAcc.addEventListener("click", () => {
        i--;
        if (i < 0) {
          i = 2;
        }
        listItemsAcc[0].style.transform = "translateX(" + -i * width + "px)";
        listItemsAcc[1].style.transform = "translateX(" + -i * width + "px)";
      });
    }
    scroll3();
    window.scrollTo(0, 0);
  }, [width]);
  return (
    <div>
      <Header />
      <Slide />
      <NewProducts />
      <Converse />
      <Vans />
      <Accessories />
      <Footer />
    </div>
  );
}

export default HomePage;
