// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCrudApiHandler } from "@/lib/query/next-crud-api"
import { mockData } from "./index"

export default createCrudApiHandler({
	mockData,
    methods: {
        read: true,
        update: true,
        delete: true
    },
    getIdFromRequest(req) {
        return req.url?.split('/').pop()
    },
})
