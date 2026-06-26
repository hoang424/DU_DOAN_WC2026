import { Country } from './types';

export const ALL_COUNTRIES: Country[] = [
  // Châu Âu (UEFA)
  { id: 'fra', name: 'Pháp', flag: '🇫🇷', stars: 5, region: 'Châu Âu' },
  { id: 'esp', name: 'Tây Ban Nha', flag: '🇪🇸', stars: 5, region: 'Châu Âu' },
  { id: 'eng', name: 'Anh', flag: '🇬🇧', stars: 5, region: 'Châu Âu' },
  { id: 'ger', name: 'Đức', flag: '🇩🇪', stars: 4, region: 'Châu Âu' },
  { id: 'por', name: 'Bồ Đào Nha', flag: '🇵🇹', stars: 4, region: 'Châu Âu' },
  { id: 'ita', name: 'Ý', flag: '🇮🇹', stars: 4, region: 'Châu Âu' },
  { id: 'ned', name: 'Hà Lan', flag: '🇳🇱', stars: 4, region: 'Châu Âu' },
  { id: 'bel', name: 'Bỉ', flag: '🇧🇪', stars: 4, region: 'Châu Âu' },
  { id: 'cro', name: 'Croatia', flag: '🇭🇷', stars: 4, region: 'Châu Âu' },
  { id: 'sui', name: 'Thụy Sĩ', flag: '🇨🇭', stars: 3, region: 'Châu Âu' },
  { id: 'den', name: 'Đan Mạch', flag: '🇩🇰', stars: 3, region: 'Châu Âu' },
  { id: 'ser', name: 'Serbia', flag: '🇷🇸', stars: 3, region: 'Châu Âu' },
  { id: 'pol', name: 'Ba Lan', flag: '🇵🇱', stars: 3, region: 'Châu Âu' },

  // Nam Mỹ (CONMEBOL)
  { id: 'bra', name: 'Brazil', flag: '🇧🇷', stars: 5, region: 'Nam Mỹ' },
  { id: 'arg', name: 'Argentina', flag: '🇦🇷', stars: 5, region: 'Nam Mỹ' },
  { id: 'uru', name: 'Uruguay', flag: '🇺🇾', stars: 4, region: 'Nam Mỹ' },
  { id: 'col', name: 'Colombia', flag: '🇨🇴', stars: 4, region: 'Nam Mỹ' },
  { id: 'ecu', name: 'Ecuador', flag: '🇪🇨', stars: 3, region: 'Nam Mỹ' },
  { id: 'chi', name: 'Chile', flag: '🇨🇱', stars: 3, region: 'Nam Mỹ' },

  // Châu Á (AFC)
  { id: 'jpn', name: 'Nhật Bản', flag: '🇯🇵', stars: 4, region: 'Châu Á' },
  { id: 'kor', name: 'Hàn Quốc', flag: '🇰🇷', stars: 4, region: 'Châu Á' },
  { id: 'aus', name: 'Úc', flag: '🇦🇺', stars: 3, region: 'Châu Á' },
  { id: 'ksa', name: 'Ả Rập Xê Út', flag: '🇸🇦', stars: 3, region: 'Châu Á' },
  { id: 'irn', name: 'Iran', flag: '🇮🇷', stars: 3, region: 'Châu Á' },
  { id: 'qat', name: 'Qatar', flag: '🇶🇦', stars: 2, region: 'Châu Á' },
  { id: 'vie', name: 'Việt Nam', flag: '🇻🇳', stars: 2, region: 'Châu Á' },
  { id: 'tha', name: 'Thái Lan', flag: '🇹🇭', stars: 2, region: 'Châu Á' },
  { id: 'idn', name: 'Indonesia', flag: '🇮🇩', stars: 2, region: 'Châu Á' },
  { id: 'chn', name: 'Trung Quốc', flag: '🇨🇳', stars: 2, region: 'Châu Á' },

  // Châu Phi (CAF)
  { id: 'mar', name: 'Marốc', flag: '🇲🇦', stars: 4, region: 'Châu Phi' },
  { id: 'sen', name: 'Senegal', flag: '🇸🇳', stars: 3, region: 'Châu Phi' },
  { id: 'nga', name: 'Nigeria', flag: '🇳🇬', stars: 3, region: 'Châu Phi' },
  { id: 'egy', name: 'Ai Cập', flag: '🇪🇬', stars: 3, region: 'Châu Phi' },
  { id: 'cmr', name: 'Cameroon', flag: '🇨🇲', stars: 3, region: 'Châu Phi' },
  { id: 'gha', name: 'Ghana', flag: '🇬🇭', stars: 3, region: 'Châu Phi' },

  // Bắc & Trung Mỹ (CONCACAF)
  { id: 'usa', name: 'Mỹ', flag: '🇺🇸', stars: 3, region: 'Bắc Mỹ' },
  { id: 'mex', name: 'Mexico', flag: '🇲🇽', stars: 3, region: 'Bắc Mỹ' },
  { id: 'can', name: 'Canada', flag: '🇨🇦', stars: 3, region: 'Bắc Mỹ' },
  { id: 'crc', name: 'Costa Rica', flag: '🇨🇷', stars: 2, region: 'Bắc Mỹ' },
];

export const REGIONS = ['Tất cả', 'Châu Âu', 'Nam Mỹ', 'Châu Á', 'Châu Phi', 'Bắc Mỹ'];

export const COMMENTS_ADVANTAGE = [
  "Phong độ áp đảo hoàn toàn đối thủ 🔥",
  "Đội hình vượt trội ở các tuyến ⭐",
  "Nắm giữ cơ hội chiến thắng cực lớn 👑",
  "Sức mạnh tấn công vũ bão chiến thuật 🚀"
];

export const COMMENTS_UNDERDOG = [
  "Chờ đợi một cơn địa chấn lịch sử 🌋",
  "Phòng ngự phản công rình rập cơ hội 🛡️",
  "Tinh thần thi đấu quả cảm tạo bất ngờ ⚡",
  "Ẩn số khó đoán có thể lật đổ ông lớn 🎯"
];

export const COMMENTS_EVEN = [
  "Kỳ phùng địch thủ cân tài cân sức ⚖️",
  "Trận cầu đinh kịch tính đến phút cuối ⏱️",
  "Sự khác biệt chỉ đến từ khoảnh khắc sao ✨"
];
