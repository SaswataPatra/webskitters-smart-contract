import { CryptoHookFactory } from "@/types/hooks";
import useSWR from "swr";

// deps -> provider, ethereum, contract (web3State)
export const hookFactory: CryptoHookFactory<string, string> = (deps) => (params) => {
    const swrRes = useSWR("web3/useAccount", () => {
        console.log(deps);
        console.log(params);
        // making request to get data
        return "Test User"
    })

    return swrRes;
}

export const useAccount = () => {
    const data = hookFactory({ ethereum: undefined, provider: undefined });

    return data;
} 
