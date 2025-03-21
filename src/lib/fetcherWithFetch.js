export const getRequestWithNativeFetch = async (
    url,
    signal = null
) => {
    const response = await fetch (url, {signal});

    if (!response.ok) {
        throw new Error (`HTTP error: Status ${response.status}`)
    }

    return response.json();
}