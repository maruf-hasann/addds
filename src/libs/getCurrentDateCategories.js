export const getCurrentDateCategories = () => {
    const currentDate = new Date();
    const categories = [];

    for (
        let i = 1;
        i <=
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();
        i++
    ) {
        const formattedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i
        ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        categories.push(formattedDate);
    }
    return categories;
};
