import { BsClipboardCheck, BsImages } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { MdContentPaste, MdOutlinePermContactCalendar } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { TbAffiliateFilled } from "react-icons/tb";

export const NavItems = [
  {
    id: 101,
    title: "Dashboard",
    icon: <RiDashboardFill />,
    link: "/admin/dashboard",
  },
  {
    label: "User Management",
  },
  // {
  //     id: 107,
  //     title: "Customers",
  //     icon:<FaUsers />,
  //     link:'/admin/customers'
  //   },
  {
    id: 108,
    title: "Users",
    icon: <FaUsersCog />,
    link: "/admin/users",
  },
  ,
  {
    id: 104,
    title: "Approve Requests",
    icon: <BsClipboardCheck />,
    link: "/admin/image-request",
  },
  {
    id: 109,
    title: "Roles",
    icon: <MdOutlinePermContactCalendar />,
    link: "/admin/roles",
  },
  {
    label: "Content Management",
  },
  {
    id: 106,
    title: "CMS",
    icon: <MdContentPaste />,
    link: "/admin/cms",
  },
  {
    id: 110,
    title: "Plans",
    icon: <MdContentPaste />,
    link: "/admin/plans",
  },
  {
    id: 107,
    title: "Affiliate-Footer",
    icon: <MdContentPaste />,
    link: "/admin/cms/affiliate",
  },
  {
    id: 102,
    title: "Affiliate",
    icon: <TbAffiliateFilled />,
    link: "/admin/affiliate",
  },
  ,
  // {
  //   id: 103,
  //   title: "Sales",
  // },
  {
    label: "Product & Price Management",
  },
  {
    id: 105,
    title: "Products",
    icon: <GoProjectRoadmap />,
    link: "/admin/products",
  },
];
