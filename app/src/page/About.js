import React from 'react';
import './About.css'; // optional nếu bạn dùng CSS riêng

function About() {
  return (
    <div className="about-container">
      <img
        className="about-banner"
        src="https://i.pinimg.com/736x/6a/ba/8d/6aba8d6fe7a455389b50d24cfbc84316.jpg"
        alt="Ảnh bìa đồng hồ"
      />
      <h1>Giới Thiệu Về Đồng Hồ</h1>
      <p>
        Chúng tôi cung cấp các loại đồng hồ cao cấp, sang trọng và hiện đại. Đồng hồ không chỉ là công cụ đo thời gian mà còn là phụ kiện thể hiện phong cách và đẳng cấp của bạn.
      </p>
    </div>
  );
}

export default About;
