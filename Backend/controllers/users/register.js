export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        res.json(
            { username, password }
        )
    } catch (error) {

    }
}