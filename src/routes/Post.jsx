import { useParams } from "react-router-dom";
import { getRequestWithNativeFetch } from "../lib/fetcherWithFetch";
import { useEffect, useState } from "react";

export default function Post() {
    const { postId } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchSinglePost = async () => {
            try {
                const postData = await getRequestWithNativeFetch(
                    `https://jsonplaceholder.typicode.com/posts/${postId}`, controller.signal
                )
                setData(postData);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Aborted');
                    return;
                }
                setError(error.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }

        fetchSinglePost();

        return () => controller.abort();
    }, [postId])

    return (
        <>
            {loading && (
                <div className="text-xl font-medium">A moment please...</div>
            )}
            {error && <div className="text-red-700">{error}</div>}

            <article>
                <h1 className="text-xl md:text-2xl font-medium mb-6">
                    {data?.title}
                </h1>
                <p>{data?.body}</p>
            </article>
        </>
    )
}

