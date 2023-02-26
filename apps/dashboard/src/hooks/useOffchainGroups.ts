import { request } from "@zk-groups/utils"
import { AxiosRequestConfig } from "axios"
import { useCallback } from "react"
import { Group } from "../types/groups"

type ReturnParameters = {
    getOffchainGroupList: () => Promise<Group[] | null>
    createOffchainGroup: (
        groupName: string,
        groupDescription: string,
        groupTreeDepth: number
    ) => Promise<true | null>
}

export default function useOffchainGroups(): ReturnParameters {
    const getOffchainGroupList = useCallback(async (): Promise<
        Group[] | null
    > => {
        try {
            const groupList = await request(
                `${import.meta.env.VITE_API_URL}/groups/admin-groups`
            )
            return groupList
        } catch (e) {
            return null
        }
    }, [])

    const createOffchainGroup = useCallback(
        async (
            groupName: string,
            groupDescription: string,
            groupTreeDepth: number
        ): Promise<true | null> => {
            const config: AxiosRequestConfig = {
                method: "post",
                data: {
                    name: groupName,
                    description: groupDescription,
                    treeDepth: groupTreeDepth
                }
            }
            await request(`${import.meta.env.VITE_API_URL}/groups`, config)

            return true
        },
        []
    )

    return {
        getOffchainGroupList,
        createOffchainGroup
    }
}
