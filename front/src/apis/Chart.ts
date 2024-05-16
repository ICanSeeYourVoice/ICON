import { baseApi } from "./Base";

interface StatisticsDate {
  statisticsDate: string | null;
}

// GET: 통계 조회
export const GetChartData = async ({ statisticsDate }: StatisticsDate) => {
  try {
    const response = await baseApi.get("/analyze-service/statistics", {
      params: { statisticsDate },
    });
    return response.data;
  } catch (error) {
    console.error("GetChartData 조회 실패: ", error);
    throw error;
  }
};

// GET: 통계 상세 조회
export const GetChartDetailData = async ({
  statisticsDate,
}: StatisticsDate) => {
  try {
    const response = await baseApi.get("/analyze-service/statistics/details", {
      params: { statisticsDate },
    });
    return response.data;
  } catch (error) {
    console.error("GetChartDetailData 조회 실패: ", error);
    throw error;
  }
};
