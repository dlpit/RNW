import { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
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
}

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Generate random name
const generateRandomName = (): string => {
  const prefixes = [
    "Dragon",
    "Shadow",
    "Phoenix",
    "Frost",
    "Storm",
    "Fire",
    "Ice",
    "Thunder",
    "Night",
    "Blood",
    "Star",
    "Moon",
    "Sun",
    "Dark",
    "Light",
  ];
  const suffixes = [
    "Slayer",
    "Hunter",
    "Knight",
    "Warrior",
    "Lord",
    "Master",
    "Rider",
    "Tamer",
    "Guardian",
    "King",
    "Queen",
    "Prince",
    "Princess",
    "Emperor",
    "Empress",
  ];

  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${
    suffixes[Math.floor(Math.random() * suffixes.length)]
  }`;
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
    name: "M A X",
    role: "King",
    power: formatNumber(118210596),
    kills: formatNumber(21827535),
  });

  // Add Queen
  membersByRole["Queen"].push({
    id: 2,
    name: "Z Z A R",
    role: "Queen",
    power: formatNumber(Math.floor(90000000 + Math.random() * 30000000)),
    kills: formatNumber(Math.floor(15000000 + Math.random() * 8000000)),
  });

  // Add R4 members (10 max)
  const r4Names = [
    "OrderDarkHelmet",
    "Mèo Kem",
    "Kito713",
    "Xin of Bée",
    "Gaia",
    "Lâu Bò",
    "KoS Ryanlu",
    "LâmST",
    "DragonKiller",
    "PhoenixRider",
  ];

  for (let i = 0; i < 10; i++) {
    membersByRole["R4"].push({
      id: i + 3,
      name: r4Names[i] || generateRandomName(),
      role: "R4",
      power: formatNumber(Math.floor(45000000 + Math.random() * 80000000)),
      kills: formatNumber(Math.floor(10000000 + Math.random() * 15000000)),
    });
  }

  // Add R3 members (2 members)
  for (let i = 0; i < 2; i++) {
    membersByRole["R3"].push({
      id: i + 13,
      name: generateRandomName(),
      role: "R3",
      power: formatNumber(Math.floor(30000000 + Math.random() * 50000000)),
      kills: formatNumber(Math.floor(5000000 + Math.random() * 10000000)),
    });
  }

  // Add R2 members (0 members as shown in the image)

  // Add R1 members (189 members as close to the image)
  const remainingCount = 200 - (1 + 1 + 10 + 2 + 0); // King + Queen + R4 + R3 + R2
  for (let i = 0; i < remainingCount; i++) {
    membersByRole["R1"].push({
      id: i + 15,
      name: generateRandomName(),
      role: "R1",
      power: formatNumber(Math.floor(10000000 + Math.random() * 40000000)),
      kills: formatNumber(Math.floor(1000000 + Math.random() * 7000000)),
    });
  }

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

// Member card component
const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-clan-dark-accent/30 rounded-lg border border-white/5 hover:border-clan-gold/30 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-clan-dark-accent/70 flex items-center justify-center border border-white/10">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Users size={24} className="text-white/50" />
          )}
        </div>
        <div>
          <div className="text-white font-medium">{member.name}</div>
          <div className="text-white/70 text-sm flex items-center gap-1">
            <RoleIcon role={member.role} />
            <span>{member.role}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div>
          <div className="text-white/50 text-xs">Lực Chiến</div>
          <div className="text-white font-semibold">{member.power}</div>
        </div>
        <div>
          <div className="text-white/50 text-xs">Công Trạng</div>
          <div className="text-white font-semibold">{member.kills}</div>
        </div>
      </div>
    </div>
  );
};

// Leader card component for King/Queen
const LeaderCard = ({ member }: { member: Member }) => {
  const isKing = member.role === "King";

  return (
    <div className="p-4 bg-gradient-to-r from-clan-dark-accent/80 to-clan-dark-accent/40 rounded-lg border border-clan-gold/30 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-clan-dark-accent border-2 border-clan-gold flex items-center justify-center overflow-hidden">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users size={32} className="text-clan-gold" />
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
              <span className="text-clan-gold text-xs">RN</span>
              <span className="text-white font-bold text-xl">
                {member.name}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-1">
              <div>
                <div className="text-white/50 text-xs">Lực Chiến</div>
                <div className="text-white font-semibold">{member.power}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs">Công Trạng</div>
                <div className="text-white font-semibold">{member.kills}</div>
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

// Role section component
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

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={toggleExpanded}
      className="mb-3"
    >
      <CollapsibleTrigger className="w-full">
        <div
          className={`flex items-center justify-between p-3 rounded-lg ${
            isExpanded ? "bg-clan-gold/20" : "bg-[#e6c4a1]/30"
          } hover:bg-clan-gold/20 transition-all cursor-pointer`}
        >
          <RoleBadge role={role} />
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Users size={16} className="text-white/70 mr-1" />
              <span className="text-white/70">
                {members.length}/{roleConfig.maxMembers || "∞"}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp size={20} className="text-white/70" />
            ) : (
              <ChevronDown size={20} className="text-white/70" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 space-y-3">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
        {members.length === 0 && (
          <div className="text-center py-4 text-white/50">
            Không có thành viên nào
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
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
    <section id="members" className="py-24 relative">
      <div className="section-container" id="members-section">
        <h2 className="section-title text-center mb-4">
          Thành Viên Của Chúng Tôi
        </h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-12">
          Tham gia cùng đội ngũ chiến binh ưu tú của chúng tôi tại server 284.
          Với hơn 150 thành viên, trong đó có 12 người chơi T5 với sức mạnh trên
          100 triệu, chúng tôi luôn sẵn sàng tiếp nhận những chiến binh mới có
          tinh thần cống hiến.
        </p>

        <Card className="glass-card overflow-hidden max-w-3xl mx-auto">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Nhập tên thành viên..."
                className="w-full px-4 py-3 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-clan-gold" />
              </div>
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white"
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
                <div className="text-center py-6 text-white/70">
                  Không tìm thấy thành viên phù hợp với từ khóa tìm kiếm.
                </div>
              )}
          </ScrollArea>
        </Card>
      </div>
    </section>
  );
};

export default Members;
