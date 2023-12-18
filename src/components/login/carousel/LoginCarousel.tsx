import { Carousel } from "antd";
import style from "@/styles/loginCarousel.module.css";

const LoginCarousel = () => {
  return (
    <Carousel autoplay>
      <div>
        <div className={style.contentStyle}>1</div>
      </div>
      <div>
        <div className={style.contentStyle}>2</div>
      </div>
      <div>
        <div className={style.contentStyle}>3</div>
      </div>
      <div>
        <div className={style.contentStyle}>4</div>
      </div>
    </Carousel>
  );
};

export default LoginCarousel;
