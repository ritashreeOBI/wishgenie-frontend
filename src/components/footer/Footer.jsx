import React from "react";
import { footerMenu } from "./footerMenus";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-white p-6  w-full flex flex-col gap-4 bg-[#f1fcff] border-t  ">
      {/* <section className="flex flex-wrap gap-4">
        <div className="flex flex-row grow gap-4 flex-wrap px-4">
          {footerMenu.map((links, idx) => {
            return (
              <div className="flex flex-col grow gap-3" key={idx}>
                <ul className="font-bold ">{links?.title}</ul>
                {links?.subtitles.map((sub, i) => {
                  return (
                    <a href={sub?.link} key={i}>
                      {sub.title}
                    </a>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col w-80 gap-2 px-4">
          <h5 className="font-bold">Newsletter</h5>
          <p className="py-2">
            Subscribe to our newsletter to get your weekly dose of news,
            updates,tips and special offers
          </p>
          <div className="flex p-2 border rounded-md items-center">
            <IoIosMail className="text-3xl" />
            <input
              type="text"
              placeholder="enter your email"
              className="px-2 focus:outline-none"
            />
          </div>

          <button className="btn btn-warning  text-white">Subscribe</button>
        </div>
      </section> */}
      {/* <div className="divider" /> */}
      <section className="flex flex-col gap-2 items-center">
        <Link href="/affiliates" className="text-center">
         Our Affiliate Partnerships
        </Link>
        <p className="text-xs opacity-50">As an Affiliate Partner, we earn from qualifying purchases.</p>
      </section>
      <section className="flex flex-wrap justify-between text-xs gap-4">
        <div className="flex flex-wrap  gap-4">
          
          <span>Terms & condition</span>
          <li>Privacy Poilicy</li>
          <li>
            <Link href="/about">About us</Link>{" "}
          </li>
          <li>
            <Link href="/faq">FAQ</Link>{" "}
          </li>
          <li>
            <Link href="/">Support</Link>{" "}
          </li>
        </div>
        {/* <div>
          <p>
          All rights reserved 2022-23 <strong> WishGenie is an affiliate of Amazon.Com</strong>
          </p>
        </div> */}
      </section>
    </div>
  );
}

export default Footer;
