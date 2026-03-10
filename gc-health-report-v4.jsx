import { useState, useEffect, useRef } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Activity, TrendingUp, Users, Search, ChevronRight, ArrowUpRight, ArrowDownRight, Calendar, Database, FileText, BarChart3, Heart, Shield, Eye, Brain, Bone, Pill, MapPin, Clock, ExternalLink, ChevronDown, Bookmark, Share2, Download, Filter, Zap, AlertTriangle, BookOpen, Award, Star, Thermometer, Sun, CloudRain, Snowflake, Leaf, Wind, Droplets, Moon, Coffee, Apple, Stethoscope, Baby, Flame, ChevronLeft } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────
const monthlyCheckupTrend = [
  { month: "1월", total: 98200, abnormal: 34100 },
  { month: "2월", total: 95400, abnormal: 33800 },
  { month: "3월", total: 112300, abnormal: 38200 },
  { month: "4월", total: 118700, abnormal: 41500 },
  { month: "5월", total: 125600, abnormal: 44200 },
  { month: "6월", total: 131200, abnormal: 46800 },
  { month: "7월", total: 119800, abnormal: 43100 },
  { month: "8월", total: 108500, abnormal: 39200 },
  { month: "9월", total: 134500, abnormal: 48700 },
  { month: "10월", total: 142300, abnormal: 52100 },
  { month: "11월", total: 138900, abnormal: 50800 },
  { month: "12월", total: 128400, abnormal: 47200 },
];

const diseasePrevalence = [
  { name: "고혈압", value: 28.3, color: "#0ea5e9" },
  { name: "당뇨", value: 13.8, color: "#14b8a6" },
  { name: "이상지질혈증", value: 23.5, color: "#8b5cf6" },
  { name: "비만", value: 37.2, color: "#f59e0b" },
  { name: "간기능이상", value: 18.4, color: "#ef4444" },
];

const ageGroupData = [
  { age: "20대", male: 12.3, female: 8.7 },
  { age: "30대", male: 21.5, female: 15.2 },
  { age: "40대", male: 35.8, female: 28.4 },
  { age: "50대", male: 48.2, female: 42.1 },
  { age: "60대", male: 56.7, female: 51.3 },
  { age: "70대+", male: 62.1, female: 58.9 },
];

const searchTrendData = [
  { week: "W1", 건강검진: 82, 당뇨: 65, 혈압: 58, 다이어트: 91 },
  { week: "W2", 건강검진: 78, 당뇨: 71, 혈압: 62, 다이어트: 88 },
  { week: "W3", 건강검진: 85, 당뇨: 68, 혈압: 55, 다이어트: 95 },
  { week: "W4", 건강검진: 92, 당뇨: 74, 혈압: 61, 다이어트: 87 },
  { week: "W5", 건강검진: 88, 당뇨: 82, 혈압: 70, 다이어트: 83 },
  { week: "W6", 건강검진: 95, 당뇨: 79, 혈압: 66, 다이어트: 90 },
  { week: "W7", 건강검진: 101, 당뇨: 85, 혈압: 72, 다이어트: 86 },
  { week: "W8", 건강검진: 98, 당뇨: 88, 혈압: 75, 다이어트: 92 },
];

const regionalData = [
  { region: "서울", score: 78 }, { region: "경기", score: 74 },
  { region: "부산", score: 71 }, { region: "대구", score: 69 },
  { region: "인천", score: 73 }, { region: "광주", score: 72 },
  { region: "대전", score: 75 }, { region: "울산", score: 70 },
];

const radarData = [
  { subject: "심혈관", A: 72, fullMark: 100 },
  { subject: "대사질환", A: 65, fullMark: 100 },
  { subject: "근골격", A: 81, fullMark: 100 },
  { subject: "정신건강", A: 58, fullMark: 100 },
  { subject: "암검진", A: 77, fullMark: 100 },
  { subject: "영양상태", A: 69, fullMark: 100 },
];

// ── Monthly Reports Data ──────────────────────────────────────
const monthlyReports = [
  {
    month: 1, label: "1월", season: "winter",
    icon: Snowflake, color: "#60a5fa",
    title: "새해 건강 리셋 리포트",
    subtitle: "금연·금주·운동 — 건강 다짐의 현실 데이터",
    keywords: ["새해건강", "금연", "금주", "건강검진예약"],
    summary: "매년 1월 금연·금주 검색량이 연중 최고치를 기록하지만, GC케어 건강검진 데이터상 실제 생활습관 개선 지속률은 3개월 내 급감합니다. 1월 건강검진 예약 트렌드와 '새해 건강 다짐'의 실제 효과를 데이터로 분석합니다.",
    dataSources: ["GC케어 예약 데이터", "네이버 검색트렌드", "질병관리청 건강행태조사"],
    sections: ["새해 건강검진 예약 폭증 패턴 분석", "금연·금주 성공률 연령대별 비교", "1월 건강 키워드 검색량 vs 실제 행동 전환율", "신년 건강 다짐 3개월·6개월·12개월 추적 분석"],
  },
  {
    month: 2, label: "2월", season: "winter",
    icon: Heart, color: "#f43f5e",
    title: "한파기 심혈관 위험 리포트",
    subtitle: "기온 급강하와 심혈관 질환의 상관관계",
    keywords: ["심혈관", "한파건강", "혈압관리", "독감"],
    summary: "겨울철 최한기인 2월, 기온 하강과 심혈관 질환 발생의 직접적 상관관계를 GC케어 건강검진 혈압 이상소견 데이터와 유비케어 EMR 외래 방문 데이터로 분석합니다. 연령대별·지역별 심혈관 리스크 지도를 제공합니다.",
    dataSources: ["GC케어 혈압 검진 데이터", "유비케어 EMR 외래 데이터", "기상청 기온 데이터", "질병관리청 급성심장정지 통계"],
    sections: ["기온별 심혈관 이상소견율 상관 분석", "65세 이상 고위험군 혈압 변동 추이", "권역별 한파 심혈관 리스크 맵", "인플루엔자 유행과 심혈관 복합 위험도"],
  },
  {
    month: 3, label: "3월", season: "spring",
    icon: Wind, color: "#a78bfa",
    title: "미세먼지 & 호흡기 건강 리포트",
    subtitle: "봄철 대기오염이 호흡기에 미치는 영향",
    keywords: ["미세먼지", "알레르기", "호흡기", "봄철건강"],
    summary: "3월은 미세먼지 농도가 연중 최고 수준을 기록하는 시기입니다. 미세먼지 '나쁨' 일수와 호흡기 질환 외래 방문 증가율의 상관관계, 알레르기 검사 수요 급증 패턴을 다각도로 분석합니다.",
    dataSources: ["유비케어 EMR 호흡기 진료 데이터", "에어코리아 대기질 데이터", "네이버 검색트렌드", "GC케어 알레르기 검사 데이터"],
    sections: ["미세먼지 농도별 호흡기 외래 방문 증가율", "지역별 대기질 vs 알레르기 검사 수요", "소아·고령자 호흡기 취약성 심층 분석", "봄철 알레르기 검색 키워드 클러스터링"],
  },
  {
    month: 4, label: "4월", season: "spring",
    icon: Brain, color: "#06b6d4",
    title: "대한민국 정신건강 리포트",
    subtitle: "스트레스·수면·번아웃 — 마음의 건강 점검",
    keywords: ["정신건강", "스트레스", "수면장애", "번아웃"],
    summary: "정신건강의 달인 4월, 직장인 번아웃과 수면 질 저하가 건강검진 결과에 미치는 영향을 분석합니다. 건강검진 문진표 스트레스 항목과 실제 이상소견 간 상관관계, 연령대·직종별 정신건강 리스크를 다룹니다.",
    dataSources: ["GC케어 문진표 스트레스 데이터", "유비케어 EMR 정신건강 진료 데이터", "구글 트렌드", "고용노동부 산업안전 데이터"],
    sections: ["스트레스 자가진단 점수와 이상소견율 상관분석", "업종별 번아웃 지수와 건강검진 결과", "수면 질과 대사질환 연관성 분석", "MZ세대 정신건강 키워드 트렌드 맵"],
  },
  {
    month: 5, label: "5월", season: "spring",
    icon: Users, color: "#22c55e",
    title: "가정의 달 세대별 건강 리포트",
    subtitle: "어린이·부모·조부모 — 3세대 건강 비교 분석",
    keywords: ["어린이건강", "부모건강", "노인건강", "가정의달"],
    summary: "가정의 달을 맞아 대한민국 3세대 건강 현황을 비교 분석합니다. 소아 성장·비만, 40~50대 만성질환 전환점, 65세 이상 노인 복합질환 패턴을 세대 간 대비를 통해 조명합니다.",
    dataSources: ["GC케어 세대별 건강검진 데이터", "유비케어 EMR 소아과·내과 데이터", "질병관리청 국민건강영양조사", "심평원 연령대별 진료 통계"],
    sections: ["소아·청소년 비만율과 성장 곡선 추이", "40~50대 만성질환 '첫 발견' 패턴 분석", "65세+ 다중질환(멀티모비디티) 조합 분석", "세대 간 건강 인식 격차와 검진 수검률"],
  },
  {
    month: 6, label: "6월", season: "summer",
    icon: Sun, color: "#eab308",
    title: "여름 대비 식중독 & 감염병 리포트",
    subtitle: "기온 상승과 함께 오는 식중독·수인성 질환 경보",
    keywords: ["식중독", "여름건강", "자외선", "위생관리"],
    summary: "6월 기온 상승과 습도 증가에 따른 식중독 및 수인성 질환 발생 패턴을 분석합니다. 유비케어 EMR 급성 위장관 질환 외래 데이터와 식약처 식중독 통계를 결합하여 고위험 시기를 예측합니다.",
    dataSources: ["유비케어 EMR 위장관 진료 데이터", "식품의약품안전처 식중독 통계", "기상청 기온·습도 데이터", "질병관리청 감염병 통계"],
    sections: ["기온·습도 임계점과 식중독 발생 상관분석", "연령대별 급성 위장관 질환 외래 추이", "지역별 식중독 고위험 시기 히트맵", "여름철 자외선 지수와 피부 관련 진료 증가"],
  },
  {
    month: 7, label: "7월", season: "summer",
    icon: Thermometer, color: "#ef4444",
    title: "폭염 건강 위기 리포트",
    subtitle: "온열질환·탈수·열사병 — 여름의 숨은 위험",
    keywords: ["폭염", "열사병", "온열질환", "탈수"],
    summary: "폭염 일수 증가와 온열질환 발생의 직접적 관계를 분석합니다. 옥외 근로자, 고령자, 만성질환자 등 고위험군별 온열질환 위험도를 산출하고, 실시간 폭염 건강 경보 시스템을 제안합니다.",
    dataSources: ["질병관리청 온열질환 감시체계", "유비케어 EMR 응급 데이터", "기상청 폭염 데이터", "GC케어 수검자 기저질환 데이터"],
    sections: ["체감온도별 온열질환 발생률 시계열 분석", "만성질환 보유자의 폭염 취약성 지수", "옥외 근로자 vs 실내 근로자 건강 비교", "폭염 기간 응급실 방문 패턴 분석"],
  },
  {
    month: 8, label: "8월", season: "summer",
    icon: Droplets, color: "#38bdf8",
    title: "여름 피로 & 면역력 리포트",
    subtitle: "휴가 후 증후군과 면역력 저하의 데이터",
    keywords: ["여름피로", "면역력", "휴가후건강", "비타민"],
    summary: "여름 휴가 시즌 후 나타나는 피로 증후군과 면역력 저하를 데이터로 분석합니다. 8~9월 건강검진 결과에서 나타나는 간기능·비타민D 수치 변화, 휴가 후 건강검진 수검 폭증 패턴을 다룹니다.",
    dataSources: ["GC케어 혈액검사 데이터", "네이버 검색트렌드", "유비케어 EMR 비타민 처방 데이터", "GC케어 건강검진 예약 데이터"],
    sections: ["여름 vs 겨울 간기능 수치 비교 분석", "비타민D 결핍 계절 변동과 면역 지표 관계", "휴가 후 건강검진 '몰아치기' 현상 분석", "여름철 피로 관련 검색 키워드 급상승 분석"],
  },
  {
    month: 9, label: "9월", season: "autumn",
    icon: Leaf, color: "#f97316",
    title: "환절기 건강 & 검진 시즌 리포트",
    subtitle: "환절기 질환 급증과 하반기 건강검진 러시",
    keywords: ["환절기건강", "건강검진", "감기", "면역관리"],
    summary: "9월은 환절기 호흡기 질환 급증과 연말 건강검진 시즌이 겹치는 시기입니다. 기온 일교차와 호흡기 외래 방문의 상관관계, 하반기 건강검진 수검 패턴과 '수검 격차' 문제를 분석합니다.",
    dataSources: ["GC케어 건강검진 수검 데이터", "유비케어 EMR 호흡기 데이터", "기상청 일교차 데이터", "심평원 건강검진 통계"],
    sections: ["일교차 5°C 이상 시 호흡기 외래 증가율", "하반기 건강검진 몰림 현상과 대기일 분석", "소득·지역별 건강검진 수검률 격차", "9~12월 검진 결과 vs 상반기 검진 결과 비교"],
  },
  {
    month: 10, label: "10월", season: "autumn",
    icon: Award, color: "#ec4899",
    title: "암 조기발견 & 검진 리포트",
    subtitle: "유방암 인식의 달 — 암검진 데이터 심층 분석",
    keywords: ["암검진", "유방암", "조기발견", "암예방"],
    summary: "유방암 인식의 달(핑크리본)인 10월, 5대 암(위·대장·간·유방·자궁경부) 건강검진 수검률과 조기 발견율을 심층 분석합니다. 국가 암검진 수검률의 지역·소득·성별 격차 문제도 함께 다룹니다.",
    dataSources: ["GC케어 암검진 데이터", "국립암센터 암등록 통계", "심평원 암검진 수검률", "네이버 검색트렌드"],
    sections: ["5대 암 검진 수검률 연도별 추이", "유방암 조기발견율과 생존율 상관분석", "암검진 사각지대 — 성별·소득·지역 격차", "암 관련 검색 키워드 시계열 분석"],
  },
  {
    month: 11, label: "11월", season: "autumn",
    icon: Activity, color: "#14b8a6",
    title: "대사질환 심층 리포트",
    subtitle: "세계 당뇨의 날 특집 — 대사증후군의 모든 것",
    keywords: ["당뇨", "대사증후군", "혈당관리", "비만"],
    summary: "세계 당뇨의 날(11/14)을 맞아 대한민국 대사증후군 현황을 집중 분석합니다. GC케어 건강검진 데이터상 혈당·허리둘레·중성지방·혈압·HDL 5대 지표 이상소견율 추이와, 대사증후군 '전단계' 인구 추정치를 제공합니다.",
    dataSources: ["GC케어 건강검진 5대 대사지표", "질병관리청 국민건강영양조사", "심평원 당뇨 진료 통계", "유비케어 EMR 대사질환 처방 데이터"],
    sections: ["대사증후군 5대 지표 연도별 이상소견율 추이", "30대 '조기 대사질환' 급증 현상 분석", "성별·연령별 당뇨 전단계 인구 추정", "대사질환 복합 보유율과 합병증 리스크"],
  },
  {
    month: 12, label: "12월", season: "winter",
    icon: Moon, color: "#818cf8",
    title: "연말 건강 결산 리포트",
    subtitle: "한 해의 건강을 숫자로 돌아보다",
    keywords: ["연말건강", "간건강", "음주", "연간건강결산"],
    summary: "한 해를 마무리하며 올해의 건강 데이터를 총정리합니다. 연말 회식 시즌 간기능 이상소견 변화, 올해 가장 많이 검색된 건강 키워드 TOP 20, 건강검진 이상소견율 연간 변동 리뷰를 종합적으로 제공합니다.",
    dataSources: ["GC케어 연간 건강검진 통합 데이터", "유비케어 EMR 연간 통합 데이터", "네이버/구글 연간 검색 데이터", "질병관리청 연간 통계"],
    sections: ["연말 회식 시즌 간기능 수치 변화 추적", "올해의 건강 키워드 TOP 20 & 검색 시계열", "건강검진 이상소견율 12개월 변동 리뷰", "내년 건강 트렌드 예측과 체크리스트"],
  },
];

// ── Annual Reports Data ──────────────────────────────────────
const annualReports = [
  {
    year: 2026,
    edition: "제1호",
    title: "대한민국 건강자산 보고서",
    englishTitle: "Korea Health Asset Report 2026",
    theme: "건강도 자산이다 — 소득·지역·세대별 '건강 격차'의 실체",
    color: "#14b8a6",
    coverDesc: "KB금융그룹이 '부(Wealth)'의 지형도를 그리듯, GC케어는 대한민국 '건강 자산(Health Asset)'의 지형도를 그립니다. 115만 건강검진 수검자 데이터와 15,400개소 EMR 데이터, 질병관리청·심평원 공공데이터를 통합 분석한 최초의 국민건강자산 보고서입니다.",
    keyFindings: [
      "소득 상위 20% vs 하위 20%의 건강검진 이상소견율 격차 분석",
      "수도권 vs 비수도권 '건강 인프라 접근성' 격차 지수 산출",
      "20대~70대 세대별 '건강 투자 행태'와 검진 수검률 비교",
      "'건강 자산' 지수 산출 — 대한민국 건강 부자는 누구인가",
    ],
    chapters: [
      { num: "Ⅰ", title: "대한민국 건강 자산 현황", desc: "건강검진 수검 현황, 이상소견율 총괄, 건강 자산 지수 정의" },
      { num: "Ⅱ", title: "소득과 건강의 상관관계", desc: "소득 분위별 건강검진 결과 비교, 건강 불평등 실태" },
      { num: "Ⅲ", title: "지역별 건강 자산 지도", desc: "17개 시·도 건강지수 산출, 의료 인프라 접근성 분석" },
      { num: "Ⅳ", title: "세대별 건강 투자 행태", desc: "MZ세대~베이비부머 건강 관리 패턴과 인식 격차" },
      { num: "Ⅴ", title: "[이슈] GLP-1 시대의 비만 관리", desc: "비만치료제 등장 후 비만 관련 검진·진료 패턴 변화" },
      { num: "Ⅵ", title: "[이슈] AI와 건강검진의 미래", desc: "AI 기반 건강검진 판독과 맞춤형 건강 관리 전망" },
      { num: "Ⅶ", title: "2027년 건강 트렌드 전망", desc: "데이터가 예측하는 내년 건강 키워드와 리스크" },
    ],
    methodology: "전국 GC케어 건강검진센터 115만 수검자 데이터 + 유비케어 EMR 연계 15,400개소 진료 데이터 + 질병관리청 국민건강영양조사 + 심평원 건강보험 빅데이터 + 네이버/구글 검색트렌드 통합 분석. 정량조사(건강검진 데이터 통계분석) + 정성조사(500명 대상 건강인식 설문) 병행.",
  },
  {
    year: 2027,
    edition: "제2호 (예정)",
    title: "대한민국 건강수명 보고서",
    englishTitle: "Korea Healthy Longevity Report 2027",
    theme: "오래 사는 것 vs 건강하게 사는 것 — 건강수명과 기대수명의 간극",
    color: "#8b5cf6",
    coverDesc: "기대수명은 늘고 있지만, 건강수명과의 격차는 좁혀지지 않고 있습니다. 제2호에서는 '얼마나 오래 건강한가'에 초점을 맞춰, 만성질환 발생 시점과 삶의 질 변화를 추적합니다.",
    keyFindings: [
      "건강수명과 기대수명의 격차: 약 8~9년의 '불건강 생존 기간' 분석",
      "만성질환 첫 진단 시점의 세대별·성별 차이",
      "건강수명 연장에 가장 큰 영향을 미치는 생활습관 요인",
      "디지털 헬스케어 활용도와 건강수명의 상관관계",
    ],
    chapters: [
      { num: "Ⅰ", title: "대한민국 건강수명 현황", desc: "" },
      { num: "Ⅱ", title: "만성질환과 건강수명", desc: "" },
      { num: "Ⅲ", title: "생활습관의 건강수명 영향", desc: "" },
      { num: "Ⅳ", title: "건강수명 격차와 사회적 요인", desc: "" },
      { num: "Ⅴ", title: "[이슈] 초고령사회와 건강관리", desc: "" },
      { num: "Ⅵ", title: "건강수명 연장 전략 제언", desc: "" },
    ],
    methodology: "",
  },
  {
    year: 2028,
    edition: "제3호 (예정)",
    title: "대한민국 직장인 건강 보고서",
    englishTitle: "Korea Workplace Health Report 2028",
    theme: "일하는 대한민국의 건강 비용 — 업종·직급·근무형태별 건강 리스크",
    color: "#f59e0b",
    coverDesc: "대한민국 직장인의 건강은 곧 국가 생산성입니다. 업종별·직급별·근무형태별(재택/하이브리드/현장) 건강검진 데이터를 분석하여, 직장인 건강의 구조적 문제와 해법을 제시합니다.",
    keyFindings: [
      "업종별 직장인 건강 리스크 인덱스 산출",
      "직급별 건강검진 이상소견율 비교",
      "재택·하이브리드·현장 근무자 건강 패턴 차이",
      "직장인 건강 비용과 기업 생산성 손실 추정",
    ],
    chapters: [
      { num: "Ⅰ", title: "직장인 건강 현황 총괄", desc: "" },
      { num: "Ⅱ", title: "업종별 건강 리스크 분석", desc: "" },
      { num: "Ⅲ", title: "근무형태와 건강의 관계", desc: "" },
      { num: "Ⅳ", title: "[이슈] 직장인 정신건강", desc: "" },
    ],
    methodology: "",
  },
];

const weeklyReports = [
  {
    id: 1, date: "2026.03.10", badge: "NEW",
    title: "2026년 1분기 건강검진 이상소견 트렌드 리포트",
    summary: "30~40대 남성 이상지질혈증 이상소견율이 전년 동기 대비 증가세를 보이고 있습니다.",
    category: "주간 리포트",
    tags: ["이상지질혈증", "30-40대", "남성건강"],
    source: "GC케어 건강검진 데이터",
  },
  {
    id: 2, date: "2026.03.03", badge: null,
    title: "봄철 알레르기 & 호흡기 질환 검색 트렌드 분석",
    summary: "3월 첫째주 기준 '알레르기 검사' 키워드 검색량이 급증하며, 관련 건강검진 예약도 증가 추세입니다.",
    category: "트렌드 분석",
    tags: ["알레르기", "호흡기", "검색트렌드"],
    source: "네이버/구글 검색 데이터 + GC케어",
  },
];

const dataSources = [
  { icon: Database, name: "GC케어 건강검진", desc: "115만 회원, 연간 검진 데이터", color: "#14b8a6" },
  { icon: Activity, name: "유비케어 EMR", desc: "의원급 15,400+ 시설 진료 데이터", color: "#0ea5e9" },
  { icon: Shield, name: "질병관리청", desc: "국민건강영양조사, 감염병 통계", color: "#8b5cf6" },
  { icon: FileText, name: "심평원", desc: "건강보험 청구 공개데이터", color: "#f59e0b" },
  { icon: Search, name: "검색 트렌드", desc: "네이버/구글 건강 키워드 분석", color: "#ef4444" },
  { icon: MapPin, name: "공공데이터", desc: "통계청 인구·지역 건강데이터", color: "#22c55e" },
];

const seasonColors = { winter: "#60a5fa", spring: "#a78bfa", summer: "#f59e0b", autumn: "#f97316" };
const seasonLabels = { winter: "겨울", spring: "봄", summer: "여름", autumn: "가을" };

// ── Shared Components ────────────────────────────────────────
function AnimatedNumber({ value, suffix = "", duration = 1500 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        tick();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

function StatCard({ icon: Icon, label, value, suffix, change, changeDir, source }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden", transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "default" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(20,184,166,0.05)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(20,184,166,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} color="#14b8a6" /></div>
        <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: 8 }}><AnimatedNumber value={value} suffix={suffix} /></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {changeDir === "up" ? <ArrowUpRight size={14} color="#14b8a6" /> : <ArrowDownRight size={14} color="#ef4444" />}
          <span style={{ fontSize: 12, color: changeDir === "up" ? "#14b8a6" : "#ef4444", fontWeight: 600 }}>{change}</span>
        </div>
        {source && <span style={{ fontSize: 10, color: "#475569", fontStyle: "italic" }}>{source}</span>}
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          {Icon && <Icon size={20} color="#14b8a6" />}
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", margin: 0, letterSpacing: "-0.01em" }}>{title}</h2>
        </div>
        {subtitle && <p style={{ fontSize: 13, color: "#64748b", margin: 0, paddingLeft: 30 }}>{subtitle}</p>}
      </div>
      {action && (
        <button onClick={onAction} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#14b8a6", background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 500, fontFamily: "'Noto Sans KR', sans-serif" }}>{action} <ChevronRight size={14} /></button>
      )}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
      <p style={{ margin: "0 0 6px 0", fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{label}</p>
      {payload.map((item, i) => (
        <p key={i} style={{ margin: "2px 0", fontSize: 13, color: item.color || "#e2e8f0", fontWeight: 600 }}>
          {item.name}: {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
        </p>
      ))}
    </div>
  );
}

// ── Monthly Report Detail Modal ──────────────────────────────
function MonthlyReportDetail({ report, onClose }) {
  const Icon = report.icon;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#0f172a", borderRadius: 20, maxWidth: 720, width: "100%", maxHeight: "90vh", overflow: "auto", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: "32px 32px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${report.color}15 0%, transparent 70%)` }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${report.color}15`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${report.color}30` }}>
              <Icon size={24} color={report.color} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: report.color, fontWeight: 600, letterSpacing: "0.05em" }}>
                {report.label} 월간 리포트 · {seasonLabels[report.season]}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>{report.title}</h2>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>{report.subtitle}</p>
        </div>

        {/* Content */}
        <div style={{ padding: 32 }}>
          {/* Keywords */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {report.keywords.map((kw, i) => (
              <span key={i} style={{ fontSize: 12, color: report.color, background: `${report.color}10`, padding: "5px 14px", borderRadius: 20, border: `1px solid ${report.color}25` }}>#{kw}</span>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: `3px solid ${report.color}` }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", margin: "0 0 8px 0" }}>리포트 개요</h4>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, lineHeight: 1.7 }}>{report.summary}</p>
          </div>

          {/* Sections */}
          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 12 }}>수록 내용</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {report.sections.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: 6, background: `${report.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: report.color, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Data Sources */}
          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 12 }}>활용 데이터</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {report.dataSources.map((ds, i) => (
              <span key={i} style={{ fontSize: 12, color: "#94a3b8", background: "rgba(255,255,255,0.04)", padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                <Database size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />{ds}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ flex: 1, padding: "14px 0", borderRadius: 12, background: `linear-gradient(135deg, ${report.color}, ${report.color}cc)`, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif" }}>리포트 전문 보기</button>
            <button style={{ padding: "14px 20px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: 14, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif", display: "flex", alignItems: "center", gap: 6 }}><Download size={16} />PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Annual Report Detail Modal ────────────────────────────────
function AnnualReportDetail({ report, onClose }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#0f172a", borderRadius: 20, maxWidth: 800, width: "100%", maxHeight: "90vh", overflow: "auto", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
        {/* Cover */}
        <div style={{ padding: "48px 40px", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(135deg, ${report.color}08, ${report.color}15, transparent)` }} />
          <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${report.color}12 0%, transparent 70%)` }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 6, background: `${report.color}15`, border: `1px solid ${report.color}30`, marginBottom: 20 }}>
              <Award size={14} color={report.color} />
              <span style={{ fontSize: 12, color: report.color, fontWeight: 600 }}>{report.edition} · 연간보고서</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: "#f1f5f9", margin: "0 0 4px 0", letterSpacing: "-0.03em" }}>{report.title}</h1>
            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 16px 0" }}>{report.englishTitle}</p>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0", lineHeight: 1.5, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              "{report.theme}"
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "32px 40px" }}>
          <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.8, marginBottom: 32 }}>{report.coverDesc}</p>

          {/* Key Findings */}
          <div style={{ background: `${report.color}08`, borderRadius: 14, padding: 24, marginBottom: 32, border: `1px solid ${report.color}15` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: report.color, margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
              <Star size={16} /> Key Findings
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {report.keyFindings.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ width: 22, height: 22, borderRadius: 6, background: `${report.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: report.color, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 16 }}>목차</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 32 }}>
            {report.chapters.map((ch, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderRadius: 10, transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}>
                <span style={{ fontSize: 14, fontWeight: 700, color: report.color, minWidth: 24 }}>{ch.num}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{ch.title}</div>
                  {ch.desc && <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{ch.desc}</div>}
                </div>
                <ChevronRight size={14} color="#475569" style={{ marginLeft: "auto" }} />
              </div>
            ))}
          </div>

          {/* Methodology */}
          {report.methodology && (
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 20, marginBottom: 32 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", margin: "0 0 8px 0", letterSpacing: "0.05em" }}>조사 방법론</h4>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.7 }}>{report.methodology}</p>
            </div>
          )}

          {/* CTA */}
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ flex: 1, padding: "16px 0", borderRadius: 12, background: `linear-gradient(135deg, ${report.color}, ${report.color}cc)`, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif", boxShadow: `0 4px 16px ${report.color}30` }}>보고서 전문 보기</button>
            <button style={{ padding: "16px 24px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: 14, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif", display: "flex", alignItems: "center", gap: 6 }}><Download size={16} />PDF</button>
            <button style={{ padding: "16px 24px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: 14, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif", display: "flex", alignItems: "center", gap: 6 }}><Share2 size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Main ───────────────────────────────────────────────────────
export default function GCHealthDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchOpen, setSearchOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedAnnual, setSelectedAnnual] = useState(null);
  const [seasonFilter, setSeasonFilter] = useState("all");

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const tabs = [
    { id: "dashboard", label: "대시보드", icon: BarChart3 },
    { id: "monthly", label: "월간 리포트", icon: Calendar },
    { id: "annual", label: "연간 보고서", icon: BookOpen },
    { id: "trends", label: "트렌드", icon: TrendingUp },
    { id: "data", label: "데이터 소스", icon: Database },
  ];

  const filteredMonthly = seasonFilter === "all" ? monthlyReports : monthlyReports.filter(r => r.season === seasonFilter);

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", background: "#0f172a", minHeight: "100vh", color: "#e2e8f0", opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      {/* Modals */}
      {selectedMonth !== null && <MonthlyReportDetail report={monthlyReports[selectedMonth]} onClose={() => setSelectedMonth(null)} />}
      {selectedAnnual !== null && <AnnualReportDetail report={annualReports[selectedAnnual]} onClose={() => setSelectedAnnual(null)} />}

      {/* ── Header ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #14b8a6, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(20,184,166,0.3)" }}>
              <Heart size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.2 }}>국민건강리포트</div>
              <div style={{ fontSize: 10, color: "#14b8a6", fontWeight: 500, letterSpacing: "0.05em" }}>by GC케어 × 녹십자</div>
            </div>
          </div>
          <nav style={{ display: "flex", gap: 2 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none",
                background: activeTab === tab.id ? "rgba(20,184,166,0.12)" : "transparent",
                color: activeTab === tab.id ? "#14b8a6" : "#94a3b8",
                fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif", transition: "all 0.2s",
              }}><tab.icon size={15} />{tab.label}</button>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSearchOpen(!searchOpen)} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Search size={16} color="#94a3b8" />
            </button>
            <button style={{ padding: "8px 20px", borderRadius: 8, background: "linear-gradient(135deg, #14b8a6, #0ea5e9)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif" }}>구독하기</button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      {activeTab === "dashboard" && (
        <section style={{ position: "relative", overflow: "hidden", padding: "60px 24px 48px" }}>
          <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.15)", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#14b8a6", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: "#14b8a6", fontWeight: 500 }}>실시간 업데이트 · 2026년 3월 10일</span>
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 900, color: "#f1f5f9", lineHeight: 1.3, marginBottom: 16, letterSpacing: "-0.03em", maxWidth: 700 }}>
              데이터로 보는<br />
              <span style={{ background: "linear-gradient(135deg, #14b8a6, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>대한민국 건강 인사이트</span>
            </h1>
            <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
              GC케어 115만 회원 건강검진 데이터와 유비케어 15,400+ 의원 EMR 데이터, 질병관리청·심평원 공공데이터를 통합 분석한 국민건강리포트입니다.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, maxWidth: 960 }}>
              <StatCard icon={Users} label="건강검진 수검자" value={1150000} suffix="명+" change="전년 대비 +8.2%" changeDir="up" source="GC케어" />
              <StatCard icon={Activity} label="EMR 연계 의원" value={15400} suffix="개소+" change="전년 대비 +12.5%" changeDir="up" source="유비케어" />
              <StatCard icon={Calendar} label="월간 리포트" value={12} suffix="종/년" change="매월 발행" changeDir="up" />
              <StatCard icon={BookOpen} label="연간 보고서" value={1} suffix="종/년" change="2026 제1호 발간" changeDir="up" />
            </div>
          </div>
        </section>
      )}

      {/* ── Main Content ── */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ════════════ DASHBOARD TAB ════════════ */}
        {activeTab === "dashboard" && (
          <>
            {/* Quick charts */}
            <SectionTitle icon={BarChart3} title="주요 질환 이상소견 현황" subtitle="GC케어 건강검진 데이터 기반" action="상세 분석 보기" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 48 }}>
              <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", margin: "0 0 4px 0" }}>월별 건강검진 수검 현황</h3>
                <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 20px 0" }}>출처: GC케어 건강검진센터</p>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={monthlyCheckupTrend}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient>
                      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="total" name="총 수검자" stroke="#14b8a6" fill="url(#g1)" strokeWidth={2} />
                    <Area type="monotone" dataKey="abnormal" name="이상소견자" stroke="#ef4444" fill="url(#g2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", margin: "0 0 4px 0" }}>주요 질환별 이상소견율</h3>
                <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 20px 0" }}>출처: GC케어 건강검진 데이터</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {diseasePrevalence.map((d, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{d.name}</span>
                        <span style={{ fontSize: 13, color: d.color, fontWeight: 700 }}>{d.value}%</span>
                      </div>
                      <div style={{ height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${d.value}%`, background: `linear-gradient(90deg, ${d.color}, ${d.color}88)`, borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Latest weekly + annual teaser */}
            <SectionTitle icon={FileText} title="최신 리포트" subtitle="주간·월간·연간 리포트 최신호" action="전체 보기" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
              {weeklyReports.map(report => (
                <div key={report.id} style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 14, padding: 24, border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(20,184,166,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>{report.date}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 4 }}>{report.category}</span>
                    {report.badge && <span style={{ fontSize: 10, fontWeight: 700, color: "#14b8a6", background: "rgba(20,184,166,0.12)", padding: "2px 8px", borderRadius: 4 }}>{report.badge}</span>}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0", margin: "0 0 10px 0", lineHeight: 1.5 }}>{report.title}</h3>
                  <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 14px 0", lineHeight: 1.6 }}>{report.summary}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {report.tags.map((tag, i) => <span key={i} style={{ fontSize: 11, color: "#14b8a6", background: "rgba(20,184,166,0.08)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(20,184,166,0.15)" }}>#{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Annual teaser card */}
            <div onClick={() => setSelectedAnnual(0)} style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.06) 0%, rgba(14,165,233,0.06) 100%)", borderRadius: 20, padding: "36px 40px", border: "1px solid rgba(20,184,166,0.12)", cursor: "pointer", position: "relative", overflow: "hidden", marginBottom: 48, transition: "all 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(20,184,166,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(20,184,166,0.12)"}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Award size={18} color="#14b8a6" />
                <span style={{ fontSize: 13, color: "#14b8a6", fontWeight: 600 }}>연간보고서 제1호 · 2026</span>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px 0" }}>대한민국 건강자산 보고서</h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 16px 0", maxWidth: 600, lineHeight: 1.6 }}>
                "건강도 자산이다" — 소득·지역·세대별 건강 격차의 실체를 데이터로 밝힙니다.
              </p>
              <span style={{ fontSize: 13, color: "#14b8a6", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>자세히 보기 <ChevronRight size={14} /></span>
            </div>
          </>
        )}

        {/* ════════════ MONTHLY TAB ════════════ */}
        {activeTab === "monthly" && (
          <>
            <SectionTitle icon={Calendar} title="월간 건강 리포트 캘린더" subtitle="매월 계절·시의성에 맞는 심층 건강 분석 리포트를 발행합니다" />

            {/* Season filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { id: "all", label: "전체 (12개월)", color: "#94a3b8" },
                { id: "spring", label: "봄 (3~5월)", color: seasonColors.spring },
                { id: "summer", label: "여름 (6~8월)", color: seasonColors.summer },
                { id: "autumn", label: "가을 (9~11월)", color: seasonColors.autumn },
                { id: "winter", label: "겨울 (12~2월)", color: seasonColors.winter },
              ].map(f => (
                <button key={f.id} onClick={() => setSeasonFilter(f.id)} style={{
                  padding: "8px 18px", borderRadius: 20, border: `1px solid ${seasonFilter === f.id ? f.color : "rgba(255,255,255,0.08)"}`,
                  background: seasonFilter === f.id ? `${f.color}15` : "transparent",
                  color: seasonFilter === f.id ? f.color : "#64748b",
                  fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif", transition: "all 0.2s",
                }}>{f.label}</button>
              ))}
            </div>

            {/* Monthly cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginBottom: 48 }}>
              {filteredMonthly.map((report, i) => {
                const Icon = report.icon;
                const isCurrentMonth = report.month === 3;
                return (
                  <div key={report.month} onClick={() => setSelectedMonth(report.month - 1)} style={{
                    background: isCurrentMonth
                      ? `linear-gradient(135deg, ${report.color}08, ${report.color}12)`
                      : "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                    borderRadius: 16, padding: 24,
                    border: isCurrentMonth ? `1px solid ${report.color}30` : "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${report.color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    {isCurrentMonth && (
                      <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 700, color: "#fff", background: report.color, padding: "3px 10px", borderRadius: 4 }}>이번 달</div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${report.color}12`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${report.color}20` }}>
                        <Icon size={22} color={report.color} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{report.label} · {seasonLabels[report.season]}</div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", margin: 0, lineHeight: 1.3 }}>{report.title}</h3>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {report.subtitle}
                    </p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {report.keywords.slice(0, 3).map((kw, j) => (
                        <span key={j} style={{ fontSize: 11, color: report.color, background: `${report.color}08`, padding: "3px 10px", borderRadius: 12, border: `1px solid ${report.color}15` }}>#{kw}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timeline */}
            <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: 32, border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", marginBottom: 24 }}>연간 월간 리포트 타임라인</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                {monthlyReports.map((r, i) => {
                  const Icon = r.icon;
                  const isCurrent = r.month === 3;
                  return (
                    <div key={i} style={{ flex: "1 1 calc(8.33% - 4px)", minWidth: 85, textAlign: "center", position: "relative", padding: "0 2px" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: isCurrent ? r.color : `${r.color}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", border: isCurrent ? `2px solid ${r.color}` : "2px solid transparent", boxShadow: isCurrent ? `0 0 16px ${r.color}40` : "none" }}>
                        <Icon size={16} color={isCurrent ? "#fff" : r.color} />
                      </div>
                      <div style={{ fontSize: 12, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? r.color : "#64748b" }}>{r.label}</div>
                      <div style={{ fontSize: 9, color: "#475569", marginTop: 2, lineHeight: 1.3 }}>{r.title.replace(" 리포트", "")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ════════════ ANNUAL TAB ════════════ */}
        {activeTab === "annual" && (
          <>
            <SectionTitle icon={BookOpen} title="연간 건강 보고서" subtitle="KB 한국 부자 보고서처럼, GC케어가 매년 발행하는 대한민국 건강의 교과서" />

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
              {annualReports.map((report, i) => {
                const isCurrent = report.year === 2026;
                return (
                  <div key={i} onClick={() => setSelectedAnnual(i)} style={{
                    background: isCurrent
                      ? `linear-gradient(135deg, ${report.color}06, ${report.color}10, #16213e)`
                      : "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                    borderRadius: 20, padding: "36px 40px",
                    border: isCurrent ? `1px solid ${report.color}25` : "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${report.color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, ${report.color}10 0%, transparent 70%)` }} />

                    <div style={{ display: "flex", gap: 32, position: "relative", zIndex: 1 }}>
                      {/* Year badge */}
                      <div style={{ flexShrink: 0, width: 100, textAlign: "center" }}>
                        <div style={{ fontSize: 48, fontWeight: 900, color: report.color, lineHeight: 1, letterSpacing: "-0.04em" }}>{report.year}</div>
                        <div style={{ fontSize: 12, color: report.color, fontWeight: 600, marginTop: 4, padding: "3px 12px", borderRadius: 6, background: `${report.color}12`, display: "inline-block" }}>{report.edition}</div>
                        {isCurrent && <div style={{ fontSize: 10, color: "#fff", fontWeight: 700, marginTop: 8, padding: "3px 12px", borderRadius: 4, background: report.color }}>최신호</div>}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{report.title}</h2>
                        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 12px 0" }}>{report.englishTitle}</p>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 12, lineHeight: 1.5, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          "{report.theme}"
                        </div>
                        <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 16px 0", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {report.coverDesc}
                        </p>

                        {/* Key findings preview */}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                          {report.keyFindings.slice(0, 2).map((f, j) => (
                            <span key={j} style={{ fontSize: 11, color: "#94a3b8", background: "rgba(255,255,255,0.04)", padding: "5px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {f}
                            </span>
                          ))}
                          {report.keyFindings.length > 2 && (
                            <span style={{ fontSize: 11, color: report.color, padding: "5px 12px" }}>+{report.keyFindings.length - 2}건 더</span>
                          )}
                        </div>

                        <span style={{ fontSize: 13, color: report.color, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                          보고서 상세 보기 <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison with KB */}
            <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: 32, border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", marginBottom: 20 }}>연간 보고서 포지셔닝</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500, marginBottom: 8 }}>벤치마크</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#f59e0b", marginBottom: 4 }}>KB 한국 부자 보고서</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                    금융자산 기반 '부(Wealth)'의 지형도를 그리며, 2011년부터 매년 발간. 한국 부자의 자산관리 행태·투자 전략·부의 이전을 심층 분석하여 KB를 '자산관리 권위 기관'으로 포지셔닝.
                  </div>
                </div>
                <div style={{ background: "rgba(20,184,166,0.04)", borderRadius: 12, padding: 20, border: "1px solid rgba(20,184,166,0.1)" }}>
                  <div style={{ fontSize: 12, color: "#14b8a6", fontWeight: 500, marginBottom: 8 }}>GC케어 전략</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#14b8a6", marginBottom: 4 }}>대한민국 건강자산 보고서</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                    건강검진·EMR 데이터 기반 '건강 자산(Health Asset)'의 지형도를 그리며, 2026년부터 매년 발간. 소득·지역·세대별 건강 격차를 분석하여 GC케어를 '국민건강 데이터 권위 기관'으로 포지셔닝.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ════════════ TRENDS TAB ════════════ */}
        {activeTab === "trends" && (
          <>
            <SectionTitle icon={TrendingUp} title="건강 검색 트렌드" subtitle="네이버/구글 건강 관련 키워드 주간 검색량 추이" />
            <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 32 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[{ k: "건강검진", c: "#14b8a6" }, { k: "당뇨", c: "#0ea5e9" }, { k: "혈압", c: "#8b5cf6" }, { k: "다이어트", c: "#f59e0b" }].map((kw, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: kw.c, background: `${kw.c}15`, padding: "4px 12px", borderRadius: 20, border: `1px solid ${kw.c}30` }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: kw.c }} />{kw.k}
                  </span>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={searchTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="건강검진" stroke="#14b8a6" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="당뇨" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="혈압" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="다이어트" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 11, color: "#475569", textAlign: "right", marginTop: 8 }}>출처: 네이버 데이터랩 / 구글 트렌드</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
              <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", margin: "0 0 4px 0" }}>연령대·성별 이상소견율</h3>
                <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 20px 0" }}>출처: GC케어 + 심평원</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={ageGroupData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="age" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="male" name="남성" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="female" name="여성" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", margin: "0 0 4px 0" }}>국민건강 영역별 지수</h3>
                <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 20px 0" }}>출처: GC케어 종합분석</p>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart outerRadius={85} data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <Radar name="건강지수" dataKey="A" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <SectionTitle icon={MapPin} title="권역별 건강 지수" subtitle="광역시·도 건강검진 이상소견율 기반" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 48 }}>
              {regionalData.map((r, i) => (
                <div key={i} style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 14, padding: "20px 16px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, marginBottom: 8 }}>{r.region}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: r.score >= 75 ? "#14b8a6" : r.score >= 70 ? "#f59e0b" : "#ef4444", marginBottom: 6 }}>{r.score}</div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${r.score}%`, background: r.score >= 75 ? "#14b8a6" : r.score >= 70 ? "#f59e0b" : "#ef4444", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ════════════ DATA SOURCES TAB ════════════ */}
        {activeTab === "data" && (
          <>
            <SectionTitle icon={Database} title="데이터 소스" subtitle="국민건강리포트의 신뢰성을 담보하는 데이터 출처" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
              {dataSources.map((ds, i) => (
                <div key={i} style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${ds.color}40`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ds.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ds.icon size={20} color={ds.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>{ds.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{ds.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 14, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 12 }}>데이터 거버넌스 원칙</h4>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.8 }}>
                모든 건강검진 및 EMR 데이터는 개인정보보호법 및 보건의료 데이터 활용 가이드라인에 따라 비식별화 처리됩니다. 
                통계 산출 시 최소 집단 크기(k-익명성)를 준수하며, 데이터심의위원회(DRB)의 사전 승인을 거쳐 분석됩니다. 
                외부 공공데이터는 각 기관의 공식 공개 API 또는 공식 통계를 활용합니다.
              </p>
            </div>
          </>
        )}

        {/* ── Newsletter CTA (All tabs) ── */}
        <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)", borderRadius: 20, padding: "48px 40px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)", marginTop: 48, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 12 }}>매주 건강 인사이트를 받아보세요</h2>
            <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 28, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              GC케어 국민건강리포트를 이메일로 구독하세요. 주간·월간 리포트와 연간 보고서 발간 소식을 가장 먼저 받아보실 수 있습니다.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", maxWidth: 460, margin: "0 auto" }}>
              <input type="email" placeholder="이메일 주소를 입력하세요" style={{ flex: 1, padding: "14px 20px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: 14, outline: "none", fontFamily: "'Noto Sans KR', sans-serif" }} />
              <button style={{ padding: "14px 28px", borderRadius: 12, background: "linear-gradient(135deg, #14b8a6, #0ea5e9)", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif" }}>구독</button>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #14b8a6, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center" }}><Heart size={14} color="#fff" /></div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>국민건강리포트</span>
              </div>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7, maxWidth: 300 }}>GC케어는 대한민국 국민의 건강한 삶을 위해 신뢰할 수 있는 건강 데이터와 인사이트를 제공합니다.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 12, letterSpacing: "0.05em" }}>리포트</h4>
              {["주간 리포트", "월간 심층분석", "연간 보고서", "특별 리포트"].map((item, i) => (
                <a key={i} href="#" style={{ display: "block", fontSize: 13, color: "#64748b", textDecoration: "none", padding: "4px 0" }}>{item}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 12, letterSpacing: "0.05em" }}>데이터</h4>
              {["건강검진 통계", "EMR 인사이트", "검색 트렌드", "오픈 데이터"].map((item, i) => (
                <a key={i} href="#" style={{ display: "block", fontSize: 13, color: "#64748b", textDecoration: "none", padding: "4px 0" }}>{item}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 12, letterSpacing: "0.05em" }}>About</h4>
              {["GC케어 소개", "데이터 정책", "이용약관", "문의하기"].map((item, i) => (
                <a key={i} href="#" style={{ display: "block", fontSize: 13, color: "#64748b", textDecoration: "none", padding: "4px 0" }}>{item}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 11, color: "#475569" }}>© 2026 GC케어. All rights reserved. 녹십자홀딩스 계열</span>
            <span style={{ fontSize: 11, color: "#475569" }}>본 리포트의 데이터는 비식별화 처리되어 개인정보보호법을 준수합니다.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
