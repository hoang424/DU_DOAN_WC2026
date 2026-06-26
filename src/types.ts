export interface Country {
  id: string;
  name: string;
  flag: string;
  stars: number; // Đánh giá sức mạnh từ 1 đến 5 sao
  region: string; // Châu lục
}

export interface MatchPrediction {
  winA: number; // Tỉ lệ thắng Đội A (%)
  draw: number; // Tỉ lệ hòa (%)
  winB: number; // Tỉ lệ thắng Đội B (%)
  badgeA: string;
  badgeB: string;
}
