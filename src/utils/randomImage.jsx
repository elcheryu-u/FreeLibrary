async function randomImage() {
    try {
        const response = await fetch('https://picsum.photos/300/300');
        return response.url;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default randomImage;
