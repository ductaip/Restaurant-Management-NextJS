import http from "@/lib/http";

const revalidateApi = (tag: string) =>
  http.get(`/api/revalidate?tag=${tag}`, {
    baseUrl: "",
  });

export default revalidateApi;
