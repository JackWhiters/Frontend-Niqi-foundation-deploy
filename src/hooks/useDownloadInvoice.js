import axios from "axios";
import { useCallback } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const useDownloadInvoice = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onDownload = useCallback((payload) => {
        setIsLoading(true)
        axios
            .post(`${import.meta.env.VITE_SERVER_INVOICE_GENERATOR}/generate-invoice`, {
                trx_id: payload.trx_id,
                donation_datetime: payload.donation_datetime,
                donation_name: payload.donation_name,
                donation_method: payload.donation_method,
                donation_amount: payload.donation_amount,
            })
            .then(res => window.open(res.data.url, "_blank")).catch((error) => {
                console.error("Error fetching donation list: ", error);
                toast.error("ERR SERVER: Failed While Download Invoice");
            }).finally(() => {
                setIsLoading(false);
            })
    }, [])

    return [isLoading, onDownload]
}

export default useDownloadInvoice;