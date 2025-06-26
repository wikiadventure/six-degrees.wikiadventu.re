import { ref, reactive, watch } from "vue";
import { windowClose } from "../../utils";
import { SixDegreeAccount } from "db-wikiadventu-re/types/surreal/query/getAccountOrCreate/six_degree";
import { Account } from "db-wikiadventu-re/types/surreal/query/getAccountOrCreate";
import { useStorage } from "@vueuse/core";
import { apiClient } from "../db"

type EmptyObj = Record<string | number | symbol, never>;

export type OfflineSixDegreeAccount = Omit<SixDegreeAccount, keyof Account>

export const storedAccount = useStorage<SixDegreeAccount | OfflineSixDegreeAccount>("account", {
    six_degree: {
        query_count: 0,
        achievements: []
    }
});

export const account = reactive<SixDegreeAccount | OfflineSixDegreeAccount>(storedAccount.value);

watch(account, account => storedAccount.value = account, { deep: true });

const authStatus = ref<AuthStatus>("processing");

export async function getAccount() {
    try {

        console.log("get account");
        // Object.assign(account, await apiClient["get-account"]["six-degree"].$get().then(r=>r.json()))
        console.log("get account : ", account);
        authStatus.value = "connected";
    } catch(e) {
        const r = e as Response;
        console.log(r);
        authStatus.value = r?.status == 401 ? "noSession" : "error";
    }
}

export async function openLoginPopup() {
    try {
        // const popup = window.open(`${import.meta.env.VITE_LOGIN_URL}/login`,undefined,"popup");
        // await windowClose(popup);
        // await getAccount();
    } catch(e) {

    }

}

export function useAuth() {
    return {
        getAccount,
        account,
        authStatus,
        openLoginPopup
    }
}

type AuthStatus = "connected" | "noSession" | "error" | "processing";
