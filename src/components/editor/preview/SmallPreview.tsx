import React, { CSSProperties } from "react";

interface Props {
  $id?: string;
  campaign_id?: string;
  bg: CSSProperties;
  title_style: CSSProperties;
  subtitle_style: CSSProperties;
  image_style: CSSProperties;
  button_style: CSSProperties;
  title_value: string;
  subtitle_value: string;
  img_url: string;
  button_value: string;
}

const SmallPreview: React.FC<Props> = (props) => {
  const {
    bg,
    title_style,
    subtitle_style,
    image_style,
    button_style,
    title_value,
    subtitle_value,
    img_url,
    button_value,
  } = props;

  return (
    <>
      <h1 style={title_style} id="title" className="element">
        {title_value}
      </h1>
      <p style={subtitle_style} className="element" id="subtitle">
        {subtitle_value}
      </p>
      <img
        style={image_style}
        id="image"
        className="element"
        src={img_url}
        alt=""
      />
      <button style={button_style}>{button_value}</button>
    </>
  );
};

export default SmallPreview;
