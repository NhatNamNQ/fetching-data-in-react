import { useEffect, useState } from "react"

const FetchGetRequest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                const postsData = response.json();
                setData(postsData);
                setError(null);
            } catch (error) {
                setError(error.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }

        fetchDataForPosts();
    }, [])

    return {
        
    }
}

export default FetchGetRequest;