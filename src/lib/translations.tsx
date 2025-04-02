export const translations = {
  en: {
    // Navbar
    home: "Home",
    stats: "Stats",
    members: "Members",
    achievements: "Achievements",
    gallery: "Gallery",
    joinClan: "Join Clan",

    // Hero
    clanFullName: "Rejuve Nation : Warriors",
    clanDescription:
      "Elite team of warriors on server 284. We are looking for brave warriors ready to fight and contribute.",
    clanStats: "Clan Stats",
    joinNow: "Join Now",

    // Members
    searchPlaceholder: "Search members by name or role...",
    memberNotFound: "No members found matching the search criteria.",
    showing: "Showing",
    of: "of",
    member: "Member",
    role: "Role",
    power: "Power",
    kills: "Kills",
    scrollDown: "Scroll down",
    victory: "Victory",
    seed: "Seed",
    kvkMerit: "Kvk Merit",
    kingdom: "Kingdom",
    leader: "Leader",
    leagueGift: "League Gift",
    mobilizingTheAlliance: "Mobilizing the Alliance",
    diamond: "Diamond",

    // Stats page
    powerText: "Power:",
    leaderText: "Leader:",
    leagueGiftText: "League Gift:",
    membersText: "Members:",
    allianceForceText: "Alliance Mobilization Force:",
    t5Members: "T5 > 100M",
    allianceOne: "-Alliance 1-",
    clanFullTitle: "[ RN ] REJUVE NATION - W",
    victories: "Victories",
  },
  vi: {
    // Navbar
    home: "Trang Chủ",
    stats: "Thống Kê",
    members: "Thành Viên",
    achievements: "Thành Tựu",
    gallery: "Bộ Sưu Tập",
    joinClan: "Gia Nhập",

    // Hero
    clanFullName: "Rejuve Nation : Warriors",
    clanDescription:
      "Đội ngũ chiến binh ưu tú tại server 284. Chúng tôi đang tìm kiếm những chiến binh dũng cảm sẵn sàng chiến đấu và cống hiến.",
    clanStats: "Thống Kê Clan",
    joinNow: "Gia Nhập Ngay",

    // Members
    searchPlaceholder: "Tìm kiếm thành viên theo tên hoặc vai trò...",
    memberNotFound: "Không tìm thấy thành viên phù hợp với từ khóa tìm kiếm.",
    showing: "Hiển thị",
    of: "trong tổng số",
    member: "Thành Viên",
    role: "Vai Trò",
    power: "Lực Chiến",
    kills: "Điểm Tiêu Diệt",
    scrollDown: "Cuộn Xuống",
    victory: "Chiến Thắng",
    seed: "Hạt Giống",
    kvkMerit: "Kvk Merit",
    kingdom: "Vương Quốc",
    leader: "Thủ Lĩnh",
    leagueGift: "Quà Liên Minh",
    mobilizingTheAlliance: "Huy Động Liên Minh",
    diamond: "Kim Cương",

    // Stats page
    powerText: "Lực Chiến:",
    leaderText: "Thủ Lĩnh:",
    leagueGiftText: "Quà Liên Minh:",
    membersText: "Thành viên:",
    allianceForceText: "Lực Lượng Liên Minh Cơ Động:",
    t5Members: "T5 > 100M",
    allianceOne: "-1 Liên Minh-",
    clanFullTitle: "[ RN ] REJUVE NATION - W",
    victories: "Chiến Thắng",
  },
};

export const getText = (
  key: keyof typeof translations.en,
  language: "en" | "vi"
): string => {
  return translations[language][key] || key.toString();
};
