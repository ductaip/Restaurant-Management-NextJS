import http from "@/lib/http";
import { UploadImageResType } from "@/schemas/media.schema";

const mediaApi = {
    upload: (formData: FormData) => http.post<UploadImageResType>('/media/upload', formData)
}

export default mediaApi