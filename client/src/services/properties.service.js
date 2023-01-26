import api from "../libs/axios";

export default {
  async fetchProperties() {
    const res = await api.get("/property");
    return { ...res.data };
  },
  async newProperty({ adress }) {
    const res = await api.post("/property", { adress });
    return { ...res.data };
  },
  async editProperty({ propertyId, adress }) {
    const res = await api.patch(`/property/${propertyId}`, { adress });
    return { ...res.data };
  },
};
