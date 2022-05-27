import { faViber } from "@fortawesome/free-brands-svg-icons";
import {
  faChartLine,
  faMailBulk,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";

export const HomeProps = [
  { link: "/kakopoceti", text: "Kako poceti", id: 1 },
  { link: "/singup", text: "Sing up", id: 2 },
  { link: "/login", text: "Log in", id: 3 },
];

export const WorkProps = [
  { link: "/reception", text: "Prijem tepiha", id: 1 },
  { link: "/measuringandpreparingcarpet", text: "Priprema tepiha", id: 2 },
  { link: "/deliverylist", text: "Lista za isporuku", id: 3 },
  { link: "/schedulingcarpetretrivals", text: "Zakazivanje", id: 4 },
  { link: "/downloadlist", text: "Lista preuzimanja", id: 5 },
];

export const AdminProps = [
  {
    icon: faChartLine,
    title: "Analiza",
    link: "/administrator/analysis",
    id: 1,
  },
  {
    icon: faMoneyBillTransfer,
    title: "Troskovi",
    link: "/administrator/costs",
    id: 2,
  },
  {
    icon: faMoneyBillTransfer,
    title: "Prihodi",
    link: "/administrator/otherincome",
    id: 3,
  },
  { icon: faViber, title: "Viber", link: "", id: 4 },
  { icon: faMailBulk, title: "Mail", link: "", id: 5 },
];
