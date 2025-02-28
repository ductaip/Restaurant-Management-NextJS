import mediaApi from "@/apis/media"
import { useMutation } from "@tanstack/react-query"

export const useUploadMediaMutation = () => {
    return useMutation({
        mutationFn: mediaApi.upload
    })
}