import { useState, useEffect, useContext } from "react";
import { Search, ChevronDown, ChevronUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeContext } from "@/theme";
import { LanguageContext } from "@/Provider/language";
import { getText } from "@/lib/translations";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

// SVG icons components
const Crown = ({ className, size }: { className?: string; size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);

const Shield = ({ className, size }: { className?: string; size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

const Sword = ({ className, size }: { className?: string; size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
    <line x1="13" y1="19" x2="19" y2="13" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="19" y1="21" x2="21" y2="19" />
  </svg>
);

// Define role icons and colors
const RoleIcon = ({ role }: { role: string }) => {
  switch (role) {
    case "King":
      return <Crown className="text-yellow-500" size={18} />;
    case "Queen":
      return <Crown className="text-pink-400" size={18} />;
    case "R4":
      return <Sword className="text-blue-400" size={18} />;
    case "R3":
      return <Shield className="text-indigo-400" size={18} />;
    case "R2":
      return <Shield className="text-green-400" size={18} />;
    case "R1":
      return <Shield className="text-gray-400" size={18} />;
    default:
      return <Shield className="text-green-400" size={18} />;
  }
};

// Define member interface
interface Member {
  id: number;
  name: string;
  role: "King" | "Queen" | "R4" | "R3" | "R2" | "R1" | "Member";
  power: string;
  kills: string;
  avatar?: string;
  joinDate?: string;
}

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Generate fake member data
const generateMembers = (): Record<string, Member[]> => {
  const membersByRole: Record<string, Member[]> = {
    King: [],
    Queen: [],
    R4: [],
    R3: [],
    R2: [],
    R1: [],
  };

  // Add King
  membersByRole["King"].push({
    id: 1,
    name: "ᴿᴺ M A X",
    role: "King",
    power: formatNumber(123696460),
    kills: formatNumber(33430164),
    avatar:
      "https://res.cloudinary.com/deuef2tzm/image/upload/v1744374584/Screenshot_2025-04-11_192907_akqvuy.png",
  });

  // // Add Queen
  // membersByRole["Queen"].push({
  //   id: 2,
  //   name: "Z Z A R",
  //   role: "Queen",
  //   power: formatNumber(Math.floor(90000000 + Math.random() * 30000000)),
  //   kills: formatNumber(Math.floor(15000000 + Math.random() * 8000000)),
  // });

  membersByRole["R4"].push({
    id: 2,
    name: "ØʳᵈᵉʳDarkHelmet",
    role: "R4",
    power: formatNumber(124770705),
    kills: formatNumber(31311838),
    avatar:
      "https://res.cloudinary.com/deuef2tzm/image/upload/v1744376134/Screenshot_2025-04-11_195517_n8l2ip.png",
  });

  membersByRole["R4"].push({
    id: 3,
    name: "ᴿᴺ MèO Kem ᴸᵛ",
    role: "R4",
    power: formatNumber(133828708),
    kills: formatNumber(45053644),
    avatar:
      "https://res.cloudinary.com/deuef2tzm/image/upload/v1744376194/Screenshot_2025-04-11_195623_zhqbcq.png",
  });

  membersByRole["R4"].push({
    id: 5,
    name: "ᴿᴺ Phát chóđiên",
    role: "R4",
    power: formatNumber(97882894),
    kills: formatNumber(26128400),
    avatar:
      "https://res.cloudinary.com/deuef2tzm/image/upload/v1744376354/Screenshot_2025-04-11_195856_say7ef.png",
  });

  membersByRole["R4"].push({
    id: 6,
    name: "Gaiа",
    role: "R4",
    power: formatNumber(83903602),
    kills: formatNumber(22870386),
    avatar:
      "https://res.cloudinary.com/deuef2tzm/image/upload/v1744376405/Screenshot_2025-04-11_195954_yamgym.png",
  });

  membersByRole["R4"].push({
    id: 7,
    name: "ᴿᴺ Lẩu Bò",
    role: "R4",
    power: formatNumber(77983794),
    kills: formatNumber(0),
    avatar:
      "https://res.cloudinary.com/deuef2tzm/image/upload/v1744376449/Screenshot_2025-04-11_200038_o5jogs.png",
  });

  membersByRole["R4"].push({
    id: 8,
    name: "ᴿᴺ H A R L E Y",
    role: "R4",
    power: formatNumber(82957183),
    kills: formatNumber(10397207),
    avatar:
      "https://res.cloudinary.com/deuef2tzm/image/upload/v1744376489/Screenshot_2025-04-11_200119_orkzua.png",
  });

  membersByRole["R4"].push({
    id: 9,
    name: "ᴷᵒᴳ ﾒ Ryᴀnlu",
    role: "R4",
    power: formatNumber(75264690),
    kills: formatNumber(15800865),
    avatar:
      "https://res.cloudinary.com/deuef2tzm/image/upload/v1744376530/Screenshot_2025-04-11_200159_zmlpzq.png",
  });

  membersByRole["R3"].push({
    id: 10,
    name: "Roxu",
    role: "R3",
    power: formatNumber(160892048),
    kills: formatNumber(17018390),
  });

  membersByRole["R3"].push({
    id: 11,
    name: "Eventide",
    role: "R3",
    power: formatNumber(100976883),
    kills: formatNumber(13031747),
  });

  membersByRole["R3"].push({
    id: 12,
    name: "ᴿᴺ MèO Bơ ᴸᵛ",
    role: "R3",
    power: formatNumber(120212853),
    kills: formatNumber(22558801),
  });

  membersByRole["R3"].push({
    id: 13,
    name: "M A X ᴿᴺ",
    role: "R3",
    power: formatNumber(156094764),
    kills: formatNumber(14216951),
  });

  membersByRole["R3"].push({
    id: 14,
    name: "Kylo Hen",
    role: "R3",
    power: formatNumber(115545985),
    kills: formatNumber(14035982),
  });

  membersByRole["R3"].push({
    id: 14,
    name: "ᴜʳⁱᵉˡRiedel",
    role: "R3",
    power: formatNumber(140900402),
    kills: formatNumber(27797834),
  });

  membersByRole["R3"].push({
    id: 15,
    name: "ᴿᴺ R y n",
    role: "R3",
    power: formatNumber(113024381),
    kills: formatNumber(14738404),
  });

  membersByRole["R3"].push({
    id: 16,
    name: "ManDino",
    role: "R3",
    power: formatNumber(115087129),
    kills: formatNumber(4409670),
  });

  membersByRole["R3"].push({
    id: 17,
    name: "ᵃᴸᵉ ﾒ Dełᴜłᴜ",
    role: "R3",
    power: formatNumber(113193109),
    kills: formatNumber(25105376),
  });

  membersByRole["R3"].push({
    id: 18,
    name: "ᴿᴺ ŠH350i",
    role: "R3",
    power: formatNumber(109270210),
    kills: formatNumber(12009482),
  });

  membersByRole["R3"].push({
    id: 19,
    name: "Triff",
    role: "R3",
    power: formatNumber(111212652),
    kills: formatNumber(29251983),
  });

  membersByRole["R3"].push({
    id: 20,
    name: "Eventide",
    role: "R3",
    power: formatNumber(138201633),
    kills: formatNumber(13031747),
  });

  membersByRole["R3"].push({
    id: 21,
    name: "H6M1N2G",
    role: "R3",
    power: formatNumber(120128745),
    kills: formatNumber(28130506),
  });

  membersByRole["R3"].push({
    id: 22,
    name: "Kito713",
    role: "R3",
    power: formatNumber(115521651),
    kills: formatNumber(31119848),
  });

  membersByRole["R3"].push({
    id: 23,
    name: "Dr Ez",
    role: "R3",
    power: formatNumber(125401560),
    kills: formatNumber(10438817),
  });

  membersByRole["R3"].push({
    id: 24,
    name: "ᴿᴺ GiAnG",
    role: "R3",
    power: formatNumber(102692133),
    kills: formatNumber(22264207),
  });

  membersByRole["R3"].push({
    id: 25,
    name: "ᴹᴵᴱムTiểu My",
    role: "R3",
    power: formatNumber(125006918),
    kills: formatNumber(29774878),
  });

  membersByRole["R3"].push({
    id: 33,
    name: "Wakefield",
    role: "R3",
    power: formatNumber(107351154),
    kills: formatNumber(5685349),
  });

  membersByRole["R3"].push({
    id: 34,
    name: "Ƥo",
    role: "R3",
    power: formatNumber(114377608),
    kills: formatNumber(19142943),
  });

  membersByRole["R2"].push({
    id: 26,
    name: "JacquesSharky",
    role: "R2",
    power: formatNumber(94680788),
    kills: formatNumber(12299896),
  });

  membersByRole["R2"].push({
    id: 27,
    name: "UdderIdiot",
    role: "R2",
    power: formatNumber(93491811),
    kills: formatNumber(8621128),
  });

  membersByRole["R2"].push({
    id: 28,
    name: "ᴿᴺ Kit ᵃˡᵛ",
    role: "R2",
    power: formatNumber(93163898),
    kills: formatNumber(27484184),
  });

  membersByRole["R2"].push({
    id: 29,
    name: "iAnimeWeeb",
    role: "R2",
    power: formatNumber(99884300),
    kills: formatNumber(12753106),
  });

  membersByRole["R2"].push({
    id: 30,
    name: "ᴿᴺ Đạt BT",
    role: "R2",
    power: formatNumber(94891978),
    kills: formatNumber(16952433),
  });

  membersByRole["R2"].push({
    id: 31,
    name: "Krᴏnᴏs",
    role: "R2",
    power: formatNumber(96762788),
    kills: formatNumber(14106829),
  });

  membersByRole["R2"].push({
    id: 32,
    name: "ᴷᵒᴳ Daily",
    role: "R2",
    power: formatNumber(77954191),
    kills: formatNumber(15907525),
  });

  membersByRole["R2"].push({
    id: 35,
    name: "RathaloS",
    role: "R2",
    power: formatNumber(75017583),
    kills: formatNumber(27129378),
  });

  membersByRole["R2"].push({
    id: 36,
    name: "Borg Milo",
    role: "R2",
    power: formatNumber(76005606),
    kills: formatNumber(9687231),
  });

  membersByRole["R2"].push({
    id: 37,
    name: "ᴿᴺ CallMeĐậuHũ",
    role: "R2",
    power: formatNumber(65426309),
    kills: formatNumber(10580092),
  });

  membersByRole["R2"].push({
    id: 38,
    name: "ᴿᴺ Kit ˡʸᶻᶻⁿ",
    role: "R2",
    power: formatNumber(55969567),
    kills: formatNumber(1148378),
  });

  membersByRole["R2"].push({
    id: 39,
    name: "ʷWindʷ ⱽᵉᶜʰᵃᶦ",
    role: "R2",
    power: formatNumber(88869365),
    kills: formatNumber(3089964),
  });

  membersByRole["R2"].push({
    id: 40,
    name: "PinkyBulba",
    role: "R2",
    power: formatNumber(90499317),
    kills: formatNumber(16205377),
  });

  membersByRole["R2"].push({
    id: 41,
    name: "Shadow King",
    role: "R2",
    power: formatNumber(88012900),
    kills: formatNumber(5890027),
  });

  membersByRole["R2"].push({
    id: 42,
    name: "ᴿᴺ๖ۣۜNDT",
    role: "R2",
    power: formatNumber(87335857),
    kills: formatNumber(2356901),
  });

  membersByRole["R2"].push({
    id: 43,
    name: "ᵁⁿʰᵒˡʸHeathen",
    role: "R2",
    power: formatNumber(96540158),
    kills: formatNumber(24773617),
  });

  membersByRole["R2"].push({
    id: 44,
    name: "ʟᴏᴛᴜs",
    role: "R2",
    power: formatNumber(86052000),
    kills: formatNumber(16998331),
  });

  membersByRole["R2"].push({
    id: 45,
    name: "ᴿᴺ Arthur",
    role: "R2",
    power: formatNumber(93771348),
    kills: formatNumber(29339077),
  });

  membersByRole["R2"].push({
    id: 46,
    name: "Charente",
    role: "R2",
    power: formatNumber(81449307),
    kills: formatNumber(4904151),
  });

  membersByRole["R2"].push({
    id: 47,
    name: "Quza",
    role: "R2",
    power: formatNumber(78916547),
    kills: formatNumber(9551846),
  });

  membersByRole["R2"].push({
    id: 48,
    name: "Ping Ve Chai",
    role: "R2",
    power: formatNumber(78408955),
    kills: formatNumber(14185595),
  });

  membersByRole["R2"].push({
    id: 49,
    name: "ᴷᵃᵗʰメSniper54",
    role: "R2",
    power: formatNumber(77773451),
    kills: formatNumber(5851483),
  });

  membersByRole["R2"].push({
    id: 50,
    name: "ᴸᴼᴾMăm",
    role: "R2",
    power: formatNumber(76009801),
    kills: formatNumber(4419477),
  });

  membersByRole["R2"].push({
    id: 51,
    name: "B ubbles",
    role: "R2",
    power: formatNumber(75257180),
    kills: formatNumber(5125456),
  });

  membersByRole["R2"].push({
    id: 52,
    name: "Jacòbs",
    role: "R2",
    power: formatNumber(81216030),
    kills: formatNumber(12693592),
  });

  membersByRole["R2"].push({
    id: 53,
    name: "ᴸᵐᵃᵒ Búng Nheo",
    role: "R2",
    power: formatNumber(85791166),
    kills: formatNumber(25748257),
  });

  membersByRole["R2"].push({
    id: 54,
    name: "ᴺᴱᴵ7ᴄᴏᴍᴍᴀɴᴅᴇʀx",
    role: "R2",
    power: formatNumber(74723508),
    kills: formatNumber(13413731),
  });

  membersByRole["R2"].push({
    id: 55,
    name: "ᴿᴺMɨɲɦĐɑɲ",
    role: "R2",
    power: formatNumber(74081086),
    kills: formatNumber(13846787),
  });

  membersByRole["R2"].push({
    id: 56,
    name: "ᴿᴺ  A4",
    role: "R2",
    power: formatNumber(73543009),
    kills: formatNumber(5155460),
  });

  membersByRole["R2"].push({
    id: 57,
    name: "ᴿᴺ  Mmeeeoo",
    role: "R2",
    power: formatNumber(73440635),
    kills: formatNumber(14202891),
  });

  membersByRole["R2"].push({
    id: 58,
    name: "ᴿᴺ Pbong",
    role: "R2",
    power: formatNumber(72537853),
    kills: formatNumber(13719224),
  });

  membersByRole["R2"].push({
    id: 59,
    name: "ᴿᴺ ThachAnhh",
    role: "R2",
    power: formatNumber(72151691),
    kills: formatNumber(15857057),
  });

  membersByRole["R2"].push({
    id: 60,
    name: "ᴿᴺ Jiu Lang",
    role: "R2",
    power: formatNumber(72868930),
    kills: formatNumber(12015776),
  });

  membersByRole["R2"].push({
    id: 61,
    name: "ᴵᴬᴹXiaXia",
    role: "R2",
    power: formatNumber(74545711),
    kills: formatNumber(13023969),
  });

  membersByRole["R2"].push({
    id: 62,
    name: "ᴷᵒᴳ ƠBarTôCơm",
    role: "R2",
    power: formatNumber(70177779),
    kills: formatNumber(12561859),
  });

  membersByRole["R2"].push({
    id: 63,
    name: "ᴿᴺ Jett DAY",
    role: "R2",
    power: formatNumber(75773099),
    kills: formatNumber(8278843),
  });

  membersByRole["R2"].push({
    id: 64,
    name: "ᴿᴺ  V  ˡᵒᵁᴸ",
    role: "R2",
    power: formatNumber(69634424),
    kills: formatNumber(4093429),
  });

  membersByRole["R2"].push({
    id: 65,
    name: "ᴿᴺ AlmiraNhun",
    role: "R2",
    power: formatNumber(75926849),
    kills: formatNumber(13395231),
  });

  membersByRole["R2"].push({
    id: 66,
    name: "ᴿᴺLănLêBòLếtᴼʰᴺᵒ",
    role: "R2",
    power: formatNumber(69232261),
    kills: formatNumber(10435639),
  });

  membersByRole["R2"].push({
    id: 67,
    name: "тuâɴ",
    role: "R2",
    power: formatNumber(68662183),
    kills: formatNumber(13775886),
  });

  membersByRole["R2"].push({
    id: 68,
    name: "ᴿᴺ ๖ۣۜMèo",
    role: "R2",
    power: formatNumber(68311636),
    kills: formatNumber(12611795),
  });

  membersByRole["R2"].push({
    id: 69,
    name: "ᴿᴺ Khôi Mặp",
    role: "R2",
    power: formatNumber(66936190),
    kills: formatNumber(3808970),
  });

  membersByRole["R2"].push({
    id: 70,
    name: "ʚïɞ ˢᵉⁿᵃ 猿様 ʚïɞ",
    role: "R2",
    power: formatNumber(66576169),
    kills: formatNumber(13892609),
  });

  membersByRole["R2"].push({
    id: 71,
    name: "zenixx",
    role: "R2",
    power: formatNumber(69503430),
    kills: formatNumber(11713393),
  });

  membersByRole["R2"].push({
    id: 72,
    name: "Cẩu Ghẻ",
    role: "R2",
    power: formatNumber(65132028),
    kills: formatNumber(2780518),
  });

  membersByRole["R2"].push({
    id: 73,
    name: "ᴿᴺ Minh",
    role: "R2",
    power: formatNumber(66122216),
    kills: formatNumber(8416435),
  });

  membersByRole["R2"].push({
    id: 74,
    name: "三CAPTAIN タカシ",
    role: "R2",
    power: formatNumber(64747124),
    kills: formatNumber(4053997),
  });

  membersByRole["R2"].push({
    id: 75,
    name: "ᴿᴺ Vânnn",
    role: "R2",
    power: formatNumber(64664953),
    kills: formatNumber(0),
  });

  membersByRole["R2"].push({
    id: 76,
    name: "Mr  Thuận",
    role: "R2",
    power: formatNumber(64654198),
    kills: formatNumber(3480754),
  });

  membersByRole["R2"].push({
    id: 77,
    name: "Jhin bb",
    role: "R2",
    power: formatNumber(68752992),
    kills: formatNumber(1582847),
  });

  membersByRole["R2"].push({
    id: 78,
    name: "ᴷᵒᴳ Linhan",
    role: "R2",
    power: formatNumber(63634998),
    kills: formatNumber(12399941),
  });

  membersByRole["R2"].push({
    id: 79,
    name: "ᴼᵂᴸG0LD1",
    role: "R2",
    power: formatNumber(63237903),
    kills: formatNumber(4831046),
  });

  membersByRole["R2"].push({
    id: 80,
    name: "BersikPrime",
    role: "R2",
    power: formatNumber(69739543),
    kills: formatNumber(7603218),
  });

  membersByRole["R2"].push({
    id: 81,
    name: "ᴿᴺ HuySadNhân",
    role: "R2",
    power: formatNumber(63956982),
    kills: formatNumber(17271718),
  });

  membersByRole["R2"].push({
    id: 82,
    name: "Quỷ Đỏ ʰ۹ᵈ",
    role: "R2",
    power: formatNumber(61424720),
    kills: formatNumber(6544970),
  });

  membersByRole["R2"].push({
    id: 83,
    name: "ᴷᵒᴳ nbc1",
    role: "R2",
    power: formatNumber(65217095),
    kills: formatNumber(36903434),
  });

  membersByRole["R2"].push({
    id: 84,
    name: "ᴷᵒᴳ Dũng Dạt Dẹo",
    role: "R2",
    power: formatNumber(60854010),
    kills: formatNumber(7916618),
  });

  membersByRole["R2"].push({
    id: 85,
    name: "ᴿᴺ jett ᵛ",
    role: "R2",
    power: formatNumber(61995675),
    kills: formatNumber(4282040),
  });

  membersByRole["R2"].push({
    id: 86,
    name: "ᴿᴺ ₓ LinhXeÔm ᵁʷᵁ",
    role: "R2",
    power: formatNumber(62756253),
    kills: formatNumber(10031899),
  });

  membersByRole["R2"].push({
    id: 87,
    name: "ᴿᴺ NOMIDO",
    role: "R2",
    power: formatNumber(58547989),
    kills: formatNumber(3888759),
  });

  membersByRole["R2"].push({
    id: 88,
    name: "ᴷᵒᴳ TranDatt",
    role: "R2",
    power: formatNumber(58511068),
    kills: formatNumber(3008616),
  });

  membersByRole["R2"].push({
    id: 89,
    name: "ᴿᴺ MyMy",
    role: "R2",
    power: formatNumber(62155891),
    kills: formatNumber(14756983),
  });

  membersByRole["R2"].push({
    id: 90,
    name: "ᴿᴺ Lee Bốn Chục",
    role: "R2",
    power: formatNumber(62640461),
    kills: formatNumber(4898469),
  });

  membersByRole["R2"].push({
    id: 91,
    name: "LyoKing",
    role: "R2",
    power: formatNumber(57989163),
    kills: formatNumber(4819901),
  });

  membersByRole["R2"].push({
    id: 92,
    name: "ᴿᴺCậu Bé",
    role: "R2",
    power: formatNumber(55788447),
    kills: formatNumber(8101439),
  });

  membersByRole["R2"].push({
    id: 93,
    name: "ᴿᴺ alv ˢᵘⁿᵈᵃʸ",
    role: "R2",
    power: formatNumber(55739507),
    kills: formatNumber(3741542),
  });

  membersByRole["R2"].push({
    id: 94,
    name: "ᴿᴺ SìTrumDaNâu",
    role: "R2",
    power: formatNumber(63237903),
    kills: formatNumber(4831046),
  });

  membersByRole["R2"].push({
    id: 95,
    name: "ᴷᵒᴳ Tommy ᵁ",
    role: "R2",
    power: formatNumber(55199554),
    kills: formatNumber(2820239),
  });

  membersByRole["R2"].push({
    id: 96,
    name: "ᴷᵒᴳ Mèo Hy",
    role: "R2",
    power: formatNumber(54860854),
    kills: formatNumber(1973774),
  });

  membersByRole["R2"].push({
    id: 97,
    name: "тuâɴɴ",
    role: "R2",
    power: formatNumber(58536691),
    kills: formatNumber(2091665),
  });

  membersByRole["R2"].push({
    id: 98,
    name: "ᴿᴺ 亗 Panda シ",
    role: "R2",
    power: formatNumber(54559746),
    kills: formatNumber(4423458),
  });

  membersByRole["R2"].push({
    id: 99,
    name: "ReNew",
    role: "R2",
    power: formatNumber(59717360),
    kills: formatNumber(1522865),
  });

  membersByRole["R2"].push({
    id: 100,
    name: "Park Sung Beo",
    role: "R2",
    power: formatNumber(54425993),
    kills: formatNumber(3895562),
  });

  membersByRole["R2"].push({
    id: 101,
    name: "ᴿᴺ Black Rose",
    role: "R2",
    power: formatNumber(54306940),
    kills: formatNumber(1814896),
  });

  membersByRole["R2"].push({
    id: 102,
    name: "Ryeo Syeon 亗",
    role: "R2",
    power: formatNumber(54158854),
    kills: formatNumber(3112337),
  });

  membersByRole["R2"].push({
    id: 103,
    name: "ᴿᴺ CánBộXã",
    role: "R2",
    power: formatNumber(57417149),
    kills: formatNumber(10378011),
  });

  membersByRole["R2"].push({
    id: 104,
    name: "Nheo Hiiiii",
    role: "R2",
    power: formatNumber(53780640),
    kills: formatNumber(864667),
  });

  membersByRole["R2"].push({
    id: 105,
    name: "ᴿᴺ cċђɨt",
    role: "R2",
    power: formatNumber(53710547),
    kills: formatNumber(2179138),
  });

  membersByRole["R2"].push({
    id: 106,
    name: "ᴿᴺ Viktor T 亗",
    role: "R2",
    power: formatNumber(55948152),
    kills: formatNumber(4604192),
  });

  membersByRole["R2"].push({
    id: 107,
    name: "Xlxxxxx",
    role: "R2",
    power: formatNumber(53478349),
    kills: formatNumber(2428589),
  });

  membersByRole["R2"].push({
    id: 108,
    name: "Tuế tuế Bình An",
    role: "R2",
    power: formatNumber(53337390),
    kills: formatNumber(10314931),
  });

  membersByRole["R2"].push({
    id: 109,
    name: "ᴷᵒᴳ ﾒ Winter ˡᵒᵁᴸ",
    role: "R2",
    power: formatNumber(53215612),
    kills: formatNumber(4282653),
  });

  membersByRole["R2"].push({
    id: 110,
    name: "ᴿᴺ Ty ˡᵒᵁᴸ",
    role: "R2",
    power: formatNumber(52110631),
    kills: formatNumber(3443154),
  });

  membersByRole["R2"].push({
    id: 111,
    name: "ᴿᴺ Nobi",
    role: "R2",
    power: formatNumber(51936364),
    kills: formatNumber(4581598),
  });

  membersByRole["R2"].push({
    id: 112,
    name: "ᴿᴺ DuwcA",
    role: "R2",
    power: formatNumber(51726670),
    kills: formatNumber(7622256),
  });

  membersByRole["R2"].push({
    id: 113,
    name: "ᴿᴺ Ťhresh",
    role: "R2",
    power: formatNumber(51488940),
    kills: formatNumber(4673931),
  });

  membersByRole["R2"].push({
    id: 114,
    name: "ᴿᴺ Kunneeee",
    role: "R2",
    power: formatNumber(51094033),
    kills: formatNumber(2902321),
  });

  membersByRole["R2"].push({
    id: 115,
    name: "ᴿᴺ lyzzznc",
    role: "R2",
    power: formatNumber(51042177),
    kills: formatNumber(2464806),
  });

  membersByRole["R2"].push({
    id: 116,
    name: "ᴿᴺ Empiro",
    role: "R2",
    power: formatNumber(51009912),
    kills: formatNumber(5799500),
  });

  membersByRole["R2"].push({
    id: 117,
    name: "Ｃａｓｐｅｒ",
    role: "R2",
    power: formatNumber(51000032),
    kills: formatNumber(3896905),
  });

  membersByRole["R2"].push({
    id: 118,
    name: "ᴿᴺ LeF",
    role: "R2",
    power: formatNumber(51177919),
    kills: formatNumber(4214641),
  });

  membersByRole["R2"].push({
    id: 119,
    name: "Vũ nèee",
    role: "R2",
    power: formatNumber(53670807),
    kills: formatNumber(4162939),
  });

  membersByRole["R2"].push({
    id: 120,
    name: "ᴿᴺ Huấn ko có lỗi",
    role: "R2",
    power: formatNumber(50825286),
    kills: formatNumber(961230),
  });

  membersByRole["R2"].push({
    id: 121,
    name: "ᴿᴺNgọc Chu Che",
    role: "R2",
    power: formatNumber(50813125),
    kills: formatNumber(3662235),
  });

  membersByRole["R2"].push({
    id: 122,
    name: "Dân playyy",
    role: "R2",
    power: formatNumber(5045661),
    kills: formatNumber(2795638),
  });

  membersByRole["R2"].push({
    id: 123,
    name: "ᴿᴺ 乡Rắn乡",
    role: "R2",
    power: formatNumber(50597050),
    kills: formatNumber(5538729),
  });

  membersByRole["R2"].push({
    id: 124,
    name: "ᴿᴺ HuySiuNhân",
    role: "R2",
    power: formatNumber(53326505),
    kills: formatNumber(6695252),
  });

  membersByRole["R2"].push({
    id: 125,
    name: "Knight3Dragon",
    role: "R2",
    power: formatNumber(50098484),
    kills: formatNumber(2327172),
  });

  membersByRole["R2"].push({
    id: 126,
    name: "ᴿᴺ 3ᴘɢ ﾒ Wayyy",
    role: "R2",
    power: formatNumber(49696319),
    kills: formatNumber(2245039),
  });

  membersByRole["R2"].push({
    id: 127,
    name: "H P T",
    role: "R2",
    power: formatNumber(49443830),
    kills: formatNumber(6476977),
  });

  membersByRole["R2"].push({
    id: 128,
    name: "ᵀᴹMoRph",
    role: "R2",
    power: formatNumber(49226724),
    kills: formatNumber(1074125),
  });

  membersByRole["R2"].push({
    id: 129,
    name: "ᴿᴺ Octopus ver 2",
    role: "R2",
    power: formatNumber(49207038),
    kills: formatNumber(334639),
  });

  membersByRole["R2"].push({
    id: 130,
    name: "ᴿᴺMeoone",
    role: "R2",
    power: formatNumber(49059104),
    kills: formatNumber(1307447),
  });

  membersByRole["R2"].push({
    id: 131,
    name: "Ngu như lợn",
    role: "R2",
    power: formatNumber(49515768),
    kills: formatNumber(1840843),
  });

  membersByRole["R2"].push({
    id: 132,
    name: "ᴿᴺ ChoCoPai",
    role: "R2",
    power: formatNumber(48966329),
    kills: formatNumber(1040704),
  });

  membersByRole["R2"].push({
    id: 133,
    name: "ᴿᴺ mmmm46",
    role: "R2",
    power: formatNumber(54514394),
    kills: formatNumber(6670060),
  });

  membersByRole["R2"].push({
    id: 134,
    name: "ᴿᴺ Nda ˡᵒᵁᴸ",
    role: "R2",
    power: formatNumber(49008113),
    kills: formatNumber(3260667),
  });

  membersByRole["R2"].push({
    id: 135,
    name: "GiAnG",
    role: "R2",
    power: formatNumber(53777899),
    kills: formatNumber(1471043),
  });

  membersByRole["R2"].push({
    id: 136,
    name: "ᴿᴺCandyT1ᵀᴵᴺʸ",
    role: "R2",
    power: formatNumber(48761123),
    kills: formatNumber(3073492),
  });

  membersByRole["R2"].push({
    id: 137,
    name: "ᴿᴺ Qti",
    role: "R2",
    power: formatNumber(48575831),
    kills: formatNumber(212509),
  });

  membersByRole["R2"].push({
    id: 138,
    name: "ᴿᴺAloVn",
    role: "R2",
    power: formatNumber(50972320),
    kills: formatNumber(7162879),
  });

  membersByRole["R2"].push({
    id: 139,
    name: "Ndcuong06",
    role: "R2",
    power: formatNumber(48299379),
    kills: formatNumber(2347001),
  });

  membersByRole["R2"].push({
    id: 140,
    name: "ᴿᴺ nɠɑnıe",
    role: "R2",
    power: formatNumber(48253132),
    kills: formatNumber(4632877),
  });

  membersByRole["R2"].push({
    id: 141,
    name: "thái dám",
    role: "R2",
    power: formatNumber(49842357),
    kills: formatNumber(2019513),
  });

  membersByRole["R2"].push({
    id: 142,
    name: "ᴿᴺ LimPu",
    role: "R2",
    power: formatNumber(50288600),
    kills: formatNumber(2904557),
  });

  membersByRole["R2"].push({
    id: 143,
    name: "ᴿᴺ GấuTcon",
    role: "R2",
    power: formatNumber(47581771),
    kills: formatNumber(3018499),
  });

  membersByRole["R2"].push({
    id: 145,
    name: "ᴿᴺDarkDark",
    role: "R2",
    power: formatNumber(47394028),
    kills: formatNumber(435608),
  });

  membersByRole["R2"].push({
    id: 146,
    name: "ᴿᴺ Zinlli",
    role: "R2",
    power: formatNumber(57277226),
    kills: formatNumber(1993393),
  });

  membersByRole["R2"].push({
    id: 147,
    name: "ᴿᴺ EmCơmThèmPh",
    role: "R2",
    power: formatNumber(47211992),
    kills: formatNumber(2143013),
  });

  membersByRole["R2"].push({
    id: 148,
    name: "Nhi Dú Bự",
    role: "R2",
    power: formatNumber(46624153),
    kills: formatNumber(1780826),
  });

  membersByRole["R2"].push({
    id: 149,
    name: "ᴿᴺ ๖ۣۜNhímm",
    role: "R2",
    power: formatNumber(46578248),
    kills: formatNumber(6110837),
  });

  membersByRole["R2"].push({
    id: 150,
    name: "LâmST",
    role: "R2",
    power: formatNumber(49283928),
    kills: formatNumber(13904524),
  });

  membersByRole["R2"].push({
    id: 151,
    name: "ᵛᶰ Dolphin",
    role: "R2",
    power: formatNumber(46078727),
    kills: formatNumber(317725),
  });

  membersByRole["R2"].push({
    id: 152,
    name: "ₐₗₚₕₐ Wₒₗf",
    role: "R2",
    power: formatNumber(46038663),
    kills: formatNumber(2566355),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "ᵃʳTITAN",
    role: "R2",
    power: formatNumber(45417135),
    kills: formatNumber(3594681),
  });

  membersByRole["R2"].push({
    id: 154,
    name: "ᴿᴺ Thắng Tập Chơi",
    role: "R2",
    power: formatNumber(47583027),
    kills: formatNumber(1491104),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "Herr  Voldemort",
    role: "R2",
    power: formatNumber(45993883),
    kills: formatNumber(2335708),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "тuâɴɴɴ",
    role: "R2",
    power: formatNumber(48330328),
    kills: formatNumber(799408),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "ᴿᴺ nurtg5T",
    role: "R2",
    power: formatNumber(46594844),
    kills: formatNumber(3100794),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "ᴿᴺ ๖ۣۜꜰ ᵃᵗᵉ",
    role: "R2",
    power: formatNumber(44759474),
    kills: formatNumber(716921),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "Cato ˡᵒᵁᴸ",
    role: "R2",
    power: formatNumber(44643792),
    kills: formatNumber(515465),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "ᴷᵒᴳ ﾒ Baoooos",
    role: "R2",
    power: formatNumber(49571817),
    kills: formatNumber(2248588),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "Bao ngoc",
    role: "R2",
    power: formatNumber(44564645),
    kills: formatNumber(2044021),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "ᴿᴺ Achilles",
    role: "R2",
    power: formatNumber(43069300),
    kills: formatNumber(2766216),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "ᴿᴺ CHELSEA bds",
    role: "R2",
    power: formatNumber(42795562),
    kills: formatNumber(2653181),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "ᵃᴸᵉ ﾒ Lingiyayo",
    role: "R2",
    power: formatNumber(45954509),
    kills: formatNumber(4732288),
  });

  membersByRole["R2"].push({
    id: 153,
    name: "BAP rang",
    role: "R2",
    power: formatNumber(42796446),
    kills: formatNumber(2113041),
  });
  // // Add R3 members (2 members)
  // for (let i = 0; i < 2; i++) {
  //   membersByRole["R3"].push({
  //     id: i + 13,
  //     name: generateRandomName(),
  //     role: "R3",
  //     power: formatNumber(Math.floor(30000000 + Math.random() * 50000000)),
  //     kills: formatNumber(Math.floor(5000000 + Math.random() * 10000000)),
  //   });
  // }

  // Add R2 members (0 members as shown in the image)

  // Add R1 members (189 members as close to the image)
  // const remainingCount = 200 - (1 + 1 + 10 + 2 + 0); // King + Queen + R4 + R3 + R2
  // for (let i = 0; i < remainingCount; i++) {
  //   membersByRole["R1"].push({
  //     id: i + 15,
  //     name: generateRandomName(),
  //     role: "R1",
  //     power: formatNumber(Math.floor(10000000 + Math.random() * 40000000)),
  //     kills: formatNumber(Math.floor(1000000 + Math.random() * 7000000)),
  //   });
  // }

  return membersByRole;
};

// Role type with color and badge information
interface RoleType {
  label: string;
  color: string;
  badgeColor: string;
  maxMembers?: number;
}

// Define roles configuration
const ROLES: Record<string, RoleType> = {
  King: { label: "Vua", color: "text-yellow-500", badgeColor: "bg-yellow-500" },
  Queen: {
    label: "Hoàng Hậu",
    color: "text-pink-400",
    badgeColor: "bg-pink-400",
  },
  R4: {
    label: "Cấp 4 (Chỉ Huy)",
    color: "text-blue-400",
    badgeColor: "bg-[#9b87f5]",
    maxMembers: 10,
  },
  R3: { label: "Cấp 3", color: "text-indigo-400", badgeColor: "bg-indigo-400" },
  R2: { label: "Cấp 2", color: "text-green-400", badgeColor: "bg-green-400" },
  R1: { label: "Cấp 1", color: "text-gray-400", badgeColor: "bg-gray-400" },
};

// Role badge component
const RoleBadge = ({ role }: { role: string }) => {
  const roleConfig = ROLES[role] || ROLES["R1"]; // Default to R1 if role not found

  return (
    <div className={`flex items-center gap-2 ${roleConfig.color}`}>
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-md ${roleConfig.badgeColor}`}
      >
        {role === "R4" && (
          <div className="text-white font-bold text-sm">R4</div>
        )}
        {role === "R3" && (
          <div className="text-white font-bold text-sm">R3</div>
        )}
        {role === "R2" && (
          <div className="text-white font-bold text-sm">R2</div>
        )}
        {role === "R1" && (
          <div className="text-white font-bold text-sm">R1</div>
        )}
      </div>
      <div className="font-semibold">{roleConfig.label}</div>
    </div>
  );
};

// Member card component with theme support
const MemberCard = ({ member }: { member: Member }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border transition-all",
        isDarkMode
          ? "bg-gray-50 border-gray-200 hover:border-orange-500/30"
          : "bg-clan-dark-accent/30 border-white/5 hover:border-clan-gold/30"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border",
            isDarkMode
              ? "bg-gray-100 border-gray-300"
              : "bg-clan-dark-accent/70 border-white/10"
          )}
        >
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Users
              size={24}
              className={isDarkMode ? "text-gray-400" : "text-white/50"}
            />
          )}
        </div>
        <div>
          <div
            className={
              isDarkMode
                ? "text-gray-800 font-medium"
                : "text-white font-medium"
            }
          >
            {member.name}
          </div>
          <div
            className={cn(
              "text-sm flex items-center gap-1",
              isDarkMode ? "text-gray-600" : "text-white/70"
            )}
          >
            <RoleIcon role={member.role} />
            <span>{member.role}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div>
          <div
            className={
              isDarkMode ? "text-gray-500 text-xs" : "text-white/50 text-xs"
            }
          >
            Lực Chiến
          </div>
          <div
            className={
              isDarkMode
                ? "text-gray-800 font-semibold"
                : "text-white font-semibold"
            }
          >
            {member.power}
          </div>
        </div>
        <div>
          <div
            className={
              isDarkMode ? "text-gray-500 text-xs" : "text-white/50 text-xs"
            }
          >
            Công Trạng
          </div>
          <div
            className={
              isDarkMode
                ? "text-gray-800 font-semibold"
                : "text-white font-semibold"
            }
          >
            {member.kills}
          </div>
        </div>
      </div>
    </div>
  );
};

// Leader card component for King/Queen with theme support
const LeaderCard = ({ member }: { member: Member }) => {
  const isKing = member.role === "King";
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={cn(
        "p-4 rounded-lg border mb-6",
        isDarkMode
          ? "bg-gradient-to-r from-gray-100 to-gray-50 border-orange-200"
          : "bg-gradient-to-r from-clan-dark-accent/80 to-clan-dark-accent/40 border-clan-gold/30"
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2",
                isDarkMode
                  ? "bg-white border-orange-400"
                  : "bg-clan-dark-accent border-clan-gold"
              )}
            >
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users
                  size={32}
                  className={isDarkMode ? "text-orange-500" : "text-clan-gold"}
                />
              )}
            </div>
            <div className="absolute -top-2 -right-2">
              {isKing ? (
                <Crown size={24} className="text-yellow-500" />
              ) : (
                <Crown size={24} className="text-pink-400" />
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={
                  isDarkMode
                    ? "text-orange-500 text-xs"
                    : "text-clan-gold text-xs"
                }
              >
                RN
              </span>
              <span
                className={
                  isDarkMode
                    ? "text-gray-900 font-bold text-xl"
                    : "text-white font-bold text-xl"
                }
              >
                {member.name}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-1">
              <div>
                <div
                  className={
                    isDarkMode
                      ? "text-gray-500 text-xs"
                      : "text-white/50 text-xs"
                  }
                >
                  Lực Chiến
                </div>
                <div
                  className={
                    isDarkMode
                      ? "text-gray-800 font-semibold"
                      : "text-white font-semibold"
                  }
                >
                  {member.power}
                </div>
              </div>
              <div>
                <div
                  className={
                    isDarkMode
                      ? "text-gray-500 text-xs"
                      : "text-white/50 text-xs"
                  }
                >
                  Công Trạng
                </div>
                <div
                  className={
                    isDarkMode
                      ? "text-gray-800 font-semibold"
                      : "text-white font-semibold"
                  }
                >
                  {member.kills}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isKing ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <Crown size={32} className="text-yellow-500" />
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center">
              <Crown size={32} className="text-pink-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Role section component with theme support
const RoleSection = ({
  role,
  members,
  isExpanded,
  toggleExpanded,
}: {
  role: string;
  members: Member[];
  isExpanded: boolean;
  toggleExpanded: () => void;
}) => {
  const roleConfig = ROLES[role];
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={toggleExpanded}
      className="mb-3"
    >
      <CollapsibleTrigger className="w-full">
        <div
          className={cn(
            "flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer",
            isExpanded
              ? isDarkMode
                ? "bg-orange-100"
                : "bg-clan-gold/20"
              : isDarkMode
              ? "bg-amber-50 hover:bg-orange-100"
              : "bg-[#e6c4a1]/30 hover:bg-clan-gold/20"
          )}
        >
          <RoleBadge role={role} />
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Users
                size={16}
                className={
                  isDarkMode ? "text-gray-500 mr-1" : "text-white/70 mr-1"
                }
              />
              <span className={isDarkMode ? "text-gray-500" : "text-white/70"}>
                {members.length}/{roleConfig.maxMembers || "∞"}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp
                size={20}
                className={isDarkMode ? "text-gray-500" : "text-white/70"}
              />
            ) : (
              <ChevronDown
                size={20}
                className={isDarkMode ? "text-gray-500" : "text-white/70"}
              />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 space-y-3">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
        {members.length === 0 && (
          <div
            className={cn(
              "text-center py-4",
              isDarkMode ? "text-gray-500" : "text-white/50"
            )}
          >
            Không có thành viên nào
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

// New component to welcome new members
const NewMemberWelcome = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(false);
  const [recentMembers] = useState<Member[]>([
    {
      id: 201,
      name: "Ƥo",
      role: "R1",
      power: "83.768.381",
      kills: "19.142.943",
      joinDate: "10 Tháng 4, 2025",
      avatar:
        "https://res.cloudinary.com/deuef2tzm/image/upload/v1744376880/Screenshot_2025-04-11_200749_dokxgi.png",
    },
    {
      id: 202,
      name: "Eventide",
      role: "R1",
      power: "100.976.883",
      kills: "13.031.747",
      joinDate: "8 Tháng 4, 2025",
      avatar:
        "https://res.cloudinary.com/deuef2tzm/image/upload/v1744377328/Screenshot_2025-04-11_201433_hmut3z.png",
    },
    {
      id: 203,
      name: "RathaloS",
      role: "R1",
      power: "71.363.618",
      kills: "27.129.378",
      joinDate: "11 Tháng 4, 2025",
      avatar:
        "https://res.cloudinary.com/deuef2tzm/image/upload/v1744377562/Screenshot_2025-04-11_201906_bq6xuz.png",
    },
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("welcome-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      id="welcome-section"
      className={cn(
        "mb-12 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <h4
        className={cn(
          "text-xl font-semibold mb-4 text-center",
          isDarkMode ? "text-gray-800" : "text-white"
        )}
      >
        {getText("welcomeMessage", language) || "Thành viên mới"}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mx-auto max-w-5xl">
        {recentMembers.map((member, index) => (
          <div
            key={member.id}
            className={cn(
              "p-4 rounded-xl border flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 relative",
              isDarkMode
                ? "bg-gradient-to-b from-white to-gray-50 border-orange-200 hover:shadow-lg hover:shadow-orange-100/40"
                : "bg-gradient-to-b from-clan-dark-accent/80 to-clan-dark-accent/40 border-clan-gold/20 hover:border-clan-gold/50 hover:shadow-lg hover:shadow-clan-gold/10"
            )}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Decorative corner accent */}
            <div
              className={cn("absolute top-0 right-0 w-16 h-16 overflow-hidden")}
            >
              <div
                className={cn(
                  "absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-3",
                  isDarkMode ? "bg-orange-200/50" : "bg-clan-gold/20"
                )}
              ></div>
            </div>

            <div
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center border-2 mb-4 shadow-inner overflow-hidden",
                isDarkMode
                  ? "bg-orange-50 border-orange-200"
                  : "bg-clan-dark-accent border-clan-gold/40"
              )}
            >
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users
                  size={32}
                  className={isDarkMode ? "text-orange-500" : "text-clan-gold"}
                />
              )}
            </div>

            <h4
              className={cn(
                "font-bold text-lg mb-1",
                isDarkMode ? "text-gray-800" : "text-white"
              )}
            >
              {member.name}
            </h4>

            <div className="flex flex-col items-center space-y-1 mb-3">
              <div className="flex items-center text-sm">
                <span
                  className={isDarkMode ? "text-gray-500" : "text-white/60"}
                >
                  {member.joinDate}
                </span>
              </div>
              <span
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1",
                  isDarkMode
                    ? "bg-green-100 text-green-700"
                    : "bg-green-900/40 text-green-400"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                {getText("new", language) || "New"}
              </span>
            </div>

            <div
              className={cn(
                "grid grid-cols-2 gap-3 w-full pt-3 border-t",
                isDarkMode ? "border-gray-100" : "border-white/10"
              )}
            >
              <div className="text-center">
                <div
                  className={
                    isDarkMode
                      ? "text-gray-500 text-xs"
                      : "text-white/50 text-xs"
                  }
                >
                  Lực Chiến
                </div>
                <div
                  className={
                    isDarkMode
                      ? "text-gray-800 font-medium"
                      : "text-white font-medium"
                  }
                >
                  {member.power}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={
                    isDarkMode
                      ? "text-gray-500 text-xs"
                      : "text-white/50 text-xs"
                  }
                >
                  Công Trạng
                </div>
                <div
                  className={
                    isDarkMode
                      ? "text-gray-800 font-medium"
                      : "text-white font-medium"
                  }
                >
                  {member.kills}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// The main Members component
const Members = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    R4: true,
    R3: false,
    R2: false,
    R1: false,
  });
  const [membersByRole] = useState<Record<string, Member[]>>(generateMembers());
  const { isDarkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Toggle expanded state for a role
  const toggleRoleExpanded = (role: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  // Filtered members
  const filteredMembers = Object.entries(membersByRole).reduce(
    (acc, [role, members]) => {
      if (searchTerm === "") {
        return acc;
      }

      const filtered = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        ...acc,
        [role]: filtered,
      };
    },
    {} as Record<string, Member[]>
  );

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = document.getElementById("members-section");
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  // Members to display - either all or filtered
  const displayMembers = searchTerm ? filteredMembers : membersByRole;

  return (
    <section
      id="members"
      className={cn("py-24 relative", isDarkMode ? "bg-gray-50" : "")}
    >
      <div className="section-container" id="members-section">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-4",
            isDarkMode ? "text-orange-500" : "gold-gradient-text"
          )}
        >
          {getText("members", language)}
        </h2>

        <NewMemberWelcome />

        <Card
          className={cn(
            "overflow-hidden max-w-3xl mx-auto",
            isDarkMode ? "bg-white border border-gray-200" : "glass-card"
          )}
        >
          <div
            className={cn(
              "p-4 border-b",
              isDarkMode ? "border-gray-200" : "border-white/10"
            )}
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Nhập tên thành viên..."
                className={cn(
                  "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 pl-10",
                  isDarkMode
                    ? "bg-gray-50 text-gray-800 border-gray-200 focus:ring-orange-500/50"
                    : "bg-clan-dark-accent text-white border-white/10 focus:ring-clan-gold/50"
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search
                  size={18}
                  className={isDarkMode ? "text-orange-500" : "text-clan-gold"}
                />
              </div>
              {searchTerm && (
                <button
                  className={cn(
                    "absolute inset-y-0 right-0 flex items-center pr-3 hover:text-white",
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-700"
                      : "text-white/50 hover:text-white"
                  )}
                  onClick={() => setSearchTerm("")}
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          <ScrollArea className="h-[600px] w-full p-4">
            {/* King section - always visible */}
            {(searchTerm === "" || displayMembers["King"]?.length > 0) &&
              membersByRole["King"][0] && (
                <LeaderCard member={membersByRole["King"][0]} />
              )}

            {/* Queen section - always visible */}
            {(searchTerm === "" || displayMembers["Queen"]?.length > 0) &&
              membersByRole["Queen"][0] && (
                <LeaderCard member={membersByRole["Queen"][0]} />
              )}

            {/* Collapsible role sections */}
            {Object.entries(ROLES).map(([role, config]) => {
              // Skip King and Queen as they are shown separately
              if (role === "King" || role === "Queen") return null;

              const roleMembers = displayMembers[role] || [];
              // Only show the section if there are members or if search is empty
              if (searchTerm === "" || roleMembers.length > 0) {
                return (
                  <RoleSection
                    key={role}
                    role={role}
                    members={roleMembers}
                    isExpanded={expandedRoles[role]}
                    toggleExpanded={() => toggleRoleExpanded(role)}
                  />
                );
              }
              return null;
            })}

            {searchTerm &&
              Object.values(displayMembers).flat().length === 0 && (
                <div
                  className={cn(
                    "text-center py-6",
                    isDarkMode ? "text-gray-600" : "text-white/70"
                  )}
                >
                  {getText("memberNotFound", language)}
                </div>
              )}
          </ScrollArea>
        </Card>
      </div>
    </section>
  );
};

export default Members;
