import api from "../libs/axios";

export default {
  async fetchOpenhouses() {
    const res = await api.get("/openhouse");
    return { ...res.data };
  },
  async newOpenhouse({ visitors, visitorAmount, property, startDate }) {
    const res = await api.post("/openhouse", {
      visitors,
      visitorAmount,
      property,
      startDate,
    });
    return { ...res.data };
  },
  async editOpenhouse({
    openhouseId,
    visitors,
    visitorAmount,
    property,
    startDate,
  }) {
    const res = await api.patch(`/openhouse/${openhouseId}`, {
      visitors,
      visitorAmount,
      property,
      startDate,
    });
    return { ...res.data };
  },
};
