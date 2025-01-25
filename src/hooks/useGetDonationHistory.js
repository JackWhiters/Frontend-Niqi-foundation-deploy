import axios from "axios"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { UserContext } from "../App"

const useGetDonationHistory = (trx_id) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    let {
        userAuth: { username },
    } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/user/${username}/transactions?page=${1}&limit=${99999}`).then((res) => {
            const transactions = res.data.transactions;
            const donorsWithTitles = transactions.flatMap(el =>
                el.donors.map(donor => ({
                    ...donor,
                    title: el.title,
                    donation_id: el.donation_id,
                })),
            );
            setData(donorsWithTitles.filter(data => data.transaction_id === trx_id)[0]);
        }).catch((err) => {
            console.error("ERR SERVER: Failed Fetching Donation History: ", err);
            toast.error("ERR SERVER: Failed Fetching Donation History");
        }).finally(() => {
            setIsLoading(false)
        })
    }, [username, trx_id])

    return [isLoading, data];
}

export default useGetDonationHistory;