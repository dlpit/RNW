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
    clanDescription: "Elite team of warriors on server 284. We are looking for brave warriors ready to fight and contribute.",
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
  },
  vi: {
    // Navbar
    home: "Trang Chủ",
    stats: "Thống Kê",
    members: "Thành Viên",
    achievements: "Thành Tựu",
    gallery: "Bộ Sưu Tập",
    joinClan: "Gia Nhập Clan",
    
    // Hero
    clanFullName: "Rejuve Nation : Warriors",
    clanDescription: "Đội ngũ chiến binh ưu tú tại server 284. Chúng tôi đang tìm kiếm những chiến binh dũng cảm sẵn sàng chiến đấu và cống hiến.",
    clanStats: "Thống Kê Clan",
    joinNow: "Gia Nhập Ngay",
    
    // Members
    searchPlaceholder: "Tìm kiếm thành viên theo tên hoặc vai trò...",
    memberNotFound: "Không tìm thấy thành viên phù hợp với từ khóa tìm kiếm.",
    showing: "Hiển thị",
    of: "trong tổng số",
    member: "Thành Viên",
    role: "Vai Trò",
    power: "Sức Mạnh",
    kills: "Điểm Tiêu Diệt",
  }
};

export const getText = (key: keyof typeof translations.en, language: 'en' | 'vi'): string => {
  return translations[language][key] || key.toString();
};