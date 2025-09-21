import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import data from "@/util/menu";
const ThemeSwitch = dynamic(() => import("@/components/elements/ThemeSwitch"), {
  ssr: false,
});

export default function Menu({
  handleMobileMenuOpen,
  handleSidebarOpen,
  offCanvasNav,
  logoAlt,
  white,
}) {
  const router = useRouter();
  const [searchToggle, setSearchToggle] = useState(false);
  const searchHandle = () => setSearchToggle(!searchToggle);
  // const menu = data;
  if (data === undefined) {
    return null;
  }
  return (
    <>
      <div className="tgmenu__wrap">
        <nav className="tgmenu__nav">
          <div className="logo d-block d-lg-none">
            <Link href="/" className="logo-dark">
              <img src="/assets/img/logo/logo.svg" alt="NewsHub Logo" />
            </Link>
            <Link href="/" className="logo-light">
              <img src="/assets/img/logo/w_logo.svg" alt="NewsHub Logo" />
            </Link>
          </div>
          {logoAlt && (
            <div className="d-flex gap-4 align-items-center">
              <div className="offcanvas-toggle" onClick={handleSidebarOpen}>
                <Link href="#">
                  <i className="flaticon-menu-bar" />
                </Link>
              </div>
              <div className="logo">
                <Link href="/">
                  <img
                    src={`assets/img/logo/${white ? "w_logo" : "logo"}.png`}
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
          )}
          {offCanvasNav && (
            <div className="offcanvas-toggle" onClick={handleSidebarOpen}>
              <a href="#">
                <i className="flaticon-menu-bar" />
              </a>
            </div>
          )}
          <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-lg-flex">
            <ul className="navigation">
              {data &&
                data.map((item) => (
                  <li
                    key={item.id}
                    className={router.pathname == item.link ? "active" : ""}
                  >
                    <Link href={item.link}>{item.name}</Link>
                    {item.sub_menu.length > 0 && (
                      <ul className="sub-menu">
                        {item.sub_menu.map((subItem) => (
                          <li key={subItem.id}>
                            <Link href={subItem.link}>{subItem.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              {/* <li className="menu-item-has-children">
                <Link href="#">Home</Link>
                <ul className="sub-menu">
                  <li className={router.pathname == "/" ? "active" : ""}>
                    <Link href="/">Home Default</Link>
                  </li>
                  <li className={router.pathname == "/index-2" ? "active" : ""}>
                    <Link href="/index-2">Home Interior</Link>
                  </li>
                  <li className={router.pathname == "/index-3" ? "active" : ""}>
                    <Link href="/index-3">Home Travel</Link>
                  </li>
                  <li className={router.pathname == "/index-4" ? "active" : ""}>
                    <Link href="/index-4">Home Technology</Link>
                  </li>
                  <li className={router.pathname == "/index-5" ? "active" : ""}>
                    <Link href="/index-5">Home NFT</Link>
                  </li>
                  <li className={router.pathname == "/index-6" ? "active" : ""}>
                    <Link href="/index-6">Home Fashion</Link>
                  </li>
                  <li className={router.pathname == "/index-7" ? "active" : ""}>
                    <Link href="/index-7">Home Adventure</Link>
                  </li>
                  <li className={router.pathname == "/index-8" ? "active" : ""}>
                    <Link href="/index-8">Home Minimal</Link>
                  </li>
                </ul>
              </li>
              <li className={router.pathname == "/lifestyle" ? "active" : ""}>
                <Link href="/lifestyle">Lifestyle</Link>
              </li>
              <li className={router.pathname == "/travel" ? "active" : ""}>
                <Link href="/travel">Travel</Link>
              </li>
              <li className="menu-item-has-children">
                <Link href="#">Post Type</Link>
                <ul className="sub-menu">
                  <li className={router.pathname == "/blog" ? "active" : ""}>
                    <Link href="/blog">Our Blog</Link>
                  </li>
                  <li className={router.pathname == "/article/1" ? "active" : ""}>
                    <Link href="/article/scientists-speculate-that-ours-might-not-be-held">Blog Details</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/nft">NFT</Link>
              </li> */}
            </ul>
          </div>
          <div className="tgmenu__action">
            <ul className="list-wrap">
              <li className="mode-switcher">
                <ThemeSwitch />
              </li>
              <li className="user">
                <Link href="#">
                  <i className="far fa-user" />
                </Link>
              </li>
              <li className="header-search">
                <Link href="#">
                  <i
                    className={`${
                      searchToggle ? "far fa-search fa-times" : "far fa-search"
                    } `}
                    onClick={searchHandle}
                  />
                </Link>
                <div className="header__style-two">
                  <div
                    className={`header__top-search ${
                      searchToggle ? "d-block" : "d-none"
                    }`}
                  >
                    <form action="#">
                      <input type="text" placeholder="Search here..." />
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="mobile-nav-toggler" onClick={handleMobileMenuOpen}>
          <i className="fas fa-bars" />
        </div>
      </div>
    </>
  );
}
