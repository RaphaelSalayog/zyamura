import { Carousel, Row } from "antd";
import style from "@/styles/loginCarousel.module.css";

const LoginCarousel = () => {
  return (
    <Carousel autoplay>
      <Row>
        <div className={style.contentStyle}>
          <img
            src="https://worldanimalfoundation.org/wp-content/uploads/2023/09/Cute-dogs.jpg"
            style={{
              objectFit: "cover",
              height: "600px",
              width: "600px",
              borderRadius: "20px",
            }}
          />
        </div>
      </Row>
      <Row>
        <div className={style.contentStyle}>
          <img
            src="https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?s=612x612&w=0&k=20&c=6yvVxdufrNvkmc50nCLCd8OFGhoJd6vPTNotl90L-vo="
            style={{
              objectFit: "cover",
              height: "600px",
              width: "600px",
              borderRadius: "20px",
            }}
          />
        </div>
      </Row>
      <Row>
        <div className={style.contentStyle}>
          <img
            src="https://images.twinkl.co.uk/tr/raw/upload/u/ux/usawiki-fish-clownfish_ver_1.jpg"
            style={{
              objectFit: "cover",
              height: "600px",
              width: "600px",
              borderRadius: "20px",
            }}
          />
        </div>
      </Row>
      <Row>
        <div className={style.contentStyle}>
          <img
            src="https://images.unsplash.com/photo-1518796745738-41048802f99a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFiYml0fGVufDB8fDB8fHww"
            style={{
              objectFit: "cover",
              height: "600px",
              width: "600px",
              borderRadius: "20px",
            }}
          />
        </div>
      </Row>
    </Carousel>
  );
};

export default LoginCarousel;
