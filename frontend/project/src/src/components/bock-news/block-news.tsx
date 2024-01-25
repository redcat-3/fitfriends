import React from "react";
import { DEFAULT_IMG, Message } from "../../constant";

type BlockNewsProps = {
    newsItem?: string,
    img?: string
  };

const BlockNews = ({newsItem, img}: BlockNewsProps): JSX.Element => (
  <div className="thumbnail-spec-gym">
    <div className="thumbnail-spec-gym__image">
      <picture>
        <source
          type="image/webp"
          srcSet={img ? `${img}.webp, ${img}@2x.webp 2x` :`${DEFAULT_IMG}.webp, ${DEFAULT_IMG}@2x.webp 2x`}
        />
        <img
          src={img ? `${img}.jpg` :`${DEFAULT_IMG}.jpg`}
          srcSet={img ? `${img}@2x.jpg 2x` :`${DEFAULT_IMG}@2x.jpg 2x`}
          width="330"
          height="190"
          alt="nearest gym"
        />
      </picture>
    </div>
    <div className="thumbnail-spec-gym__header">
      <h3 className="thumbnail-spec-gym__title">{newsItem ? newsItem : Message.Empty}</h3>
    </div>
  </div>
);
export default React.memo(BlockNews);
