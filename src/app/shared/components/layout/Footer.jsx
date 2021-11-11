export const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="top-footer">
        <div className="container">
          <p className="logo">Luxury House</p>
          <ul className="list-menu">
            <li className="item-menu">
              <a href="/" className="btn btn-outline">
                Trang chủ
              </a>
            </li>
            <li className="item-menu">
              <a href="/product" className="btn btn-outline">
                Sản phẩm
              </a>
            </li>
            <li className="item-menu">
              <a href="/contact" className="btn btn-outline">
                Liên lạc
              </a>
            </li>
          </ul>
          <p className="description-footer">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem I
          </p>
          <div className="contact">
            <p>Liên hệ</p>
            <ul className="row list-contact">
              <li>
                <i class="fas fa-phone-alt"></i>
                <a href="tel:+0123123123" className="phone-number">
                  0123123123
                </a>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <a href="" className="email">
                  luxuryhouse2021@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <p>Copyright 2021 All Right Reserved By TWQ</p>
      </div>
    </footer>
  );
};
